/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { roadmapData } from './data/roadmap';
import { Module, Lesson, Language } from './types';
import Sidebar from './components/Sidebar';
import LessonViewer from './components/LessonViewer';
import AITutor from './components/AITutor';
import { Menu, BookOpen, GraduationCap, Github, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [activeModule, setActiveModule] = useState<Module>(roadmapData.modules[0]);
  const [activeLesson, setActiveLesson] = useState<Lesson>(roadmapData.modules[0].lessons[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleLang = () => setLang(prev => prev === 'en' ? 'am' : 'en');

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-300 font-sans overflow-hidden border-4 border-slate-900">
      {/* Header */}
      <header className="h-16 bg-slate-900/80 border-b border-blue-500/30 flex items-center justify-between px-6 backdrop-blur-md z-30">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors lg:hidden"
          >
            <Menu size={20} className="text-blue-400" />
          </button>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center border border-blue-400 glow-blue">
              <span className="text-white font-black text-xl uppercase italic">IA</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-100 leading-tight uppercase tracking-widest italic">
                Simatic Academy <span className="text-blue-400 font-normal hidden sm:inline">| ኤሌክትሪካል አውቶሜሽን</span>
              </h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-tighter">Siemens S7-1200 Specialist Program</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:block text-right">
            <p className="text-[10px] text-blue-400 uppercase tracking-widest">Student Context</p>
            <p className="text-sm font-mono text-slate-300 truncate max-w-[200px]">Active: {activeLesson.titleEn}</p>
          </div>
          <button
            onClick={toggleLang}
            className="flex items-center gap-2 px-4 py-1.5 rounded bg-slate-800 border border-blue-500/30 hover:bg-slate-700 transition-all text-xs font-bold uppercase tracking-widest text-blue-400"
          >
            <Globe size={14} />
            <span>{lang === 'en' ? 'Amharic (አማርኛ)' : 'English'}</span>
          </button>
          <div className="h-10 w-10 rounded-full border border-blue-500/50 bg-slate-800 flex items-center justify-center p-0.5">
            <div className="h-full w-full rounded-full bg-slate-900 flex items-center justify-center">
              <div className="h-2.5 w-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <Sidebar 
          isOpen={isSidebarOpen} 
          activeModule={activeModule}
          activeLesson={activeLesson}
          onSelectLesson={(m, l) => {
            setActiveModule(m);
            setActiveLesson(l);
          }}
          lang={lang}
        />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 bg-slate-950 relative overflow-hidden">
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10 max-w-6xl mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLesson.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <LessonViewer lesson={activeLesson} lang={lang} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* AI Tutor Integration */}
          <AITutor lang={lang} setLang={setLang} currentLesson={activeLesson} />
        </main>
      </div>

      {/* Footer Status Bar */}
      <footer className="h-8 bg-blue-600 flex items-center px-6 justify-between z-30 shrink-0">
        <div className="flex items-center space-x-6">
          <span className="text-[10px] text-white font-bold tracking-widest uppercase">Mode: Interactive Mastery</span>
          <div className="h-3 w-px bg-blue-400 opacity-50" />
          <span className="text-[10px] text-white/90 uppercase font-mono">CPU S7-1215C DC/DC/RLY Online</span>
        </div>
        <div className="flex space-x-4 items-center">
          <span className="text-[10px] text-white font-bold tracking-tighter uppercase">Step {roadmapData.modules.indexOf(activeModule) + 1} / {roadmapData.modules.length} Modules</span>
          <div className="h-3 w-px bg-blue-400 opacity-50" />
          <span className="text-[10px] text-white/70 italic">© 2024 Industrial Tech-Trainer</span>
        </div>
      </footer>
    </div>
  );
}
