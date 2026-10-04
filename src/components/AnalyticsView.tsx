import React from 'react';
import {
  BarChart3,
  Target,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  TrendingUp,
  Award,
  Zap,
  ArrowRight
} from 'lucide-react';
import { UserProgress, Chapter, ActiveView } from '../types';

interface AnalyticsViewProps {
  progress: UserProgress;
  chapters: Chapter[];
  onNavigateToRevision: (topicName: string, chapterId: string) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  progress,
  chapters,
  onNavigateToRevision,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
          Preparation Diagnostics & Analytics
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Granular insight into your question accuracy, time spent per mark, mistake classifications, and syllabus mastery.
        </p>
      </div>

      {/* Top 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase font-semibold">Total Accuracy</span>
            <Target className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-slate-900 font-mono tabular-nums">
              {progress.accuracy}%
            </span>
            <span className="text-xs text-emerald-700 font-medium">82.4% avg</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Target for 95%+: &gt;88% accuracy</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase font-semibold">Speed / Question</span>
            <Clock className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-slate-900 font-mono tabular-nums">
              68s
            </span>
            <span className="text-xs text-slate-500">optimal pace</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Board allowance: 90s per 1-mark question</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase font-semibold">Questions Solved</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-slate-900 font-mono tabular-nums">
              {progress.questionsSolved}
            </span>
            <span className="text-xs text-emerald-700 font-medium">+140 this week</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Includes 310 PYQs solved</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase font-semibold">Mock Exams</span>
            <Award className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-slate-900 font-mono tabular-nums">
              {progress.testsCompleted}
            </span>
            <span className="text-xs text-slate-500">tests submitted</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Average score: 81.2%</p>
        </div>
      </div>

      {/* Mistake Analysis Breakdown (Essential Feature) */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
        <div>
          <h2 className="font-serif text-xl font-bold text-slate-900">
            Mistake Classification & Root-Cause Analysis
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Understanding why an answer was wrong is the fastest way to stop leaking marks in board exams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {progress.mistakeDistribution.map((m) => (
            <div
              key={m.type}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">{m.type}</span>
                  <span className="font-mono font-bold text-slate-900">{m.percentage}%</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-emerald-700 h-full rounded-full" style={{ width: `${m.percentage}%` }} />
                </div>
                <span className="text-[11px] text-slate-500 block mt-1">{m.count} Mistakes logged</span>
              </div>
              <p className="text-xs text-slate-600 border-t border-slate-100 pt-2 italic">
                {m.advice}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Chapter Performance Matrix */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl font-bold text-slate-900">
              Chapter & Topic Mastery Matrix
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Categorized into Mastered (&gt;75%), Developing (50–75%), and Needs Attention (&lt;50%).
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
          {chapters.map((ch) => {
            const isWeak = ch.completionPercentage < 60;
            return (
              <div
                key={ch.id}
                className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white hover:bg-slate-50/60 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-slate-900">{ch.title}</span>
                    <span className="text-[11px] text-slate-500">· {ch.subject}</span>
                    <span className="text-[11px] font-mono text-emerald-800">· {ch.weightageMarks} Marks</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>{ch.pyqFrequencyCount} PYQs solved</span>
                    <span>·</span>
                    <span>{ch.totalTopics} Topics</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="text-right">
                    <span className="font-mono text-sm font-bold text-slate-900 block tabular-nums">
                      {ch.completionPercentage}%
                    </span>
                    <span
                      className={`text-[11px] font-medium ${
                        ch.status === 'mastered'
                          ? 'text-emerald-700'
                          : ch.status === 'improving'
                          ? 'text-amber-700'
                          : 'text-rose-700'
                      }`}
                    >
                      {ch.status === 'mastered'
                        ? 'Mastered'
                        : ch.status === 'improving'
                        ? 'Developing'
                        : 'Needs Attention'}
                    </span>
                  </div>

                  {isWeak && (
                    <button
                      onClick={() => onNavigateToRevision(ch.title, ch.id)}
                      className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Zap className="w-3 h-3 text-rose-600" />
                      <span>Revise</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Test History Timeline */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
        <h2 className="font-serif text-xl font-bold text-slate-900">
          Recent Test History & Speed Benchmarks
        </h2>

        <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
          {progress.recentTestScores.map((t, idx) => (
            <div
              key={idx}
              className="p-4 flex items-center justify-between text-xs bg-white hover:bg-slate-50"
            >
              <div>
                <span className="font-semibold text-slate-900 text-sm block">{t.testTitle}</span>
                <span className="text-slate-500 font-mono text-[11px]">{t.date} · Time: {t.timeTaken}</span>
              </div>

              <div className="text-right font-mono">
                <span className="font-bold text-slate-900 text-sm block tabular-nums">
                  {t.score} / {t.total} ({t.percentage}%)
                </span>
                <span className="text-emerald-700 font-medium">Verified Score</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
