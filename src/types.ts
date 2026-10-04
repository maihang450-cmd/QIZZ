export type DifficultyLevel = 'biet' | 'hieu' | 'van_dung';

export interface Question {
  id: string;
  code: string;
  level: DifficultyLevel;
  topic: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number; // 0=A, 1=B, 2=C, 3=D
  explanation: string;
}

export interface StudentProfile {
  name: string;
  studentClass: string;
  studentId?: string;
}

export interface ExamRule {
  bietCount: number; // default 4
  hieuCount: number; // default 3
  vanDungCount: number; // default 3
  timePerQuestionSeconds: number; // default 25s
  shuffleOptions: boolean;
  shuffleQuestions: boolean;
  passingScore: number; // default 5.0
}

export interface QuizSubmission {
  id: string;
  studentName: string;
  studentClass: string;
  studentId?: string;
  examCode: string;
  submittedAt: string;
  totalScore: number; // Thang 10 (vd: 8.0)
  correctCount: number;
  totalCount: number;
  breakdown: {
    biet: { correct: number; total: number };
    hieu: { correct: number; total: number };
    van_dung: { correct: number; total: number };
  };
  timeSpentSeconds: number;
  gamifiedScore: number;
  maxStreak: number;
  answers: {
    questionId: string;
    questionText: string;
    level: DifficultyLevel;
    options: string[];
    selectedOptionIndex: number;
    correctOptionIndex: number;
    isCorrect: boolean;
    explanation: string;
    timeTakenSeconds: number;
  }[];
}

export type UserRole = 'student' | 'teacher';
