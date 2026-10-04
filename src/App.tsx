import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { StudentPortal } from './components/StudentPortal';
import { QuizGame } from './components/QuizGame';
import { QuizExamMode } from './components/QuizExamMode';
import { QuizReview } from './components/QuizReview';
import { Leaderboard } from './components/Leaderboard';
import { TeacherPortal } from './components/TeacherPortal';
import { 
  Question, 
  QuizSubmission, 
  StudentProfile 
} from './types';
import { 
  getQuestions, 
  getSubmissions, 
  saveSubmission, 
  checkTeacherLoggedIn, 
  setTeacherLoggedIn, 
  generateExam, 
  PreparedExam,
  getQuestionCounts 
} from './utils/storage';
import { sound } from './utils/audio';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'student' | 'teacher' | 'leaderboard'>('student');
  const [isTeacher, setIsTeacher] = useState<boolean>(false);

  // Question bank state
  const [questions, setQuestions] = useState<Question[]>([]);
  const [submissions, setSubmissions] = useState<QuizSubmission[]>([]);

  // Active quiz session state
  const [activeExam, setActiveExam] = useState<PreparedExam | null>(null);
  const [activeStudent, setActiveStudent] = useState<StudentProfile | null>(null);
  const [activeMode, setActiveMode] = useState<'quizizz' | 'exam' | null>(null);
  const [completedSubmission, setCompletedSubmission] = useState<QuizSubmission | null>(null);

  // Load initial data from localStorage
  useEffect(() => {
    setQuestions(getQuestions());
    setSubmissions(getSubmissions());
    setIsTeacher(checkTeacherLoggedIn());
  }, []);

  const refreshSubmissions = () => {
    setSubmissions(getSubmissions());
  };

  const handleTeacherLoginSuccess = () => {
    setTeacherLoggedIn(true);
    setIsTeacher(true);
  };

  const handleTeacherLogout = () => {
    sound.playClick();
    setTeacherLoggedIn(false);
    setIsTeacher(false);
    setCurrentTab('student');
  };

  // Start test
  const handleStartQuiz = (profile: StudentProfile, mode: 'quizizz' | 'exam') => {
    // Generate an exam with exactly 4 biet, 3 hieu, 3 van_dung
    const newExam = generateExam({
      bietCount: 4,
      hieuCount: 3,
      vanDungCount: 3,
      timePerQuestionSeconds: 25,
      shuffleOptions: true,
      shuffleQuestions: true,
    });

    setActiveExam(newExam);
    setActiveStudent(profile);
    setActiveMode(mode);
    setCompletedSubmission(null);
  };

  // Finish test
  const handleFinishQuiz = (sub: QuizSubmission) => {
    saveSubmission(sub);
    refreshSubmissions();
    setCompletedSubmission(sub);
    setActiveExam(null);
  };

  // Quit / cancel test
  const handleQuitQuiz = () => {
    setActiveExam(null);
    setActiveStudent(null);
    setActiveMode(null);
  };

  // Retake test (creates new 4-3-3 random test)
  const handleRetake = () => {
    if (activeStudent && activeMode) {
      handleStartQuiz(activeStudent, activeMode);
    } else {
      setCompletedSubmission(null);
      setActiveExam(null);
      setCurrentTab('student');
    }
  };

  const questionCounts = {
    total: questions.length,
    biet: questions.filter(q => q.level === 'biet').length,
    hieu: questions.filter(q => q.level === 'hieu').length,
    van_dung: questions.filter(q => q.level === 'van_dung').length,
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={tab => {
          // If in active quiz, confirm before leaving
          if (activeExam) {
            if (!confirm('Em đang trong bài thi. Rời đi sẽ hủy kết quả câu hỏi hiện tại. Bạn có chắc không?')) {
              return;
            }
            handleQuitQuiz();
          }
          setCurrentTab(tab);
        }}
        isTeacher={isTeacher}
        onTeacherLogout={handleTeacherLogout}
        questionCounts={questionCounts}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* If Active Quiz In Progress */}
        {activeExam && activeStudent && activeMode === 'quizizz' && (
          <QuizGame
            exam={activeExam}
            student={activeStudent}
            onFinish={handleFinishQuiz}
            onQuit={handleQuitQuiz}
          />
        )}

        {activeExam && activeStudent && activeMode === 'exam' && (
          <QuizExamMode
            exam={activeExam}
            student={activeStudent}
            onFinish={handleFinishQuiz}
            onQuit={handleQuitQuiz}
          />
        )}

        {/* If Test Finished and Reviewing */}
        {!activeExam && completedSubmission && currentTab === 'student' && (
          <QuizReview
            submission={completedSubmission}
            onRetake={handleRetake}
            onViewLeaderboard={() => {
              setCompletedSubmission(null);
              setCurrentTab('leaderboard');
            }}
          />
        )}

        {/* Default Student Home / Entry */}
        {!activeExam && !completedSubmission && currentTab === 'student' && (
          <StudentPortal
            onStartQuiz={handleStartQuiz}
            questionCounts={questionCounts}
          />
        )}

        {/* Leaderboard Tab */}
        {!activeExam && currentTab === 'leaderboard' && (
          <Leaderboard
            submissions={submissions}
            onTakeTest={() => {
              setCompletedSubmission(null);
              setCurrentTab('student');
            }}
          />
        )}

        {/* Teacher Management Tab */}
        {!activeExam && currentTab === 'teacher' && (
          <TeacherPortal
            isLoggedIn={isTeacher}
            onLoginSuccess={handleTeacherLoginSuccess}
            onLogout={handleTeacherLogout}
            questions={questions}
            onUpdateQuestions={qs => setQuestions(qs)}
            submissions={submissions}
            onRefreshSubmissions={refreshSubmissions}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            Hệ thống Quiz Trắc Nghiệm Công Nghệ 10 • Bài 3: Công nghệ phổ biến
          </div>
          <div className="text-slate-500">
            Giáo viên phụ trách: <strong className="text-indigo-600">Cô Mai Hằng</strong> • Ma trận 4 Biết - 3 Hiểu - 3 Vận dụng
          </div>
        </div>
      </footer>
    </div>
  );
}
