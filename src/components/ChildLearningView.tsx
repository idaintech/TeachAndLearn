import React, { useState } from 'react';
import { 
  Star, 
  Sparkles, 
  ShieldCheck, 
  Calendar, 
  Video, 
  CheckCircle2, 
  Smile, 
  Award, 
  ArrowRight, 
  RotateCcw,
  BookOpen
} from 'lucide-react';
import { Child, Enrollment } from '../types';

interface ChildLearningViewProps {
  child: Child;
  enrollments: Enrollment[];
  onOpenDiagnostic: () => void;
  onAskStudyBuddy: () => void;
}

export const ChildLearningView: React.FC<ChildLearningViewProps> = ({
  child,
  enrollments,
  onOpenDiagnostic,
  onAskStudyBuddy,
}) => {
  // Interactive Pizza Fraction exercise: Select 2 out of 4 slices to make 1/2
  const [selectedSlices, setSelectedSlices] = useState<number[]>([0]);
  const [exerciseFeedback, setExerciseFeedback] = useState<string | null>(null);
  const [hasCompletedExercise, setHasCompletedExercise] = useState(false);
  const [starsCount, setStarsCount] = useState(14);

  const toggleSlice = (sliceIndex: number) => {
    let next: number[];
    if (selectedSlices.includes(sliceIndex)) {
      next = selectedSlices.filter(i => i !== sliceIndex);
    } else {
      next = [...selectedSlices, sliceIndex];
    }
    setSelectedSlices(next);

    if (next.length === 2) {
      setExerciseFeedback("Awesome work! 2 out of 4 slices equals 1/2! You just mastered equivalent fractions! 🍕🎉");
      if (!hasCompletedExercise) {
        setHasCompletedExercise(true);
        setStarsCount(prev => prev + 1);
      }
    } else if (next.length === 4) {
      setExerciseFeedback("4 out of 4 slices is the whole pizza (1)! Try picking 2 slices for 1/2.");
    } else if (next.length === 1) {
      setExerciseFeedback("That's 1 out of 4 slices (1/4). Pick 1 more slice to make 1/2!");
    } else if (next.length === 3) {
      setExerciseFeedback("That's 3 out of 4 slices (3/4). Uncheck one slice to get exactly 1/2!");
    } else {
      setExerciseFeedback("Click the slices to feed your fraction understanding!");
    }
  };

  const activeMentorship = enrollments[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Child Header with Warm Encouraging Aesthetic */}
      <div className="bg-gradient-to-r from-amber-400 via-amber-300 to-blue-100 rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <img
              src={child.avatar}
              alt={child.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-3 border-white shadow-md"
            />
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/80 text-blue-900 text-xs font-extrabold mb-1">
                <span>Kid Learning Portal</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
                Welcome, {child.name}! ⭐
              </h1>
              <p className="text-xs sm:text-sm text-slate-700 font-medium">
                Grade 3 Explorer • Today's Mission: Mastering Fractions with Fun!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/90 px-4 py-2.5 rounded-2xl shadow-xs border border-white/60">
            <div className="text-amber-500 text-2xl font-black flex items-center gap-1">
              <Star className="w-6 h-6 fill-amber-400 text-amber-500" />
              <span>{starsCount}</span>
            </div>
            <div className="text-left leading-tight">
              <div className="text-xs font-bold text-slate-900">Learning Stars</div>
              <div className="text-[10px] text-slate-500">Keep it up!</div>
            </div>
          </div>
        </div>

        {/* Safety Badge */}
        <div className="mt-4 pt-3 border-t border-amber-300/40 flex items-center justify-between text-xs text-slate-700">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-800" />
            <span className="font-semibold text-blue-900">Parent monitoring is active for your safety.</span>
          </div>
          <span className="text-[11px] text-slate-600 hidden sm:inline">
            Umida is supervising your learning space
          </span>
        </div>
      </div>

      {/* Main Grid: Interactive Learning Exercise + Mentor Connection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 Cols: Interactive Pizza Slice Exercise */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                  Today's Visual Challenge
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
                  Fractions: Understanding Equal Parts
                </h2>
              </div>
              <button
                onClick={() => setSelectedSlices([])}
                className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            <p className="text-sm text-slate-600">
              Can you select <strong>2 of the 4 equal slices</strong> to make <strong>1/2</strong> of the whole pizza?
            </p>

            {/* Visual Pizza Diagram */}
            <div className="flex flex-col items-center justify-center py-6 bg-slate-50 rounded-2xl border border-slate-200/80">
              <div className="relative w-56 h-56 rounded-full bg-amber-100 border-4 border-amber-300 shadow-inner flex items-center justify-center p-3">
                {/* 4 Clickable Slices */}
                <div className="grid grid-cols-2 gap-2 w-full h-full">
                  {[0, 1, 2, 3].map((idx) => {
                    const isSelected = selectedSlices.includes(idx);
                    return (
                      <button
                        key={idx}
                        onClick={() => toggleSlice(idx)}
                        className={`w-full h-full rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer font-bold text-sm select-none ${
                          isSelected
                            ? 'bg-amber-400 text-amber-950 shadow-md scale-95 border-2 border-amber-500'
                            : 'bg-white/80 hover:bg-white text-slate-400 border border-amber-200/80'
                        }`}
                      >
                        <span className="text-2xl">{isSelected ? '🍕' : '⚪'}</span>
                        <span className="text-xs mt-1">1/4 slice</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Fractional State Count */}
              <div className="mt-4 text-center">
                <div className="text-sm font-bold text-slate-800">
                  Selected: <span className="text-amber-700">{selectedSlices.length} / 4 slices</span>
                  {selectedSlices.length === 2 && (
                    <span className="text-emerald-700 ml-2 font-black">= 1/2 of the pizza!</span>
                  )}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Click any slice to take a bite or place it back.
                </div>
              </div>
            </div>

            {/* Encouraging Micro-Copy & Praise */}
            <div
              className={`p-4 rounded-2xl border transition-all text-xs sm:text-sm font-medium ${
                selectedSlices.length === 2
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : 'bg-amber-50/70 border-amber-200 text-amber-900'
              }`}
            >
              {exerciseFeedback || "Click 2 slices above to discover how 2/4 is the exact same amount as 1/2!"}
            </div>

            {/* Encouraging Quote */}
            <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
              <Smile className="w-5 h-5 text-blue-600 shrink-0" />
              <span>
                <strong>Learning Note:</strong> "Great job! You're making steady progress every day. When fractions click, math feels like a fun puzzle."
              </span>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Mentor Session Card & Badges */}
        <div className="lg:col-span-5 space-y-6">
          {/* Upcoming Peer Mentor Session Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                Safe Live Classroom
              </span>
              <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                Confirmed by Umida
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900">
              Upcoming Mentoring Session
            </h3>

            {activeMentorship ? (
              <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-base">
                    {activeMentorship.tutorName[0]}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{activeMentorship.tutorName}</div>
                    <div className="text-[11px] text-blue-800 font-semibold">
                      ✓ Verified Peer Mentor (Free)
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-blue-200/60">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>{activeMentorship.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Video className="w-3.5 h-3.5 text-blue-600" />
                    <span>Teach&Learn Safe Video Classroom</span>
                  </div>
                </div>

                <button
                  onClick={() => alert("Connecting to the safe video classroom with Amina K. Parent Umida has received notification!")}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Video className="w-4 h-4" />
                  <span>Enter Safe Classroom</span>
                </button>
              </div>
            ) : (
              <p className="text-xs text-slate-500">
                No active session today. Ask parent to schedule one!
              </p>
            )}

            <p className="text-[11px] text-slate-400 italic text-center">
              Video sessions are recorded and archived for parent review.
            </p>
          </div>

          {/* Child Badges / Trophy Cabinet */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span>{child.name}'s Badges</span>
              </h3>
              <span className="text-xs text-slate-400">4 Earned</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center text-xs">
              <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200">
                <div className="text-2xl mb-1">🍕</div>
                <div className="font-bold text-slate-900">Fraction Starter</div>
                <div className="text-[10px] text-amber-800 mt-0.5">Unlocked today!</div>
              </div>

              <div className="p-3 rounded-2xl bg-blue-50/80 border border-blue-200">
                <div className="text-2xl mb-1">🎯</div>
                <div className="font-bold text-slate-900">Diagnostic Star</div>
                <div className="text-[10px] text-blue-800 mt-0.5">No-pressure quiz</div>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200">
                <div className="text-2xl mb-1">🤝</div>
                <div className="font-bold text-slate-900">Peer Learner</div>
                <div className="text-[10px] text-emerald-800 mt-0.5">Mentored by Amina</div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 opacity-60">
                <div className="text-2xl mb-1">👑</div>
                <div className="font-bold text-slate-700">Future Mentor</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Grade 7+ goal</div>
              </div>
            </div>
          </div>

          {/* Homework Help Button */}
          <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white rounded-3xl p-5 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
              <Sparkles className="w-4 h-4" />
              <span>Need Help with Hard Questions?</span>
            </div>
            <p className="text-xs text-blue-100 leading-relaxed">
              Ask your parent to consult StudyBuddy AI! It creates step-by-step puzzles and stories to make sense of anything.
            </p>
            <button
              onClick={onAskStudyBuddy}
              className="mt-2 w-full py-2 bg-white text-blue-900 hover:bg-blue-50 font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Open StudyBuddy AI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
