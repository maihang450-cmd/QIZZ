import React, { useState } from 'react';
import { 
  Play, 
  Gamepad2, 
  FileText, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Flame, 
  Award,
  BookOpenCheck
} from 'lucide-react';
import { StudentProfile } from '../types';
import { sound } from '../utils/audio';

interface StudentPortalProps {
  onStartQuiz: (profile: StudentProfile, mode: 'quizizz' | 'exam') => void;
  questionCounts: { total: number; biet: number; hieu: number; van_dung: number };
}

const AVATARS = ['🚀', '⚡', '🎯', '💡', '🦁', '🦊', '🐼', '🤖', '👑', '⭐'];
const QUICK_CLASSES = ['10C05', '10C06', '10C07', '10C08'];

export const StudentPortal: React.FC<StudentPortalProps> = ({
  onStartQuiz,
  questionCounts,
}) => {
  const [name, setName] = useState('');
  const [studentClass, setStudentClass] = useState('10C05');
  const [selectedAvatar, setSelectedAvatar] = useState('🚀');
  const [mode, setMode] = useState<'quizizz' | 'exam'>('quizizz');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Vui lòng nhập họ và tên của em trước khi bắt đầu!');
      return;
    }
    if (!studentClass.trim()) {
      setError('Vui lòng chọn hoặc nhập lớp học!');
      return;
    }
    setError('');
    sound.playClick();
    onStartQuiz(
      {
        name: `${selectedAvatar} ${name.trim()}`,
        studentClass: studentClass.trim(),
      },
      mode
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-10">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 text-white p-6 sm:p-10 mb-8 shadow-xl shadow-indigo-500/15">
        <div className="relative z-10 text-center sm:text-left sm:flex sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold mb-3 border border-white/20 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Chương 1: Đại Cương Về Công Nghệ</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-3">
              Đấu Trường Quizizz: <span className="text-amber-300">Bài 3 - Công Nghệ Phổ Biến</span>
            </h1>
            <p className="text-sm sm:text-base text-indigo-100 mb-4 leading-relaxed font-normal">
              Mỗi đề thi tự động rút ngẫu nhiên <strong className="text-yellow-300 font-bold">10 câu hỏi</strong> theo ma trận: 
              <span className="font-bold text-white"> 4 câu Biết</span> + 
              <span className="font-bold text-white"> 3 câu Hiểu</span> + 
              <span className="font-bold text-white"> 3 câu Vận dụng</span>.
            </p>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-black/20 text-white font-medium flex items-center gap-1.5 backdrop-blur-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                Ngân hàng {questionCounts.total} câu (40 Biết - 30 Hiểu - 30 Vận dụng)
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-black/20 text-white font-medium flex items-center gap-1.5 backdrop-blur-sm">
                <Clock className="w-3.5 h-3.5 text-amber-300" />
                Bấm giờ & Bảng vinh danh
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-black/20 text-white font-medium flex items-center gap-1.5 backdrop-blur-sm">
                <Flame className="w-3.5 h-3.5 text-orange-300" />
                Streak Combo thưởng điểm
              </span>
            </div>
          </div>

          <div className="hidden sm:flex flex-col items-center justify-center p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-inner">
            <div className="text-4xl mb-1">🏆</div>
            <div className="text-xs font-semibold text-indigo-100 text-center">
              Giáo viên phụ trách:<br />
              <span className="text-yellow-300 font-bold text-sm">Cô Mai Hằng</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Student Registration Card */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/40">
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <BookOpenCheck className="w-6 h-6 text-indigo-600" />
          <span>Thông Tin Thí Sinh Tham Gia Thi</span>
        </h2>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-semibold flex items-center gap-2">
            <span>⚠️ {error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar picker */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Chọn Avatar vui nhộn
            </label>
            <div className="flex flex-wrap gap-2">
              {AVATARS.map(avatar => (
                <button
                  key={avatar}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setSelectedAvatar(avatar);
                  }}
                  className={`w-11 h-11 text-xl rounded-2xl flex items-center justify-center transition-all ${
                    selectedAvatar === avatar
                      ? 'bg-indigo-600 text-white scale-110 shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Student Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Họ và tên học sinh <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Ví dụ: Nguyễn Văn An"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white font-medium transition"
              />
            </div>

            {/* Student Class */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Lớp học <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={studentClass}
                onChange={e => setStudentClass(e.target.value)}
                placeholder="Ví dụ: 10C05"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white font-medium mb-2 transition"
              />
              <div className="flex flex-wrap gap-1.5">
                {QUICK_CLASSES.map(cls => (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setStudentClass(cls);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                      studentClass === cls
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cls}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mode Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              Hình thức làm bài
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => {
                  sound.playClick();
                  setMode('quizizz');
                }}
                className={`cursor-pointer p-4 rounded-2xl border transition-all flex items-start space-x-3.5 ${
                  mode === 'quizizz'
                    ? 'bg-indigo-50/70 border-indigo-500 ring-2 ring-indigo-500/20 shadow-md shadow-indigo-500/10'
                    : 'bg-slate-50/80 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="p-3 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 text-white shadow-md">
                  <Gamepad2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-base">Đấu Trường Quiz Game</h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-100 text-rose-700 border border-rose-200">
                      HOT
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Từng câu hỏi tương tác như Kahoot/Quizizz. Bấm giờ 25s/câu, âm thanh hiệu ứng, chuỗi đúng nhân điểm và lời giải tức thời.
                  </p>
                </div>
              </div>

              <div
                onClick={() => {
                  sound.playClick();
                  setMode('exam');
                }}
                className={`cursor-pointer p-4 rounded-2xl border transition-all flex items-start space-x-3.5 ${
                  mode === 'exam'
                    ? 'bg-indigo-50/70 border-indigo-500 ring-2 ring-indigo-500/20 shadow-md shadow-indigo-500/10'
                    : 'bg-slate-50/80 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="p-3 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-md">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Bài Thi Chuẩn 10 Câu</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Xem trọn đề thi 10 câu, tự do chuyển câu, rà soát đáp án và đồng hồ đếm ngược 10 phút. Nộp bài khi hoàn thành.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Matrix Preview Note */}
          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-900 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-amber-500 shrink-0" />
              <span>
                Cấu trúc đề chuẩn: <strong>4 câu Biết (4.0đ)</strong> + <strong>3 câu Hiểu (3.0đ)</strong> + <strong>3 câu Vận dụng (3.0đ)</strong> = <strong>10.0 điểm</strong>
              </span>
            </div>
            <span className="hidden sm:inline-block font-bold text-indigo-700">
              Đạt khi ≥ 5.0đ
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:via-teal-500 hover:to-indigo-500 text-white font-extrabold text-lg sm:text-xl shadow-lg shadow-emerald-600/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 cursor-pointer"
          >
            <Play className="w-6 h-6 fill-current" />
            <span>BẮT ĐẦU VÀO PHÒNG THI</span>
          </button>
        </form>
      </div>
    </div>
  );
};
