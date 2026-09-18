import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Star, 
  Clock, 
  Calendar, 
  Users, 
  Award, 
  Check, 
  Lock, 
  AlertCircle, 
  HeartHandshake 
} from 'lucide-react';
import { Tutor, Child } from '../types';

interface TutorProfileModalProps {
  tutor: Tutor | null;
  isOpen: boolean;
  onClose: () => void;
  childrenList: Child[];
  activeChild: Child;
  onConfirmEnrollment: (tutor: Tutor, child: Child, schedule: string) => void;
  onOpenSafety: () => void;
}

export const TutorProfileModal: React.FC<TutorProfileModalProps> = ({
  tutor,
  isOpen,
  onClose,
  childrenList,
  activeChild,
  onConfirmEnrollment,
  onOpenSafety,
}) => {
  const [selectedChildId, setSelectedChildId] = useState(activeChild?.id || childrenList[0]?.id);
  const [selectedSchedule, setSelectedSchedule] = useState(tutor?.availability[0] || 'Wednesdays 4:30 PM');
  const [parentAgreementChecked, setParentAgreementChecked] = useState(true);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrollmentSuccess, setEnrollmentSuccess] = useState(false);

  if (!isOpen || !tutor) return null;

  const selectedChild = childrenList.find(c => c.id === selectedChildId) || activeChild;
  const isPeerMentor = tutor.role === 'mentor';

  const handleEnroll = () => {
    setIsEnrolling(true);
    setTimeout(() => {
      setIsEnrolling(false);
      setEnrollmentSuccess(true);
      onConfirmEnrollment(tutor, selectedChild, selectedSchedule);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Header Bar */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Educator Profile
            </span>
            <span className="text-xs font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              {tutor.badgeTitle}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {enrollmentSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-2xl font-bold">
                ✓
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 font-display">
                Enrollment Confirmed!
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                You have successfully authorized <strong>{selectedChild.name}</strong> to learn with <strong>{tutor.name}</strong> ({tutor.priceLabel}).
                All sessions occur through our monitored, parent-visible learning classroom.
              </p>
              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-800 text-white font-semibold text-xs sm:text-sm cursor-pointer shadow-xs"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Tutor Profile Header Card */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-4">
                  <img
                    src={tutor.avatar}
                    alt={tutor.name}
                    className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0"
                  />
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900 font-display">
                      {tutor.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                      <span>{tutor.subjects.join(', ')}</span>
                      <span>•</span>
                      <span>{tutor.grades}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="flex items-center gap-1 text-xs font-bold text-slate-800">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span>{tutor.rating}</span>
                      </span>
                      <span className="text-[11px] text-slate-400">
                        ({tutor.reviewsCount} reviews)
                      </span>
                      <span className="text-[11px] text-slate-400">•</span>
                      <span className="text-[11px] text-slate-600 font-semibold">
                        {tutor.studentsHelped} students helped
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right sm:border-l sm:border-slate-200 sm:pl-5 w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between">
                  <div className="text-xl font-black text-slate-900">
                    {tutor.priceLabel}
                  </div>
                  <span className="text-[11px] text-slate-500">
                    {isPeerMentor ? '100% Free Peer Volunteering' : 'Professional lesson'}
                  </span>
                </div>
              </div>

              {/* WHY I MENTOR (FOR PEER MENTORS) */}
              {isPeerMentor && tutor.whyIMentor && (
                <div className="bg-amber-50/70 rounded-2xl border border-amber-200/80 p-4 space-y-1 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-amber-900">
                    <HeartHandshake className="w-4 h-4 text-amber-600" />
                    <span>Why I Mentor:</span>
                  </div>
                  <p className="text-slate-700 italic leading-relaxed">
                    "{tutor.whyIMentor}"
                  </p>
                </div>
              )}

              {/* Bio & Details */}
              <div className="space-y-2 text-xs">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                  About {tutor.name}
                </h4>
                <p className="text-slate-600 leading-relaxed">{tutor.bio}</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 text-[11px]">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 block">Languages:</span>
                    <span className="font-semibold text-slate-800">{tutor.languages.join(', ')}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 block">Teaching Levels:</span>
                    <span className="font-semibold text-slate-800">{tutor.levels}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 block">{isPeerMentor ? 'Volunteer Record:' : 'Experience:'}</span>
                    <span className="font-semibold text-slate-800">
                      {isPeerMentor ? `${tutor.volunteerHours} verified hrs` : tutor.experience}
                    </span>
                  </div>
                </div>
              </div>

              {/* VERIFIED BY OUR PLATFORM (SAFETY SECTION SPECIFIED IN PROMPT) */}
              <div className="bg-blue-50/60 rounded-2xl border border-blue-200 p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-blue-900 text-xs">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <span>Verified by our platform</span>
                  </div>
                  <button
                    onClick={onOpenSafety}
                    className="text-[11px] font-semibold text-blue-600 hover:underline cursor-pointer"
                  >
                    View safety standards
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {tutor.verificationList.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-blue-900">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="text-[11px] font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* PARENT-CONTROLLED ENROLLMENT SECTION (MANDATED SAFEGUARD) */}
              <div className="p-5 rounded-2xl border-2 border-blue-600/30 bg-white space-y-4">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <Lock className="w-4 h-4 text-blue-600" />
                  <span>Parent-Authorized Enrollment</span>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  Only parents can enroll children or book lessons. Children cannot communicate independently with tutors outside the supervised platform.
                </p>

                {/* Child selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Enroll which child?
                    </label>
                    <select
                      value={selectedChildId}
                      onChange={(e) => setSelectedChildId(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold text-slate-800 bg-white focus:outline-none focus:border-blue-600"
                    >
                      {childrenList.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.grade}, Age {c.age})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Select session time slot:
                    </label>
                    <select
                      value={selectedSchedule}
                      onChange={(e) => setSelectedSchedule(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold text-slate-800 bg-white focus:outline-none focus:border-blue-600"
                    >
                      {tutor.availability.map((slot, i) => (
                        <option key={i} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Parent consent checkbox */}
                <label className="flex items-start gap-2.5 pt-1 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={parentAgreementChecked}
                    onChange={(e) => setParentAgreementChecked(e.target.checked)}
                    className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>
                    I confirm as parent/guardian to enroll <strong>{selectedChild.name}</strong>. I understand sessions are recorded for safety and monitored via my parent portal.
                  </span>
                </label>

                {/* Enroll CTA */}
                <div className="pt-2">
                  <button
                    disabled={!parentAgreementChecked || isEnrolling}
                    onClick={handleEnroll}
                    className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-40 disabled:cursor-not-allowed ${
                      isPeerMentor
                        ? 'bg-amber-500 hover:bg-amber-600 text-white'
                        : 'bg-blue-600 hover:bg-blue-800 text-white'
                    }`}
                    id="confirm-enroll-btn"
                  >
                    <span>
                      {isEnrolling
                        ? 'Authorizing Session...'
                        : isPeerMentor
                        ? `Authorize Free Peer Mentorship with ${tutor.name}`
                        : `Authorize Lesson with ${tutor.name} ($8/lesson)`}
                    </span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
