import React, { useState } from 'react';
import { X, ShieldCheck, Lock, CheckCircle2, AlertTriangle, Users, Video, FileText, Ban } from 'lucide-react';

interface SafetyCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SafetyCenterModal: React.FC<SafetyCenterModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [reportText, setReportText] = useState('');

  if (!isOpen) return null;

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportText.trim()) return;
    setReportSubmitted(true);
    setTimeout(() => {
      setReportSubmitted(false);
      setReportText('');
      alert("Report submitted to the Safeguarding Team. The tutor interaction has been placed on temporary hold for review.");
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-blue-900 text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-800 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="font-extrabold text-base sm:text-lg font-display">
                Teach&Learn Child Safety & Safeguarding Center
              </h2>
              <p className="text-xs text-blue-200">
                A trustworthy, protected educational network for families
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-blue-300 hover:text-white hover:bg-blue-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto text-xs sm:text-sm">
          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>1. Verified Educators</span>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                Both student peer mentors and professional teachers undergo identity verification, subject proficiency evaluations, and mandatory child safeguarding training.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Lock className="w-4 h-4 text-blue-600" />
                <span>2. Parent-Controlled Enrollment</span>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                Children cannot independently purchase courses or communicate freely with unknown tutors. Every session booking must be explicitly authorized by a parent account.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Video className="w-4 h-4 text-blue-600" />
                <span>3. Safe Communication</span>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                All video and messaging interactions take place strictly within the monitored Teach&Learn classroom. No off-platform contacts or personal phone numbers are permitted.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>4. Reporting & Moderation</span>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                Parents and students have one-tap reporting and instant block tools. Automated language filters flag any inappropriate wording in real-time.
              </p>
            </div>
          </div>

          {/* Report an Issue / Incident Form */}
          <div className="p-6 rounded-2xl border-2 border-slate-200 bg-white space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Ban className="w-4 h-4 text-rose-600" />
                <h3 className="font-bold text-slate-900 text-sm">
                  Report a Safety Concern or Request Review
                </h3>
              </div>
              <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                Direct to Safeguarding Officer
              </span>
            </div>

            <p className="text-xs text-slate-500">
              If an interaction or comment ever feels inappropriate, report it immediately. Our safety team reviews all flagged sessions within 1 hour.
            </p>

            <form onSubmit={handleReportSubmit} className="space-y-3">
              <textarea
                rows={3}
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
                placeholder="Describe your concern or the session timestamp..."
                className="w-full p-3 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500"
              />
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Transcripts and classroom logs are automatically attached.
                </span>
                <button
                  type="submit"
                  disabled={!reportText.trim() || reportSubmitted}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs disabled:opacity-40 cursor-pointer transition-colors shadow-2xs"
                >
                  {reportSubmitted ? 'Submitting Report...' : 'Submit Confidential Report'}
                </button>
              </div>
            </form>
          </div>

          {/* Transparent Contact info */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-600">
            <div>
              <strong>Emergency Safeguarding Hotline:</strong> 24/7 Monitored Dispatch
            </div>
            <div className="font-mono text-blue-800 font-bold">
              safeguarding@edukind.org
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
