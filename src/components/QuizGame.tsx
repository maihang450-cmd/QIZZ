import React, { useState, useEffect, useRef } from 'react';
import { 
  Timer, 
  Flame, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  Zap, 
  BookOpen
} from 'lucide-react';
import { PreparedExam, PreparedExamQuestion } from '../utils/storage';
import { StudentProfile, QuizSubmission, DifficultyLevel } from '../types';
import { sound } from '../utils/audio';

interface QuizGameProps {
  exam: PreparedExam;
  student: StudentProfile;
  onFinish: (submission: QuizSubmission) => void;
  onQuit: () => void;
}

const OPTION_STYLES = [
  {
    bg: 'bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-500/20',
    selected: 'ring-4 ring-rose-300 bg-rose-600',
    border: 'border-rose-600',
    symbol: '▲',
    label: 'A',
  },
  {
    bg: 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20',
    selected: 'ring-4 ring-blue-300 bg-blue-700',
    border: 'border-blue-700',
    symbol: '◆',
    label: 'B',
  },
  {
    bg: 'bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/20',
    selected: 'ring-4 ring-amber-300 bg-amber-600',
    border: 'border-amber-600',
    symbol: '●',
    label: 'C',
  },
  {
    bg: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20',
    selected: 'ring-4 ring-emerald-300 bg-emerald-700',
    border: 'border-emerald-700',
    symbol: '■',
    label: 'D',
  },
];

