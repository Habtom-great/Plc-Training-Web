import React from 'react';
import { roadmapData } from '../data/roadmap';
import { Module, Lesson, Language } from '../types';
import { ChevronRight, Cpu, Network, Zap, Settings, HelpCircle, Code } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  isOpen: boolean;
  activeModule: Module;
  activeLesson: Lesson;
  onSelectLesson: (m: Module, l: Lesson) => void;
  lang: Language;
}

export default function Sidebar({ isOpen, activeModule, activeLesson, onSelectLesson, lang }: SidebarProps) {
  return (
    <aside className={cn(
      "w-72 bg-slate-900/50 border-r border-slate-800 h-full overflow-y-auto transition-all duration-300 z-20 backdrop-blur-sm",
      !isOpen && "translate-x-[-100%] w-0 lg:w-0"
    )}>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center border border-blue-400/50 shadow-blue-500/20 shadow-lg">
            <Cpu className="text-white" size={16} />
          </div>
          <div>
            <h2 className="font-black text-xs tracking-tighter text-slate-100 uppercase italic">Module Map</h2>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">{lang === 'en' ? 'S7-1200 Pro' : 'S7-1200 ባለሙያ'}</p>
          </div>
        </div>

        <nav className="space-y-6">
          {roadmapData.modules.map((module) => (
            <div key={module.id} className="space-y-3">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Week {module.week}
                </h3>
              </div>
              <div className="space-y-1">
                {module.lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => onSelectLesson(module, lesson)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded transition-all group flex items-start gap-3 border-l-2",
                      activeLesson.id === lesson.id 
                        ? "bg-blue-600/10 border-blue-500 text-slate-100 font-bold" 
                        : "text-slate-400 border-transparent hover:bg-slate-800 hover:text-slate-200"
                    )}
                  >
                    <div className="mt-1 flex-1">
                      <p className="text-[10px] uppercase font-bold opacity-60 mb-0.5 tracking-tighter">Lesson</p>
                      <p className="text-sm leading-tight truncate">{lang === 'en' ? lesson.titleEn : lesson.titleAm}</p>
                    </div>
                    {activeLesson.id === lesson.id && <ChevronRight size={14} className="mt-4 text-blue-400" />}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="mt-12 bg-slate-800/50 p-4 rounded border border-slate-700/50">
          <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <Zap size={10} />
            {lang === 'en' ? 'Trainer Tip' : 'የአሰልጣኝ ምክር'}
          </p>
          <p className="text-xs text-slate-400 italic leading-relaxed">
            {lang === 'en' 
              ? '"Focus on the logic flow before touching the software. A good electrician is already 70% a PLC programmer."'
              : '"ሶፍትዌር ከመንካትዎ በፊት አመክንዮውን በጥልቀት ያስተውሉ። ጎበዝ ኤሌክትሪሻን ቀድሞውኑ 70% የPLC ባለሙያ ነው።"'}
          </p>
        </div>
      </div>
    </aside>
  );
}
