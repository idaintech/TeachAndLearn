import React, { useRef } from 'react';
import { X, Printer, ShieldCheck, Download, Award, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { VolunteerRecord } from '../types';

interface VolunteerCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: VolunteerRecord;
}

export const VolunteerCertificateModal: React.FC<VolunteerCertificateModalProps> = ({
  isOpen,
  onClose,
  record,
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]">
        {/* Top Control Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 shrink-0">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-600" />
            <span className="font-bold text-slate-800 text-sm">
              Official Verified Volunteer Record
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-white text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Body (Clean, Printable Aesthetic) */}
        <div className="p-6 sm:p-10 overflow-y-auto">
          <div
            ref={certificateRef}
            className="p-8 sm:p-12 border-8 border-double border-blue-800 rounded-2xl bg-gradient-to-b from-white via-amber-50/10 to-white relative text-center space-y-6 shadow-sm"
          >
            {/* Top Emblem & Brand */}
            <div className="space-y-1">
              <div className="w-12 h-12 rounded-full bg-blue-800 text-white flex items-center justify-center mx-auto mb-2 shadow-xs">
                <HeartHandshake className="w-6 h-6 text-amber-300" />
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-blue-800">
                Teach&Learn Educational Foundation
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-slate-900 tracking-tight">
                Certificate of Verified Peer Mentoring
              </h2>
              <div className="text-xs text-slate-500 font-serif italic">
                Issued for Service, Academic Generosity & Community Contribution
              </div>
            </div>

            {/* Recipient */}
            <div className="py-2">
              <div className="text-xs text-slate-500 uppercase tracking-wider">
                This certifies that
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-900 font-display mt-1 border-b border-slate-300 inline-block px-8 pb-1">
                {record.mentorName}
              </div>
              <div className="text-xs text-slate-600 mt-1">
                Grade 11 Student Volunteer • Tashkent Specialized Lyceum #1
              </div>
            </div>

            {/* Achievement text */}
            <p className="text-xs sm:text-sm text-slate-700 max-w-xl mx-auto leading-relaxed">
              has completed verified voluntary peer tutoring within the Teach&Learn ecosystem, supporting younger students in foundational mathematics under active safeguarding supervision.
            </p>

            {/* Verified Hours & Metrics Box */}
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto py-2 text-xs">
              <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-200">
                <div className="text-[10px] text-blue-800 font-semibold uppercase">
                  Verified Hours
                </div>
                <div className="text-xl font-black text-blue-900 mt-0.5">
                  {record.totalHours} hrs
                </div>
              </div>

              <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200">
                <div className="text-[10px] text-amber-800 font-semibold uppercase">
                  Students Helped
                </div>
                <div className="text-xl font-black text-amber-900 mt-0.5">
                  {record.studentsHelped}
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-[10px] text-slate-500 font-semibold uppercase">
                  Average Rating
                </div>
                <div className="text-xl font-black text-slate-800 mt-0.5">
                  {record.rating} / 5.0
                </div>
              </div>
            </div>

            {/* Ethical Framing Note (Prompt Mandate) */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 max-w-lg mx-auto text-[10px] text-slate-500 text-left">
              <strong>Verification Standard:</strong> This record certifies real hours completed on the Teach&Learn platform. It is designed to verify extracurricular service for school portfolios and admissions applications based purely on substantiated time and feedback.
            </div>

            {/* Signatures & Verification Code */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
              <div>
                <div className="font-serif italic text-base text-slate-800 font-bold">
                  Dr. Nargiza Rashidova
                </div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wide">
                  Academic & Safeguarding Director
                </div>
              </div>

              <div className="text-center sm:text-right">
                <div className="font-mono text-xs font-bold text-blue-800 bg-blue-50 px-3 py-1 rounded border border-blue-200">
                  ID: {record.certificateId}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Verify at: edukind.org/verify/{record.certificateId}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
