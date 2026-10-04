import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  BookOpen,
  CheckCircle2,
  FileText,
  Clock,
  RotateCcw,
  Bot,
  FlaskConical,
  Library,
  ArrowRight
} from 'lucide-react';
import { ActiveView } from '../types';
import { INITIAL_CHAPTERS, MOCK_PRACTICE_QUESTIONS, MOCK_PYQS, MOCK_TESTS, MOCK_PRACTICALS, MOCK_RESOURCES } from '../data/mockData';

interface UniversalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (view: ActiveView, contextId?: string, query?: string) => void;
}

export const UniversalSearchModal: React.FC<UniversalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectResult,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchTerm('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const query = searchTerm.trim().toLowerCase();

  // Search through all sectors
  const matchingChapters = INITIAL_CHAPTERS.filter(
    (c) =>
      c.title.toLowerCase().includes(query) ||
      c.summary.toLowerCase().includes(query) ||
      c.keyTopics.some((t) => t.toLowerCase().includes(query))
  );

  const matchingQuestions = MOCK_PRACTICE_QUESTIONS.filter(
    (q) =>
      q.question.toLowerCase().includes(query) ||
      q.topic.toLowerCase().includes(query) ||
      q.explanation.toLowerCase().includes(query)
  );

  const matchingPYQs = MOCK_PYQS.filter(
    (pyq) =>
      pyq.question.toLowerCase().includes(query) ||
      pyq.topic.toLowerCase().includes(query) ||
      pyq.conceptsTested.some((c) => c.toLowerCase().includes(query))
  );

  const matchingTests = MOCK_TESTS.filter(
    (t) =>
      t.title.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query) ||
      (t.chapterName && t.chapterName.toLowerCase().includes(query))
  );

  const matchingPracticals = MOCK_PRACTICALS.filter(
    (p) =>
      p.title.toLowerCase().includes(query) ||
      p.objective.toLowerCase().includes(query) ||
      p.apparatus.some((a) => a.toLowerCase().includes(query))
  );

  const matchingResources = MOCK_RESOURCES.filter(
    (r) =>
      r.title.toLowerCase().includes(query) ||
      r.description.toLowerCase().includes(query) ||
      r.category.toLowerCase().includes(query)
  );

  const hasResults =
    matchingChapters.length > 0 ||
    matchingQuestions.length > 0 ||
    matchingPYQs.length > 0 ||
    matchingTests.length > 0 ||
    matchingPracticals.length > 0 ||
    matchingResources.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search topic e.g. 'Carbon Compounds', 'Electricity', 'Ohm', 'Quadratic'..."
            className="w-full text-base bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline px-2 py-0.5 text-xs text-slate-500 bg-slate-200/70 border border-slate-300 rounded font-mono">
            ESC
          </kbd>
        </div>

        {/* Results Area */}
        <div className="p-6 overflow-y-auto space-y-6">
          {!searchTerm ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Suggested Topics to Search
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Carbon Compounds',
                  'Electricity & Ohm’s Law',
                  'Light Reflection & Lenses',
                  'Quadratic Equations',
                  'Chemical Reactions',
                  'Triangles BPT Theorem',
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => setSearchTerm(item)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                <span className="font-semibold text-slate-800 block">Universal Search Scope:</span>
                <p>
                  Searching returns all matching Concepts, Practice Questions, Previous Year Questions, Mock Tests, Smart Revision pathways, NCERT/Exemplar texts, AI Tutor shortcuts, and Practical Lab experiments.
                </p>
              </div>
            </div>
          ) : !hasResults ? (
            <div className="py-12 text-center">
              <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-medium text-slate-700">No direct matches found for "{searchTerm}"</p>
              <p className="text-xs text-slate-500 mt-1">
                You can still ask the AI Tutor to generate notes or a quiz on this topic:
              </p>
              <button
                onClick={() => {
                  onSelectResult('ai-tutor', undefined, searchTerm);
                  onClose();
                }}
                className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg shadow-sm"
              >
                <Bot className="w-4 h-4" />
                <span>Ask AI Tutor about "{searchTerm}"</span>
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Quick AI Action banner */}
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Bot className="w-5 h-5 text-emerald-700" />
                  <div>
                    <span className="text-xs font-semibold text-emerald-950 block">AI Tutor Knowledge Action</span>
                    <span className="text-[11px] text-emerald-800">
                      Explain "{searchTerm}" simply or check your board answers
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    onSelectResult('ai-tutor', undefined, searchTerm);
                    onClose();
                  }}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs flex items-center gap-1 cursor-pointer"
                >
                  <span>Launch Tutor</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Concepts & Chapters */}
              {matchingChapters.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Concepts & Learn Modules ({matchingChapters.length})</span>
                  </h3>
                  <div className="space-y-1.5">
                    {matchingChapters.map((ch) => (
                      <button
                        key={ch.id}
                        onClick={() => {
                          onSelectResult('learn', ch.id);
                          onClose();
                        }}
                        className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 transition-all flex items-center justify-between cursor-pointer"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-xs text-slate-900">{ch.title}</span>
                            <span className="text-[10px] text-slate-500">· {ch.subject}</span>
                            <span className="text-[10px] text-slate-500">· {ch.weightageMarks} Marks</span>
                          </div>
                          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{ch.summary}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Practice Questions */}
              {matchingQuestions.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Practice Questions ({matchingQuestions.length})</span>
                  </h3>
                  <div className="space-y-1.5">
                    {matchingQuestions.map((q) => (
                      <button
                        key={q.id}
                        onClick={() => {
                          onSelectResult('practice', q.id);
                          onClose();
                        }}
                        className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 transition-all flex items-center justify-between cursor-pointer"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-xs text-slate-900">{q.topic}</span>
                            <span className="text-[10px] text-slate-500">· Type: {q.type}</span>
                            <span className="text-[10px] text-emerald-700">· {q.difficulty}</span>
                          </div>
                          <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">{q.question}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* PYQ Intelligence */}
              {matchingPYQs.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-emerald-600" />
                    <span>PYQ Intelligence ({matchingPYQs.length})</span>
                  </h3>
                  <div className="space-y-1.5">
                    {matchingPYQs.map((pyq) => (
                      <button
                        key={pyq.id}
                        onClick={() => {
                          onSelectResult('pyqs', pyq.id);
                          onClose();
                        }}
                        className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 transition-all flex items-center justify-between cursor-pointer"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-xs text-slate-900">{pyq.topic}</span>
                            <span className="text-[10px] text-slate-500">· {pyq.year} ({pyq.set})</span>
                            <span className="text-[10px] text-emerald-700 font-mono">· {pyq.marks}M</span>
                          </div>
                          <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">{pyq.question}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tests */}
              {matchingTests.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Mock & Diagnostic Tests ({matchingTests.length})</span>
                  </h3>
                  <div className="space-y-1.5">
                    {matchingTests.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          onSelectResult('tests', t.id);
                          onClose();
                        }}
                        className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 transition-all flex items-center justify-between cursor-pointer"
                      >
                        <div>
                          <span className="font-semibold text-xs text-slate-900 block">{t.title}</span>
                          <span className="text-[11px] text-slate-500">
                            {t.durationMinutes} mins · {t.totalMarks} Marks · {t.questionsCount} Questions
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Practicals & Resources */}
              {(matchingPracticals.length > 0 || matchingResources.length > 0) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {matchingPracticals.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                        <FlaskConical className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Practical Lab</span>
                      </h3>
                      <div className="space-y-1.5">
                        {matchingPracticals.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => {
                              onSelectResult('lab', p.id);
                              onClose();
                            }}
                            className="w-full text-left p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs cursor-pointer"
                          >
                            <span className="font-semibold text-slate-800 block truncate">{p.title}</span>
                            <span className="text-[10px] text-slate-500 block">Procedure, Observations & Viva</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {matchingResources.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                        <Library className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Authorized Resources</span>
                      </h3>
                      <div className="space-y-1.5">
                        {matchingResources.map((r) => (
                          <button
                            key={r.id}
                            onClick={() => {
                              onSelectResult('resources', r.id);
                              onClose();
                            }}
                            className="w-full text-left p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs cursor-pointer"
                          >
                            <span className="font-semibold text-slate-800 block truncate">{r.title}</span>
                            <span className="text-[10px] text-slate-500 block">{r.category}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Search index covers NCERT, Exemplar, CBSE & ICSE PYQs (2018–2025)</span>
          <span className="hidden sm:inline font-mono">Press ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
};
