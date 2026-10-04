import React from 'react';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileText,
  Clock,
  BarChart3,
  RotateCcw,
  Bot,
  Bell,
  FlaskConical,
  Target,
  ChevronRight,
  Check
} from 'lucide-react';
import { ActiveView, Board, ClassLevel, Subject } from '../types';

interface HeroSectionProps {
  board: Board;
  classLevel: ClassLevel;
  subject: Subject;
  onOpenBoardSelector: () => void;
  onNavigate: (view: ActiveView) => void;
  onStartPreparing: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  board,
  classLevel,
  subject,
  onOpenBoardSelector,
  onNavigate,
  onStartPreparing,
}) => {
  const coreCycle = [
    { label: 'LEARN', desc: 'Core Concepts' },
    { label: 'PRACTICE', desc: 'Competency MCQs' },
    { label: 'TEST', desc: 'Timed Mock Exams' },
    { label: 'ANALYZE', desc: 'Mistake Diagnostics' },
    { label: 'REVISE', desc: 'Targeted Notes' },
    { label: 'RETEST', desc: 'Weak Topic Check' },
    { label: 'IMPROVE', desc: 'Score 95%+' },
  ];

  const features = [
    {
      id: 'learn' as ActiveView,
      title: 'Learn Engine',
      tagline: 'Simple to In-depth Explanations',
      desc: 'Formulas, mnemonics, solved board examples, and key examiner points for every NCERT chapter.',
      icon: <BookOpen className="w-5 h-5 text-emerald-700" />,
      metric: '16 Chapters mapped',
    },
    {
      id: 'practice' as ActiveView,
      title: 'Practice Engine',
      tagline: 'All Indian Board Question Types',
      desc: 'MCQs, Assertion & Reason, Case-Based passages, Numericals, and NEP 50% Competency questions.',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-700" />,
      metric: '500+ Verified questions',
    },
    {
      id: 'pyqs' as ActiveView,
      title: 'PYQ Intelligence',
      tagline: 'Historical Frequency & Concepts',
      desc: 'Organized by year (2018–2025), marks, and sets. See which concepts are tested most frequently without false promises.',
      icon: <FileText className="w-5 h-5 text-emerald-700" />,
      metric: '7-Year verified patterns',
    },
    {
      id: 'tests' as ActiveView,
      title: 'Test Engine',
      tagline: 'Simulate the Real Board Exam',
      desc: 'Quick 10-minute sprints, Chapter tests, Full 80-mark mock papers with section timers and question palettes.',
      icon: <Clock className="w-5 h-5 text-emerald-700" />,
      metric: 'Real board format',
    },
    {
      id: 'analytics' as ActiveView,
      title: 'Analytics & Mistakes',
      tagline: 'Data-driven Diagnostic Clarity',
      desc: 'Track accuracy, time-per-question, chapter mastery, and understand whether mistakes were conceptual or calculation-based.',
      icon: <BarChart3 className="w-5 h-5 text-emerald-700" />,
      metric: 'Diagnostic accuracy engine',
    },
    {
      id: 'revision' as ActiveView,
      title: 'Smart Revision',
      tagline: 'Automatic "What to Study Next"',
      desc: 'Connects weak topics to targeted revision, 5-question drills, and retesting to guarantee measurable improvement.',
      icon: <RotateCcw className="w-5 h-5 text-emerald-700" />,
      metric: 'Closed-loop mastery',
    },
    {
      id: 'ai-tutor' as ActiveView,
      title: 'AI Board Tutor',
      tagline: '8 Tailored Study Actions',
      desc: 'Explain Simply, Give Examples, Teach Me, Create Quiz, Check My Written Answer against marking rubrics.',
      icon: <Bot className="w-5 h-5 text-emerald-700" />,
      metric: 'NCERT & Rubric aligned',
    },
    {
      id: 'lab' as ActiveView,
      title: 'Practical Lab',
      tagline: 'Science Practicals & Viva Voce',
      desc: 'Experiments, objectives, step-by-step procedures, observation tables, precautions, and essential viva Q&A.',
      icon: <FlaskConical className="w-5 h-5 text-emerald-700" />,
      metric: 'Internal marks secured',
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-16 pb-10 overflow-hidden bg-gradient-to-b from-slate-100/60 to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Top Tagline */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800">
              <span className="font-semibold">TOPIT Ecosystem</span>
              <span className="text-emerald-400">·</span>
              <span>Classes 9–12 Board Preparation</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 text-balance leading-[1.12]">
              Prepare Smarter.{' '}
              <span className="italic text-emerald-800">Score Better.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto text-balance leading-relaxed">
              Your complete Board Exam preparation ecosystem — learn, practice, test, analyze, and improve from one platform.
            </p>

            {/* Dynamic Board Selector Ribbon */}
            <div className="pt-2">
              <div className="inline-flex flex-wrap items-center justify-center gap-2 p-2 bg-white rounded-2xl border border-slate-200 shadow-sm max-w-2xl mx-auto">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-2">
                  Target:
                </span>
                <button
                  onClick={onOpenBoardSelector}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium transition-colors border border-slate-200 cursor-pointer"
                >
                  Board: <strong className="font-semibold text-slate-900">{board}</strong>
                </button>
                <button
                  onClick={onOpenBoardSelector}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium transition-colors border border-slate-200 cursor-pointer"
                >
                  Class: <strong className="font-semibold text-slate-900">{classLevel}</strong>
                </button>
                <button
                  onClick={onOpenBoardSelector}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium transition-colors border border-slate-200 cursor-pointer"
                >
                  Subject: <strong className="font-semibold text-slate-900">{subject}</strong>
                </button>
                <button
                  onClick={onOpenBoardSelector}
                  className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold px-2 cursor-pointer"
                >
                  Change
                </button>
              </div>
            </div>

            {/* Primary CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onStartPreparing}
                className="w-full sm:w-auto px-7 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <span>Start Preparing</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('revision')}
                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm rounded-xl border border-slate-200 shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-emerald-700" />
                <span>Experience Smart Revision Loop</span>
              </button>
            </div>

            {/* Proof Badges */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Strictly NCERT & Board Aligned</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>50% NEP Competency Format</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Official Step-Marking Rubrics</span>
              </span>
            </div>
          </div>
        </div>

        {/* Core Cycle Banner */}
        <div className="mt-12 border-t border-slate-200/80 bg-white/80 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between overflow-x-auto pb-2 scrollbar-none gap-2">
              {coreCycle.map((step, idx) => (
                <React.Fragment key={step.label}>
                  <div className="flex flex-col items-center min-w-[90px] shrink-0 text-center">
                    <span className="text-xs font-bold text-slate-900 tracking-wider">
                      {step.label}
                    </span>
                    <span className="text-[10px] text-slate-500">{step.desc}</span>
                  </div>
                  {idx < coreCycle.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Prominent Key Differentiator Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-2xl bg-slate-900 text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-3xl space-y-3">
            <span className="text-xs font-mono font-medium uppercase tracking-wider text-emerald-400">
              The TOPIT Advantage
            </span>
            <blockquote className="font-serif text-2xl sm:text-3xl font-semibold leading-snug">
              “Most platforms tell students what they can study. TOPIT helps students understand what they should study next.”
            </blockquote>
            <p className="text-sm text-slate-300 pt-1 leading-relaxed">
              We connect{' '}
              <span className="text-emerald-400 font-medium">CONTENT + QUESTIONS + PYQs + TESTING + ANALYTICS + AI + PERSONALIZATION + REVISION + BOARD INTELLIGENCE</span>{' '}
              into a continuous improvement cycle tailored to your exact weak areas.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Section: Everything You Need. One Platform. */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="font-serif text-3xl font-bold text-slate-900">
            Everything You Need. One Platform.
          </h2>
          <p className="text-sm text-slate-600">
            Engineered specifically for Indian Board Exam patterns — no clutter, no generic dumps, only high-scoring structure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feat) => (
            <div
              key={feat.id}
              onClick={() => onNavigate(feat.id)}
              className="group p-6 rounded-2xl border border-slate-200 bg-white hover:border-emerald-600 hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {feat.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-base text-slate-900 group-hover:text-emerald-800 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs font-medium text-emerald-800 mt-0.5">{feat.tagline}</p>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{feat.desc}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-mono">{feat.metric}</span>
                <span className="font-medium text-slate-700 group-hover:text-emerald-700 flex items-center gap-1">
                  Open <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Board Updates & Official Notices Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-900">
                  Official Board Updates & Circulars
                </span>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs text-slate-500">CBSE & ICSE</span>
              </div>
              <h3 className="font-semibold text-sm text-slate-900 mt-0.5">
                50% Competency Questions Mandate & Annual Examination Guidelines
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Verified directly from official board domains (cbse.gov.in & cisce.org). No unverified social media rumors.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('updates')}
            className="px-4 py-2 text-xs font-semibold text-slate-800 hover:text-slate-900 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors shrink-0 cursor-pointer"
          >
            View All Updates
          </button>
        </div>
      </section>
    </div>
  );
};
