import React from 'react';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Target,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  ChevronRight,
  Zap,
  BarChart2
} from 'lucide-react';
import { UserProgress, Chapter, ActiveView } from '../types';

interface DashboardViewProps {
  progress: UserProgress;
  chapters: Chapter[];
  onNavigate: (view: ActiveView, contextId?: string) => void;
  onStartRevisionLoop: (topicName: string, chapterId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  progress,
  chapters,
  onNavigate,
  onStartRevisionLoop,
}) => {
  // Aggregate subject progress
  const scienceChapters = chapters.filter((c) => c.subject === 'Science');
  const mathChapters = chapters.filter((c) => c.subject === 'Mathematics');

  const scienceAvg = Math.round(
    scienceChapters.reduce((acc, c) => acc + c.completionPercentage, 0) / (scienceChapters.length || 1)
  );
  const mathAvg = Math.round(
    mathChapters.reduce((acc, c) => acc + c.completionPercentage, 0) / (mathChapters.length || 1)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner: Greeting & Readiness */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Target Board Score: {progress.targetPercentage}%+</span>
            <span className="text-emerald-400">·</span>
            <span>Day {progress.streakDays} Streak 🔥</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Welcome back, Student
          </h1>
          <p className="text-sm text-slate-600 max-w-xl">
            TOPIT has analyzed your recent mock test performances and question accuracy. Here is your personalized plan to close the gap to 95%+.
          </p>
        </div>

        {/* Readiness Meter */}
        <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 shrink-0">
          <div className="w-16 h-16 rounded-full border-4 border-emerald-600 flex items-center justify-center bg-white shadow-inner">
            <span className="font-serif text-xl font-bold text-slate-900 font-mono tabular-nums">
              {progress.overallReadiness}%
            </span>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
              Overall Preparation
            </span>
            <span className="text-sm font-bold text-emerald-800">
              Exam Ready Track
            </span>
            <span className="text-[11px] text-slate-500 block mt-0.5">
              +6% improvement this week
            </span>
          </div>
        </div>
      </div>

      {/* Core Metrics Ribbon */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-white border border-slate-200">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Overall Accuracy</span>
            <Target className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-2xl font-bold text-slate-900 font-mono tabular-nums">
              {progress.accuracy}%
            </span>
            <span className="text-xs text-emerald-700 font-medium">Top 5% bracket</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${progress.accuracy}%` }} />
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Study Time</span>
            <Clock className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-2xl font-bold text-slate-900 font-mono tabular-nums">
              {progress.studyTimeHours}h
            </span>
            <span className="text-xs text-slate-500">this month</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-3">Target: 60h before board exams</p>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Questions Solved</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-2xl font-bold text-slate-900 font-mono tabular-nums">
              {progress.questionsSolved}
            </span>
            <span className="text-xs text-emerald-700 font-medium">+140 this week</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-3">PYQs, MCQs & Numericals</p>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Tests Completed</span>
            <BarChart2 className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-2xl font-bold text-slate-900 font-mono tabular-nums">
              {progress.testsCompleted}
            </span>
            <span className="text-xs text-slate-500">Mocks & Chapter tests</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-3">Avg score: 81.2%</p>
        </div>
      </div>

      {/* Personalized Recommendation: "What to Study Next" (The Key Differentiator) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-700" />
              <span>Personalized: What to Study Next</span>
            </h2>
            <p className="text-xs text-slate-500">
              Prioritized mathematically by your accuracy gaps and board examination mark weightage.
            </p>
          </div>
          <button
            onClick={() => onNavigate('revision')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
          >
            <span>View Complete Revision Queue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {progress.weakTopics.map((topic, idx) => (
            <div
              key={topic.name}
              className="p-5 rounded-2xl border border-rose-200 bg-rose-50/30 hover:border-rose-300 hover:bg-rose-50/50 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-medium text-rose-800 uppercase tracking-wider bg-rose-100/80 px-2 py-0.5 rounded">
                    Priority #{idx + 1} · {topic.subject}
                  </span>
                  <span className="text-xs font-bold text-rose-800 font-mono tabular-nums">
                    {topic.accuracy}% Accuracy
                  </span>
                </div>
                <h3 className="font-semibold text-base text-slate-900 leading-snug">
                  {topic.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {topic.recommendedAction}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-rose-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">~15 min targeted loop</span>
                <button
                  onClick={() => onStartRevisionLoop(topic.name, topic.chapterId)}
                  className="px-3 py-1.5 bg-rose-700 hover:bg-rose-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                >
                  <Zap className="w-3 h-3" />
                  <span>Start Sprint</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Two Column Layout: Subject-Wise Progress & Weak vs Strong Topics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject-Wise Progress */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Subject-Wise Preparation
            </h3>
            <span className="text-xs text-slate-500">Board Syllabus Coverage</span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="font-semibold text-slate-800">Science (Class 10)</span>
                <span className="font-bold text-slate-900 font-mono tabular-nums">{scienceAvg}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full transition-all" style={{ width: `${scienceAvg}%` }} />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                <span>Physics, Chemistry & Biology</span>
                <span>6 Chapters active · 122 PYQs</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="font-semibold text-slate-800">Mathematics (Class 10)</span>
                <span className="font-bold text-slate-900 font-mono tabular-nums">{mathAvg}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full transition-all" style={{ width: `${mathAvg}%` }} />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                <span>Algebra, Trigonometry & Geometry</span>
                <span>4 Chapters active · 74 PYQs</span>
              </div>
            </div>

            {/* Chapter quick breakdown */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                Chapter Mastery Snapshot
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {chapters.slice(0, 4).map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => onNavigate('learn', ch.id)}
                    className="p-2.5 rounded-xl border border-slate-200 text-left hover:border-slate-300 hover:bg-slate-50 transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span className="truncate pr-1 font-medium text-slate-800">{ch.title}</span>
                    <span
                      className={`text-[10px] font-bold font-mono shrink-0 ${
                        ch.status === 'mastered'
                          ? 'text-emerald-700'
                          : ch.status === 'improving'
                          ? 'text-amber-700'
                          : 'text-rose-700'
                      }`}
                    >
                      {ch.completionPercentage}%
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Strong vs Weak Concepts Matrix */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Concept Mastery Balance
            </h3>
            <button
              onClick={() => onNavigate('analytics')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
            >
              Full Diagnostics
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Strong Topics */}
            <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Strong Topics (&gt;80%)</span>
              </div>
              <div className="space-y-2 text-xs">
                {progress.strongTopics.map((st) => (
                  <div key={st.name} className="flex items-center justify-between text-slate-800">
                    <span className="truncate pr-2">{st.name}</span>
                    <span className="font-mono font-bold text-emerald-800 shrink-0">{st.accuracy}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weak Topics */}
            <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-900 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-rose-700" />
                <span>Needs Focus (&lt;60%)</span>
              </div>
              <div className="space-y-2 text-xs">
                {progress.weakTopics.map((wt) => (
                  <div key={wt.name} className="flex items-center justify-between text-slate-800">
                    <span className="truncate pr-2">{wt.name}</span>
                    <span className="font-mono font-bold text-rose-800 shrink-0">{wt.accuracy}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick diagnostic tip */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-600">
            <TrendingUp className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <p>
              <strong>TOPIT Diagnostic Rule:</strong> Raising Carbon & its Compounds from 42% to 75% will boost your projected board examination total by 4–6 raw marks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
