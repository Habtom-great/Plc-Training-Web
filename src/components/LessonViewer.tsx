import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Lesson, Language } from '../types';
import { Split, FileText, Layout, Info, AlertCircle, Zap, Globe, Volume2, VolumeX } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LessonViewerProps {
  lesson: Lesson;
  lang: Language;
}

export default function LessonViewer({ lesson, lang }: LessonViewerProps) {
  const [viewMode, setViewMode] = useState<'single' | 'split'>('single');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  useEffect(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      const handleVoicesChanged = () => {
        window.speechSynthesis.getVoices();
      };
      window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
    }

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  const speak = (text: string, currentLang: Language) => {
    if (!window.speechSynthesis) {
      console.warn('Speech synthesis not supported');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Always resume before speaking to fix potential "stuck" state
    window.speechSynthesis.resume();
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text.replace(/[#*`]/g, ''));
    
    // Attempt to find a suitable voice
    const voices = window.speechSynthesis.getVoices();
    console.log(`Speaking Lesson. Available voices: ${voices.length}`);
    if (currentLang === 'en') {
      utterance.lang = 'en-US';
      const enVoice = voices.find(v => v.lang.startsWith('en') && v.name.includes('Google')) || voices.find(v => v.lang.startsWith('en'));
      if (enVoice) utterance.voice = enVoice;
    } else {
      utterance.lang = 'am-ET';
      const amVoice = voices.find(v => v.lang.startsWith('am') || v.lang.includes('ETH')) || voices.find(v => v.lang.startsWith('am'));
      if (amVoice) utterance.voice = amVoice;
    }

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (e) => {
      console.error('Speech synthesis error:', e);
      setIsSpeaking(false);
    };
    
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Lesson Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-10">
        <div>
          <div className="flex items-center gap-2 text-blue-400 font-mono text-[10px] mb-3 font-bold tracking-[0.2em] uppercase italic">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
            <span>Industrial Module System</span>
          </div>
          <h2 className="text-4xl font-black tracking-tight text-slate-100 leading-tight uppercase italic">
            {lang === 'en' ? lesson.titleEn : lesson.titleAm}
          </h2>
          {viewMode === 'split' && (
             <h3 className="text-xl font-bold text-slate-500 mt-2 italic opacity-80">
                {lang === 'en' ? lesson.titleAm : lesson.titleEn}
             </h3>
          )}
        </div>
        
        <button 
          onClick={() => setViewMode(prev => prev === 'single' ? 'split' : 'single')}
          className="flex items-center gap-2 px-6 py-2.5 rounded bg-blue-600 text-white text-xs font-black uppercase italic tracking-widest hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] shrink-0"
        >
          <Split size={14} />
          <span>{viewMode === 'single' ? 'Bilingual Split' : 'Standard View'}</span>
        </button>
      </div>

      {/* Content Rendering */}
      <div className={cn(
        "grid gap-10",
        viewMode === 'split' ? "grid-cols-1 lg:grid-cols-2 lg:divide-x lg:divide-slate-800" : "grid-cols-1"
      )}>
        {/* Primary View */}
        <section className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
            <Layout size={120} />
          </div>
          
          <div className="mb-6 border-b border-slate-800 pb-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-widest border border-blue-500/20">
                {lang === 'en' ? 'Technical English' : 'የአማርኛ ትርጓሜ'}
              </span>
              <button 
                onClick={() => speak(lang === 'en' ? lesson.contentEn : lesson.contentAm, lang)}
                className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400 hover:text-blue-400"
                title="Read Lesson"
              >
                {isSpeaking ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
            </div>
            <FileText size={16} className="text-slate-700" />
          </div>
          
          <div className="markdown-body">
            <ReactMarkdown>
              {lang === 'en' ? lesson.contentEn : lesson.contentAm}
            </ReactMarkdown>
          </div>
        </section>

        {/* Translation View (Split Mode Only) */}
        {viewMode === 'split' && (
          <section className="lg:pl-10 space-y-8">
            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl relative">
              <div className="mb-6 border-b border-slate-800 pb-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-amber-500/10 text-amber-500 text-[10px] font-black uppercase tracking-widest border border-amber-500/20">
                    {lang === 'en' ? 'የአማርኛ ትርጓሜ' : 'Technical English'}
                  </span>
                  <button 
                    onClick={() => speak(lang === 'en' ? lesson.contentAm : lesson.contentEn, lang === 'en' ? 'am' : 'en')}
                    className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400 hover:text-amber-500"
                    title="Read Lesson"
                  >
                    {isSpeaking ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  </button>
                </div>
                <Globe size={16} className="text-slate-700" />
              </div>
              <div className="markdown-body">
                <ReactMarkdown>
                  {lang === 'en' ? lesson.contentAm : lesson.contentEn}
                </ReactMarkdown>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Quiz Section if exists */}
      {lesson.quiz && (
        <section className="mt-20 pt-16 border-t border-slate-800 relative">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-2 bg-slate-950 border border-slate-800 rounded-full">
             <div className="flex items-center gap-3">
               <AlertCircle className="text-amber-500" size={18} />
               <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-100">{lang === 'en' ? 'Knowledge Gate' : 'የእውቀት ፈተና'}</h3>
             </div>
           </div>
           
           <div className="grid gap-8 max-w-3xl mx-auto">
              {lesson.quiz.map((q, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-inner">
                  <div className="flex gap-4 mb-6">
                    <span className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-xs">
                      {idx + 1}
                    </span>
                    <p className="font-bold text-xl text-slate-100">{lang === 'en' ? q.questionEn : q.questionAm}</p>
                  </div>
                  <div className="grid gap-4 pl-12">
                    {(lang === 'en' ? q.optionsEn : q.optionsAm).map((opt, oIdx) => (
                      <button 
                        key={oIdx}
                        className="w-full text-left px-5 py-4 rounded-xl border border-slate-800 bg-slate-950 hover:border-blue-500/50 hover:bg-slate-900 transition-all font-medium text-slate-400 hover:text-slate-100 group flex items-center justify-between"
                      >
                        <span>{opt}</span>
                        <div className="w-2 h-2 rounded-full border border-slate-700 group-hover:border-blue-500 transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
           </div>
        </section>
      )}

      {/* Industrial Feedback Box */}
      <div className="mt-16 bg-slate-900 border border-blue-500/20 p-8 rounded-2xl shadow-xl relative overflow-hidden">
         <div className="absolute top-0 right-0 p-4 opacity-10">
           <Zap size={60} className="text-blue-500" />
         </div>
         <div className="flex items-start gap-6 relative z-10">
           <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center border border-blue-400 glow-blue shrink-0">
             <Info className="text-white" size={24} />
           </div>
           <div>
             <h4 className="font-black text-blue-400 mb-2 uppercase tracking-widest text-xs italic">
               {lang === 'en' ? "Maintenance Protocol" : "የጥገና መመሪያ"}
             </h4>
             <p className="text-slate-300 text-sm leading-relaxed max-w-2xl italic font-medium">
               {lang === 'en' 
                 ? '"When wiring the S7-1200, always double-check the 24V DC polarity. Swapping L+ and M can damage the communication port permanently."' 
                 : '"የS7-1200 ሽቦ ሲዘረጉ ሁልጊዜ የ24V DC ፖላሪቲ (L+ እና M) ደግመው ያረጋግጡ። እነዚህን ማዛባት የመገናኛ ወደቡን በቋሚነት ሊያበላሽ ይችላል።"'}
             </p>
           </div>
         </div>
      </div>
    </div>
  );
}
