import React, { useState } from 'react';
import {
  Library,
  BookOpen,
  FileText,
  Download,
  ExternalLink,
  ShieldCheck,
  Search,
  Filter
} from 'lucide-react';
import { ResourceItem, Subject, ClassLevel, Board } from '../types';
import { MOCK_RESOURCES } from '../data/mockData';

interface ResourceLibraryViewProps {
  currentBoard: Board;
  currentClass: ClassLevel;
  currentSubject: Subject;
}

export const ResourceLibraryView: React.FC<ResourceLibraryViewProps> = ({
  currentBoard,
  currentClass,
  currentSubject,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    'all',
    'NCERT Textbook',
    'NCERT Exemplar',
    'Official Sample Paper',
    'Formula Handbook',
  ];

  const filtered = MOCK_RESOURCES.filter((res) => {
    if (selectedCategory !== 'all' && res.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 w-fit mb-2">
          <Library className="w-3.5 h-3.5" />
          <span>Authorized Academic Repository</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
          Authorized Resource Library
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Direct, legitimate links to NCERT digital editions, Exemplar problems, and Official Board blueprints.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat === 'all' ? 'All Curated Resources' : cat}
          </button>
        ))}
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-emerald-800">{item.category}</span>
                <span className="font-mono text-[11px]">{item.pagesOrItems}</span>
              </div>

              <h2 className="font-serif text-base font-bold text-slate-900 leading-snug">
                {item.title}
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400 font-mono truncate max-w-[200px]">
                {item.verifiedSource}
              </span>

              <button
                onClick={() => {
                  // Direct legitimate link simulated open
                  window.open('https://ncert.nic.in/textbook.php', '_blank');
                }}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Read Official Resource</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
