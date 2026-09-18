import React, { useState } from 'react';
import { X, Check, Award, Sparkles, ShieldCheck, HeartHandshake } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFree: () => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({
  isOpen,
  onClose,
  onSelectFree,
}) => {
  const [appliedHours, setAppliedHours] = useState('27.5');

  if (!isOpen) return null;

  const hours = parseFloat(appliedHours) || 0;
  let discountLabel = "No volunteer discount yet";
  let proPrice = 5;

  if (hours >= 100) {
    discountLabel = "100% Free for 3 Months (100+ Volunteer Hours!)";
    proPrice = 0;
  } else if (hours >= 50) {
    discountLabel = "100% Free for 1 Month (50+ Volunteer Hours!)";
    proPrice = 0;
  } else if (hours >= 25) {
    discountLabel = "20% Discount Unlocked (25+ Volunteer Hours)";
    proPrice = 4.0;
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50 shrink-0">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
              Transparent Family Plans
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display mt-1">
              Accessible to Every Family. Free with Mentorship.
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto">
          {/* Volunteer Unlock Calculator ("Help others. Unlock Pro.") */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50/60 border border-blue-200 space-y-3">
            <div className="flex items-center gap-2 text-blue-950 font-bold text-sm">
              <Award className="w-4 h-4 text-blue-600" />
              <span>Unique Community Engine: "Teach others. Unlock Pro."</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Older students who volunteer as verified peer mentors earn full discounts on Teach&Learn Pro ($5/mo standard). Test the calculator below with your volunteer hours:
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700">Verified Volunteer Hours:</span>
                <input
                  type="number"
                  min={0}
                  max={200}
                  value={appliedHours}
                  onChange={(e) => setAppliedHours(e.target.value)}
                  className="w-20 p-1.5 rounded-lg border border-slate-300 font-bold text-center text-blue-700"
                />
                <span className="text-slate-400">hours</span>
              </div>

              <div className="text-right">
                <div className="font-bold text-emerald-700">{discountLabel}</div>
                <div className="text-[11px] text-slate-500">
                  Calculated Pro Cost: <strong>${proPrice.toFixed(2)}/mo</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Side by side cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Free Tier */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-base">Community Free</h3>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">Forever Free</span>
                </div>
                <div className="mt-3">
                  <span className="text-3xl font-extrabold text-slate-900">$0</span>
                  <span className="text-xs text-slate-500 ml-1">/ month</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Complete access to verified peer mentors and foundational diagnostic assessments.
                </p>

                <ul className="mt-5 space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Basic StudyBuddy AI assistance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Verified peer mentors (100% Free lessons)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Standard diagnostics & skill gap discovery</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Full Safety Center & parent controls</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => {
                  onSelectFree();
                  onClose();
                }}
                className="mt-6 w-full py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold text-xs transition-colors cursor-pointer"
              >
                Continue with Free Plan
              </button>
            </div>

            {/* Pro Tier */}
            <div className="bg-white rounded-2xl border-2 border-blue-600 p-6 shadow-md relative flex flex-col justify-between">
              <div className="absolute -top-3 right-4 bg-blue-600 text-white text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider">
                Full Learning Suite
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-base">Teach&Learn Pro</h3>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800">Volunteer Unlockable</span>
                </div>
                <div className="mt-3">
                  <span className="text-3xl font-extrabold text-slate-900">
                    ${proPrice.toFixed(2)}
                  </span>
                  <span className="text-xs text-slate-500 ml-1">/ month</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Deep diagnostics, unlimited AI homework co-pilot, and structured courses from Foundation to Pro.
                </p>

                <ul className="mt-5 space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Deep diagnostics & detailed gap analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Unlimited StudyBuddy AI co-pilot</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Structured courses (Foundation → Pro)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Priority peer mentor matching</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => {
                  alert("Pro membership activated! Thank you for participating in Teach&Learn.");
                  onClose();
                }}
                className="mt-6 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors cursor-pointer shadow-sm shadow-blue-600/20"
              >
                {proPrice === 0 ? 'Activate Free Pro (Volunteer Benefit)' : 'Subscribe to Pro ($5/mo)'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
