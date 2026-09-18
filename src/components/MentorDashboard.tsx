import React, { useState } from 'react';
import { 
  Award, 
  Clock, 
  Users, 
  Star, 
  CheckCircle2, 
  ShieldCheck, 
  Download, 
  Calendar, 
  Video, 
  Sparkles, 
  Lock, 
  FileText, 
  Printer, 
  ExternalLink 
} from 'lucide-react';
import { ALI_VOLUNTEER_RECORD } from '../data/mockData';
import { VolunteerCertificateModal } from './VolunteerCertificateModal';

export const MentorDashboard: React.FC = () => {
  const [record, setRecord] = useState(ALI_VOLUNTEER_RECORD);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Mentor Header Profile */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={record.mentorAvatar}
            alt={record.mentorName}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-200 shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                {record.mentorName}
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Peer Mentor</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {record.grade} • Subject: Mathematics • Member since {record.memberSince}
            </p>
            <div className="flex items-center gap-3 mt-2 text-xs text-slate-600">
              <span className="font-semibold text-emerald-700">✓ Free Volunteering Status Active</span>
              <span>•</span>
              <span>School: Tashkent Specialized Lyceum #1</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => setIsCertificateOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-800 text-white text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            id="view-certificate-btn"
          >
            <FileText className="w-4 h-4 text-blue-200" />
            <span>View Verified Volunteer Certificate</span>
          </button>
        </div>
      </div>

      {/* 4 Big Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-medium">Total Volunteer Hours</span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-extrabold text-blue-800 font-display">
            {record.totalHours} <span className="text-sm font-normal text-slate-500">hrs</span>
          </div>
          <div className="text-[11px] text-emerald-700 font-medium mt-1">
            ✓ 100% Platform Verified
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-medium">Younger Students Helped</span>
            <Users className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-display">
            {record.studentsHelped} <span className="text-sm font-normal text-slate-500">kids</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Grades 3 through 6
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-medium">Completed Sessions</span>
            <Video className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-display">
            {record.completedSessions}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Recorded in safe classroom
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-medium">Average Learner Rating</span>
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-display">
            {record.rating} <span className="text-sm font-normal text-slate-500">/ 5.0</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            From 28 parent reviews
          </div>
        </div>
      </div>

      {/* Main Grid: Reward Progression & Upcoming Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 Cols: Platform Volunteer Rewards Progression */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-2xs space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                  Teach → Contribute → Unlock
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 font-display mt-2">
                  Volunteer Reward Milestones
                </h2>
              </div>
              <span className="text-xs font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-xl border border-blue-200">
                27.5 / 50 hrs to next perk
              </span>
            </div>

            {/* Current Active Progress Bar to 50 hrs */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">
                  Progress towards 1 Month Free Teach&Learn Pro (50 hrs)
                </span>
                <span className="font-extrabold text-blue-800">55%</span>
              </div>
              <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: '55%' }}
                />
              </div>
              <div className="text-[11px] text-slate-500 flex items-center justify-between">
                <span>Current: 27.5 hours</span>
                <span>Remaining: 22.5 hours</span>
              </div>
            </div>

            {/* Exact Tier List from Prompt */}
            <div className="space-y-3">
              {record.rewards.map((tier) => (
                <div
                  key={tier.tier}
                  className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                    tier.status === 'unlocked'
                      ? 'bg-emerald-50/60 border-emerald-200'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                        tier.status === 'unlocked'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {tier.status === 'unlocked' ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <Lock className="w-4 h-4" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">{tier.title}</span>
                        <span className="text-[11px] text-slate-500">({tier.hoursRequired} hrs)</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">{tier.description}</p>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-lg shrink-0 ${
                      tier.status === 'unlocked'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {tier.status === 'unlocked' ? 'UNLOCKED ✓' : 'LOCKED'}
                  </span>
                </div>
              ))}
            </div>

            {/* Ethical note */}
            <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-2xl text-[11px] text-amber-900 leading-relaxed">
              <strong>Platform Commitment:</strong> Rewards recognize genuine educational service. We do not sell false guarantees; volunteer hours reflect verified time spent teaching younger peers.
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Upcoming Sessions & Safety Guidelines */}
        <div className="lg:col-span-5 space-y-6">
          {/* Upcoming Mentoring Sessions */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>Upcoming Mentoring Sessions</span>
              </h3>
              <span className="text-xs text-blue-800 font-semibold bg-blue-50 px-2 py-0.5 rounded">
                1 Scheduled
              </span>
            </div>

            {record.upcomingSessions.map((session) => (
              <div
                key={session.id}
                className="p-4 rounded-2xl bg-blue-50/40 border border-blue-200 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{session.studentName}</h4>
                    <p className="text-xs text-slate-500">{session.studentGrade}</p>
                  </div>
                  <span className="text-[11px] font-bold text-blue-800 bg-white px-2 py-0.5 rounded border border-blue-200">
                    {session.subject}
                  </span>
                </div>

                <div className="text-xs text-slate-600 space-y-1 pt-2 border-t border-blue-100">
                  <div className="font-medium text-slate-800">
                    Topic: {session.topic}
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span>{session.date} • {session.duration}</span>
                  </div>
                </div>

                <button
                  onClick={() => alert("Launching safe classroom for Ali & Aisha session. Umida (parent) has been notified!")}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Join Safe Classroom</span>
                </button>
              </div>
            ))}
          </div>

          {/* Peer Mentor Safety Rules Card */}
          <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-3 text-xs">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Peer Mentor Safeguarding Rules</span>
            </div>
            <ul className="space-y-2 text-slate-600 text-[11px]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                <span>All video sessions are hosted exclusively on the Teach&Learn portal.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                <span>No sharing of private personal phone numbers or off-platform social handles.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                <span>Always use patient, encouraging language: "Let's figure this out together."</span>
              </li>
            </ul>

            <button
              onClick={() => setIsCertificateOpen(true)}
              className="w-full mt-2 py-2 border border-slate-300 hover:bg-white text-slate-800 font-semibold rounded-xl transition-colors cursor-pointer text-center block"
            >
              Print / Save Certificate Record
            </button>
          </div>
        </div>
      </div>

      {/* Volunteer Certificate Modal */}
      <VolunteerCertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        record={record}
      />
    </div>
  );
};
