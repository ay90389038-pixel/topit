import React from 'react';
import { ActiveView } from '../types';

interface FooterProps {
  onNavigate: (view: ActiveView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand info */}
          <div className="space-y-3 md:col-span-2">
            <span className="font-serif text-2xl font-bold tracking-tight text-slate-900 block">
              TOPIT
            </span>
            <p className="text-slate-600 max-w-sm leading-relaxed">
              Prepare Smarter. Score Better. A complete Indian Board Exam preparation ecosystem connecting content, questions, PYQ intelligence, adaptive testing, analytics, and smart revision.
            </p>
            <p className="text-[11px] text-slate-500 font-mono">
              Designed for CBSE, ICSE, ISC, and State Board candidates (Classes 9–12).
            </p>
          </div>

          {/* Quick ecosystem navigation */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-3 text-xs uppercase tracking-wider">
              Core Ecosystem
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="hover:text-slate-900 transition-colors cursor-pointer"
                >
                  Student Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('learn')}
                  className="hover:text-slate-900 transition-colors cursor-pointer"
                >
                  Learn & Formulas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('practice')}
                  className="hover:text-slate-900 transition-colors cursor-pointer"
                >
                  Competency Practice
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pyqs')}
                  className="hover:text-slate-900 transition-colors cursor-pointer"
                >
                  PYQ Intelligence
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tests')}
                  className="hover:text-slate-900 transition-colors cursor-pointer"
                >
                  Timed Test Engine
                </button>
              </li>
            </ul>
          </div>

          {/* Intel & Practicals */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-3 text-xs uppercase tracking-wider">
              Tools & Intelligence
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('revision')}
                  className="hover:text-slate-900 transition-colors cursor-pointer"
                >
                  Smart Revision Loop
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ai-tutor')}
                  className="hover:text-slate-900 transition-colors cursor-pointer"
                >
                  AI Board Tutor
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('lab')}
                  className="hover:text-slate-900 transition-colors cursor-pointer"
                >
                  Practical Lab & Viva
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('updates')}
                  className="hover:text-slate-900 transition-colors cursor-pointer"
                >
                  Board Updates
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('resources')}
                  className="hover:text-slate-900 transition-colors cursor-pointer"
                >
                  NCERT & Exemplar
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            © {new Date().getFullYear()} TOPIT EdTech Ecosystem. All curriculum references belong to their respective statutory boards (NCERT, CBSE, CISCE).
          </p>
          <p className="font-mono text-slate-400">
            Learn · Practice · Test · Analyze · Revise · Retest · Improve
          </p>
        </div>
      </div>
    </footer>
  );
};
