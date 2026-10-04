import React from 'react';
import {
  User,
  School,
  Target,
  Flame,
  Clock,
  RotateCcw,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Board, ClassLevel, Subject, UserProgress } from '../types';

interface ProfileViewProps {
  board: Board;
  classLevel: ClassLevel;
  subject: Subject;
  progress: UserProgress;
  onOpenBoardSelector: () => void;
  onResetProgress: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  board,
  classLevel,
  subject,
  progress,
  onOpenBoardSelector,
  onResetProgress,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-serif text-2xl font-bold shadow-md">
            ST
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-bold text-slate-900">
                Board Candidate Profile
              </h1>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                Target 95%+
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Active Curriculum: <strong className="text-slate-800">{board}</strong> ·{' '}
              <strong className="text-slate-800">{classLevel}</strong> ·{' '}
              <strong className="text-emerald-800">{subject}</strong>
            </p>
          </div>
        </div>

        <button
          onClick={onOpenBoardSelector}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
        >
          Change Board / Class
        </button>
      </div>

      {/* Target & Streaks Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase">Daily Streak</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <span className="font-serif text-3xl font-bold text-slate-900 font-mono">
            {progress.streakDays} Days
          </span>
          <p className="text-[11px] text-slate-500">Consistent daily revision logged</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase">Target Percentage</span>
            <Target className="w-4 h-4 text-emerald-700" />
          </div>
          <span className="font-serif text-3xl font-bold text-slate-900 font-mono">
            {progress.targetPercentage}%
          </span>
          <p className="text-[11px] text-slate-500">Board Exam Target Score</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase">Hours Invested</span>
            <Clock className="w-4 h-4 text-emerald-700" />
          </div>
          <span className="font-serif text-3xl font-bold text-slate-900 font-mono">
            {progress.studyTimeHours}h
          </span>
          <p className="text-[11px] text-slate-500">Total deep focus study hours</p>
        </div>
      </div>

      {/* Preparation Milestones */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
        <h2 className="font-serif text-lg font-bold text-slate-900">
          Board Examination Preparation Milestones
        </h2>

        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="font-medium text-slate-800">
                1st Round NCERT Theory & Examples Completed
              </span>
            </div>
            <span className="font-mono text-emerald-800 font-semibold">100%</span>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="font-medium text-slate-800">
                Chapter-Wise PYQ 5-Year High Frequency Solved
              </span>
            </div>
            <span className="font-mono text-emerald-800 font-semibold">74%</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-slate-400" />
              <span className="font-medium text-slate-800">
                Full 80-Mark Timed Board Mock Exams (Target: 5 papers)
              </span>
            </div>
            <span className="font-mono text-slate-500 font-semibold">2 of 5</span>
          </div>
        </div>
      </div>

      {/* Reset & Privacy */}
      <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between">
        <div>
          <span className="font-semibold text-xs text-slate-800 block">
            Reset Demo Progress Data
          </span>
          <span className="text-[11px] text-slate-500">
            Resets mock test scores, diagnostic accuracy, and weak topic queues back to initial state.
          </span>
        </div>
        <button
          onClick={onResetProgress}
          className="px-3.5 py-1.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 rounded-lg text-xs font-medium cursor-pointer transition-colors"
        >
          Reset Progress
        </button>
      </div>
    </div>
  );
};
