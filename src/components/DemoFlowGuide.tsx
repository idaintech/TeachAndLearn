import React, { useState } from 'react';
import { Sparkles, ChevronRight, CheckCircle2, Award, Shield, UserCheck, BookOpen, Compass, X } from 'lucide-react';
import { UserRole } from '../types';

interface DemoFlowGuideProps {
  activeView: string;
  onNavigate: (view: string) => void;
  onRoleChange: (role: UserRole) => void;
  onOpenDiagnostic: () => void;
}

export const DemoFlowGuide: React.FC<DemoFlowGuideProps> = ({
  activeView,
  onNavigate,
  onRoleChange,
  onOpenDiagnostic,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const steps = [
    {
      id: 'landing',
      number: '1',
      title: 'Landing Page',
      desc: 'Ecosystem & Brand',
      action: () => onNavigate('landing'),
      isActive: activeView === 'landing',
    },
    {
      id: 'parent-dashboard',
      number: '2',
      title: 'Parent Portal',
      desc: 'Umida & Aisha (Grade 3)',
      action: () => {
        onRoleChange('parent');
        onNavigate('parent-dashboard');
      },
      isActive: activeView === 'parent-dashboard',
    },
    {
      id: 'diagnostic',
      number: '3',
      title: 'Take Diagnostic',
      desc: 'Fractions & Gaps',
      action: () => {
        onRoleChange('parent');
        onNavigate('parent-dashboard');
        onOpenDiagnostic();
      },
      isActive: false,
    },
    {
      id: 'tutors',
      number: '4',
      title: 'Verified Mentors',
      desc: 'Amina & Ali (Free)',
      action: () => {
        onRoleChange('parent');
        onNavigate('tutors');
      },
      isActive: activeView === 'tutors',
    },
    {
      id: 'child-learn',
      number: '5',
      title: 'Child Learning',
      desc: 'Pizza fractions & positive praise',
      action: () => onNavigate('child-learn'),
      isActive: activeView === 'child-learn',
    },
    {
      id: 'studybuddy',
      number: '6',
      title: 'StudyBuddy AI',
      desc: 'Parent homework co-pilot',
      action: () => onNavigate('studybuddy'),
      isActive: activeView === 'studybuddy',
    },
    {
      id: 'mentor-dashboard',
      number: '7',
      title: 'Peer Volunteer',
      desc: 'Ali (27.5h) & Certificate',
      action: () => {
        onRoleChange('mentor');
        onNavigate('mentor-dashboard');
      },
      isActive: activeView === 'mentor-dashboard',
    },
  ];

  if (!isOpen) {
    return (
      <aside aria-label="Demo Flow Quick Guide collapsed" className="bg-blue-50/90 border-b border-blue-200 py-1.5 px-4 text-xs flex items-center justify-between">
        <div className="flex items-center gap-2 text-blue-900 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Hackathon Demo Guide: 7-Step Interactive Flow</span>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="text-blue-800 font-semibold hover:underline cursor-pointer"
        >
          Expand Guide
        </button>
      </aside>
    );
  }

  return (
    <aside aria-label="Demo Flow Quick Guide" className="bg-gradient-to-r from-blue-50/90 via-indigo-50/60 to-sky-50 border-b border-blue-100 py-2.5 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-blue-950">
              Hackathon Guided Demo Flow
            </span>
            <span className="text-xs text-slate-500 hidden sm:inline">
              — Click any step to immediately test that stage of the ecosystem
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-slate-600 p-0.5"
            title="Minimize guide"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Steps Scrollable Rail */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {steps.map((step, idx) => (
            <React.Fragment key={step.id}>
              <button
                onClick={step.action}
                className={`shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all text-left cursor-pointer ${
                  step.isActive
                    ? 'bg-blue-600 text-white border-blue-700 shadow-xs font-semibold'
                    : 'bg-white/90 text-slate-700 border-slate-200 hover:bg-white hover:border-blue-300'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                    step.isActive ? 'bg-blue-700 text-blue-100' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {step.number}
                </span>
                <div>
                  <div className="leading-tight font-semibold text-[11px]">{step.title}</div>
                  <div
                    className={`text-[10px] leading-tight ${
                      step.isActive ? 'text-blue-100' : 'text-slate-400'
                    }`}
                  >
                    {step.desc}
                  </div>
                </div>
              </button>

              {idx < steps.length - 1 && (
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </aside>
  );
};
