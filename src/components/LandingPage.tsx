import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Award, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  HeartHandshake, 
  Search, 
  Lock, 
  Star, 
  GraduationCap, 
  Clock, 
  Smile, 
  Check, 
  Play,
  Lightbulb,
  ExternalLink
} from 'lucide-react';
import { TUTORS } from '../data/mockData';
import { UserRole } from '../types';

interface LandingPageProps {
  onNavigate: (view: string) => void;
  onRoleChange: (role: UserRole) => void;
  onOpenDiagnostic: () => void;
  onOpenSafety: () => void;
  onOpenPricing: () => void;
  onOpenAuth: (defaultRole?: UserRole) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onRoleChange,
  onOpenDiagnostic,
  onOpenSafety,
  onOpenPricing,
  onOpenAuth,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubjectTab, setActiveSubjectTab] = useState<'Mathematics' | 'English' | 'Programming'>('Mathematics');

  const sampleMentors = TUTORS.filter(t => t.role === 'mentor');
  const sampleTeachers = TUTORS.filter(t => t.role === 'teacher');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('tutors');
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA]">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-200/80 bg-gradient-to-b from-white via-blue-50/20 to-[#FBFBFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Parent-Controlled Child Safe Learning Network</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
                Every child deserves <br className="hidden sm:inline" />
                <span className="text-blue-600">the right help.</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Connect your child with verified teachers, supportive peer mentors, and an AI learning assistant — all in one safe learning platform.
              </p>

              {/* Core Ecosystem Tagline */}
              <div className="flex items-center justify-center lg:justify-start gap-4 text-sm font-bold text-slate-500 tracking-wider uppercase">
                <span className="text-blue-600 font-extrabold">Learn.</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span className="text-amber-600 font-extrabold">Help.</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span className="text-emerald-700 font-extrabold">Grow.</span>
              </div>

              {/* Primary Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => {
                    onRoleChange('parent');
                    onNavigate('parent-dashboard');
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-800 transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer"
                  id="hero-find-support-btn"
                >
                  <span>Find Learning Support</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    onRoleChange('mentor');
                    onNavigate('mentor-dashboard');
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 hover:border-slate-400 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  id="hero-become-mentor-btn"
                >
                  <Award className="w-4 h-4 text-blue-600" />
                  <span>Become a Peer Mentor</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-200/80 text-left">
                <div>
                  <div className="text-xl font-bold text-slate-900">100%</div>
                  <div className="text-xs text-slate-500 font-medium">Parent-Approved Enrolls</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-slate-900">Verified</div>
                  <div className="text-xs text-slate-500 font-medium">Peer & Teacher Badges</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-slate-900">Free</div>
                  <div className="text-xs text-slate-500 font-medium">Peer Mentoring Access</div>
                </div>
              </div>
            </div>

            {/* Right: Ecosystem Flow Visual Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-blue-900/5 p-6 relative">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      The Teach&Learn Safe Ecosystem
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    How it Connects
                  </span>
                </div>

                {/* Step Flow Nodes */}
                <div className="space-y-3 pt-4 relative">
                  {/* Step 1: Parent */}
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                      1
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span>Parent Account</span>
                        <span className="text-[10px] text-blue-600 font-semibold bg-blue-50 px-1.5 py-0.2 rounded">Primary Guardian</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Creates child profile (Aisha, Age 9), selects focus subject, and authorizes all bookings.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center text-slate-300">↓</div>

                  {/* Step 2: Learning Assessment */}
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50/60 border border-amber-200/60">
                    <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                      2
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span>Diagnostic Assessment</span>
                        <span className="text-[10px] text-amber-800 font-semibold bg-amber-100 px-1.5 py-0.2 rounded">No-Shame Gaps</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Identifies specific gap: "Fractions & Word Problems" with supportive recommendations.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center text-slate-300">↓</div>

                  {/* Step 3: Choice of 3 Support Pillars */}
                  <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-200/70">
                    <div className="text-xs font-bold text-slate-900 mb-2 flex items-center justify-between">
                      <span>3. Triple-Tier Educational Support</span>
                      <span className="text-[10px] text-slate-500 font-normal">Choose best fit</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                      <div className="p-2 rounded-lg bg-white border border-blue-100 shadow-2xs">
                        <div className="font-bold text-blue-800">StudyBuddy AI</div>
                        <div className="text-slate-500 mt-0.5">Parent Co-pilot</div>
                      </div>
                      <div className="p-2 rounded-lg bg-white border border-amber-200 shadow-2xs">
                        <div className="font-bold text-amber-800">Peer Mentor</div>
                        <div className="text-emerald-600 font-semibold mt-0.5">100% Free</div>
                      </div>
                      <div className="p-2 rounded-lg bg-white border border-slate-200 shadow-2xs">
                        <div className="font-bold text-slate-800">Pro Teacher</div>
                        <div className="text-slate-500 mt-0.5">From $8/lesson</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center text-slate-300">↓</div>

                  {/* Step 4: Child Progress */}
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/60">
                    <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-sm shrink-0">
                      4
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span>Child Progress & Confidence</span>
                        <span className="text-[10px] text-emerald-800 font-semibold bg-emerald-100 px-1.5 py-0.2 rounded">Child Grows</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Child masters fractions without stress. Later, can volunteer as a mentor for younger kids!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">Interactive live prototype</span>
                  <button
                    onClick={onOpenDiagnostic}
                    className="text-xs font-bold text-blue-600 hover:text-blue-900 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Try Sample Diagnostic</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK DISCOVERY SEARCH BAR */}
      <section className="max-w-5xl mx-auto px-4 -mt-8 relative z-20">
        <form
          onSubmit={handleSearchSubmit}
          className="bg-white rounded-2xl shadow-xl border border-slate-200 p-3 sm:p-4 flex flex-col sm:flex-row items-center gap-3"
        >
          <div className="flex items-center gap-3 w-full flex-1 px-2">
            <Search className="w-5 h-5 text-blue-600 shrink-0" />
            <input
              type="text"
              placeholder="What does your child need help with? (e.g., Math for Grade 4, Fractions, Reading...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                setSearchQuery('Fractions');
                onNavigate('tutors');
              }}
              className="hidden lg:inline-block px-2.5 py-1 text-xs rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
            >
              Fractions
            </button>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('Math for Grade 4');
                onNavigate('tutors');
              }}
              className="hidden lg:inline-block px-2.5 py-1 text-xs rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
            >
              Grade 4
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-800 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer shrink-0"
            >
              Search Support
            </button>
          </div>
        </form>
      </section>

      {/* 2. HOW IT WORKS (4 STEPS) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60">
            Simple 4-Step Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            How Teach&Learn Works for Families
          </h2>
          <p className="text-slate-600 mt-2 text-base">
            Every step is designed with parent transparency and child psychological safety at heart.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 transition-all shadow-2xs hover:shadow-md">
            <div className="text-2xl font-black text-blue-600 font-display mb-2">01</div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Create child profile</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Parents enter child age and school grade. Only the parent manages enrollment and privacy permissions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 transition-all shadow-2xs hover:shadow-md">
            <div className="text-2xl font-black text-amber-600 font-display mb-2">02</div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Discover learning needs</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Take a calm, stress-free diagnostic. Uncover specific skill gaps using shame-free language: "Let's strengthen this skill."
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 transition-all shadow-2xs hover:shadow-md">
            <div className="text-2xl font-black text-blue-600 font-display mb-2">03</div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Choose your support</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Opt for parent AI guidance, a verified student peer mentor (100% free), or a certified professional teacher.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 transition-all shadow-2xs hover:shadow-md">
            <div className="text-2xl font-black text-emerald-700 font-display mb-2">04</div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Track progress & grow</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Watch confidence blossom. Older students earn verified volunteer hours and can unlock Pro learning perks.
            </p>
          </div>
        </div>
      </section>

      {/* 3. SAFETY FIRST SECTION (DEDICATED CORE FEATURE) */}
      <section className="py-16 bg-gradient-to-b from-blue-900 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-800/80 border border-blue-600 text-blue-200 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Safety is our foundation
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3">
              Your child's safety comes first.
            </h2>
            <p className="text-slate-300 mt-2 text-sm sm:text-base">
              Teach&Learn was built to eliminate the risks of unvetted online tutors and unregulated child messaging.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xs">
              <div className="w-10 h-10 rounded-xl bg-blue-800/50 flex items-center justify-center text-emerald-400 mb-4">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold mb-2">Verified Educators</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Both peer mentors and professional teachers pass subject evaluations, teaching assessments, and safeguarding certification.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xs">
              <div className="w-10 h-10 rounded-xl bg-blue-800/50 flex items-center justify-center text-emerald-400 mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold mb-2">Parent-Controlled Enrollment</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Children cannot independently purchase lessons or communicate freely with unknown tutors. Every connection requires parent authorization.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xs">
              <div className="w-10 h-10 rounded-xl bg-blue-800/50 flex items-center justify-center text-emerald-400 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold mb-2">Safe Communication</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                All video and chat sessions are mediated through the platform with transparent parent visibility, transcripts, and session logs.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xs">
              <div className="w-10 h-10 rounded-xl bg-blue-800/50 flex items-center justify-center text-emerald-400 mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold mb-2">Reporting & Moderation</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                One-tap reporting, instant tutor blocking, and automated language moderation ensure age-appropriate, positive interactions.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <button
              onClick={onOpenSafety}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-600 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              <span>Learn more about our safety standards</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. PEER LEARNING & VOLUNTEER REWARDS SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Peer Mentoring Ecosystem
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Students can help <br />
              <span className="text-blue-600">students grow.</span>
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Older high school students with strong subject knowledge can apply to become verified peer mentors. They support younger learners for free under our safety framework—reinforcing their own mastery while giving back.
            </p>

            {/* Visual Value Loop */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                The Verified Mentor Journey:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/70">
                  <div className="font-bold text-amber-900 text-[11px]">1. Verified</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Assessed & trained</div>
                </div>
                <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200/70">
                  <div className="font-bold text-blue-900 text-[11px]">2. Free Help</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Teaches younger kids</div>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/70">
                  <div className="font-bold text-emerald-900 text-[11px]">3. Hours</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Verified logs</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900 text-[11px]">4. Rewards</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Badges & Pro perk</div>
                </div>
              </div>
            </div>

            {/* Volunteer Rewards Breakdown */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold text-slate-700">Platform Volunteer Rewards:</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span>10 hours → Mentor Badge</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span>25 hours → 20% Pro Discount</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span>50 hours → 1 Month Free Pro</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span>100 hours → 3 Months Free Pro</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 italic pt-1">
                *Platform rewards recognize genuine volunteering contribution. Certificates represent actual verified hours.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  onRoleChange('mentor');
                  onNavigate('mentor-dashboard');
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>View Peer Mentor Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sample Peer Mentor Card Preview */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 relative">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <img
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80"
                    alt="Ali Karimov"
                    className="w-14 h-14 rounded-xl object-cover border border-slate-200"
                  />
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Ali Karimov</h3>
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold mt-0.5">
                      <span>✓ VERIFIED PEER MENTOR</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-emerald-700">FREE</span>
                  <div className="text-[10px] text-slate-400">Peer Volunteering</div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-slate-50 p-2 rounded-lg">
                  <div className="font-bold text-slate-900">⭐ 4.85</div>
                  <div className="text-[10px] text-slate-500">28 Reviews</div>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg">
                  <div className="font-bold text-slate-900">14</div>
                  <div className="text-[10px] text-slate-500">Kids Helped</div>
                </div>
                <div className="bg-blue-50 p-2 rounded-lg text-blue-900">
                  <div className="font-bold">27.5 hrs</div>
                  <div className="text-[10px] text-blue-600">Volunteer Hours</div>
                </div>
              </div>

              <div className="mt-4 bg-amber-50/50 p-3 rounded-xl border border-amber-100 text-xs">
                <span className="font-bold text-slate-800">Why I mentor: </span>
                <span className="text-slate-600 italic">
                  "When I was in 3rd grade, fractions confused me until an older student explained them with chocolate bars. I want to pass that gift forward!"
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between pt-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Mathematics • Grades 3–6</span>
                </div>
                <button
                  onClick={() => onNavigate('tutors')}
                  className="text-xs font-bold text-blue-600 hover:text-blue-900 cursor-pointer"
                >
                  Browse all mentors →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. STRUCTURED LEARNING LEVELS SYSTEM */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Structured Progression
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
              Learn at Any Level — Without Shame
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Every subject features 5 progressive levels. If a Grade 6 child has Grade 3 gaps in fractions, our platform says:
              <strong className="text-blue-800"> "Let's strengthen this skill"</strong> instead of <span className="line-through text-slate-400">"You are behind"</span>.
            </p>

            {/* Subject Tabs */}
            <div className="inline-flex items-center gap-2 p-1.5 bg-white rounded-xl border border-slate-200 shadow-2xs mt-6">
              {(['Mathematics', 'English', 'Programming'] as const).map((subject) => (
                <button
                  key={subject}
                  onClick={() => setActiveSubjectTab(subject)}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                    activeSubjectTab === subject
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>

          {/* 5 Progression Steps Display */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {[
              {
                step: '1',
                level: 'Foundation',
                focus: activeSubjectTab === 'Mathematics' ? 'Visual Fractions, 3-Digit Place Values' : activeSubjectTab === 'English' ? 'Phonics, Sight Words & Reading Fluency' : 'Block Logic, Scratch Sequences',
                tone: 'Rebuilding core confidence with visual objects',
                bg: 'bg-white',
              },
              {
                step: '2',
                level: 'Beginner',
                focus: activeSubjectTab === 'Mathematics' ? 'Multiplication Arrays, Division, Word Problems' : activeSubjectTab === 'English' ? 'Sentence Structure, Compound Words' : 'Conditionals, Loops & Events',
                tone: 'Everyday scenario problem solving',
                bg: 'bg-white',
              },
              {
                step: '3',
                level: 'Intermediate',
                focus: activeSubjectTab === 'Mathematics' ? 'Pre-Algebra, Decimals, Ratios & Rates' : activeSubjectTab === 'English' ? 'Paragraph Structure, Creative Narratives' : 'Python Syntax, Variables & Functions',
                tone: 'Independent reasoning & critical thinking',
                bg: 'bg-white',
              },
              {
                step: '4',
                level: 'Advanced',
                focus: activeSubjectTab === 'Mathematics' ? 'Linear Equations, Geometry Proofs' : activeSubjectTab === 'English' ? 'Essay Writing, Analytical Synthesis' : 'Data Structures, Web Apps & APIs',
                tone: 'Analytical depth & Olympiad rigor',
                bg: 'bg-white',
              },
              {
                step: '5',
                level: 'Pro',
                focus: activeSubjectTab === 'Mathematics' ? 'Calculus Foundations, Math Competition' : activeSubjectTab === 'English' ? 'Debate, Persuasive Rhetoric & Public Voice' : 'Full-Stack Architecture, Algorithms',
                tone: 'Pre-university mastery & student peer tutoring',
                bg: 'bg-blue-50/50 border-blue-300',
              },
            ].map((item) => (
              <div key={item.level} className={`p-4 rounded-xl border border-slate-200 shadow-2xs ${item.bg}`}>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-blue-800">Level {item.step}</span>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Tier</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">{item.level}</h4>
                <p className="text-[11px] font-medium text-slate-700 leading-snug mb-2">{item.focus}</p>
                <div className="text-[10px] text-slate-500 italic border-t border-slate-100 pt-2">
                  {item.tone}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={onOpenDiagnostic}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-800 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs"
            >
              <Lightbulb className="w-4 h-4 text-amber-300" />
              <span>Take Diagnostic for Your Child (5 Mins)</span>
            </button>
          </div>
        </div>
      </section>

      {/* 6. AI PARENT CO-PILOT: STUDYBUDDY AI */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>AI Learning Co-Pilot for Parents</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Not sure how to help <br />
              <span className="text-amber-600">with homework?</span>
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              StudyBuddy AI doesn't replace educators. It is your family co-pilot—giving you simple explanations, 10-minute offline activities, and encouraging language to make homework joyful.
            </p>

            <div className="space-y-2.5 pt-1 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <Check className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Transforms confusing textbooks into pizza, toy, or snack analogies</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Check className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Provides positive phrases so parents never accidentally shame their child</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Check className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Quick prompts: "Explain for a 7-year-old", "Create 10-min activity", "Explain differently"</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('studybuddy')}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-800 text-white text-sm font-semibold transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Ask StudyBuddy AI Now</span>
              </button>
            </div>
          </div>

          {/* AI Chat Preview Card */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">StudyBuddy AI</div>
                    <div className="text-[10px] text-slate-500">Parent Co-Pilot</div>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded">
                  Online
                </span>
              </div>

              {/* Sample Dialog */}
              <div className="space-y-3 text-xs">
                {/* Parent Question */}
                <div className="flex items-start justify-end gap-2">
                  <div className="bg-blue-600 text-white p-3 rounded-2xl rounded-tr-xs max-w-[85%]">
                    <p className="font-medium">"My 9-year-old doesn't understand fractions. How can I explain them without getting frustrated?"</p>
                  </div>
                </div>

                {/* AI Structured Answer */}
                <div className="flex items-start gap-2">
                  <div className="bg-slate-50 border border-slate-200 text-slate-800 p-3.5 rounded-2xl rounded-tl-xs max-w-[95%] space-y-2">
                    <div>
                      <span className="font-bold text-blue-800">1. Simple Explanation:</span>
                      <p className="text-slate-600 mt-0.5">
                        Try explaining fractions using something familiar, such as a pizza! "A fraction just means fair shares. When we cut 1 whole pizza into 4 equal slices, each slice is 1/4."
                      </p>
                    </div>
                    <div>
                      <span className="font-bold text-blue-800">2. 10-Minute Activity:</span>
                      <p className="text-slate-600 mt-0.5">
                        Fold a paper napkin in half, then half again. Count the 4 equal squares together!
                      </p>
                    </div>
                    <div className="border-t border-slate-200/80 pt-1.5 text-[11px] text-amber-800 font-medium bg-amber-50/60 p-2 rounded-lg">
                      ❤️ Encouraging word to say: "Fractions can be tricky at first, but your brain is growing every time you fold and share!"
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Free basic assistance included</span>
                <button
                  onClick={() => onNavigate('studybuddy')}
                  className="font-bold text-blue-600 hover:text-blue-900 cursor-pointer"
                >
                  Try interactive chat →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PROFESSIONAL TEACHERS PREVIEW */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Certified Educators
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
                Verified Professional Teachers
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                For advanced acceleration, Olympiads, and intensive curriculum support.
              </p>
            </div>
            <button
              onClick={() => onNavigate('tutors')}
              className="mt-4 sm:mt-0 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-900 flex items-center gap-1 cursor-pointer"
            >
              <span>View all tutors & teachers</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sampleTeachers.slice(0, 3).map((teacher) => (
              <div key={teacher.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={teacher.avatar}
                        alt={teacher.name}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                      />
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">{teacher.name}</h3>
                        <span className="inline-flex items-center text-[10px] font-bold text-blue-800 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                          VERIFIED TEACHER ✓
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-slate-900 text-sm">{teacher.priceLabel}</div>
                      <div className="text-[10px] text-slate-400">1-on-1</div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-3 line-clamp-2">
                    {teacher.bio}
                  </p>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-center text-[11px] bg-slate-50 p-2 rounded-xl">
                    <div>
                      <span className="font-bold text-slate-800">⭐ {teacher.rating}</span>
                      <span className="text-slate-400 ml-1">({teacher.reviewsCount})</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-800">{teacher.studentsHelped}</span>
                      <span className="text-slate-400 ml-1">Students</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">{teacher.subjects.join(', ')}</span>
                  <button
                    onClick={() => onNavigate('tutors')}
                    className="text-xs font-bold text-blue-600 hover:text-blue-900 cursor-pointer"
                  >
                    View profile →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PRICING & PRO PLAN PREVIEW ("Help others. Unlock Pro.") */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Affordable for Every Family. Free with Mentorship.
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Student mentors can unlock full Pro discounts through verified volunteer contribution.
            <strong className="text-blue-800"> "Help others. Unlock Pro."</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* FREE PLAN */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Community Free</h3>
                <span className="text-xs font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md">Always Free</span>
              </div>
              <div className="mt-4">
                <span className="text-4xl font-extrabold text-slate-900">$0</span>
                <span className="text-xs text-slate-500 ml-1">/ month</span>
              </div>
              <p className="text-xs text-slate-600 mt-2">
                Essential safe learning for every child and access to generous volunteer peer mentors.
              </p>

              <ul className="mt-6 space-y-3 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Basic StudyBuddy AI assistance for parents</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Access to verified peer mentors (100% Free lessons)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Basic diagnostic assessments & learning gaps</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Full Safety Center, report & block protections</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <button
                onClick={() => {
                  onRoleChange('parent');
                  onNavigate('parent-dashboard');
                }}
                className="w-full py-3 rounded-xl border border-slate-300 text-slate-800 font-semibold hover:bg-slate-50 transition-colors text-xs sm:text-sm cursor-pointer"
              >
                Get Started Free
              </button>
            </div>
          </div>

          {/* PRO PLAN */}
          <div className="bg-white rounded-2xl border-2 border-blue-600 p-8 shadow-lg relative flex flex-col justify-between">
            <div className="absolute -top-3 right-6 bg-blue-600 text-white text-[10px] font-extrabold uppercase px-3 py-0.5 rounded-full tracking-wide">
              Most Comprehensive
            </div>

            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Teach&Learn Pro</h3>
                <span className="text-xs font-bold px-2 py-0.5 bg-amber-100 text-amber-900 rounded-md">Unlockable with Volunteer Hours</span>
              </div>
              <div className="mt-4">
                <span className="text-4xl font-extrabold text-slate-900">$5</span>
                <span className="text-xs text-slate-500 ml-1">/ month or 0h with volunteering</span>
              </div>
              <p className="text-xs text-slate-600 mt-2">
                Deep personalized diagnostics, unlimited AI homework co-pilot, and structured courses.
              </p>

              <ul className="mt-6 space-y-3 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span><strong>Advanced StudyBuddy AI</strong> with infinite step-by-step guides</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Full structured course library (Foundation → Pro)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Deep diagnostic gap analytics & printable milestone charts</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Priority matching with senior verified peer mentors</span>
                </li>
                <li className="flex items-center gap-2 font-medium text-amber-800">
                  <Award className="w-4 h-4 text-amber-600 shrink-0" />
                  <span><strong>Mentors unlock Pro free:</strong> 50 hrs = 1 month free</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <button
                onClick={onOpenPricing}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-800 text-white font-semibold transition-colors text-xs sm:text-sm cursor-pointer shadow-xs"
              >
                View Pro Details & Discounts
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. BOTTOM CALL TO ACTION */}
      <section className="py-20 bg-blue-800 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Safe learning for every child. Real contribution for every student.
          </h2>
          <p className="mt-3 text-blue-100 text-sm sm:text-base max-w-xl mx-auto">
            Join thousands of parents and verified mentors creating an educational community where everyone grows.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                onRoleChange('parent');
                onNavigate('parent-dashboard');
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-blue-900 font-bold hover:bg-blue-50 transition-colors shadow-md cursor-pointer"
            >
              Find Learning Support
            </button>
            <button
              onClick={() => {
                onRoleChange('mentor');
                onNavigate('mentor-dashboard');
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-900/60 border border-blue-600 text-white font-bold hover:bg-blue-900 transition-colors cursor-pointer"
            >
              Become a Peer Mentor
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-blue-200">
            <span>✓ No credit card for free mentors</span>
            <span>✓ Verified platform</span>
            <span>✓ Parent-approved enrollment</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 text-xs py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs">
                  <GraduationCap className="w-4 h-4 text-white" />
                </div>
                <span className="font-extrabold tracking-tight">Teach<span className="text-blue-400">&</span>Learn</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Teach. Learn. Grow. Safe educational support connecting parents, verified peer mentors, and teachers.
              </p>
            </div>

            <div>
              <div className="font-semibold text-white mb-2">Safety & Policy</div>
              <ul className="space-y-1.5 text-[11px]">
                <li><button onClick={onOpenSafety} className="hover:text-white cursor-pointer">Safety Center</button></li>
                <li><button onClick={onOpenSafety} className="hover:text-white cursor-pointer">Parent-Controlled Enrollment</button></li>
                <li><button onClick={onOpenSafety} className="hover:text-white cursor-pointer">Safeguarding Protocols</button></li>
                <li><button onClick={onOpenSafety} className="hover:text-white cursor-pointer">Report an Issue</button></li>
              </ul>
            </div>

            <div>
              <div className="font-semibold text-white mb-2">Platform Roles</div>
              <ul className="space-y-1.5 text-[11px]">
                <li><button onClick={() => { onRoleChange('parent'); onNavigate('parent-dashboard'); }} className="hover:text-white cursor-pointer">Parents Dashboard</button></li>
                <li><button onClick={() => { onRoleChange('mentor'); onNavigate('mentor-dashboard'); }} className="hover:text-white cursor-pointer">Verified Peer Mentors</button></li>
                <li><button onClick={() => onNavigate('tutors')} className="hover:text-white cursor-pointer">Professional Teachers</button></li>
                <li><button onClick={() => onNavigate('studybuddy')} className="hover:text-white cursor-pointer">StudyBuddy AI</button></li>
              </ul>
            </div>

            <div>
              <div className="font-semibold text-white mb-2">Ethical Standards</div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Children are learners, not customers. Volunteer certificates record actual verified hours and do not claim university admission guarantees.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-900 text-center text-slate-600 text-[11px]">
            © 2026 Teach&Learn Educational Platform. Hackathon Edition.
          </div>
        </div>
      </footer>
    </div>
  );
};
