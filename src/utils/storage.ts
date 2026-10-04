import { Question, QuizSubmission, ExamRule, DifficultyLevel } from '../types';
import { INITIAL_QUESTIONS } from '../data/initialQuestions';

const STORAGE_KEYS = {
  QUESTIONS: 'quiz_questions_bank_v1',
  SUBMISSIONS: 'quiz_student_submissions_v1',
  TEACHER_LOGGED_IN: 'quiz_teacher_auth_v1',
  EXAM_CONFIG: 'quiz_exam_config_v1',
};

export const DEFAULT_EXAM_RULE: ExamRule = {
  bietCount: 4,
  hieuCount: 3,
  vanDungCount: 3,
  timePerQuestionSeconds: 25,
  shuffleOptions: true,
  shuffleQuestions: true,
  passingScore: 5.0,
};

// ================= QUESTION BANK =================
export function getQuestions(): Question[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(INITIAL_QUESTIONS));
      return INITIAL_QUESTIONS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(INITIAL_QUESTIONS));
      return INITIAL_QUESTIONS;
    }
    return parsed;
  } catch {
    return INITIAL_QUESTIONS;
  }
}

export function saveQuestions(questions: Question[]) {
  localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));
}

export function resetQuestionsToDefault(): Question[] {
  localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(INITIAL_QUESTIONS));
  return INITIAL_QUESTIONS;
}

export function getQuestionCounts(): { total: number; biet: number; hieu: number; van_dung: number } {
  const list = getQuestions();
  return {
    total: list.length,
    biet: list.filter(q => q.level === 'biet').length,
    hieu: list.filter(q => q.level === 'hieu').length,
    van_dung: list.filter(q => q.level === 'van_dung').length,
  };
}

// ================= EXAM GENERATION =================
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export interface PreparedExamQuestion {
  id: string;
  code: string;
  level: DifficultyLevel;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface PreparedExam {
  examCode: string;
  generatedAt: string;
  rule: ExamRule;
  questions: PreparedExamQuestion[];
}

export function generateExam(customRule?: Partial<ExamRule>): PreparedExam {
  const rule: ExamRule = { ...DEFAULT_EXAM_RULE, ...customRule };
  const all = getQuestions();

  const bietPool = shuffleArray(all.filter(q => q.level === 'biet'));
  const hieuPool = shuffleArray(all.filter(q => q.level === 'hieu'));
  const vanDungPool = shuffleArray(all.filter(q => q.level === 'van_dung'));

  const selectedBiet = bietPool.slice(0, rule.bietCount);
  const selectedHieu = hieuPool.slice(0, rule.hieuCount);
  const selectedVanDung = vanDungPool.slice(0, rule.vanDungCount);

  let combined = [...selectedBiet, ...selectedHieu, ...selectedVanDung];

  if (rule.shuffleQuestions) {
    combined = shuffleArray(combined);
  }

  const preparedQuestions: PreparedExamQuestion[] = combined.map(q => {
    if (!rule.shuffleOptions) {
      return {
        id: q.id,
        code: q.code,
        level: q.level,
        topic: q.topic,
        question: q.question,
        options: [...q.options],
        correctIndex: q.correctIndex,
        explanation: q.explanation,
      };
    }

    // Shuffle options while preserving correct answer
    const originalCorrectText = q.options[q.correctIndex];
    const shuffledOpts = shuffleArray(q.options);
    const newCorrectIndex = shuffledOpts.indexOf(originalCorrectText);

    return {
      id: q.id,
      code: q.code,
      level: q.level,
      topic: q.topic,
      question: q.question,
      options: shuffledOpts,
      correctIndex: newCorrectIndex,
      explanation: q.explanation,
    };
  });

  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const examCode = `CN10-B3-${randomNum}`;

  return {
    examCode,
    generatedAt: new Date().toISOString(),
    rule,
    questions: preparedQuestions,
  };
}

// ================= SUBMISSIONS =================
const SAMPLE_INITIAL_SUBMISSIONS: QuizSubmission[] = [
  {
    id: 'sub-sample-1',
    studentName: '🚀 Nguyễn Hoàng Nam',
    studentClass: '10C05',
    examCode: 'CN10-B3-7821',
    submittedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    totalScore: 10.0,
    correctCount: 10,
    totalCount: 10,
    breakdown: {
      biet: { correct: 4, total: 4 },
      hieu: { correct: 3, total: 3 },
      van_dung: { correct: 3, total: 3 },
    },
    timeSpentSeconds: 142,
    gamifiedScore: 14850,
    maxStreak: 10,
    answers: [],
  },
  {
    id: 'sub-sample-2',
    studentName: '⭐ Trần Minh Thư',
    studentClass: '10C06',
    examCode: 'CN10-B3-6192',
    submittedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    totalScore: 9.0,
    correctCount: 9,
    totalCount: 10,
    breakdown: {
      biet: { correct: 4, total: 4 },
      hieu: { correct: 3, total: 3 },
      van_dung: { correct: 2, total: 3 },
    },
    timeSpentSeconds: 165,
    gamifiedScore: 12900,
    maxStreak: 7,
    answers: [],
  },
  {
    id: 'sub-sample-3',
    studentName: '⚡ Lê Bảo Long',
    studentClass: '10C07',
    examCode: 'CN10-B3-4410',
    submittedAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    totalScore: 8.0,
    correctCount: 8,
    totalCount: 10,
    breakdown: {
      biet: { correct: 4, total: 4 },
      hieu: { correct: 2, total: 3 },
      van_dung: { correct: 2, total: 3 },
    },
    timeSpentSeconds: 180,
    gamifiedScore: 10800,
    maxStreak: 5,
    answers: [],
  },
  {
    id: 'sub-sample-4',
    studentName: '💡 Phạm Thu Trang',
    studentClass: '10C08',
    examCode: 'CN10-B3-9124',
    submittedAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    totalScore: 7.0,
    correctCount: 7,
    totalCount: 10,
    breakdown: {
      biet: { correct: 3, total: 4 },
      hieu: { correct: 2, total: 3 },
      van_dung: { correct: 2, total: 3 },
    },
    timeSpentSeconds: 195,
    gamifiedScore: 9100,
    maxStreak: 4,
    answers: [],
  },
];

export function getSubmissions(): QuizSubmission[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(SAMPLE_INITIAL_SUBMISSIONS));
      return SAMPLE_INITIAL_SUBMISSIONS;
    }
    return JSON.parse(raw);
  } catch {
    return SAMPLE_INITIAL_SUBMISSIONS;
  }
}

export function saveSubmission(sub: QuizSubmission) {
  const current = getSubmissions();
  current.unshift(sub);
  localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(current));
}

export function clearSubmissions() {
  localStorage.removeItem(STORAGE_KEYS.SUBMISSIONS);
}

export function deleteSubmission(id: string) {
  const current = getSubmissions().filter(s => s.id !== id);
  localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(current));
}

// ================= TEACHER AUTH =================
export const TEACHER_CREDENTIALS = {
  username: 'Maihang',
  password: '123456hang',
  displayName: 'Cô Mai Hằng',
  subject: 'Môn Công nghệ 10',
};

export function checkTeacherLoggedIn(): boolean {
  return localStorage.getItem(STORAGE_KEYS.TEACHER_LOGGED_IN) === 'true';
}

export function setTeacherLoggedIn(val: boolean) {
  if (val) {
    localStorage.setItem(STORAGE_KEYS.TEACHER_LOGGED_IN, 'true');
  } else {
    localStorage.removeItem(STORAGE_KEYS.TEACHER_LOGGED_IN);
  }
}
