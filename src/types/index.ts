export type Board = 'CBSE' | 'ICSE' | 'ISC' | 'Maharashtra State Board' | 'Karnataka KSEEB';

export type ClassLevel = 'Class 9' | 'Class 10' | 'Class 11' | 'Class 12';

export type Subject = 'Science' | 'Mathematics' | 'Social Science' | 'English' | 'Physics' | 'Chemistry' | 'Biology';

export type QuestionType =
  | 'mcq'
  | 'assertion_reason'
  | 'case_based'
  | 'short_answer'
  | 'long_answer'
  | 'numerical'
  | 'competency';

export type Difficulty = 'Easy' | 'Moderate' | 'Challenging' | 'Board-Level';

export interface MarkingStep {
  step: string;
  marks: number;
}

export interface SolvedExample {
  title: string;
  marks: number;
  question: string;
  solutionSteps: string[];
  markingTips: string;
}

export interface MnemonicItem {
  name: string;
  phrase: string;
  explanation: string;
}

export interface Chapter {
  id: string;
  title: string;
  subject: Subject;
  classLevel: ClassLevel;
  board: Board;
  weightageMarks: number;
  totalTopics: number;
  completionPercentage: number;
  status: 'mastered' | 'improving' | 'weak';
  highYield: boolean;
  pyqFrequencyCount: number;
  summary: string;
  keyTopics: string[];
}

export interface ConceptDetail {
  id: string;
  chapterId: string;
  topicTitle: string;
  simpleExplanation: string;
  detailedExplanation: string[];
  quickRevisionBullets: string[];
  formulas: { name: string; formula: string; note: string }[];
  solvedExamples: SolvedExample[];
  tricksAndMnemonics: MnemonicItem[];
}

export interface PracticeQuestion {
  id: string;
  chapterId: string;
  topic: string;
  type: QuestionType;
  difficulty: Difficulty;
  question: string;
  options?: string[];
  correctAnswer: string | number;
  assertion?: string;
  reason?: string;
  casePassage?: string;
  subQuestions?: { question: string; options?: string[]; correctAnswer: string | number; marks: number }[];
  hint: string;
  markingSchemeBreakdown: MarkingStep[];
  explanation: string;
  boardTags: string[];
  competencyFocus?: string;
}

export interface PYQuestion {
  id: string;
  chapterId: string;
  topic: string;
  subject: Subject;
  classLevel: ClassLevel;
  board: Board;
  year: number;
  set: string;
  marks: number;
  questionType: QuestionType;
  difficulty: Difficulty;
  question: string;
  conceptsTested: string[];
  historicalFrequencyNotes: string;
  frequencyScore: 'Very High' | 'High' | 'Moderate';
  officialSolution: string;
  markingBreakdown: MarkingStep[];
}

export interface TestTemplate {
  id: string;
  title: string;
  type: 'quick' | 'chapter' | 'subject' | 'full_syllabus' | 'pyq' | 'weak_topic';
  durationMinutes: number;
  totalMarks: number;
  questionsCount: number;
  subject: Subject;
  chapterName?: string;
  description: string;
  difficulty: Difficulty;
  sections?: { name: string; questionTypes: string; marksPerQuestion: number }[];
}

export interface PracticalExperiment {
  id: string;
  title: string;
  classLevel: ClassLevel;
  subject: Subject;
  objective: string;
  apparatus: string[];
  chemicalsOrMaterials: string[];
  procedure: { stepNumber: number; title: string; instruction: string }[];
  observations: { trialOrParam: string; observation: string; inference: string }[];
  resultsAndConclusion: string;
  precautions: string[];
  vivaVoce: { question: string; answer: string; examinerTip: string }[];
}

export interface BoardUpdate {
  id: string;
  title: string;
  board: Board;
  date: string;
  category: 'Datesheet' | 'Syllabus Change' | 'Sample Paper' | 'Practical Exam' | 'Advisory';
  summary: string;
  impactOnStudents: string;
  officialSourceUrl: string;
  officialSourceName: string;
  isUrgent?: boolean;
}

export interface ResourceItem {
  id: string;
  title: string;
  category: 'NCERT Textbook' | 'NCERT Exemplar' | 'Official Sample Paper' | 'Formula Handbook' | 'Marking Scheme';
  subject: Subject;
  classLevel: ClassLevel;
  board: Board;
  format: 'PDF' | 'Interactive' | 'Document';
  pagesOrItems: string;
  description: string;
  verifiedSource: string;
  actionUrl?: string;
}

export interface UserProgress {
  overallReadiness: number;
  studyTimeHours: number;
  questionsSolved: number;
  testsCompleted: number;
  accuracy: number;
  streakDays: number;
  targetPercentage: number;
  weakTopics: { name: string; subject: Subject; accuracy: number; chapterId: string; recommendedAction: string }[];
  strongTopics: { name: string; subject: Subject; accuracy: number; chapterId: string }[];
  recentTestScores: { testTitle: string; date: string; score: number; total: number; percentage: number; timeTaken: string }[];
  mistakeDistribution: { type: string; percentage: number; count: number; advice: string }[];
}

export type ActiveView =
  | 'home'
  | 'dashboard'
  | 'learn'
  | 'practice'
  | 'pyqs'
  | 'tests'
  | 'revision'
  | 'analytics'
  | 'ai-tutor'
  | 'lab'
  | 'updates'
  | 'resources'
  | 'profile';
