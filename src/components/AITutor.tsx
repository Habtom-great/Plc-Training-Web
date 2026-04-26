import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Lesson, Language } from '../types';
import { MessageSquare, Send, Sparkles, User, Bot, X, Maximize2, Minimize2, Mic, MicOff, Volume2, VolumeX, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';

// Define the API client lazily
let aiInstance: any = null;
function getAIInstance() {
  if (!aiInstance) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) throw new Error('GEMINI_API_KEY is missing');
    aiInstance = new GoogleGenAI({ apiKey: key });
  }
  return aiInstance;
}

interface Message {
  role: 'user' | 'bot';
  content: string;
}

interface AITutorProps {
  lang: Language;
  setLang: (lang: Language) => void;
  currentLesson: Lesson;
}

export default function AITutor({ lang, setLang, currentLesson }: AITutorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [autoRead, setAutoRead] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    // Trigger voice loading
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      const handleVoicesChanged = () => {
        window.speechSynthesis.getVoices();
      };
      window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
    }

    // Initialize Speech Recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          alert('Microphone access denied. Please enable microphone permissions in your browser settings.');
        } else if (event.error === 'network') {
          alert('Network error during speech recognition.');
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        
        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInput(transcript);
          setIsListening(false);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
          if (event.error === 'not-allowed') {
            alert('Microphone access denied. Please enable microphone permissions in your browser settings.');
          } else if (event.error === 'network') {
            alert('Network error during speech recognition.');
          }
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }

    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.lang = lang === 'en' ? 'en-US' : 'am-ET';
          recognitionRef.current.start();
          setIsListening(true);
        } catch (err) {
          console.error('Failed to start recognition:', err);
          setIsListening(false);
        }
      } else {
        alert('Speech recognition is not supported in this browser.');
      }
    }
  };

  const speak = (text: string, currentLang?: Language) => {
    if (!window.speechSynthesis) {
      console.warn('Speech synthesis not supported');
      return;
    }
    
    // Always resume before speaking to fix potential "stuck" state
    window.speechSynthesis.resume();
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text.replace(/[#*`]/g, ''));
    
    const voices = window.speechSynthesis.getVoices();
    
    // Determine language: use explicit hint, otherwise detect
    const isAmharic = currentLang === 'am' || /[\u1200-\u137F]/.test(text);

    if (isAmharic) {
      utterance.lang = 'am-ET';
      // Try to find any Amharic voice or a fallback
      const amVoice = voices.find(v => v.lang.startsWith('am') || v.lang.includes('ETH'));
      if (amVoice) utterance.voice = amVoice;
    } else {
      utterance.lang = 'en-US';
      const enVoice = voices.find(v => v.lang.startsWith('en') && v.name.includes('Google'));
      if (enVoice) utterance.voice = enVoice;
      else {
        const anyEnVoice = voices.find(v => v.lang.startsWith('en'));
        if (anyEnVoice) utterance.voice = anyEnVoice;
      }
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (e) => {
      console.error('Speech synthesis error:', e);
      setIsSpeaking(false);
    };
    
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (overrideInput?: string) => {
    const textToSend = overrideInput || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg = textToSend.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const ai = getAIInstance();
      
      const prompt = `
        You are a professional Industrial Automation Trainer specializing in Siemens S7-1200 and TIA Portal.
        Your student is an experienced electrician named Habtom (approx 52 years old).
        He is currently studying the lesson: "${currentLesson.titleEn}".
        
        Guidelines:
        1. Respond strictly in ${lang === 'en' ? 'English' : 'Amharic (አማርኛ)'}.
        2. If the language is Amharic, use Amharic grammar and structure, but you can retain English technical terms like "VFD", "PLC", "Star-Delta" where they are commonly used in the industry.
        3. Be encouraging, professional, and respectful. 
        4. Keep responses structured, practical, and highly relevant to industrial automation.
        
        Current Language Context: ${lang === 'en' ? 'English' : 'Amharic'}.
        User Question: ${userMsg}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });
      
      const text = response.text || '';

      setMessages(prev => [...prev, { role: 'bot', content: text }]);
      if (autoRead) {
        speak(text, lang);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'bot', content: "I'm sorry, I encountered an error. Please try again later. (ይቅርታ፣ ችግር አጋጥሞኛል። እባክዎ ቆይተው እንደገና ይሞክሩ።)" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              width: isExpanded ? '90vw' : '450px',
              height: isExpanded ? '85vh' : '650px'
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-slate-950 rounded-2xl shadow-[0_0_50px_rgba(37,99,235,0.15)] border border-blue-500/30 flex flex-col mb-4 overflow-hidden max-w-[95vw]"
          >
            {/* Console Header */}
            <div className="px-5 py-4 bg-slate-900 border-b border-blue-500/30 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center border border-blue-400 glow-blue animate-pulse">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-black text-xs uppercase tracking-[0.2em] italic">Industrial AI Terminal</h3>
                  <p className="text-[9px] text-blue-400 uppercase tracking-widest font-mono">Expert System v2.4.0-Stable</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => {
                    const newAutoRead = !autoRead;
                    setAutoRead(newAutoRead);
                    if (!newAutoRead) window.speechSynthesis.cancel();
                  }}
                  className={`p-2 rounded transition-colors ${autoRead ? 'text-blue-400 bg-blue-500/10' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                  title={autoRead ? "Disable Auto-Read" : "Enable Auto-Read"}
                >
                  {autoRead ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>
                <button 
                  onClick={() => setLang(lang === 'en' ? 'am' : 'en')}
                  className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-800 border border-blue-500/30 text-[10px] font-bold text-blue-400 uppercase tracking-widest hover:bg-slate-700 transition-colors"
                  title="Switch Language"
                >
                  <Globe size={12} />
                  <span>{lang === 'en' ? 'AM' : 'EN'}</span>
                </button>
                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-2 hover:bg-slate-800 rounded transition-colors text-slate-400 hover:text-white"
                  title="Expand/Collapse"
                >
                  {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-slate-800 rounded transition-colors text-slate-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Terminal Screen */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-950 font-mono"
            >
              <div className="text-[10px] text-slate-600 mb-6 border-b border-slate-900 pb-2">
                [SYSTEM]: CONNECTED TO S7-1200_EMULATOR_NODE_01...<br />
                [STATUS]: READY_FOR_QUERIES...
              </div>

              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="w-16 h-16 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mb-6 glow-blue">
                    <Sparkles size={32} />
                  </div>
                  <h4 className="font-black text-slate-100 mb-2 uppercase tracking-widest">Awaiting Command</h4>
                  <p className="text-[11px] text-slate-500 max-w-xs leading-relaxed uppercase tracking-tighter">
                    Query the expert system regarding {currentLesson.titleEn} or specific Amharic translations for industrial terminology.
                  </p>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[90%] flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 shrink-0 rounded border flex items-center justify-center ${msg.role === 'user' ? 'border-amber-500/30 bg-amber-500/10 text-amber-500' : 'border-blue-500/30 bg-blue-500/10 text-blue-400'}`}>
                      {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    <div className={`p-4 rounded-xl text-xs leading-relaxed ${msg.role === 'user' ? 'bg-amber-600/10 border border-amber-500/30 text-amber-100 rounded-tr-none' : 'bg-slate-900 border border-blue-500/20 text-slate-300 shadow-xl rounded-tl-none'}`}>
                      {msg.role === 'bot' ? (
                        <div className="markdown-body prose-invert !text-xs">
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                      ) : (
                        msg.content
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-900 border border-blue-500/20 px-4 py-3 rounded-xl rounded-tl-none flex gap-3 items-center">
                    <div className="text-[10px] text-blue-400 animate-pulse font-bold tracking-widest uppercase italic">Processing...</div>
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" />
                      <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Console */}
            <div className="p-5 bg-slate-900 border-t border-blue-500/30 flex gap-3">
              <button 
                onClick={toggleListening}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all shrink-0 border ${isListening ? 'bg-red-600 border-red-400 glow-red animate-pulse' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700'}`}
                title={isListening ? "Stop Listening" : "Start Voice Input"}
              >
                {isListening ? <MicOff size={20} /> : <Mic size={20} />}
              </button>
              <div className="flex-1 relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <span className="text-blue-500 text-[10px] font-bold">&gt;_</span>
                </div>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={isListening ? "Listening..." : (lang === 'en' ? "Execute query..." : "ጥያቄዎን እዚህ ያስገቡ...")}
                  className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:border-blue-500/50 focus:ring-0 outline-none text-xs text-blue-100 transition-all font-mono"
                />
              </div>
              <button 
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-500 disabled:opacity-30 disabled:grayscale transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] glow-blue shrink-0"
              >
                <Send size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:bg-blue-500 transition-all hover:scale-105 active:scale-95 group border-2 border-blue-400"
      >
        <div className="relative">
          <MessageSquare size={28} className="group-hover:rotate-12 transition-transform duration-300" />
          {messages.length === 0 && !isOpen && (
             <span className="absolute -top-3 -right-3 px-2 py-0.5 bg-amber-500 text-[8px] font-black italic rounded border border-white text-white uppercase animate-bounce glow-amber">
               New
             </span>
          )}
        </div>
      </button>
    </div>
  );
}
