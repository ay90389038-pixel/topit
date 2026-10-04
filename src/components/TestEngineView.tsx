import React, { useState, useEffect } from 'react';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Flag,
  ChevronRight,
  ChevronLeft,
  XCircle,
  BarChart3,
  Award,
  ArrowRight
} from 'lucide-react';
import { TestTemplate, PracticeQuestion, ActiveView } from '../types';
import { MOCK_TESTS, MOCK_PRACTICE_QUESTIONS } from '../data/mockData';

interface TestEngineViewProps {
  onNavigateToRevision?: () => void;
  onNavigateToAnalytics?: () => void;
}

export const TestEngineView: React.FC<TestEngineViewProps> = ({
  onNavigateToRevision,
  onNavigateToAnalytics,
}) => {
  const [selectedTest, setSelectedTest] = useState<TestTemplate | null>(null);
  const [isTestActive, setIsTestActive] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [secondsRemaining, setSecondsRemaining] = useState<number>(600);
  const [testResult, setTestResult] = useState<{
    score: number;
    total: number;
    accuracy: number;
    timeTaken: string;
  } | null>(null);

  // Derive questions for the active test
  const activeQuestions: PracticeQuestion[] = MOCK_PRACTICE_QUESTIONS.slice(0, 5);

  useEffect(() => {
    let interval: any;
    if (isTestActive && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            handleFinishTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTestActive, secondsRemaining]);

  const handleStartTest = (test: TestTemplate) => {
    setSelectedTest(test);
    setSecondsRemaining(test.durationMinutes * 60);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setFlagged({});
    setTestResult(null);
    setIsTestActive(true);
  };

  const handleSelectAnswer = (optIndex: number) => {
    setAnswers((prev) => ({ ...prev, [currentQuestionIndex]: optIndex }));
  };

  const toggleFlag = (qIndex: number) => {
    setFlagged((prev) => ({ ...prev, [qIndex]: !prev[qIndex] }));
  };

  const handleFinishTest = () => {
    setIsTestActive(false);
    let totalScore = 0;
    activeQuestions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) {
        totalScore += 2;
      }
    });
    const maxScore = activeQuestions.length * 2;
    const accuracy = Math.round((totalScore / maxScore) * 100);
    const durationTotal = selectedTest ? selectedTest.durationMinutes * 60 : 600;
    const timeSpentSec = Math.max(0, durationTotal - secondsRemaining);
    const mins = Math.floor(timeSpentSec / 60);
    const secs = timeSpentSec % 60;

    setTestResult({
      score: totalScore,
      total: maxScore,
      accuracy,
      timeTaken: `${mins}m ${secs}s`,
    });
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // If a test result is ready, show comprehensive report
  if (testResult && selectedTest) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
            <Award className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-slate-900">
            Test Performance Report
          </h2>
          <p className="text-sm text-slate-500">
            {selectedTest.title}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 max-w-2xl mx-auto">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 block uppercase font-medium">Score</span>
              <span className="font-serif text-2xl font-bold text-slate-900 font-mono">
                {testResult.score} / {testResult.total}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 block uppercase font-medium">Accuracy</span>
              <span className="font-serif text-2xl font-bold text-emerald-800 font-mono">
                {testResult.accuracy}%
              </span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 block uppercase font-medium">Time Taken</span>
              <span className="font-serif text-2xl font-bold text-slate-900 font-mono">
                {testResult.timeTaken}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 block uppercase font-medium">Speed / Q</span>
              <span className="font-serif text-2xl font-bold text-slate-900 font-mono">
                ~58s
              </span>
            </div>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => handleStartTest(selectedTest)}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Test</span>
            </button>

            {onNavigateToRevision && (
              <button
                onClick={onNavigateToRevision}
                className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <span>Revise Weak Mistakes</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => setSelectedTest(null)}
              className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-medium cursor-pointer"
            >
              Back to Test Engine
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If a test is actively running, render the test-taking screen
  if (isTestActive && selectedTest) {
    const currentQ = activeQuestions[currentQuestionIndex];
    const isCurrentFlagged = !!flagged[currentQuestionIndex];

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Test Header with Timer */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 px-6 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Active Board Mock</span>
            <h2 className="font-serif text-lg font-bold text-slate-900">{selectedTest.title}</h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200">
              <Clock className="w-4 h-4 text-emerald-700" />
              <span className="font-mono text-base font-bold text-slate-900 tabular-nums">
                {formatTimer(secondsRemaining)}
              </span>
            </div>

            <button
              onClick={handleFinishTest}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              Submit Test
            </button>
          </div>
        </div>

        {/* Test Body: Question Canvas + Question Palette Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Question Box */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-mono font-bold text-slate-700">
                Question {currentQuestionIndex + 1} of {activeQuestions.length}
              </span>

              <button
                onClick={() => toggleFlag(currentQuestionIndex)}
                className={`text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isCurrentFlagged ? 'text-amber-700 font-semibold' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span>{isCurrentFlagged ? 'Marked for Review' : 'Mark for Review'}</span>
              </button>
            </div>

            <div className="text-base text-slate-900 font-medium leading-relaxed whitespace-pre-line">
              {currentQ.question}
            </div>

            {currentQ.options && (
              <div className="space-y-2.5 pt-2">
                {currentQ.options.map((opt, optIdx) => {
                  const isSelected = answers[currentQuestionIndex] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectAnswer(optIdx)}
                      className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all flex items-center gap-3 cursor-pointer ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-medium shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <span className="w-6 h-6 rounded-full border border-slate-300 text-xs font-mono font-medium flex items-center justify-center shrink-0">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
              <button
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <button
                disabled={currentQuestionIndex === activeQuestions.length - 1}
                onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Question Palette Sidebar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs h-fit">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
              Question Palette
            </span>

            <div className="grid grid-cols-5 gap-2">
              {activeQuestions.map((_, idx) => {
                const isAnswered = answers[idx] !== undefined;
                const isFlag = !!flagged[idx];
                const isCurrent = idx === currentQuestionIndex;

                let btnStyles = 'bg-slate-100 text-slate-600 border-slate-200';
                if (isCurrent) {
                  btnStyles = 'ring-2 ring-slate-900 bg-white text-slate-900 font-bold';
                } else if (isFlag) {
                  btnStyles = 'bg-amber-100 text-amber-900 border-amber-300';
                } else if (isAnswered) {
                  btnStyles = 'bg-emerald-600 text-white font-semibold border-emerald-600';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`h-9 rounded-lg border text-xs font-mono font-medium flex items-center justify-center cursor-pointer transition-all ${btnStyles}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-emerald-600 shrink-0" />
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-amber-100 border border-amber-300 shrink-0" />
                <span>Marked for Review</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-slate-100 border border-slate-200 shrink-0" />
                <span>Not Visited</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default: Test catalog view
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
          Board Test Engine
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Choose from 10-minute diagnostic sprints, chapter-wise mastery tests, or full 80-mark board mocks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {MOCK_TESTS.map((test) => (
          <div
            key={test.id}
            className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-mono uppercase font-semibold text-emerald-800">
                  {test.type.replace('_', ' ')}
                </span>
                <span className="flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3" />
                  {test.durationMinutes} mins
                </span>
              </div>

              <div>
                <h3 className="font-semibold text-base text-slate-900 leading-snug">
                  {test.title}
                </h3>
                {test.chapterName && (
                  <span className="text-xs text-slate-500 block mt-0.5">
                    Chapter: {test.chapterName}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {test.description}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500">
                {test.totalMarks} Marks · {test.questionsCount} Qs
              </span>

              <button
                onClick={() => handleStartTest(test)}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Start Test</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
