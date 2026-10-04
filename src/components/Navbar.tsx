import React from 'react';
import { Volume2, VolumeX, Sparkles, BookOpen, Trophy, GraduationCap, ShieldCheck, LogOut } from 'lucide-react';
import { sound } from '../utils/audio';

interface NavbarProps {
  currentTab: 'student' | 'teacher' | 'leaderboard';
  setCurrentTab: (tab: 'student' | 'teacher' | 'leaderboard') => void;
  isTeacher: boolean;
  onTeacherLogout: () => void;
  questionCounts: { total: number; biet: number; hieu: number; van_dung: number };
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  isTeacher,
  onTeacherLogout,
  questionCounts,
}) => {
  const [isMuted, setIsMuted] = React.useState(sound.getIsMuted());

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playClick();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Subject Info */}
          <div 
            onClick={() => setCurrentTab('student')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-base sm:text-xl tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Quizizz Công Nghệ 10
                </span>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Bài 3: Công nghệ phổ biến
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Ngân hàng {questionCounts.total} câu ({questionCounts.biet} Biết • {questionCounts.hieu} Hiểu • {questionCounts.van_dung} Vận dụng) — Đề thi 10 câu
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            <button
              onClick={() => {
                sound.playClick();
                setCurrentTab('student');
              }}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                currentTab === 'student'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Phòng Thi HS</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setCurrentTab('leaderboard');
              }}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                currentTab === 'leaderboard'
                  ? 'bg-amber-500 text-white font-bold shadow-md shadow-amber-500/25'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Bảng Vinh Danh</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setCurrentTab('teacher');
              }}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                currentTab === 'teacher'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/25'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-purple-600" />
              <span>{isTeacher ? 'GV: Mai Hằng' : 'Giáo Viên'}</span>
              {isTeacher && (
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 ml-0.5" />
              )}
            </button>

            {/* Teacher Logout if logged in */}
            {isTeacher && (
              <button
                onClick={onTeacherLogout}
                title="Đăng xuất giáo viên"
                className="p-2 text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}

            {/* Sound toggle button */}
            <button
              onClick={handleToggleSound}
              title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-rose-500" />
              ) : (
                <Volume2 className="w-5 h-5 text-indigo-600" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
