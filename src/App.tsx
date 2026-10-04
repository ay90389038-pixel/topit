/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DashboardView } from './components/DashboardView';
import { LearnView } from './components/LearnView';
import { PracticeView } from './components/PracticeView';
import { PYQIntelligenceView } from './components/PYQIntelligenceView';
import { TestEngineView } from './components/TestEngineView';
import { SmartRevisionView } from './components/SmartRevisionView';
import { AnalyticsView } from './components/AnalyticsView';
import { AITutorView } from './components/AITutorView';
import { PracticalLabView } from './components/PracticalLabView';
import { BoardUpdatesView } from './components/BoardUpdatesView';
import { ResourceLibraryView } from './components/ResourceLibraryView';
import { ProfileView } from './components/ProfileView';
import { BoardClassModal } from './components/BoardClassModal';
import { UniversalSearchModal } from './components/UniversalSearchModal';
import { Footer } from './components/Footer';

import { ActiveView, Board, ClassLevel, Subject, UserProgress } from './types';
import { INITIAL_CHAPTERS, INITIAL_USER_PROGRESS } from './data/mockData';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [board, setBoard] = useState<Board>('CBSE');
  const [classLevel, setClassLevel] = useState<ClassLevel>('Class 10');
  const [subject, setSubject] = useState<Subject>('Science');

  const [selectedChapterId, setSelectedChapterId] = useState<string | undefined>('ch-carbon');
  const [tutorTopic, setTutorTopic] = useState<string | undefined>('Carbon & its Compounds');
  const [tutorQuery, setTutorQuery] = useState<string | undefined>(undefined);
  const [revisionTopic, setRevisionTopic] = useState<string | undefined>(undefined);

  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Persistent User Progress
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem('topit_user_progress');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // Fallback to initial
    }
    return INITIAL_USER_PROGRESS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('topit_user_progress', JSON.stringify(progress));
    } catch (e) {
      // Ignore storage errors
    }
  }, [progress]);

  // Navigate to Learn or Practice with pre-selected chapter
  const handleNavigateWithContext = (view: ActiveView, contextId?: string, query?: string) => {
    if (view === 'learn' && contextId) {
      setSelectedChapterId(contextId);
    }
    if (view === 'practice' && contextId) {
      setSelectedChapterId(contextId);
    }
    if (view === 'ai-tutor') {
      if (query) {
        setTutorQuery(query);
        setTutorTopic(query);
      } else if (contextId) {
        setTutorTopic(contextId);
      }
    }
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStudyNext = () => {
    const topWeak = progress.weakTopics[0];
    if (topWeak) {
      setRevisionTopic(topWeak.name);
      setSelectedChapterId(topWeak.chapterId);
      setActiveView('revision');
    } else {
      setActiveView('dashboard');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartRevisionLoop = (topicName: string, chapterId: string) => {
    setRevisionTopic(topicName);
    setSelectedChapterId(chapterId);
    setActiveView('revision');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetProgress = () => {
    setProgress(INITIAL_USER_PROGRESS);
    localStorage.removeItem('topit_user_progress');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Universal Top Bar */}
      <Navbar
        activeView={activeView}
        setActiveView={(v) => {
          setActiveView(v);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        board={board}
        classLevel={classLevel}
        subject={subject}
        onOpenBoardSelector={() => setIsBoardModalOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onStudyNext={handleStudyNext}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {activeView === 'home' && (
          <HeroSection
            board={board}
            classLevel={classLevel}
            subject={subject}
            onOpenBoardSelector={() => setIsBoardModalOpen(true)}
            onNavigate={(v) => handleNavigateWithContext(v)}
            onStartPreparing={() => {
              setActiveView('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeView === 'dashboard' && (
          <DashboardView
            progress={progress}
            chapters={INITIAL_CHAPTERS}
            onNavigate={(v, ctx) => handleNavigateWithContext(v, ctx)}
            onStartRevisionLoop={handleStartRevisionLoop}
          />
        )}

        {activeView === 'learn' && (
          <LearnView
            chapters={INITIAL_CHAPTERS}
            selectedChapterId={selectedChapterId}
            onNavigate={(v, ctx, q) => handleNavigateWithContext(v, ctx, q)}
          />
        )}

        {activeView === 'practice' && (
          <PracticeView
            initialChapterId={selectedChapterId}
            onNavigateToRevision={() => setActiveView('revision')}
          />
        )}

        {activeView === 'pyqs' && (
          <PYQIntelligenceView
            currentBoard={board}
            currentSubject={subject}
            initialChapterId={selectedChapterId}
          />
        )}

        {activeView === 'tests' && (
          <TestEngineView
            onNavigateToRevision={() => setActiveView('revision')}
            onNavigateToAnalytics={() => setActiveView('analytics')}
          />
        )}

        {activeView === 'revision' && (
          <SmartRevisionView
            progress={progress}
            initialTopic={revisionTopic}
            onNavigate={(v, ctx) => handleNavigateWithContext(v, ctx)}
            onUpdateProgress={(updated) => setProgress(updated)}
          />
        )}

        {activeView === 'analytics' && (
          <AnalyticsView
            progress={progress}
            chapters={INITIAL_CHAPTERS}
            onNavigateToRevision={handleStartRevisionLoop}
          />
        )}

        {activeView === 'ai-tutor' && (
          <AITutorView
            board={board}
            classLevel={classLevel}
            subject={subject}
            initialTopic={tutorTopic}
            initialQuery={tutorQuery}
          />
        )}

        {activeView === 'lab' && (
          <PracticalLabView
            currentSubject={subject}
            currentClass={classLevel}
          />
        )}

        {activeView === 'updates' && (
          <BoardUpdatesView currentBoard={board} />
        )}

        {activeView === 'resources' && (
          <ResourceLibraryView
            currentBoard={board}
            currentClass={classLevel}
            currentSubject={subject}
          />
        )}

        {activeView === 'profile' && (
          <ProfileView
            board={board}
            classLevel={classLevel}
            subject={subject}
            progress={progress}
            onOpenBoardSelector={() => setIsBoardModalOpen(true)}
            onResetProgress={handleResetProgress}
          />
        )}
      </main>

      {/* Global Modals */}
      <BoardClassModal
        isOpen={isBoardModalOpen}
        onClose={() => setIsBoardModalOpen(false)}
        currentBoard={board}
        currentClass={classLevel}
        currentSubject={subject}
        onSave={(newBoard, newClass, newSub) => {
          setBoard(newBoard);
          setClassLevel(newClass);
          setSubject(newSub);
        }}
      />

      <UniversalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={(v, ctx, q) => handleNavigateWithContext(v, ctx, q)}
      />

      {/* Clean Global Footer */}
      <Footer onNavigate={(v) => handleNavigateWithContext(v)} />
    </div>
  );
}
