import React, { useState } from 'react';
import {
  Compass,
  BookOpen,
  CheckCircle2,
  FileText,
  Clock,
  RotateCcw,
  BarChart3,
  Bot,
  FlaskConical,
  Bell,
  Library,
  User,
  Search,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { ActiveView, Board, ClassLevel, Subject } from '../types';

interface NavbarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  board: Board;
  classLevel: ClassLevel;
  subject: Subject;
  onOpenBoardSelector: () => void;
  onOpenSearch: () => void;
  onStudyNext: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  board,
  classLevel,
  subject,
  onOpenBoardSelector,
  onOpenSearch,
  onStudyNext,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  const primaryNavItems: { id: ActiveView; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <Compass className="w-4 h-4" /> },
    { id: 'learn', label: 'Learn', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'practice', label: 'Practice', icon: <CheckCircle2 className="w-4 h-4" /> },
    { id: 'pyqs', label: 'PYQ Intel', icon: <FileText className="w-4 h-4" /> },
    { id: 'tests', label: 'Tests', icon: <Clock className="w-4 h-4" /> },
    { id: 'revision', label: 'Revision', icon: <RotateCcw className="w-4 h-4" /> },
  ];

  const secondaryNavItems: { id: ActiveView; label: string; icon: React.ReactNode }[] = [
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'ai-tutor', label: 'AI Tutor', icon: <Bot className="w-4 h-4" /> },
    { id: 'lab', label: 'Practical Lab', icon: <FlaskConical className="w-4 h-4" /> },
    { id: 'updates', label: 'Board Updates', icon: <Bell className="w-4 h-4" /> },
    { id: 'resources', label: 'Resources', icon: <Library className="w-4 h-4" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
  ];

  const allNavItems = [...primaryNavItems, ...secondaryNavItems];

  const handleNavClick = (view: ActiveView) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 group text-left cursor-pointer focus-visible:outline-none"
            >
              <span className="font-serif text-2xl font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                TOPIT
              </span>
              <span className="text-[11px] font-mono font-medium tracking-wider uppercase text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                ECOSYSTEM
              </span>
            </button>
          </div>

          {/* Zone 2: 4–6 primary nav links with subtle hover underlines */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {primaryNavItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 text-sm font-medium transition-colors whitespace-nowrap relative ${
                    isActive
                      ? 'text-slate-900 font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-emerald-600 rounded-full" />
                  )}
                </button>
              );
            })}

            {/* "More" dropdown for secondary views to keep Top Bar Contract lean */}
            <div className="relative">
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`px-3 py-1.5 text-sm font-medium flex items-center gap-1 transition-colors whitespace-nowrap ${
                  secondaryNavItems.some((s) => s.id === activeView)
                    ? 'text-slate-900 font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Tools & Intel</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {moreDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseLeave={() => setMoreDropdownOpen(false)}
                >
                  {secondaryNavItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full px-4 py-2 text-sm text-left flex items-center gap-2.5 transition-colors ${
                        activeView === item.id
                          ? 'bg-emerald-50 text-emerald-800 font-medium'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <span className="text-slate-500">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Zone 3: 1–2 primary actions + Search + Active Board Selector */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-mono"
              title="Search Concepts, PYQs, Formulae (Cmd+K)"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline text-slate-400">Search</span>
              <kbd className="hidden md:inline px-1.5 py-0.5 text-[10px] text-slate-500 bg-slate-100 border border-slate-300 rounded font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Board & Class selector trigger */}
            <button
              onClick={onOpenBoardSelector}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
              title="Change Board, Class, or Subject"
            >
              <span className="font-semibold text-slate-900">{board}</span>
              <span className="text-slate-400">·</span>
              <span>{classLevel}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {/* Primary Action: What to Study Next */}
            <button
              onClick={onStudyNext}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-all shadow-sm hover:shadow whitespace-nowrap active:scale-[0.98]"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
              <span>Study Next</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onOpenBoardSelector}
              className="w-full text-left p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs"
            >
              <span className="text-slate-500 block text-[10px]">Active Board & Class</span>
              <span className="font-semibold text-slate-900">{board} · {classLevel}</span>
            </button>
            <button
              onClick={onStudyNext}
              className="w-full flex items-center justify-center gap-1.5 p-2.5 rounded-lg bg-emerald-700 text-white text-xs font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
              <span>What to Study Next</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-1.5 pt-2">
            {allNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  activeView === item.id
                    ? 'bg-emerald-50 text-emerald-800 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="text-slate-500">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
