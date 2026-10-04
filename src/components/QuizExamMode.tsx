import React, { useState, useEffect, useRef } from 'react';
import { 
  Timer, 
  Send, 
  AlertCircle, 
  ArrowLeft, 
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { PreparedExam, PreparedExamQuestion } from '../utils/storage';
import { StudentProfile, QuizSubmission, DifficultyLevel } from '../types';
import { sound } from '../utils/audio';

interface QuizExamModeProps {
  exam: PreparedExam;
  student: StudentProfile;
  onFinish: (submission: QuizSubmission) => void;
  onQuit: () => void;
}

export const QuizExamMode: React.FC<QuizExamModeProps> = ({
  exam,
  student,
  onFinish,
  onQuit,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        if (prev === 60) {
          sound.playTick();
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSelectOption = (optionIndex: number) => {
    sound.playClick();
    setSelectedAnswers(prev => ({
      ...prev,
      [currentIndex]: optionIndex,
    }));
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const totalCount = exam.questions.length;

  const handleSubmit = () => {
    sound.playClick();
    const timeSpent = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000));

    const answersList = exam.questions.map((q, idx) => {
      const selected = selectedAnswers[idx] !== undefined ? selectedAnswers[idx] : -1;
      const isCorrect = selected === q.correctIndex;
      return {
        questionId: q.id,
        questionText: q.question,
        level: q.level,
        options: q.options,
        selectedOptionIndex: selected,
        correctOptionIndex: q.correctIndex,
        isCorrect,
        explanation: q.explanation,
        timeTakenSeconds: Math.round(timeSpent / totalCount),
      };
    });

    const correctCount = answersList.filter(a => a.isCorrect).length;
    const totalScore = Math.round((correctCount / totalCount) * 10 * 10) / 10;

    const breakdown = {
      biet: {
        correct: answersList.filter(a => a.level === 'biet' && a.isCorrect).length,
        total: answersList.filter(a => a.level === 'biet').length,
      },
      hieu: {
        correct: answersList.filter(a => a.level === 'hieu' && a.isCorrect).length,
        total: answersList.filter(a => a.level === 'hieu').length,
      },
      van_dung: {
        correct: answersList.filter(a => a.level === 'van_dung' && a.isCorrect).length,
        total: answersList.filter(a => a.level === 'van_dung').length,
      },
    };

    const submission: QuizSubmission = {
      id: `sub-${Date.now()}`,
      studentName: student.name,
      studentClass: student.studentClass,
      studentId: student.studentId,
      examCode: exam.examCode,
      submittedAt: new Date().toISOString(),
      totalScore,
      correctCount,
      totalCount,
      breakdown,
      timeSpentSeconds: timeSpent,
      gamifiedScore: correctCount * 1000,
      maxStreak: 0,
      answers: answersList,
    };

    onFinish(submission);
  };

  const currentQ: PreparedExamQuestion = exam.questions[currentIndex];

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getLevelBadge = (level: DifficultyLevel) => {
    switch (level) {
      case 'biet':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">Mức 1: Biết (4 câu)</span>;
      case 'hieu':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 border border-sky-300">Mức 2: Hiểu (3 câu)</span>;
      case 'van_dung':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-300">Mức 3: Vận Dụng (3 câu)</span>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 sm:py-8">
      {/* Exam Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-lg shadow-slate-200/50 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs text-indigo-600 font-semibold mb-1 flex items-center gap-2">
            <span>Mã đề: <strong className="text-slate-900">{exam.examCode}</strong></span>
            <span>•</span>
            <span>Thí sinh: <strong className="text-slate-900">{student.name}</strong> ({student.studentClass})</span>
          </div>
          <h1 className="text-lg sm:text-xl font-black text-slate-900">
            Bài Thi Trắc Nghiệm Môn Công Nghệ 10
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-100 border border-slate-200">
            <Timer className={`w-5 h-5 ${timeLeft <= 60 ? 'text-rose-500 animate-pulse' : 'text-amber-500'}`} />
            <div className="font-mono text-lg font-black text-slate-900">
              {formatTime(timeLeft)}
            </div>
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="py-2.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-md shadow-emerald-600/20 transition flex items-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>NỘP BÀI ({answeredCount}/{totalCount})</span>
          </button>
        </div>
      </div>

      {/* Question Selector Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3 mb-6 flex flex-wrap items-center justify-center gap-2 shadow-sm">
        {exam.questions.map((q, idx) => {
          const isAnswered = selectedAnswers[idx] !== undefined;
          const isCurrent = idx === currentIndex;
          return (
            <button
              key={idx}
              onClick={() => {
                sound.playClick();
                setCurrentIndex(idx);
              }}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                isCurrent
                  ? 'bg-indigo-600 text-white ring-2 ring-indigo-400 shadow-md scale-105'
                  : isAnswered
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Current Question View */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-black px-3 py-1 bg-indigo-600 text-white rounded-xl">
            CÂU HỎI {currentIndex + 1} / {totalCount}
          </span>
          {getLevelBadge(currentQ.level)}
        </div>

        <div className="text-xs text-indigo-600 mb-2 flex items-center gap-1.5 font-bold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Chủ đề: {currentQ.topic}</span>
        </div>

        <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-6 leading-relaxed">
          {currentQ.question}
        </h2>

        {/* 4 Choices */}
        <div className="space-y-3">
          {currentQ.options.map((opt, optIdx) => {
            const isSelected = selectedAnswers[currentIndex] === optIdx;
            const labels = ['A', 'B', 'C', 'D'];
            return (
              <div
                key={optIdx}
                onClick={() => handleSelectOption(optIdx)}
                className={`cursor-pointer p-4 rounded-2xl border transition-all flex items-start space-x-3 ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                }`}
              >
                <span className={`w-7 h-7 rounded-xl font-extrabold text-xs flex items-center justify-center shrink-0 ${
                  isSelected ? 'bg-white text-indigo-900' : 'bg-slate-200 text-slate-700'
                }`}>
                  {labels[optIdx]}
                </span>
                <span className="text-sm sm:text-base font-medium leading-relaxed">{opt}</span>
              </div>
            );
          })}
        </div>

        {/* Navigation bottom */}
        <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-100">
          <button
            disabled={currentIndex === 0}
            onClick={() => {
              sound.playClick();
              setCurrentIndex(c => c - 1);
            }}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:pointer-events-none text-slate-700 font-semibold text-sm flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Câu trước</span>
          </button>

          {currentIndex + 1 < totalCount ? (
            <button
              onClick={() => {
                sound.playClick();
                setCurrentIndex(c => c + 1);
              }}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <span>Câu sau</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setShowSubmitModal(true)}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <span>Nộp bài thi</span>
              <Send className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center">
            <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4 animate-bounce" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">Xác Nhận Nộp Bài Thi</h3>
            <p className="text-sm text-slate-600 mb-6">
              Em đã hoàn thành <strong className="text-emerald-600 font-bold">{answeredCount}/{totalCount} câu hỏi</strong>.
              {answeredCount < totalCount && (
                <span className="block mt-2 text-rose-600 font-semibold">
                  ⚠️ Còn {totalCount - answeredCount} câu chưa chọn đáp án!
                </span>
              )}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm cursor-pointer"
              >
                Tiếp tục làm bài
              </button>
              <button
                onClick={() => {
                  setShowSubmitModal(false);
                  handleSubmit();
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md shadow-emerald-600/20 cursor-pointer"
              >
                Đồng ý nộp bài
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
