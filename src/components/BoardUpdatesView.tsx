import React from 'react';
import {
  Bell,
  ExternalLink,
  ShieldCheck,
  Calendar,
  AlertCircle,
  FileText,
  Clock
} from 'lucide-react';
import { BoardUpdate, Board } from '../types';
import { MOCK_BOARD_UPDATES } from '../data/mockData';

interface BoardUpdatesViewProps {
  currentBoard: Board;
}

export const BoardUpdatesView: React.FC<BoardUpdatesViewProps> = ({ currentBoard }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 w-fit mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Official Board Verification Guarantee</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
          Official Board Updates & Circulars
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Curated notifications directly from CBSE, CISCE, and State Education Directorates. No rumors, no fake WhatsApp forwards.
        </p>
      </div>

      {/* Updates Feed */}
      <div className="space-y-5">
        {MOCK_BOARD_UPDATES.map((update) => (
          <div
            key={update.id}
            className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 shadow-xs space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-900">{update.board}</span>
                <span aria-hidden="true">·</span>
                <span>{update.category}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono">{update.date}</span>
              </div>

              {update.isUrgent && (
                <span className="text-[11px] font-semibold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-amber-700" />
                  <span>Important for Board Students</span>
                </span>
              )}
            </div>

            <div className="space-y-1">
              <h2 className="font-serif text-lg font-bold text-slate-900 leading-snug">
                {update.title}
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed pt-1">
                {update.summary}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <strong className="text-slate-900 font-semibold block">
                Impact on Your Study Plan:
              </strong>
              <p className="text-slate-600 leading-relaxed">
                {update.impactOnStudents}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-400 font-mono text-[11px]">
                Source: {update.officialSourceName}
              </span>
              <a
                href={update.officialSourceUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-emerald-800 hover:text-emerald-950 font-semibold flex items-center gap-1"
              >
                <span>Verify on Official Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
