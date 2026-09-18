import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, Sparkles, ArrowRight, ShieldCheck, HelpCircle, RefreshCw } from 'lucide-react';
import { SAMPLE_DIAGNOSTIC_QUESTIONS, INITIAL_DIAGNOSTIC_RESULT } from '../data/mockData';
import { DiagnosticResult, Child } from '../types';

interface DiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
  child: Child;
  onSelectRecommendedPath: (path: any) => void;
}

export const DiagnosticModal: React.FC<DiagnosticModalProps> = ({
  isOpen,
  onClose,
  child,
  onSelectRecommendedPath,
}) => {
  const [currentStep, setCurrentStep] = useState<'intro' | 'testing' | 'results'>('intro');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showHint, setShowHint] = useState(false);

  if (!isOpen) return null;

  const currentQuestion = SAMPLE_DIAGNOSTIC_QUESTIONS[questionIndex];

  const handleSelectOption = (index: number) => {
    const updated = [...selectedAnswers];
    updated[questionIndex] = index;
    setSelectedAnswers(updated);
  };

  const handleNext = () => {
    setShowHint(false);
    if (questionIndex < SAMPLE_DIAGNOSTIC_QUESTIONS.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      // Completed! Show results screen
      setCurrentStep('results');
    }
  };

  const handleReset = () => {
    setSelectedAnswers([]);
    setQuestionIndex(0);
    setCurrentStep('intro');
    setShowHint(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
              📐
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Mathematics Diagnostic for {child.name}
              </h3>
              <p className="text-xs text-slate-500">
                {child.grade} • Gentle, stress-free skill discovery
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: INTRO */}
        {currentStep === 'intro' && (
          <div className="p-6 space-y-6">
            <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Our "No-Shame" Learning Diagnostic</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Children learn at different paces. A Grade 6 student might have a gap in Grade 3 fractions—and that is completely okay. We never say <em>"You are behind"</em>; our philosophy is always:
              </p>
              <div className="p-3 bg-white rounded-xl border border-blue-200 text-center font-bold text-blue-800 text-sm">
                "Let's strengthen this skill together."
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900">5 Questions</div>
                <div className="text-[10px] text-slate-500 mt-0.5">~3 minutes</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900">Zero Pressure</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Hints available</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-blue-600">Custom Path</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Matched to mentor</div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => setCurrentStep('testing')}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-800 text-white text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                id="start-diagnostic-questions-btn"
              >
                <span>Start Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: INTERACTIVE QUESTIONS */}
        {currentStep === 'testing' && (
          <div className="p-6 space-y-6">
            {/* Progress indicator */}
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                <span className="font-semibold text-slate-700">
                  Question {questionIndex + 1} of {SAMPLE_DIAGNOSTIC_QUESTIONS.length}
                </span>
                <span className="font-bold text-blue-600">
                  Topic: {currentQuestion.topic}
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{
                    width: `${((questionIndex + 1) / SAMPLE_DIAGNOSTIC_QUESTIONS.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  Skill Focus: {currentQuestion.skillFocus}
                </span>
                <button
                  type="button"
                  onClick={() => setShowHint(!showHint)}
                  className="text-xs text-amber-700 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
                </button>
              </div>

              <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {currentQuestion.question}
              </h4>

              {showHint && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 animate-in fade-in duration-150">
                  💡 <strong>Friendly Hint:</strong> {currentQuestion.hint}
                </div>
              )}

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {currentQuestion.options.map((option, idx) => {
                  const isChosen = selectedAnswers[questionIndex] === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectOption(idx)}
                      className={`p-3.5 rounded-xl border text-left text-sm font-semibold transition-all cursor-pointer flex items-center justify-between ${
                        isChosen
                          ? 'bg-blue-600 text-white border-blue-800 shadow-xs'
                          : 'bg-white text-slate-800 border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                      }`}
                    >
                      <span>{option}</span>
                      {isChosen && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-xs text-slate-400">
                Encouraging atmosphere: take your time.
              </span>

              <button
                disabled={selectedAnswers[questionIndex] === undefined}
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-800 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                id="diagnostic-next-btn"
              >
                <span>
                  {questionIndex < SAMPLE_DIAGNOSTIC_QUESTIONS.length - 1
                    ? 'Next Question'
                    : 'View Learning Profile'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: RESULTS & RECOMMENDED PATH (EXACT MATCH TO PROMPT SPEC) */}
        {currentStep === 'results' && (
          <div className="p-6 space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Diagnostic Complete
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 font-display mt-2">
                {child.name}'s Learning Profile
              </h3>
              <p className="text-xs text-slate-500">
                Evaluated for Mathematics • Focus on encouraging mastery
              </p>
            </div>

            {/* Exact Learning Profile Specified in User Prompt */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-3">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Skill Breakdown:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Number sense: Strong */}
                <div className="p-3 rounded-xl bg-white border border-emerald-200 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shrink-0">
                    ✓
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span>Number sense:</span>
                      <span className="text-emerald-700">Strong</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Confident with midpoint estimates and place values.
                    </p>
                  </div>
                </div>

                {/* Multiplication: Developing */}
                <div className="p-3 rounded-xl bg-white border border-amber-200 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold shrink-0">
                    ⏳
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span>Multiplication:</span>
                      <span className="text-amber-700">Developing</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Understands equal groups; building automatic recall.
                    </p>
                  </div>
                </div>

                {/* Fractions: Needs practice */}
                <div className="p-3 rounded-xl bg-white border border-blue-200 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold shrink-0">
                    🍕
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span>Fractions:</span>
                      <span className="text-blue-800">Needs practice</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      "Let's strengthen this skill" with visual pizza slices and strips.
                    </p>
                  </div>
                </div>

                {/* Word problems: Needs practice */}
                <div className="p-3 rounded-xl bg-white border border-blue-200 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold shrink-0">
                    📖
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span>Word problems:</span>
                      <span className="text-blue-800">Needs practice</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      "Let's strengthen this skill" by breaking sentences into story clues.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* VISUAL LEAD INTO RECOMMENDED LEARNING PATH */}
            <div className="bg-gradient-to-br from-blue-800 to-blue-900 text-white rounded-2xl p-6 shadow-md space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                  Recommended Learning Path
                </span>
              </div>

              <div>
                <h4 className="text-xl font-extrabold tracking-tight">
                  Math Foundation — Fractions & Word Problems
                </h4>
                <p className="text-xs text-blue-100 mt-1 leading-relaxed">
                  Tailored specifically for {child.name} to build joyful mastery using physical models, paper pizzas, and patient peer mentorship.
                </p>
              </div>

              {/* Exact Metrics Specified by Prompt */}
              <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
                <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-xs">
                  <div className="text-[10px] text-blue-200">Estimated duration</div>
                  <div className="font-bold text-white mt-0.5">4 weeks</div>
                </div>
                <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-xs">
                  <div className="text-[10px] text-blue-200">Recommended sessions</div>
                  <div className="font-bold text-white mt-0.5">2 / week</div>
                </div>
                <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-xs">
                  <div className="text-[10px] text-blue-200">Recommended support</div>
                  <div className="font-bold text-amber-300 mt-0.5">Peer Mentor (Free)</div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-blue-600/60">
                <div className="text-xs text-blue-200">
                  Pair with verified senior mentor (e.g., Amina K. or Ali Karimov)
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onSelectRecommendedPath(INITIAL_DIAGNOSTIC_RESULT.recommendedPath);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm transition-colors cursor-pointer shadow-sm text-center"
                  id="browse-matched-mentors-btn"
                >
                  Browse Matched Peer Mentors →
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <button
                onClick={handleReset}
                className="hover:underline text-slate-600 flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retake Diagnostic</span>
              </button>
              <span>Saved to {child.name}'s Profile</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
