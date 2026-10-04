import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  Layers,
  FileCheck,
  Zap,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  Bot,
  CheckCircle2,
  Check
} from 'lucide-react';
import { Chapter, ConceptDetail, ActiveView } from '../types';
import { MOCK_CONCEPTS } from '../data/mockData';

interface LearnViewProps {
  chapters: Chapter[];
  selectedChapterId?: string;
  onNavigate: (view: ActiveView, contextId?: string, query?: string) => void;
}

type LearnTab = 'simple' | 'detail' | 'revision' | 'formulas' | 'examples' | 'tricks';

export const LearnView: React.FC<LearnViewProps> = ({
  chapters,
  selectedChapterId,
  onNavigate,
}) => {
  const [activeChapterId, setActiveChapterId] = useState<string>(
    selectedChapterId || chapters[0]?.id || 'ch-carbon'
  );
  const [activeTab, setActiveTab] = useState<LearnTab>('simple');

  const currentChapter = chapters.find((c) => c.id === activeChapterId) || chapters[0];
  const concept = MOCK_CONCEPTS[activeChapterId] || MOCK_CONCEPTS['ch-carbon'];

  const tabs: { id: LearnTab; label: string; icon: React.ReactNode }[] = [
    { id: 'simple', label: 'Simple Explanation', icon: <Lightbulb className="w-3.5 h-3.5" /> },
    { id: 'detail', label: 'Detailed Board Syllabus', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'revision', label: 'Quick Revision', icon: <FileCheck className="w-3.5 h-3.5" /> },
    { id: 'formulas', label: 'Formulas & Equations', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'examples', label: 'Solved Board Examples', icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
    { id: 'tricks', label: 'Tricks & Mnemonics', icon: <Zap className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Chapter Selection Horizontal Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Learn Engine
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Structured conceptual clarity: from intuitive analogies to high-scoring board examiner answers.
          </p>
        </div>

        {/* Quick action: Ask AI Tutor about this chapter */}
        <button
          onClick={() => onNavigate('ai-tutor', undefined, currentChapter.title)}
          className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 transition-colors cursor-pointer"
        >
          <Bot className="w-4 h-4 text-emerald-700" />
          <span>Ask AI Tutor about {currentChapter.title}</span>
        </button>
      </div>

      {/* Chapters Pills / Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {chapters.map((ch) => {
          const isSelected = ch.id === activeChapterId;
          return (
            <button
              key={ch.id}
              onClick={() => setActiveChapterId(ch.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-sm font-semibold'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>{ch.title}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                isSelected ? 'bg-slate-800 text-emerald-300' : 'bg-slate-100 text-slate-500'
              }`}>
                {ch.weightageMarks}M
              </span>
            </button>
          );
        })}
      </div>

      {/* Chapter Banner */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>{currentChapter.board}</span>
            <span>·</span>
            <span>{currentChapter.classLevel}</span>
            <span>·</span>
            <span className="font-semibold text-emerald-800">{currentChapter.subject}</span>
            <span>·</span>
            <span>Weightage: {currentChapter.weightageMarks} Marks</span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
            {currentChapter.title}
          </h2>
          <p className="text-xs text-slate-600 max-w-2xl">{currentChapter.summary}</p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => onNavigate('practice', currentChapter.id)}
            className="flex-1 md:flex-initial px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <span>Practice Questions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNavigate('pyqs', currentChapter.id)}
            className="flex-1 md:flex-initial px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            <span>View PYQs ({currentChapter.pyqFrequencyCount})</span>
          </button>
        </div>
      </div>

      {/* Interactive Tabs (Segmented Control - Compliant with Zero-Pill Rule) */}
      <div className="flex items-center gap-1 p-1 bg-slate-100/90 rounded-xl overflow-x-auto scrollbar-none border border-slate-200">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Canvas */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 min-h-[420px] shadow-sm">
        {/* Simple Explanation */}
        {activeTab === 'simple' && (
          <div className="space-y-6 max-w-3xl">
            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  Intuitive Analogy (ELI10)
                </h4>
                <p className="text-sm text-slate-700 mt-1 leading-relaxed">
                  {concept.simpleExplanation}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Key Conceptual Insights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
                  <span className="font-semibold text-xs text-slate-900 block">Why it matters for Boards</span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Examiners test the fundamental reason behind this topic in 2-mark definitions and Assertion-Reasoning questions.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
                  <span className="font-semibold text-xs text-slate-900 block">Examiner Trap to Avoid</span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Avoid vague general statements. Always mention specific physical laws, catalysts, or state changes (e.g. effervescence, precipitate).
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Detailed Board Syllabus */}
        {activeTab === 'detail' && (
          <div className="space-y-6 max-w-3xl">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-serif text-xl font-bold text-slate-900">
                Formal Board Syllabus Specification
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Aligned with NCERT textbooks and standard Indian Board marking schemes.
              </p>
            </div>

            <div className="space-y-4">
              {concept.detailedExplanation.map((para, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-slate-50/30">
                  <p className="text-sm text-slate-800 leading-relaxed">{para}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Revision */}
        {activeTab === 'revision' && (
          <div className="space-y-6 max-w-3xl">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Last-Minute Revision Bullet Points
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  High-yield concepts to review 24 hours prior to the examination.
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              {concept.quickRevisionBullets.map((bullet, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-sm text-slate-800 leading-relaxed">{bullet}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Formulas & Equations */}
        {activeTab === 'formulas' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-serif text-xl font-bold text-slate-900">
                Core Formulas & Balanced Equations
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Every symbol, unit, and condition required for full marks in numericals and chemical equations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {concept.formulas.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-2"
                >
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                      {item.name}
                    </span>
                    <div className="my-2 p-2.5 bg-white border border-slate-200 rounded-lg text-emerald-950 font-mono text-sm font-semibold overflow-x-auto">
                      {item.formula}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 italic">
                    Note: {item.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Solved Board Examples */}
        {activeTab === 'examples' && (
          <div className="space-y-6 max-w-3xl">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-serif text-xl font-bold text-slate-900">
                Step-by-Step Solved Board Examples
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                See where marks are awarded and where students lose 1/2 marks.
              </p>
            </div>

            <div className="space-y-6">
              {concept.solvedExamples.map((ex, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border border-slate-200 bg-white space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-slate-900">{ex.title}</span>
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded border border-emerald-200">
                      {ex.marks} Marks
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-medium text-slate-800">
                    <strong>Question:</strong> {ex.question}
                  </div>

                  <div className="space-y-2 text-xs">
                    <span className="font-semibold uppercase tracking-wider text-slate-400 block">
                      Model Marking Scheme Steps:
                    </span>
                    {ex.solutionSteps.map((step, sIdx) => (
                      <div key={sIdx} className="p-2.5 rounded-lg bg-emerald-50/40 border border-emerald-100 text-slate-800">
                        {step}
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span><strong>Examiner Advice:</strong> {ex.markingTips}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tricks & Mnemonics */}
        {activeTab === 'tricks' && (
          <div className="space-y-6 max-w-3xl">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-serif text-xl font-bold text-slate-900">
                Memory Tricks & Mnemonics
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Retention techniques to recall order, nomenclature, and diagrams in high-pressure exam halls.
              </p>
            </div>

            <div className="space-y-4">
              {concept.tricksAndMnemonics.map((trick, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-2"
                >
                  <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block">
                    {trick.name}
                  </span>
                  <div className="p-3 bg-white border border-slate-200 rounded-xl text-base font-serif font-bold text-slate-900">
                    “{trick.phrase}”
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">{trick.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
