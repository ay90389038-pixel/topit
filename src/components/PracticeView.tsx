import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  Eye,
  EyeOff,
  Filter,
  Check,
  Sparkles,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { PracticeQuestion, QuestionType, Difficulty } from '../types';
import { MOCK_PRACTICE_QUESTIONS } from '../data/mockData';

interface PracticeViewProps {
  initialChapterId?: string;
  onNavigateToRevision?: () => void;
}

export const PracticeView: React.FC<PracticeViewProps> = ({
  initialChapterId,
  onNavigateToRevision,
}) => {
  const [selectedType, setSelectedType] = useState<QuestionType | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [showMarkingScheme, setShowMarkingScheme] = useState<Record<string, boolean>>({});
  const [showHint, setShowHint] = useState<Record<string, boolean>>({});
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});

  const questionTypes: { id: QuestionType | 'all'; label: string }[] = [
    { id: 'all', label: 'All Question Formats' },
    { id: 'mcq', label: 'MCQs' },
    { id: 'assertion_reason', label: 'Assertion & Reason' },
    { id: 'case_based', label: 'Case-Based (NEP)' },
    { id: 'numerical', label: 'Numericals' },
    { id: 'short_answer', label: 'Short/Long Answers' },
    { id: 'competency', label: 'Competency-Based' },
  ];

  const difficulties: (Difficulty | 'all')[] = ['all', 'Easy', 'Moderate', 'Challenging', 'Board-Level'];

  const filteredQuestions = MOCK_PRACTICE_QUESTIONS.filter((q) => {
    if (selectedType !== 'all' && q.type !== selectedType) return false;
    if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
    return true;
  });

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const toggleMarking = (id: string) => {
    setShowMarkingScheme((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleHint = (id: string) => {
    setShowHint((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleBookmark = (id: string) => {
    setBookmarked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Practice Engine
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Strictly aligned to Indian Board formats — Assertion-Reason, 50% Competency Case Passages, and Step-Marked Numericals.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500">Showing {filteredQuestions.length} Questions</span>
        </div>
      </div>

      {/* Filter Ribbon: Question Type & Difficulty (Compliant with Zero-Pill rule: interactive buttons/tabs) */}
      <div className="space-y-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
            Filter by Question Format
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {questionTypes.map((t) => {
              const isSelected = selectedType === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedType(t.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Difficulty:
            </span>
            {difficulties.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDifficulty(d)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer ${
                  selectedDifficulty === d
                    ? 'bg-emerald-100 text-emerald-900 font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {d === 'all' ? 'All Levels' : d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Questions Feed */}
      <div className="space-y-6">
        {filteredQuestions.map((q, idx) => {
          const isAnswered = userAnswers[q.id] !== undefined;
          const isCorrect = userAnswers[q.id] === q.correctAnswer;
          const isBookmarked = !!bookmarked[q.id];

          return (
            <div
              key={q.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-5"
            >
              {/* Question Header Metadata (Unboxed text with typographic separators) */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-slate-900 font-mono">Q{idx + 1}</span>
                  <span aria-hidden="true">·</span>
                  <span className="capitalize">{q.type.replace('_', ' ')}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-medium text-emerald-800">{q.difficulty}</span>
                  <span aria-hidden="true">·</span>
                  <span>{q.topic}</span>
                  {q.boardTags.map((tag) => (
                    <React.Fragment key={tag}>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-600 font-mono text-[11px]">{tag}</span>
                    </React.Fragment>
                  ))}
                </div>

                <button
                  onClick={() => toggleBookmark(q.id)}
                  className="p-1 text-slate-400 hover:text-amber-600 transition-colors"
                  title="Bookmark question"
                >
                  {isBookmarked ? (
                    <BookmarkCheck className="w-4 h-4 text-amber-600 fill-amber-600" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Case-based passage if present */}
              {q.casePassage && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed space-y-1">
                  <span className="font-semibold text-slate-900 uppercase tracking-wider text-[11px] block">
                    Case Study Passage:
                  </span>
                  <p>{q.casePassage}</p>
                </div>
              )}

              {/* Question Statement */}
              <div className="space-y-3">
                <p className="text-base text-slate-900 font-medium leading-relaxed whitespace-pre-line">
                  {q.question}
                </p>

                {/* Assertion and Reason Block */}
                {q.type === 'assertion_reason' && q.assertion && q.reason && (
                  <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200 space-y-2 text-sm">
                    <p>
                      <strong className="text-slate-900">Assertion (A):</strong> {q.assertion}
                    </p>
                    <p>
                      <strong className="text-slate-900">Reason (R):</strong> {q.reason}
                    </p>
                  </div>
                )}
              </div>

              {/* Multiple Choice Options / Assertion-Reason Options */}
              {q.options && q.options.length > 0 && (
                <div className="space-y-2 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = userAnswers[q.id] === optIdx;
                    const isTheCorrectOption = q.correctAnswer === optIdx;

                    let optionStyles = 'border-slate-200 hover:border-slate-300 hover:bg-slate-50';
                    if (isAnswered) {
                      if (isTheCorrectOption) {
                        optionStyles = 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-medium';
                      } else if (isSelected) {
                        optionStyles = 'border-rose-400 bg-rose-50 text-rose-950';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all flex items-center justify-between cursor-pointer ${optionStyles}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full border border-slate-300 text-xs font-mono font-medium flex items-center justify-center shrink-0">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="leading-snug">{opt}</span>
                        </div>

                        {isAnswered && (
                          <div className="shrink-0 ml-2">
                            {isTheCorrectOption ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            ) : isSelected ? (
                              <XCircle className="w-5 h-5 text-rose-500" />
                            ) : null}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Sub-questions for Case Based */}
              {q.subQuestions && q.subQuestions.length > 0 && (
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
                    Sub-Questions (Total: 4 Marks):
                  </span>
                  <div className="space-y-2">
                    {q.subQuestions.map((sq, sqIdx) => (
                      <div key={sqIdx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-900">{sq.question}</span>
                          <span className="font-mono text-slate-500">[{sq.marks} Mark]</span>
                        </div>
                        {showMarkingScheme[q.id] && (
                          <div className="p-2 rounded bg-emerald-50 text-emerald-900 font-medium mt-1">
                            Model Answer: {sq.correctAnswer}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Hint Box (if toggled) */}
              {showHint[q.id] && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block mb-0.5">Examiner Hint:</strong>
                    <span>{q.hint}</span>
                  </div>
                </div>
              )}

              {/* Marking Scheme & Explanation (if toggled) */}
              {showMarkingScheme[q.id] && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                  <div className="border-b border-slate-200 pb-2">
                    <span className="font-semibold text-slate-900 uppercase tracking-wider text-[11px] block">
                      Official Step-Marking Rubric:
                    </span>
                    <div className="space-y-1.5 mt-2">
                      {q.markingSchemeBreakdown.map((step, sIdx) => (
                        <div key={sIdx} className="flex items-center justify-between text-slate-700">
                          <span>{step.step}</span>
                          <span className="font-mono font-semibold text-emerald-800">
                            +{step.marks} {step.marks === 1 ? 'Mark' : 'Marks'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-900 block mb-1">
                      Comprehensive Conceptual Explanation:
                    </span>
                    <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                      {q.explanation}
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleHint(q.id)}
                    className="px-3 py-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                    <span>{showHint[q.id] ? 'Hide Hint' : 'View Hint'}</span>
                  </button>

                  <button
                    onClick={() => toggleMarking(q.id)}
                    className="px-3 py-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {showMarkingScheme[q.id] ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Hide Marking Scheme</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5 text-emerald-700" />
                        <span>View Step Marking & Solution</span>
                      </>
                    )}
                  </button>
                </div>

                {isAnswered && (
                  <span
                    className={`font-semibold ${
                      isCorrect ? 'text-emerald-700' : 'text-rose-600'
                    }`}
                  >
                    {isCorrect ? 'Correct! Full Mark Awarded' : 'Incorrect — Review marking points above'}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
