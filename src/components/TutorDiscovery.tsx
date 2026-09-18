import React, { useState } from 'react';
import { Search, Filter, ShieldCheck, Star, Users, Clock, Award, CheckCircle2, ChevronRight } from 'lucide-react';
import { TUTORS } from '../data/mockData';
import { Tutor, SubjectName } from '../types';

interface TutorDiscoveryProps {
  onSelectTutor: (tutor: Tutor) => void;
  initialSubject?: string;
  initialRoleFilter?: 'all' | 'mentor' | 'teacher';
}

export const TutorDiscovery: React.FC<TutorDiscoveryProps> = ({
  onSelectTutor,
  initialSubject,
  initialRoleFilter = 'all',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>(initialSubject || 'all');
  const [selectedRole, setSelectedRole] = useState<'all' | 'mentor' | 'teacher'>(initialRoleFilter);
  const [selectedPricing, setSelectedPricing] = useState<'all' | 'free' | 'paid'>('all');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');

  const filteredTutors = TUTORS.filter((tutor) => {
    // Search query filter
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchName = tutor.name.toLowerCase().includes(q);
      const matchSub = tutor.subjects.some(s => s.toLowerCase().includes(q));
      const matchBio = tutor.bio.toLowerCase().includes(q);
      if (!matchName && !matchSub && !matchBio) return false;
    }

    // Subject filter
    if (selectedSubject !== 'all') {
      if (!tutor.subjects.includes(selectedSubject as SubjectName)) return false;
    }

    // Role filter (Mentor vs Teacher)
    if (selectedRole !== 'all') {
      if (tutor.role !== selectedRole) return false;
    }

    // Pricing filter
    if (selectedPricing === 'free' && tutor.price !== 'FREE') return false;
    if (selectedPricing === 'paid' && tutor.price === 'FREE') return false;

    // Grade filter
    if (selectedGrade !== 'all') {
      if (!tutor.grades.includes(selectedGrade)) return false;
    }

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              Find Verified Mentors & Teachers
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse verified peer mentors (100% Free) and professional teachers. Only parents can authorize enrollments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>Verified Peer Mentors = 100% Free</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-900 border border-blue-200 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Identity & Safeguard Checked</span>
          </span>
        </div>
      </div>

      {/* Filter Control Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by tutor name, subject, or specialty (e.g., Amina, Fractions, Python)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-600"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Subject Select */}
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white text-slate-700 focus:outline-none focus:border-blue-600"
            >
              <option value="all">All Subjects</option>
              <option value="Mathematics">Mathematics</option>
              <option value="English">English</option>
              <option value="Programming">Programming</option>
              <option value="Science">Science</option>
            </select>

            {/* Role Filter */}
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as any)}
              className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white text-slate-700 focus:outline-none focus:border-blue-600"
            >
              <option value="all">All Educators</option>
              <option value="mentor">Verified Peer Mentors (Free)</option>
              <option value="teacher">Verified Teachers (Professional)</option>
            </select>

            {/* Price Filter */}
            <select
              value={selectedPricing}
              onChange={(e) => setSelectedPricing(e.target.value as any)}
              className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white text-slate-700 focus:outline-none focus:border-blue-600"
            >
              <option value="all">Any Pricing</option>
              <option value="free">FREE Only (Mentors)</option>
              <option value="paid">Paid Lessons (Teachers)</option>
            </select>

            {/* Grade Filter */}
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white text-slate-700 focus:outline-none focus:border-blue-600"
            >
              <option value="all">All Grade Levels</option>
              <option value="3">Grade 3</option>
              <option value="4">Grade 4</option>
              <option value="5">Grade 5</option>
              <option value="6">Grade 6</option>
            </select>
          </div>
        </div>

        {/* Filter Quick Pills */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <div>
            Showing <strong className="text-slate-800">{filteredTutors.length}</strong> verified educators
          </div>
          {(searchTerm || selectedSubject !== 'all' || selectedRole !== 'all' || selectedPricing !== 'all' || selectedGrade !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedSubject('all');
                setSelectedRole('all');
                setSelectedPricing('all');
                setSelectedGrade('all');
              }}
              className="text-blue-600 hover:underline font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Tutor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTutors.map((tutor) => {
          const isPeerMentor = tutor.role === 'mentor';
          return (
            <div
              key={tutor.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header with Photo, Name & Badge */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={tutor.avatar}
                      alt={tutor.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shrink-0"
                    />
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{tutor.name}</h3>
                      <div
                        className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-md mt-0.5 tracking-wide uppercase ${
                          isPeerMentor
                            ? 'bg-amber-50 text-amber-900 border border-amber-200'
                            : 'bg-blue-50 text-blue-900 border border-blue-200'
                        }`}
                      >
                        <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>{tutor.badgeTitle}</span>
                      </div>
                    </div>
                  </div>

                  {/* Price display */}
                  <div className="text-right shrink-0">
                    <span
                      className={`text-base font-black ${
                        isPeerMentor ? 'text-emerald-700' : 'text-slate-900'
                      }`}
                    >
                      {tutor.priceLabel}
                    </span>
                    <div className="text-[10px] text-slate-400">
                      {isPeerMentor ? 'Peer Volunteering' : '1-on-1 Lesson'}
                    </div>
                  </div>
                </div>

                {/* Subjects & Grade Band */}
                <div className="mt-4 flex flex-wrap items-center gap-1.5 text-xs">
                  <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                    {tutor.subjects.join(', ')}
                  </span>
                  <span className="text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                    {tutor.grades}
                  </span>
                  <span className="text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                    {tutor.levels}
                  </span>
                </div>

                {/* Bio */}
                <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                  {tutor.bio}
                </p>

                {/* Key Metrics: Rating, Students, Hours */}
                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                  <div>
                    <div className="font-bold text-slate-900 flex items-center justify-center gap-1">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span>{tutor.rating}</span>
                    </div>
                    <div className="text-[10px] text-slate-400">({tutor.reviewsCount})</div>
                  </div>

                  <div>
                    <div className="font-bold text-slate-900">{tutor.studentsHelped}</div>
                    <div className="text-[10px] text-slate-400">Kids Helped</div>
                  </div>

                  <div>
                    <div className="font-bold text-blue-800">
                      {isPeerMentor ? `${tutor.volunteerHours} hrs` : tutor.experience.split(' ')[0]}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {isPeerMentor ? 'Volunteered' : 'Experience'}
                    </div>
                  </div>
                </div>

                {/* Availability Preview */}
                <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{tutor.availability[0]}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {isPeerMentor ? 'Free peer mentoring' : 'Professional lesson'}
                </span>
                <button
                  onClick={() => onSelectTutor(tutor)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-2xs ${
                    isPeerMentor
                      ? 'bg-amber-500 hover:bg-amber-600 text-white'
                      : 'bg-blue-600 hover:bg-blue-800 text-white'
                  }`}
                  id={`view-profile-${tutor.id}`}
                >
                  View Profile →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTutors.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
          <p className="text-sm text-slate-600 font-semibold">No tutors match the selected criteria.</p>
          <p className="text-xs text-slate-400 mt-1">Try selecting "All Subjects" or clearing search terms.</p>
        </div>
      )}
    </div>
  );
};
