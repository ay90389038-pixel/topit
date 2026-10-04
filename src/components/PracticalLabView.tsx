import React, { useState } from 'react';
import {
  FlaskConical,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Eye,
  EyeOff,
  ChevronRight,
  ShieldCheck,
  ListOrdered,
  Layers,
  Sparkles
} from 'lucide-react';
import { PracticalExperiment, Subject, ClassLevel } from '../types';
import { MOCK_PRACTICALS } from '../data/mockData';

interface PracticalLabViewProps {
  currentSubject: Subject;
  currentClass: ClassLevel;
  initialExpId?: string;
}

type PracticalTab = 'objective' | 'procedure' | 'observations' | 'precautions' | 'viva';

export const PracticalLabView: React.FC<PracticalLabViewProps> = ({
  currentSubject,
  currentClass,
  initialExpId,
}) => {
  const [selectedExpId, setSelectedExpId] = useState<string>(
    initialExpId || MOCK_PRACTICALS[0]?.id || 'exp-acid-base'
  );
  const [activeTab, setActiveTab] = useState<PracticalTab>('procedure');
  const [revealedViva, setRevealedViva] = useState<Record<number, boolean>>({});

  const experiment = MOCK_PRACTICALS.find((e) => e.id === selectedExpId) || MOCK_PRACTICALS[0];

  const tabs: { id: PracticalTab; label: string; icon: React.ReactNode }[] = [
    { id: 'procedure', label: 'Procedure & Steps', icon: <ListOrdered className="w-3.5 h-3.5" /> },
    { id: 'observations', label: 'Observations & Results', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'precautions', label: 'Precautions', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
    { id: 'viva', label: 'Viva Voce Q&A', icon: <HelpCircle className="w-3.5 h-3.5" /> },
  ];

  const toggleViva = (idx: number) => {
    setRevealedViva((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 w-fit mb-2">
          <FlaskConical className="w-3.5 h-3.5" />
          <span>Internal Assessment & Practical Examination</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
          Science Practical Laboratory
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Step-by-step procedures, observation tables, graph inferences, precautions, and authentic board viva questions.
        </p>
      </div>

      {/* Experiment Selector Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {MOCK_PRACTICALS.map((exp) => {
          const isSelected = exp.id === selectedExpId;
          return (
            <button
              key={exp.id}
              onClick={() => {
                setSelectedExpId(exp.id);
                setRevealedViva({});
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 text-white font-semibold shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5 text-emerald-400" />
              <span>{exp.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Experiment Dossier */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        {/* Title & Objective */}
        <div className="space-y-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>{experiment.classLevel}</span>
            <span>·</span>
            <span className="font-semibold text-emerald-800">{experiment.subject}</span>
            <span>·</span>
            <span>Internal Assessment Practical</span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
            {experiment.title}
          </h2>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
            <strong>Formal Aim / Objective:</strong> {experiment.objective}
          </div>
        </div>

        {/* Apparatus & Materials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5 text-xs">
            <span className="font-semibold text-slate-900 uppercase tracking-wider text-[11px] block">
              Apparatus Required:
            </span>
            <ul className="list-disc list-inside space-y-0.5 text-slate-700">
              {experiment.apparatus.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5 text-xs">
            <span className="font-semibold text-slate-900 uppercase tracking-wider text-[11px] block">
              Chemicals / Materials:
            </span>
            <ul className="list-disc list-inside space-y-0.5 text-slate-700">
              {experiment.chemicalsOrMaterials.map((chem, i) => (
                <li key={i}>{chem}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Segmented Control for Sections */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto border border-slate-200">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Section: Procedure */}
        {activeTab === 'procedure' && (
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Laboratory Experimental Procedure
            </h3>
            <div className="space-y-3">
              {experiment.procedure.map((step) => (
                <div
                  key={step.stepNumber}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 flex items-start gap-3.5 text-xs"
                >
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-mono font-bold flex items-center justify-center shrink-0 text-xs">
                    {step.stepNumber}
                  </span>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">{step.title}</h4>
                    <p className="text-slate-700 leading-relaxed mt-1">{step.instruction}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section: Observations & Results */}
        {activeTab === 'observations' && (
          <div className="space-y-6">
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Observation Table & Sample Experimental Readings
            </h3>

            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono">
                  <tr>
                    <th className="p-3">Parameter / Test</th>
                    <th className="p-3">Experimental Observation</th>
                    <th className="p-3">Scientific Inference</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {experiment.observations.map((obs, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60">
                      <td className="p-3 font-semibold text-slate-800">{obs.trialOrParam}</td>
                      <td className="p-3 text-slate-700">{obs.observation}</td>
                      <td className="p-3 text-emerald-900 font-medium">{obs.inference}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-1">
              <span className="font-semibold text-emerald-950 block">Result & Chemical Conclusion:</span>
              <p className="text-emerald-900 leading-relaxed whitespace-pre-line font-mono text-[11px]">
                {experiment.resultsAndConclusion}
              </p>
            </div>
          </div>
        )}

        {/* Section: Precautions */}
        {activeTab === 'precautions' && (
          <div className="space-y-4 max-w-3xl">
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Laboratory Safety Precautions & Good Practice
            </h3>
            <div className="space-y-2.5">
              {experiment.precautions.map((prec, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/50 flex items-start gap-3 text-xs text-amber-950"
                >
                  <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{prec}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section: Viva Voce Q&A */}
        {activeTab === 'viva' && (
          <div className="space-y-4 max-w-3xl">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  Viva Voce Questions (Examiner Benchmarks)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Frequently asked by external board examiners during practical evaluation.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {experiment.vivaVoce.map((v, idx) => {
                const isRevealed = !!revealedViva[idx];
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-slate-800">Viva Question {idx + 1}</span>
                      <button
                        onClick={() => toggleViva(idx)}
                        className="text-xs font-semibold text-emerald-800 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
                      >
                        {isRevealed ? (
                          <>
                            <EyeOff className="w-3.5 h-3.5" />
                            <span>Hide Answer</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-3.5 h-3.5" />
                            <span>Reveal Answer</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-sm font-semibold text-slate-900">
                      Q: {v.question}
                    </p>

                    {isRevealed && (
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed space-y-2 animate-in fade-in duration-150">
                        <p><strong>Answer:</strong> {v.answer}</p>
                        <div className="p-2 bg-emerald-50 rounded border border-emerald-100 text-emerald-900">
                          <strong>Examiner Tip:</strong> {v.examinerTip}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
