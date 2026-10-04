import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  RotateCcw, 
  Clock, 
  Flame, 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  Zap,
  Printer
} from 'lucide-react';
import { QuizSubmission } from '../types';
import { sound } from '../utils/audio';

interface QuizReviewProps {
  submission: QuizSubmission;
  onRetake: () => void;
  onViewLeaderboard: () => void;
}

export const QuizReview: React.FC<QuizReviewProps> = ({
  submission,
  onRetake,
  onViewLeaderboard,
}) => {
  useEffect(() => {
    if (submission.totalScore >= 5.0) {
      sound.playVictory();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [submission.totalScore]);

  const getEvaluation = (score: number) => {
    if (score >= 9.0) return { title: 'XUẤT SẮC! 🌟', desc: 'Em nắm kiến thức bài 3 rất vững vàng và chuẩn xác!', color: 'text-amber-600' };
    if (score >= 8.0) return { title: 'GIỎI! 👏', desc: 'Kết quả rất tốt, em đã hiểu sâu các công nghệ phổ biến!', color: 'text-emerald-600' };
    if (score >= 6.5) return { title: 'KHÁ! 👍', desc: 'Em đã đạt kết quả khá tốt, ôn thêm phần vận dụng để hoàn hảo nhé!', color: 'text-sky-600' };
    if (score >= 5.0) return { title: 'ĐẠT YÊU CẦU! 🎯', desc: 'Em đã vượt qua bài thi, cố gắng ôn thêm để nâng cao điểm số!', color: 'text-indigo-600' };
    return { title: 'CẦN CỐ GẮNG THÊM! 💪', desc: 'Hãy đọc lại SGK Bài 3: Công nghệ phổ biến và thử sức lại nhé!', color: 'text-rose-600' };
  };

  const evalInfo = getEvaluation(submission.totalScore);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-10">
      {/* Result Hero Header */}
      <div className="relative rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 mb-8 shadow-xl shadow-slate-200/50 text-center overflow-hidden">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-4 border border-indigo-200">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>BÁO CÁO KẾT QUẢ THI TRẮC NGHIỆM</span>
        </div>

        <h1 className={`text-2xl sm:text-4xl font-black mb-2 ${evalInfo.color}`}>
          {evalInfo.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto mb-6">
          {evalInfo.desc}
        </p>

        {/* Big Score circle */}
        <div className="flex flex-col items-center justify-center my-4">
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-1 shadow-xl shadow-indigo-500/20">
            <div className="w-full h-full bg-white rounded-full flex flex-col items-center justify-center">
              <span className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight">
                {submission.totalScore.toFixed(1)}
              </span>
              <span className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">
                Thang 10 điểm
              </span>
            </div>
          </div>
          <span className="text-sm font-semibold text-slate-500 mt-2">
            Đúng {submission.correctCount} / {submission.totalCount} câu hỏi
          </span>
        </div>

        {/* Student Meta */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-600">
          <span>Thí sinh: <strong className="text-slate-900">{submission.studentName}</strong></span>
          <span>•</span>
          <span>Lớp: <strong className="text-slate-900">{submission.studentClass}</strong></span>
          <span>•</span>
          <span>Mã đề: <strong className="text-indigo-600 font-bold">{submission.examCode}</strong></span>
        </div>

        {/* Matrix Breakdown Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 max-w-2xl mx-auto text-left">
          {/* Mức Biết */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
            <div className="text-xs font-bold text-emerald-800 uppercase mb-1">Mức Biết (4 câu)</div>
            <div className="text-xl sm:text-2xl font-black text-slate-900">
              {submission.breakdown.biet.correct} / {submission.breakdown.biet.total}
              <span className="text-xs text-slate-500 font-normal ml-1">câu</span>
            </div>
            <div className="w-full h-2 bg-emerald-200 rounded-full mt-2 overflow-hidden">
              <div 
                className="h-full bg-emerald-600 rounded-full" 
                style={{ width: `${(submission.breakdown.biet.correct / Math.max(1, submission.breakdown.biet.total)) * 100}%` }}
              />
            </div>
          </div>

          {/* Mức Hiểu */}
          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200">
            <div className="text-xs font-bold text-sky-800 uppercase mb-1">Mức Hiểu (3 câu)</div>
            <div className="text-xl sm:text-2xl font-black text-slate-900">
              {submission.breakdown.hieu.correct} / {submission.breakdown.hieu.total}
              <span className="text-xs text-slate-500 font-normal ml-1">câu</span>
            </div>
            <div className="w-full h-2 bg-sky-200 rounded-full mt-2 overflow-hidden">
              <div 
                className="h-full bg-sky-600 rounded-full" 
                style={{ width: `${(submission.breakdown.hieu.correct / Math.max(1, submission.breakdown.hieu.total)) * 100}%` }}
              />
            </div>
          </div>

          {/* Mức Vận dụng */}
          <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200">
            <div className="text-xs font-bold text-purple-800 uppercase mb-1">Mức Vận Dụng (3 câu)</div>
            <div className="text-xl sm:text-2xl font-black text-slate-900">
              {submission.breakdown.van_dung.correct} / {submission.breakdown.van_dung.total}
              <span className="text-xs text-slate-500 font-normal ml-1">câu</span>
            </div>
            <div className="w-full h-2 bg-purple-200 rounded-full mt-2 overflow-hidden">
              <div 
                className="h-full bg-purple-600 rounded-full" 
                style={{ width: `${(submission.breakdown.van_dung.correct / Math.max(1, submission.breakdown.van_dung.total)) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs text-slate-600">
          <span className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 flex items-center gap-1.5 font-medium">
            <Clock className="w-4 h-4 text-sky-600" />
            Thời gian: <strong className="text-slate-900">{formatTime(submission.timeSpentSeconds)}</strong>
          </span>
          {submission.gamifiedScore > 0 && (
            <span className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 flex items-center gap-1.5 font-medium">
              <Zap className="w-4 h-4 text-amber-500 fill-current" />
              Điểm game: <strong className="text-slate-900">{submission.gamifiedScore.toLocaleString()} pts</strong>
            </span>
          )}
          {submission.maxStreak > 1 && (
            <span className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 flex items-center gap-1.5 font-medium">
              <Flame className="w-4 h-4 text-orange-500 fill-current" />
              Chuỗi đúng dài nhất: <strong className="text-slate-900">x{submission.maxStreak}</strong>
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10 no-print">
        <button
          onClick={() => {
            sound.playClick();
            onRetake();
          }}
          className="py-3 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm sm:text-base shadow-md shadow-indigo-600/20 transition flex items-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-5 h-5" />
          <span>THI ĐỀ MỚI (TẠO ĐỀ KHÁC)</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onViewLeaderboard();
          }}
          className="py-3 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm sm:text-base shadow-md shadow-amber-500/20 transition flex items-center gap-2 cursor-pointer"
        >
          <Trophy className="w-5 h-5" />
          <span>BẢNG VINH DANH</span>
        </button>

        <button
          onClick={() => window.print()}
          className="py-3 px-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition flex items-center gap-2 border border-slate-300 shadow-sm cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>In Kết Quả</span>
        </button>
      </div>

      {/* Detailed Question By Question Review */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <span>Chi Tiết Lời Giải Từng Câu Hỏi ({submission.answers.length} câu)</span>
          </h2>
          <span className="text-xs text-slate-500">
            Giáo viên phụ trách: <strong className="text-slate-700">Cô Mai Hằng</strong>
          </span>
        </div>

        {submission.answers.map((ans, idx) => {
          const labels = ['A', 'B', 'C', 'D'];
          const levelText = 
            ans.level === 'biet' ? 'Mức 1: Nhận Biết' :
            ans.level === 'hieu' ? 'Mức 2: Thông Hiểu' : 'Mức 3: Vận Dụng';

          const levelColor = 
            ans.level === 'biet' ? 'text-emerald-800 bg-emerald-100 border-emerald-300' :
            ans.level === 'hieu' ? 'text-sky-800 bg-sky-100 border-sky-300' :
            'text-purple-800 bg-purple-100 border-purple-300';

          return (
            <div
              key={idx}
              className={`p-5 sm:p-6 rounded-3xl border transition-all ${
                ans.isCorrect
                  ? 'bg-white border-emerald-300 shadow-md shadow-emerald-500/5'
                  : 'bg-white border-rose-300 shadow-md shadow-rose-500/5'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-1 rounded-xl text-xs font-black bg-slate-100 text-slate-700">
                    Câu {idx + 1}
                  </span>
                  <span className={`px-2.5 py-1 rounded-xl text-xs font-bold border ${levelColor}`}>
                    {levelText}
                  </span>
                </div>

                <div className="flex items-center space-x-1.5 font-bold text-xs">
                  {ans.isCorrect ? (
                    <span className="text-emerald-600 flex items-center gap-1 font-bold">
                      <CheckCircle2 className="w-4 h-4" /> Chính xác (+1.0đ)
                    </span>
                  ) : (
                    <span className="text-rose-600 flex items-center gap-1 font-bold">
                      <XCircle className="w-4 h-4" /> Chưa đúng (0đ)
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4">
                {ans.questionText}
              </h3>

              {/* Options list */}
              <div className="space-y-2 mb-4">
                {ans.options.map((optText, optIdx) => {
                  const isCorrectAnswer = optIdx === ans.correctOptionIndex;
                  const isStudentPicked = optIdx === ans.selectedOptionIndex;

                  let optClass = 'bg-slate-50 text-slate-700 border-slate-200';
                  if (isCorrectAnswer) {
                    optClass = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                  } else if (isStudentPicked && !isCorrectAnswer) {
                    optClass = 'bg-rose-50 border-rose-400 text-rose-950 line-through';
                  }

                  return (
                    <div
                      key={optIdx}
                      className={`p-3 rounded-xl border text-sm flex items-start space-x-2.5 ${optClass}`}
                    >
                      <span className="font-extrabold w-5 text-xs text-slate-500 pt-0.5">
                        {labels[optIdx]}.
                      </span>
                      <span className="flex-1">{optText}</span>
                      {isCorrectAnswer && (
                        <span className="text-[11px] font-black px-2 py-0.5 rounded bg-emerald-600 text-white shrink-0">
                          ĐÁP ÁN ĐÚNG
                        </span>
                      )}
                      {isStudentPicked && !isCorrectAnswer && (
                        <span className="text-[11px] font-black px-2 py-0.5 rounded bg-rose-600 text-white shrink-0">
                          EM CHỌN
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Lesson core explanation */}
              <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-xs sm:text-sm text-indigo-950 leading-relaxed">
                <span className="font-bold text-indigo-900 block mb-0.5">
                  💡 Lời giải chi tiết:
                </span>
                {ans.explanation}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
