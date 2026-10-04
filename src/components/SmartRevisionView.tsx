import React, { useState } from 'react';
import {
  RotateCcw,
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  Zap,
  Check
} from 'lucide-react';
import { UserProgress, ActiveView } from '../types';
import { MOCK_CONCEPTS, MOCK_PRACTICE_QUESTIONS } from '../data/mockData';

interface SmartRevisionViewProps {
  progress: UserProgress;
  onUpdateProgress?: (updated: UserProgress) => void;
  onNavigate: (view: ActiveView, contextId?: string) => void;
  initialTopic?: string;
}

export const SmartRevisionView: React.FC<SmartRevisionViewProps> = ({
  progress,
  onUpdateProgress,
  onNavigate,
  initialTopic,
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedWeakTopic, setSelectedWeakTopic] = useState<string>(
    initialTopic || progress.weakTopics[0]?.name || 'Carbon & its Compounds'
  );
  const [practiceAnswers, setPracticeAnswers] = useState<Record<number, number>>({});
  const [retestAnswers, setRetestAnswers] = useState<Record<number, number>>({});
  const [loopCompleted, setLoopCompleted] = useState<boolean>(false);

  const concept = MOCK_CONCEPTS['ch-carbon'];
  const drillQuestions = MOCK_PRACTICE_QUESTIONS.slice(0, 3);
  const retestQuestions = MOCK_PRACTICE_QUESTIONS.slice(3, 5);

  const handleCompleteRetest = () => {
    setActiveStep(4);
    setLoopCompleted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 w-fit mb-2">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Closed-Loop Mastery Engine</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
          Smart Revision: Learn → Practice → Retest → Improve
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          TOPIT automatically detects weak topics from your mock tests and guides you through a calibrated 15-minute recovery loop.
        </p>
      </div>

      {/* Stepper Ribbon */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="grid grid-cols-4 gap-2 text-center">
          {[
            { step: 1, title: '1. Revise Notes', icon: <BookOpen className="w-4 h-4 mx-auto" /> },
            { step: 2, title: '2. Practice Drill', icon: <CheckCircle2 className="w-4 h-4 mx-auto" /> },
            { step: 3, title: '3. Retest Mini Exam', icon: <Clock className="w-4 h-4 mx-auto" /> },
            { step: 4, title: '4. Verified Mastery', icon: <Award className="w-4 h-4 mx-auto" /> },
          ].map((s) => {
            const isCurrent = activeStep === s.step;
            const isDone = activeStep > s.step;
            return (
              <button
                key={s.step}
                onClick={() => setActiveStep(s.step)}
                className={`p-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                  isCurrent
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-xs'
                    : isDone
                    ? 'border-slate-200 bg-slate-50 text-slate-700'
                    : 'border-slate-100 text-slate-400'
                }`}
              >
                <div className="mb-1 text-emerald-700">{s.icon}</div>
                <span>{s.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 1: Revise Key Notes & Formulas */}
      {activeStep === 1 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[11px] font-mono uppercase text-rose-700 font-bold">
                Weak Concept Detected · 42% Accuracy
              </span>
              <h2 className="font-serif text-xl font-bold text-slate-900 mt-0.5">
                {selectedWeakTopic} — High-Yield Review
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-mono">Step 1 of 4</span>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Crucial Formulas & Rules for This Topic
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {concept.formulas.slice(0, 4).map((f, i) => (
                <div key={i} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
                  <span className="font-semibold text-xs text-slate-800">{f.name}</span>
                  <div className="font-mono text-xs font-semibold text-emerald-950 bg-white p-2 rounded border border-slate-200">
                    {f.formula}
                  </div>
                  <span className="text-[11px] text-slate-500 block">{f.note}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2 text-xs">
            <strong className="text-amber-950 block">Examiner Keywords to Remember:</strong>
            <ul className="list-disc list-inside space-y-1 text-amber-900">
              <li><strong>Catenation:</strong> Self-linking of carbon atoms via strong covalent bonds.</li>
              <li><strong>Tetravalency:</strong> Having four valence electrons available for covalent sharing.</li>
              <li><strong>Esterification:</strong> Ethanoic acid + Ethanol with Conc. H2SO4 forms sweet-smelling ester.</li>
            </ul>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              onClick={() => setActiveStep(2)}
              className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <span>Understood! Proceed to Practice Drill</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Practice Drill (3 Questions) */}
      {activeStep === 2 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[11px] font-mono uppercase text-emerald-800 font-bold">
                Step 2: Targeted Practice Drill
              </span>
              <h2 className="font-serif text-xl font-bold text-slate-900 mt-0.5">
                3 Questions to Reinforce Core Weak Points
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-mono">Step 2 of 4</span>
          </div>

          <div className="space-y-6">
            {drillQuestions.map((q, idx) => {
              const selectedOpt = practiceAnswers[idx];
              const isAnswered = selectedOpt !== undefined;
              return (
                <div key={q.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-mono font-bold text-slate-800">Drill Q{idx + 1}</span>
                    <span>{q.difficulty}</span>
                  </div>
                  <p className="text-sm font-medium text-slate-900">{q.question}</p>

                  {q.options && (
                    <div className="space-y-1.5">
                      {q.options.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => setPracticeAnswers((prev) => ({ ...prev, [idx]: optIdx }))}
                          className={`w-full text-left p-3 rounded-lg border text-xs transition-colors cursor-pointer ${
                            selectedOpt === optIdx
                              ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold'
                              : 'border-slate-200 bg-white hover:bg-slate-50'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setActiveStep(1)}
              className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-xs font-medium cursor-pointer"
            >
              Back to Notes
            </button>
            <button
              onClick={() => setActiveStep(3)}
              className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <span>Ready for Mini Retest</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Retest Mini Exam */}
      {activeStep === 3 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[11px] font-mono uppercase text-emerald-800 font-bold">
                Step 3: Verification Retest
              </span>
              <h2 className="font-serif text-xl font-bold text-slate-900 mt-0.5">
                Quick 2-Question Retest to Validate Concept Retention
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-mono">Step 3 of 4</span>
          </div>

          <div className="space-y-5">
            {retestQuestions.map((q, idx) => {
              const selectedOpt = retestAnswers[idx];
              return (
                <div key={q.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-3">
                  <span className="font-mono font-bold text-xs text-slate-800">Retest Q{idx + 1}</span>
                  <p className="text-sm font-medium text-slate-900">{q.question}</p>
                  {q.options && (
                    <div className="space-y-1.5">
                      {q.options.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => setRetestAnswers((prev) => ({ ...prev, [idx]: optIdx }))}
                          className={`w-full text-left p-3 rounded-lg border text-xs transition-colors cursor-pointer ${
                            selectedOpt === optIdx
                              ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold'
                              : 'border-slate-200 bg-white hover:bg-slate-50'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              onClick={handleCompleteRetest}
              className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>Submit Retest & Verify Improvement</span>
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Verified Mastery & Improvement Report */}
      {activeStep === 4 && (
        <div className="bg-white rounded-2xl border border-emerald-300 p-8 shadow-md text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              Continuous Improvement Cycle Verified
            </span>
            <h2 className="font-serif text-3xl font-bold text-slate-900">
              Mastery Boost Achieved!
            </h2>
            <p className="text-sm text-slate-600 max-w-lg mx-auto">
              Your accuracy on <strong>{selectedWeakTopic}</strong> increased from{' '}
              <span className="text-rose-600 font-bold font-mono">42%</span> to{' '}
              <span className="text-emerald-700 font-bold font-mono">88%</span>.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 max-w-xl mx-auto">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-500 uppercase font-medium block">Previous Accuracy</span>
              <span className="font-serif text-xl font-bold text-rose-700 font-mono">42%</span>
            </div>
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
              <span className="text-[11px] text-emerald-800 uppercase font-medium block">Retest Accuracy</span>
              <span className="font-serif text-xl font-bold text-emerald-800 font-mono">88%</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 col-span-2 sm:col-span-1">
              <span className="text-[11px] text-slate-500 uppercase font-medium block">Net Projected Gain</span>
              <span className="font-serif text-xl font-bold text-slate-900 font-mono">+4 Marks</span>
            </div>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              Return to Dashboard
            </button>
            <button
              onClick={() => {
                setActiveStep(1);
                setSelectedWeakTopic('Magnetic Effects of Electric Current');
              }}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Next Weak Topic: Magnetic Effects
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
