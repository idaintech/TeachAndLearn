import React, { useState } from 'react';
import { ShieldCheck, Sparkles, Award, User, ChevronDown, BookOpen, Search, Menu, X, Users, GraduationCap } from 'lucide-react';
import { UserRole } from '../types';

interface NavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  activeView: string;
  onNavigate: (view: string) => void;
  onOpenSafety: () => void;
  onOpenPricing: () => void;
  onOpenAuth: (defaultRole?: UserRole) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleChange,
  activeView,
  onNavigate,
  onOpenSafety,
  onOpenPricing,
  onOpenAuth,
}) => {
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const roleLabels: Record<UserRole, { title: string; badge: string; icon: string }> = {
    parent: { title: 'Parent Account (Umida)', badge: 'Primary Guardian', icon: '👨‍👩‍👧' },
    mentor: { title: 'Peer Mentor (Ali)', badge: 'Verified Mentor', icon: '🎓' },
    teacher: { title: 'Teacher (Madina)', badge: 'Verified Teacher', icon: '👩‍🏫' },
    guest: { title: 'Visitor / Explorer', badge: 'Public Preview', icon: '🌐' },
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top micro-banner highlighting platform safety commitment */}
      <div className="bg-slate-900 text-blue-100 text-xs py-1.5 px-4 border-b border-blue-950">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-900 text-blue-200 uppercase tracking-wide">
              Family-First
            </span>
            <span className="hidden sm:inline">Only parents can enroll children. Verified peer mentors & teachers teach in a secure, monitored environment.</span>
            <span className="sm:hidden">Safe educational ecosystem for children.</span>
          </div>
          <button
            onClick={onOpenSafety}
            className="flex items-center gap-1 font-semibold text-blue-200 hover:text-white transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Safety Center</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => onNavigate('landing')}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
              id="brand-logo-btn"
            >
              {/* Teach&Learn Emblem Logo */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:from-blue-700 group-hover:to-indigo-800 transition-all">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black tracking-tight font-display text-slate-900">
                    Teach<span className="text-blue-600">&</span>Learn
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded">
                    Safe EdTech
                  </span>
                </div>
                <p className="text-[11px] font-medium text-slate-500 tracking-wide">Teach. Learn. Grow.</p>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600">
              <button
                onClick={() => onNavigate('landing')}
                className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                  activeView === 'landing' ? 'text-blue-800 bg-blue-50 font-semibold' : 'hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Overview
              </button>

              <button
                onClick={() => onNavigate('parent-dashboard')}
                className={`px-3 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeView === 'parent-dashboard' ? 'text-blue-800 bg-blue-50 font-semibold' : 'hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span>Parent Portal</span>
              </button>

              <button
                onClick={() => onNavigate('tutors')}
                className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                  activeView === 'tutors' ? 'text-blue-800 bg-blue-50 font-semibold' : 'hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Find Tutors & Mentors
              </button>

              <button
                onClick={() => onNavigate('studybuddy')}
                className={`px-3 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeView === 'studybuddy' ? 'text-blue-800 bg-blue-50 font-semibold' : 'hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>StudyBuddy AI</span>
              </button>

              <button
                onClick={() => onNavigate('mentor-dashboard')}
                className={`px-3 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeView === 'mentor-dashboard' ? 'text-blue-800 bg-blue-50 font-semibold' : 'hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Award className="w-3.5 h-3.5 text-blue-600" />
                <span>Peer Mentors</span>
              </button>

              <button
                onClick={onOpenPricing}
                className="px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Pro Plan
              </button>
            </nav>
          </div>

          {/* Right Action Area */}
          <div className="flex items-center gap-3">
            {/* Quick Interactive Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-2 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors text-slate-700 cursor-pointer shadow-xs"
                title="Switch role perspective for demo"
                id="role-switcher-btn"
              >
                <span>{roleLabels[currentRole].icon}</span>
                <span className="hidden lg:inline">{roleLabels[currentRole].title.split(' ')[0]}</span>
                <span className="text-[10px] font-medium text-slate-500 hidden sm:inline">({roleLabels[currentRole].badge})</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {roleDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 rounded-xl bg-white border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onClick={() => setRoleDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Switch Demo Perspective
                  </div>

                  <button
                    onClick={() => { onRoleChange('parent'); onNavigate('parent-dashboard'); }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-blue-50 transition-colors cursor-pointer ${
                      currentRole === 'parent' ? 'bg-blue-50/70 font-semibold text-blue-900' : 'text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>👨‍👩‍👧</span>
                      <div>
                        <div className="font-semibold">Parent View (Umida)</div>
                        <div className="text-[10px] text-slate-500">Aisha & Sardor, Diagnostics & Enrolling</div>
                      </div>
                    </div>
                    {currentRole === 'parent' && <span className="text-blue-600 font-bold">✓</span>}
                  </button>

                  <button
                    onClick={() => { onRoleChange('mentor'); onNavigate('mentor-dashboard'); }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-blue-50 transition-colors cursor-pointer ${
                      currentRole === 'mentor' ? 'bg-blue-50/70 font-semibold text-blue-900' : 'text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>🎓</span>
                      <div>
                        <div className="font-semibold">Peer Mentor (Ali Karimov)</div>
                        <div className="text-[10px] text-slate-500">27.5h Volunteer Hours & Rewards</div>
                      </div>
                    </div>
                    {currentRole === 'mentor' && <span className="text-blue-600 font-bold">✓</span>}
                  </button>

                  <button
                    onClick={() => { onRoleChange('teacher'); onNavigate('tutors'); }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-blue-50 transition-colors cursor-pointer ${
                      currentRole === 'teacher' ? 'bg-blue-50/70 font-semibold text-blue-900' : 'text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>👩‍🏫</span>
                      <div>
                        <div className="font-semibold">Teacher Profile (Madina S.)</div>
                        <div className="text-[10px] text-slate-500">Professional Paid Educator ($8/lesson)</div>
                      </div>
                    </div>
                    {currentRole === 'teacher' && <span className="text-blue-600 font-bold">✓</span>}
                  </button>

                  <button
                    onClick={() => { onRoleChange('guest'); onNavigate('landing'); }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-blue-50 transition-colors cursor-pointer ${
                      currentRole === 'guest' ? 'bg-blue-50/70 font-semibold text-blue-900' : 'text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>🌐</span>
                      <div>
                        <div className="font-semibold">Public Landing Page</div>
                        <div className="text-[10px] text-slate-500">New Family Presentation</div>
                      </div>
                    </div>
                    {currentRole === 'guest' && <span className="text-blue-600 font-bold">✓</span>}
                  </button>
                </div>
              )}
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => {
                if (currentRole === 'mentor') {
                  onNavigate('mentor-dashboard');
                } else {
                  onNavigate('parent-dashboard');
                }
              }}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20 cursor-pointer"
              id="nav-primary-action-btn"
            >
              <span>{currentRole === 'mentor' ? 'Volunteer Center' : 'Parent Dashboard'}</span>
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2">
          <button
            onClick={() => { onNavigate('landing'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Overview
          </button>
          <button
            onClick={() => { onNavigate('parent-dashboard'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Parent Dashboard (Aisha & Sardor)
          </button>
          <button
            onClick={() => { onNavigate('child-learn'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Child Learning View (Pizza Fractions)
          </button>
          <button
            onClick={() => { onNavigate('tutors'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Find Verified Tutors & Mentors
          </button>
          <button
            onClick={() => { onNavigate('studybuddy'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-between"
          >
            <span>StudyBuddy AI (Parent Co-Pilot)</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </button>
          <button
            onClick={() => { onNavigate('mentor-dashboard'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-between"
          >
            <span>Peer Mentor Volunteer Dashboard</span>
            <Award className="w-4 h-4 text-blue-600" />
          </button>
          <button
            onClick={() => { onOpenSafety(); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-blue-700 hover:bg-blue-50 flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Safety Center & Safeguards</span>
          </button>
          <button
            onClick={() => { onOpenPricing(); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Pro Pricing ($5) & Volunteer Discounts
          </button>
        </div>
      )}
    </header>
  );
};
