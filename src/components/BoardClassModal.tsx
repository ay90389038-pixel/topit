import React from 'react';
import { X, Check, School, Layers, BookMarked } from 'lucide-react';
import { Board, ClassLevel, Subject } from '../types';

interface BoardClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBoard: Board;
  currentClass: ClassLevel;
  currentSubject: Subject;
  onSave: (board: Board, classLevel: ClassLevel, subject: Subject) => void;
}

const BOARDS: { id: Board; name: string; syllabus: string; badge: string }[] = [
  { id: 'CBSE', name: 'Central Board of Secondary Education', syllabus: 'NCERT & NEP 2020 50% Competency', badge: 'National' },
  { id: 'ICSE', name: 'Council for the Indian School Certificate Examinations (ICSE)', syllabus: 'CISCE Detailed Conceptual Pattern', badge: 'CISCE' },
  { id: 'ISC', name: 'Indian School Certificate (Classes 11 & 12)', syllabus: 'In-depth Science & Humanities Framework', badge: 'Higher Secondary' },
  { id: 'Maharashtra State Board', name: 'Maharashtra State Board of Secondary and Higher Secondary', syllabus: 'Balbharati Standard Pattern', badge: 'State' },
  { id: 'Karnataka KSEEB', name: 'Karnataka School Examination and Assessment Board', syllabus: 'KSEEB State Board Standard Pattern', badge: 'State' },
];

const CLASSES: ClassLevel[] = ['Class 9', 'Class 10', 'Class 11', 'Class 12'];

const SUBJECTS_BY_CLASS: Record<ClassLevel, Subject[]> = {
  'Class 9': ['Science', 'Mathematics', 'Social Science', 'English'],
  'Class 10': ['Science', 'Mathematics', 'Social Science', 'English'],
  'Class 11': ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English'],
  'Class 12': ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English'],
};

export const BoardClassModal: React.FC<BoardClassModalProps> = ({
  isOpen,
  onClose,
  currentBoard,
  currentClass,
  currentSubject,
  onSave,
}) => {
  const [selectedBoard, setSelectedBoard] = React.useState<Board>(currentBoard);
  const [selectedClass, setSelectedClass] = React.useState<ClassLevel>(currentClass);
  const [selectedSubject, setSelectedSubject] = React.useState<Subject>(currentSubject);

  if (!isOpen) return null;

  const availableSubjects = SUBJECTS_BY_CLASS[selectedClass] || ['Science', 'Mathematics'];

  const handleClassChange = (newClass: ClassLevel) => {
    setSelectedClass(newClass);
    const newSubjects = SUBJECTS_BY_CLASS[newClass];
    if (!newSubjects.includes(selectedSubject)) {
      setSelectedSubject(newSubjects[0]);
    }
  };

  const handleApply = () => {
    onSave(selectedBoard, selectedClass, selectedSubject);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="font-serif text-xl font-bold text-slate-900">Adapt Board, Class & Subject</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              TOPIT dynamically reconfigures syllabus weightages, PYQs, and question patterns.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Board Selector */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-2.5">
              <School className="w-4 h-4 text-emerald-600" />
              <span>1. Select Examination Board</span>
            </label>
            <div className="space-y-2">
              {BOARDS.map((board) => {
                const isSelected = selectedBoard === board.id;
                return (
                  <button
                    key={board.id}
                    onClick={() => setSelectedBoard(board.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start justify-between cursor-pointer ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-slate-900">{board.id}</span>
                        <span className="text-[11px] text-slate-500">· {board.badge}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">{board.name}</p>
                      <p className="text-[11px] text-emerald-800 font-mono mt-1">{board.syllabus}</p>
                    </div>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Class Selector */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-2.5">
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>2. Select Academic Class</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {CLASSES.map((cls) => {
                const isSelected = selectedClass === cls;
                return (
                  <button
                    key={cls}
                    onClick={() => handleClassChange(cls)}
                    className={`py-3 px-3 rounded-xl border text-center font-medium text-sm transition-all cursor-pointer ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-600 text-white shadow-sm'
                        : 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {cls}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subject Selector */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-2.5">
              <BookMarked className="w-4 h-4 text-emerald-600" />
              <span>3. Primary Active Subject</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {availableSubjects.map((sub) => {
                const isSelected = selectedSubject === sub;
                return (
                  <button
                    key={sub}
                    onClick={() => setSelectedSubject(sub)}
                    className={`px-3.5 py-2 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'border-emerald-700 bg-emerald-50 text-emerald-900 shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {sub}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Selected: <span className="font-semibold text-slate-800">{selectedBoard}</span> ·{' '}
            <span className="font-semibold text-slate-800">{selectedClass}</span> ·{' '}
            <span className="font-semibold text-slate-800">{selectedSubject}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="px-5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-all cursor-pointer"
            >
              Apply Curriculum
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
