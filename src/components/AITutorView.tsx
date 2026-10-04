import React, { useState, useEffect } from 'react';
import {
  Bot,
  Sparkles,
  Send,
  Loader2,
  Lightbulb,
  BookOpen,
  FileCheck,
  CheckCircle2,
  HelpCircle,
  Clock,
  Layers,
  Award,
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import { Board, ClassLevel, Subject } from '../types';

interface AITutorViewProps {
  board: Board;
  classLevel: ClassLevel;
  subject: Subject;
  initialTopic?: string;
  initialQuery?: string;
}

type TutorMode =
  | 'explain_simply'
  | 'explain_detail'
  | 'give_examples'
  | 'teach_me'
  | 'create_quiz'
  | 'check_answer'
  | 'revision_notes'
  | 'test_me';

interface ModeConfig {
  id: TutorMode;
  label: string;
  desc: string;
  icon: React.ReactNode;
}

export const AITutorView: React.FC<AITutorViewProps> = ({
  board,
  classLevel,
  subject,
  initialTopic,
  initialQuery,
}) => {
  const [topic, setTopic] = useState<string>(initialTopic || 'Carbon & its Compounds');
  const [activeMode, setActiveMode] = useState<TutorMode>('explain_simply');
  const [customQuery, setCustomQuery] = useState<string>(initialQuery || '');
  const [studentAnswer, setStudentAnswer] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [responseMarkdown, setResponseMarkdown] = useState<string>('');
  const [responseSource, setResponseSource] = useState<string>('');

  const modes: ModeConfig[] = [
    { id: 'explain_simply', label: 'Explain Simply', desc: 'Analogy & ELI10 clarity', icon: <Lightbulb className="w-4 h-4" /> },
    { id: 'explain_detail', label: 'Explain in Detail', desc: 'Formal board laws & reactions', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'give_examples', label: 'Give Examples', desc: 'Board question formats & steps', icon: <CheckCircle2 className="w-4 h-4" /> },
    { id: 'teach_me', label: 'Teach Me', desc: 'Interactive micro-steps', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'create_quiz', label: 'Create Quiz', desc: '3 Board-level questions', icon: <Clock className="w-4 h-4" /> },
    { id: 'check_answer', label: 'Check My Answer', desc: 'CBSE/ICSE Rubric evaluation', icon: <Award className="w-4 h-4" /> },
    { id: 'revision_notes', label: 'Make Revision Notes', desc: 'High-yield memory sheet', icon: <FileCheck className="w-4 h-4" /> },
    { id: 'test_me', label: 'Test Me', desc: 'High-frequency board question', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  const presetTopics = [
    'Carbon & its Compounds',
    'Electricity & Ohm’s Law',
    'Light: Reflection & Mirrors',
    'Life Processes & Circulation',
    'Quadratic Equations (Roots)',
    'Triangles (BPT Proof)',
  ];

  const handleRunTutor = async (modeToUse: TutorMode = activeMode) => {
    setLoading(true);
    setResponseMarkdown('');
    try {
      const res = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: modeToUse,
          topic,
          subject,
          classLevel,
          board,
          studentAnswer: modeToUse === 'check_answer' ? studentAnswer : undefined,
          query: customQuery || undefined,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }
      const data = await res.json();
      setResponseMarkdown(data.text || 'No response returned.');
      setResponseSource(data.source || 'gemini');
    } catch (err: any) {
      setResponseMarkdown(
        `### 💡 TOPIT Educational Guidance\n\nCould not reach the server endpoint at this moment. You can still review the curated notes in the **Learn** tab or try again in a few moments.`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Run default explanation when loaded
    handleRunTutor('explain_simply');
  }, [topic]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 w-fit mb-2">
              <Bot className="w-3.5 h-3.5" />
              <span>Dedicated Board Examination AI Assistant</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              AI Board Exam Tutor
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Strictly trained on NCERT concepts, CBSE/ICSE answer evaluation rubrics, and step-marking schemes.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-2 px-3 rounded-xl border border-slate-200">
            <span>Context:</span>
            <strong className="text-slate-900">{board}</strong> ·{' '}
            <strong className="text-slate-900">{classLevel}</strong> ·{' '}
            <strong className="text-emerald-800">{subject}</strong>
          </div>
        </div>
      </div>

      {/* Topic Switcher & Quick Topics */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 shrink-0">
              Topic:
            </span>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Carbon Compounds, Ohm's Law, Trigonometry..."
              className="w-full text-sm font-semibold text-slate-900 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider shrink-0">
              Quick:
            </span>
            {presetTopics.map((pt) => (
              <button
                key={pt}
                onClick={() => setTopic(pt)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap cursor-pointer ${
                  topic === pt
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                {pt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 8 Action Modes (Responsive Grid) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {modes.map((m) => {
          const isSelected = activeMode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => {
                setActiveMode(m.id);
                handleRunTutor(m.id);
              }}
              className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center cursor-pointer ${
                isSelected
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-xs'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="mb-1 text-emerald-700">{m.icon}</div>
              <span className="text-xs leading-snug">{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* Answer Checker Input (Shows when 'check_answer' is selected) */}
      {activeMode === 'check_answer' && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <label className="text-xs font-semibold text-slate-800 uppercase tracking-wider block">
            Paste or Type Your Board Answer to Evaluate Against Marking Rubric:
          </label>
          <textarea
            rows={4}
            value={studentAnswer}
            onChange={(e) => setStudentAnswer(e.target.value)}
            placeholder="e.g. Write your answer for: 'Why does carbon form covalent bonds and not ionic bonds?' or any board numerical solution steps..."
            className="w-full text-sm text-slate-800 p-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-emerald-600"
          />
          <div className="flex justify-end">
            <button
              onClick={() => handleRunTutor('check_answer')}
              className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>Evaluate My Answer & Estimate Marks</span>
            </button>
          </div>
        </div>
      )}

      {/* Tutor Response Output Screen */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm min-h-[380px] space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-emerald-700" />
            <span className="font-serif text-base font-bold text-slate-900">
              Tutor Response · {modes.find((m) => m.id === activeMode)?.label}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>Subject: {subject}</span>
            <span aria-hidden="true">·</span>
            <span>{classLevel}</span>
          </div>
        </div>

        {loading ? (
          <div className="py-20 text-center space-y-3">
            <Loader2 className="w-8 h-8 text-emerald-700 animate-spin mx-auto" />
            <p className="text-sm font-medium text-slate-700">
              Consulting Board Marking Schemes and NCERT syllabus...
            </p>
            <p className="text-xs text-slate-400">
              Generating structured steps and high-yield presentation points
            </p>
          </div>
        ) : (
          <div className="prose prose-slate max-w-none text-slate-800 leading-relaxed text-sm whitespace-pre-line">
            {responseMarkdown}
          </div>
        )}
      </div>
    </div>
  );
};
