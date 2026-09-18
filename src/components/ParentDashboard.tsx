import React, { useState } from 'react';
import { 
  User, 
  Sparkles, 
  BookOpen, 
  Award, 
  Plus, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Calendar, 
  Video, 
  Clock, 
  TrendingUp, 
  Smile, 
  ChevronRight 
} from 'lucide-react';
import { Child, Enrollment, SubjectName } from '../types';

interface ParentDashboardProps {
  childrenList: Child[];
  activeChildId: string;
  onSelectChild: (id: string) => void;
  onOpenAddChild: () => void;
  onOpenDiagnostic: () => void;
  onNavigate: (view: string) => void;
  enrollments: Enrollment[];
  onOpenSafety: () => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({
  childrenList,
  activeChildId,
  onSelectChild,
  onOpenAddChild,
  onOpenDiagnostic,
  onNavigate,
  enrollments,
  onOpenSafety,
}) => {
  const activeChild = childrenList.find(c => c.id === activeChildId) || childrenList[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header with warm personalized greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              Good evening, Umida 👋
            </h1>
            <span className="text-xs font-bold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/60">
              Parent Guardian
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Managing learning support for your children in a safe, parent-monitored space.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenDiagnostic}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-800 text-white text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            id="parent-take-diagnostic-btn"
          >
            <BookOpen className="w-4 h-4 text-blue-200" />
            <span>Take Diagnostic for {activeChild?.name}</span>
          </button>
          <button
            onClick={onOpenSafety}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span className="hidden sm:inline">Safety Center</span>
          </button>
        </div>
      </div>

      {/* Children Tabs / Switcher Cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Select Child Profile:
          </h2>
          <button
            onClick={onOpenAddChild}
            className="text-xs font-bold text-blue-600 hover:text-blue-900 flex items-center gap-1 cursor-pointer"
            id="add-child-btn"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Child</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {childrenList.map((child) => {
            const isSelected = child.id === activeChild?.id;
            return (
              <div
                key={child.id}
                onClick={() => onSelectChild(child.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-white border-blue-600 shadow-md ring-2 ring-blue-600/10'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={child.avatar}
                      alt={child.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                    />
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{child.name}</h3>
                      <p className="text-xs text-slate-500 font-medium">
                        Age {child.age} • {child.grade}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded ${
                      isSelected ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {isSelected ? 'Active' : 'Switch'}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700">Learning progress</span>
                    <span className="font-bold text-blue-600">{child.overallProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-500"
                      style={{ width: `${child.overallProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}

          {/* Quick Add Child Card */}
          <button
            onClick={onOpenAddChild}
            className="p-5 rounded-2xl border-2 border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 transition-all flex flex-col items-center justify-center text-center group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center text-slate-500 group-hover:text-blue-600 mb-2 transition-colors">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-700 group-hover:text-blue-900">Add Another Child</span>
            <span className="text-[11px] text-slate-400 mt-0.5">Customize age, grade & subjects</span>
          </button>
        </div>
      </div>

      {/* ACTIVE CHILD DETAILED PROGRESS & RECOMMENDATIONS */}
      {activeChild && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left 8 Cols: Subject Progress & Strengths/Gaps */}
          <div className="lg:col-span-8 space-y-6">
            {/* Subject Mastery Progress Bars */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    {activeChild.name}'s Subject Progress
                  </h2>
                  <p className="text-xs text-slate-500">
                    Strengthening skills through supportive peer and teacher sessions.
                  </p>
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  {activeChild.grade} Curriculum
                </span>
              </div>

              <div className="space-y-4">
                {activeChild.subjects.map((sub) => (
                  <div key={sub.subject} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-800">{sub.subject}</span>
                        <span className="text-[11px] px-2 py-0.2 bg-white text-slate-600 rounded border border-slate-200 font-semibold">
                          {sub.level} Level
                        </span>
                      </div>
                      <span className="text-xs font-bold text-slate-900">
                        {sub.progressPercent}%
                      </span>
                    </div>

                    {/* Progress visual */}
                    <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          sub.subject === 'Mathematics'
                            ? 'bg-blue-600'
                            : sub.subject === 'English'
                            ? 'bg-amber-500'
                            : 'bg-emerald-600'
                        }`}
                        style={{ width: `${sub.progressPercent}%` }}
                      />
                    </div>

                    {/* Positive Gap tags */}
                    <div className="mt-3 flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-200/60 text-xs">
                      <span className="text-[11px] font-semibold text-slate-500">Focus Areas:</span>
                      {sub.gaps.map((gap, i) => (
                        <span
                          key={i}
                          className={`text-[11px] px-2 py-0.5 rounded-md font-medium ${
                            gap.status === 'Strong'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : gap.status === 'Developing'
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : 'bg-blue-50 text-blue-800 border border-blue-200'
                          }`}
                        >
                          {gap.skill}: {gap.status === 'Needs practice' ? 'Let\'s strengthen' : gap.status}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended for Child & Action Box */}
            <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white rounded-2xl p-6 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-blue-200">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Recommended for {activeChild.name}</span>
                  </div>
                  <h3 className="text-xl font-extrabold tracking-tight">
                    Math — Fractions & Equal Parts
                  </h3>
                  <p className="text-xs text-blue-100 max-w-lg leading-relaxed">
                    Diagnostic indicates 3 fun interactive sessions will strengthen visual pizza/strip model comprehension without pressure.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
                  <button
                    onClick={() => onNavigate('child-learn')}
                    className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-bold transition-colors cursor-pointer shadow-xs text-center"
                    id="continue-learning-btn"
                  >
                    Continue Learning →
                  </button>
                  <button
                    onClick={() => onNavigate('tutors')}
                    className="px-3.5 py-2.5 rounded-xl bg-blue-600/80 hover:bg-blue-600 border border-blue-600 text-white text-xs font-semibold transition-colors cursor-pointer text-center"
                  >
                    Find Verified Mentor
                  </button>
                </div>
              </div>
            </div>

            {/* Active Enrolled Safe Sessions */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Video className="w-4 h-4 text-blue-600" />
                  <span>{activeChild.name}'s Enrolled Mentors & Teachers</span>
                </h2>
                <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Parent-Authorized
                </span>
              </div>

              {enrollments.length > 0 ? (
                <div className="space-y-3">
                  {enrollments.map((enr) => (
                    <div
                      key={enr.id}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-sm">
                          {enr.tutorName[0]}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-slate-900">{enr.tutorName}</span>
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 uppercase">
                              {enr.tutorRole === 'mentor' ? 'Verified Peer Mentor' : 'Verified Teacher'}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">
                            {enr.subject} • {enr.price}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 text-xs border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
                        <div className="text-slate-600 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-blue-600" />
                          <span className="font-medium">{enr.schedule}</span>
                        </div>
                        <button
                          onClick={() => onNavigate('child-learn')}
                          className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-800 text-white font-semibold cursor-pointer"
                        >
                          Join Safe Session
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-xl">
                  <p className="text-xs text-slate-500">No active tutor enrollments yet.</p>
                  <button
                    onClick={() => onNavigate('tutors')}
                    className="mt-2 text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                  >
                    Find a free peer mentor for {activeChild.name}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right 4 Cols: AI Assistant Card & Quick Tools */}
          <div className="lg:col-span-4 space-y-6">
            {/* StudyBuddy AI Parent Co-Pilot Card */}
            <div className="bg-gradient-to-b from-amber-50/70 to-white rounded-2xl border border-amber-200 p-6 shadow-2xs">
              <div className="flex items-center gap-2.5 text-amber-900 font-bold text-base mb-1">
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span>StudyBuddy AI</span>
              </div>
              <p className="text-xs text-slate-600 mt-1 mb-4 leading-relaxed">
                "Need help explaining homework?" Ask your AI co-pilot for pizza analogies, 10-minute games, and words of encouragement.
              </p>

              <div className="space-y-2 mb-4">
                <button
                  onClick={() => onNavigate('studybuddy')}
                  className="w-full text-left p-2.5 rounded-xl bg-white border border-amber-200/80 hover:border-amber-300 text-xs text-slate-700 font-medium transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span>"How to explain fractions to a 9yo?"</span>
                  <ChevronRight className="w-3.5 h-3.5 text-amber-500" />
                </button>
                <button
                  onClick={() => onNavigate('studybuddy')}
                  className="w-full text-left p-2.5 rounded-xl bg-white border border-amber-200/80 hover:border-amber-300 text-xs text-slate-700 font-medium transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span>"10-min times table activity"</span>
                  <ChevronRight className="w-3.5 h-3.5 text-amber-500" />
                </button>
              </div>

              <button
                onClick={() => onNavigate('studybuddy')}
                className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                id="ask-studybuddy-btn"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ask StudyBuddy AI</span>
              </button>
            </div>

            {/* Quick Diagnostic Checker Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  📊
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Learning Diagnostic</h3>
                  <p className="text-[11px] text-slate-500">Fast 5-question check</p>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-slate-700">
                  <span>Number Sense</span>
                  <span className="text-emerald-700 font-bold">Strong ✓</span>
                </div>
                <div className="flex items-center justify-between text-slate-700">
                  <span>Multiplication</span>
                  <span className="text-amber-700 font-bold">Developing</span>
                </div>
                <div className="flex items-center justify-between text-slate-700">
                  <span>Fractions</span>
                  <span className="text-blue-600 font-bold">Needs practice</span>
                </div>
                <div className="flex items-center justify-between text-slate-700">
                  <span>Word problems</span>
                  <span className="text-blue-600 font-bold">Needs practice</span>
                </div>
              </div>

              <button
                onClick={onOpenDiagnostic}
                className="w-full py-2.5 rounded-xl border border-slate-300 text-slate-800 hover:bg-slate-50 font-semibold text-xs transition-colors cursor-pointer"
              >
                Retake Math Assessment
              </button>
            </div>

            {/* Safety & Monitoring Notice */}
            <div className="bg-blue-50/50 rounded-2xl border border-blue-200/80 p-4 text-xs text-blue-900 space-y-2">
              <div className="flex items-center gap-2 font-bold text-blue-800">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Parent Safety Controls Active</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Children cannot independently message or book tutors. All peer interactions are logged and visible in your portal.
              </p>
              <button
                onClick={onOpenSafety}
                className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
              >
                Review safety settings →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