export const QuizGame: React.FC<QuizGameProps> = ({
  exam,
  student,
  onFinish,
  onQuit,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(exam.rule.timePerQuestionSeconds || 25);
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  // Stored answers
  const [answers, setAnswers] = useState<QuizSubmission['answers']>([]);
  const questionStartTimeRef = useRef<number>(Date.now());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentQuestion: PreparedExamQuestion = exam.questions[currentIndex];
  const maxTime = exam.rule.timePerQuestionSeconds || 25;

  // Reset timer on question change
  useEffect(() => {
    setTimeLeft(maxTime);
    setSelectedOption(null);
    setIsAnswered(false);
    questionStartTimeRef.current = Date.now();

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleTimeOut();
          return 0;
        }
        if (prev <= 5) {
          sound.playTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex]);

  const handleTimeOut = () => {
    if (isAnswered) return;
    handleSelectOption(-1);
  };

  const handleSelectOption = (optionIndex: number) => {
    if (isAnswered) return;
    if (timerRef.current) clearInterval(timerRef.current);

    setIsAnswered(true);
    setSelectedOption(optionIndex);

    const timeTaken = Math.max(1, Math.round((Date.now() - questionStartTimeRef.current) / 1000));
    const isCorrect = optionIndex === currentQuestion.correctIndex;

    let earnedPoints = 0;
    let newStreak = streak;

    if (isCorrect) {
      newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);

      const timeBonus = Math.round(((timeLeft) / maxTime) * 500);
      const streakBonus = Math.min(1000, newStreak * 150);
      earnedPoints = 1000 + timeBonus + streakBonus;
      setPoints(p => p + earnedPoints);
      sound.playCorrect(newStreak);
    } else {
      newStreak = 0;
      setStreak(0);
      sound.playWrong();
    }

    const answerRecord = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.question,
      level: currentQuestion.level,
      options: currentQuestion.options,
      selectedOptionIndex: optionIndex,
      correctOptionIndex: currentQuestion.correctIndex,
      isCorrect,
      explanation: currentQuestion.explanation,
      timeTakenSeconds: timeTaken,
    };

    setAnswers(prev => [...prev, answerRecord]);
  };

  const handleNext = () => {
    sound.playClick();
    if (currentIndex + 1 < exam.questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      finishExam();
    }
  };

  const finishExam = () => {
    const allAnswers = answers;
    const correctCount = allAnswers.filter(a => a.isCorrect).length;
    const totalCount = exam.questions.length;
    const totalScore = Math.round((correctCount / totalCount) * 10 * 10) / 10;

    const breakdown = {
      biet: {
        correct: allAnswers.filter(a => a.level === 'biet' && a.isCorrect).length,
        total: allAnswers.filter(a => a.level === 'biet').length,
      },
      hieu: {
        correct: allAnswers.filter(a => a.level === 'hieu' && a.isCorrect).length,
        total: allAnswers.filter(a => a.level === 'hieu').length,
      },
      van_dung: {
        correct: allAnswers.filter(a => a.level === 'van_dung' && a.isCorrect).length,
        total: allAnswers.filter(a => a.level === 'van_dung').length,
      },
    };

    const totalTime = allAnswers.reduce((acc, a) => acc + a.timeTakenSeconds, 0);

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
      timeSpentSeconds: totalTime,
      gamifiedScore: points,
      maxStreak,
      answers: allAnswers,
    };

    onFinish(submission);
  };

  const getLevelBadge = (level: DifficultyLevel) => {
    switch (level) {
      case 'biet':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            Mức 1: Nhận Biết (4 câu)
          </span>
        );
      case 'hieu':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 border border-sky-300">
            Mức 2: Thông Hiểu (3 câu)
          </span>
        );
      case 'van_dung':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-300">
            Mức 3: Vận Dụng (3 câu)
          </span>
        );
    }
  };

  const timerPercentage = (timeLeft / maxTime) * 100;
  const isCorrect = selectedOption === currentQuestion.correctIndex;

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 sm:py-8">
      {/* Top Bar */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-lg shadow-slate-200/50 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-extrabold px-3 py-1 rounded-xl bg-indigo-600 text-white shadow-sm">
              CÂU {currentIndex + 1} / {exam.questions.length}
            </span>
            {getLevelBadge(currentQuestion.level)}
          </div>

          <div className="flex items-center space-x-3">
            {streak > 1 && (
              <div className="flex items-center space-x-1 px-3 py-1 rounded-xl bg-amber-100 text-amber-800 border border-amber-300 text-xs font-extrabold animate-bounce">
                <Flame className="w-4 h-4 fill-amber-500 text-amber-600" />
                <span>COMBO x{streak}</span>
              </div>
            )}

            <div className="flex items-center space-x-1 px-3 py-1 rounded-xl bg-purple-100 text-purple-800 border border-purple-300 text-xs font-bold">
              <Zap className="w-4 h-4 text-amber-500 fill-current" />
              <span>{points.toLocaleString()} pts</span>
            </div>

            <button
              onClick={() => {
                if (confirm('Em có chắc chắn muốn dừng bài thi trắc nghiệm này không?')) {
                  onQuit();
                }
              }}
              className="text-xs text-slate-400 hover:text-slate-600 transition font-semibold"
            >
              Thoát
            </button>
          </div>
        </div>

        {/* Timer Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5">
              <Timer className={`w-4 h-4 ${timeLeft <= 5 ? 'text-rose-500 animate-spin' : 'text-slate-500'}`} />
              Thời gian câu hỏi
            </span>
            <span className={`font-mono text-sm font-extrabold ${timeLeft <= 5 ? 'text-rose-600' : 'text-slate-700'}`}>
              {timeLeft}s
            </span>
          </div>

          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${
                timeLeft > 10
                  ? 'bg-gradient-to-r from-emerald-500 to-indigo-500'
                  : timeLeft > 5
                  ? 'bg-gradient-to-r from-yellow-500 to-amber-500'
                  : 'bg-rose-500 animate-pulse'
              }`}
              style={{ width: `${timerPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 mb-6">
        <div className="text-xs uppercase font-bold tracking-wider text-indigo-600 mb-2 flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Chủ đề: {currentQuestion.topic}</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500 font-mono">Mã: {currentQuestion.code}</span>
        </div>

        <h2 className="text-lg sm:text-2xl font-bold text-slate-900 leading-relaxed">
          {currentQuestion.question}
        </h2>
      </div>

      {/* 4 Choices Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {currentQuestion.options.map((optionText, idx) => {
          const style = OPTION_STYLES[idx];
          const isThisSelected = selectedOption === idx;
          const isThisCorrect = idx === currentQuestion.correctIndex;

          let btnClass = `${style.bg}`;

          if (isAnswered) {
            if (isThisCorrect) {
              btnClass = 'bg-emerald-600 ring-4 ring-emerald-300 text-white scale-102 shadow-xl shadow-emerald-600/30';
            } else if (isThisSelected && !isThisCorrect) {
              btnClass = 'bg-rose-600 text-white line-through opacity-70';
            } else {
              btnClass = 'bg-slate-200 text-slate-500 opacity-40 shadow-none';
            }
          }

          return (
            <button
              key={idx}
              disabled={isAnswered}
              onClick={() => handleSelectOption(idx)}
              className={`relative p-5 sm:p-6 rounded-2xl font-bold text-left transition-all duration-200 transform ${btnClass} ${
                !isAnswered ? 'hover:scale-[1.02] active:scale-95 cursor-pointer shadow-lg' : ''
              }`}
            >
              <div className="flex items-start space-x-3.5">
                <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-black/15 flex items-center justify-center font-black text-sm">
                  {style.symbol}
                </span>
                <div className="flex-1">
                  <span className="text-xs opacity-80 font-semibold block mb-0.5">Phương án {style.label}:</span>
                  <span className="text-sm sm:text-base leading-snug">{optionText}</span>
                </div>
                {isAnswered && isThisCorrect && (
                  <CheckCircle className="w-6 h-6 text-white shrink-0 animate-bounce" />
                )}
                {isAnswered && isThisSelected && !isThisCorrect && (
                  <XCircle className="w-6 h-6 text-white shrink-0" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Answer Feedback & Explanation Drawer */}
      {isAnswered && (
        <div className={`p-6 rounded-3xl border mb-6 shadow-xl transition-all ${
          isCorrect 
            ? 'bg-emerald-50 border-emerald-300' 
            : 'bg-rose-50 border-rose-300'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              {isCorrect ? (
                <>
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                  <span className="font-extrabold text-emerald-800 text-lg sm:text-xl">
                    CHÍNH XÁC! TUYỆT VỜI 🎉
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6 text-rose-600" />
                  <span className="font-extrabold text-rose-800 text-lg sm:text-xl">
                    {selectedOption === -1 ? 'HẾT GIỜ! ⏰' : 'CHƯA CHÍNH XÁC! 💡'}
                  </span>
                </>
              )}
            </div>

            <button
              onClick={handleNext}
              className="py-2.5 px-6 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 font-extrabold text-sm sm:text-base shadow-md shadow-indigo-600/25 transition-transform hover:scale-105 active:scale-95 flex items-center space-x-2 cursor-pointer"
            >
              <span>{currentIndex + 1 < exam.questions.length ? 'CÂU TIẾP THEO' : 'XEM KẾT QUẢ'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="text-sm text-slate-800 leading-relaxed bg-white p-4 rounded-2xl border border-slate-200">
            <div className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-600" />
              <span>Kiến thức cốt lõi (SGK Công nghệ 10 Bài 3):</span>
            </div>
            {currentQuestion.explanation}
          </div>
        </div>
      )}
    </div>
  );
};
