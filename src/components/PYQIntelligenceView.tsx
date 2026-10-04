import React, { useState } from 'react';
import {
  FileText,
  Calendar,
  Layers,
  Award,
  Filter,
  CheckCircle2,
  ChevronDown,
  Info,
  TrendingUp,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { PYQuestion, Board, Subject, QuestionType, Difficulty } from '../types';
import { MOCK_PYQS } from '../data/mockData';

interface PYQIntelligenceViewProps {
  currentBoard: Board;
  currentSubject: Subject;
  initialChapterId?: string;
  onSolveQuestion?: (pyqId: string) => void;
}

export const PYQIntelligenceView: React.FC<PYQIntelligenceViewProps> = ({
  currentBoard,
  currentSubject,
  initialChapterId,
}) => {
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [selectedMarks, setSelectedMarks] = useState<number | 'all'>('all');
  const [selectedFrequency, setSelectedFrequency] = useState<string | 'all'>('all');
  const [expandedSolutions, setExpandedSolutions] = useState<Record<string, boolean>>({});

  const years = [2024, 2023, 2022, 2020, 2019, 2018];
  const marksOptions = [1, 2, 3, 5];

  const filteredPYQs = MOCK_PYQS.filter((pyq) => {
    if (selectedYear !== 'all' && pyq.year !== selectedYear) return false;
    if (selectedMarks !== 'all' && pyq.marks !== selectedMarks) return false;
    if (selectedFrequency !== 'all' && pyq.frequencyScore !== selectedFrequency) return false;
    return true;
  });

  const toggleSolution = (id: string) => {
    setExpandedSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              PYQ Intelligence Engine
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified historical question patterns, concepts tested, and official marking schemes from 2018–2024.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            <span>Verified Database: 7 Years</span>
            <span className="text-slate-400">·</span>
            <span>All-India & Delhi Sets</span>
          </div>
        </div>
      </div>

      {/* Mandatory Accuracy Disclaimer Banner */}
      <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
        <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-900 font-semibold block">
            Academic Integrity Notice regarding Past Board Papers:
          </strong>
          <span>
            Verified historical frequency reflects authentic occurrences in past official board question papers (CBSE, ICSE & State Boards). Historical recurrence patterns demonstrate high syllabus emphasis and core conceptual weightage, but they do NOT guarantee that a specific question will appear in future examinations.
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Year selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mr-1">
              Exam Year:
            </span>
            <button
              onClick={() => setSelectedYear('all')}
              className={`px-2.5 py-1 text-xs rounded-md font-medium cursor-pointer ${
                selectedYear === 'all'
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Years
            </button>
            {years.map((y) => (
              <button
                key={y}
                onClick={() => setSelectedYear(y)}
                className={`px-2.5 py-1 text-xs rounded-md font-mono cursor-pointer ${
                  selectedYear === y
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {y}
              </button>
            ))}
          </div>

          {/* Marks selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mr-1">
              Marks:
            </span>
            <button
              onClick={() => setSelectedMarks('all')}
              className={`px-2.5 py-1 text-xs rounded-md font-medium cursor-pointer ${
                selectedMarks === 'all'
                  ? 'bg-emerald-100 text-emerald-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Marks
            </button>
            {marksOptions.map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMarks(m)}
                className={`px-2.5 py-1 text-xs rounded-md font-mono cursor-pointer ${
                  selectedMarks === m
                    ? 'bg-emerald-100 text-emerald-900 font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {m}M
              </button>
            ))}
          </div>

          {/* Historical Frequency */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mr-1">
              Tested Frequency:
            </span>
            {['all', 'Very High', 'High'].map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFrequency(f)}
                className={`px-2.5 py-1 text-xs rounded-md cursor-pointer ${
                  selectedFrequency === f
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {f === 'all' ? 'All Frequencies' : f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* PYQ Question Cards */}
      <div className="space-y-6">
        {filteredPYQs.map((pyq) => {
          const isExpanded = !!expandedSolutions[pyq.id];

          return (
            <div
              key={pyq.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4"
            >
              {/* Top metadata strip (Unboxed text with typographic separators) */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-slate-900 font-mono">
                    {pyq.board} · {pyq.year}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-slate-700">{pyq.set}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-semibold text-emerald-800 font-mono">{pyq.marks} Marks</span>
                  <span aria-hidden="true">·</span>
                  <span>{pyq.topic}</span>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400 text-[11px]">Historical Frequency:</span>
                  <span
                    className={`font-semibold font-mono text-xs ${
                      pyq.frequencyScore === 'Very High'
                        ? 'text-rose-700'
                        : pyq.frequencyScore === 'High'
                        ? 'text-amber-700'
                        : 'text-slate-700'
                    }`}
                  >
                    ● {pyq.frequencyScore}
                  </span>
                </div>
              </div>

              {/* Historical Intelligence Analysis Box */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Historical Question Frequency & Tested Concepts:</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {pyq.historicalFrequencyNotes}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[10px] text-slate-400 font-medium">Core Concepts:</span>
                  {pyq.conceptsTested.map((concept) => (
                    <span
                      key={concept}
                      className="text-[11px] font-medium text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded"
                    >
                      {concept}
                    </span>
                  ))}
                </div>
              </div>

              {/* Question Text */}
              <div className="text-sm font-medium text-slate-900 leading-relaxed whitespace-pre-line py-1">
                {pyq.question}
              </div>

              {/* Collapsible Official Solution & Step Marking */}
              {isExpanded && (
                <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-200 space-y-4 text-xs animate-in fade-in duration-150">
                  <div>
                    <span className="font-semibold uppercase tracking-wider text-emerald-950 text-[11px] block mb-2">
                      CBSE / Official Board Step-by-Step Marking Scheme:
                    </span>
                    <div className="space-y-1.5">
                      {pyq.markingBreakdown.map((mb, mIdx) => (
                        <div key={mIdx} className="flex items-center justify-between text-slate-800 bg-white p-2.5 rounded-lg border border-emerald-100">
                          <span>{mb.step}</span>
                          <span className="font-mono font-bold text-emerald-800 shrink-0 ml-2">
                            +{mb.marks}M
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-900 block mb-1">
                      Model Answer for Examiner Full Marks:
                    </span>
                    <div className="p-3 bg-white rounded-lg border border-slate-200 text-slate-800 leading-relaxed whitespace-pre-line font-mono text-[11px]">
                      {pyq.officialSolution}
                    </div>
                  </div>
                </div>
              )}

              {/* Solution Toggle Button */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <button
                  onClick={() => toggleSolution(pyq.id)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
                >
                  {isExpanded ? 'Hide Model Solution' : 'View Verified Model Solution & Step Marks'}
                </button>
                <span className="text-[11px] text-slate-400 font-mono">
                  Standard Board Answer Format
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
