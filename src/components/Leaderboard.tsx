import React, { useState } from 'react';
import { Trophy, Medal, Clock, Zap, Search } from 'lucide-react';
import { QuizSubmission } from '../types';
import { sound } from '../utils/audio';

interface LeaderboardProps {
  submissions: QuizSubmission[];
  onTakeTest: () => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({
  submissions,
  onTakeTest,
}) => {
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const classes = Array.from(new Set(submissions.map(s => s.studentClass).filter(Boolean))).sort();

  const filtered = submissions.filter(s => {
    const matchClass = selectedClass === 'all' || s.studentClass === selectedClass;
    const matchSearch = 
      s.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.examCode.toLowerCase().includes(searchTerm.toLowerCase());
    return matchClass && matchSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
    if (b.gamifiedScore !== a.gamifiedScore) return b.gamifiedScore - a.gamifiedScore;
    return a.timeSpentSeconds - b.timeSpentSeconds;
  });

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <span className="text-2xl">🥇</span>;
    if (rank === 2) return <span className="text-2xl">🥈</span>;
    if (rank === 3) return <span className="text-2xl">🥉</span>;
    return (
      <span className="w-7 h-7 rounded-xl bg-slate-100 text-slate-700 font-extrabold text-xs flex items-center justify-center border border-slate-200">
        #{rank}
      </span>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold mb-3 border border-amber-200">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>BẢNG XẾP HẠNG & VINH DANH HỌC SINH</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Top Thí Sinh Đạt Điểm Cao Nhất
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          Môn Công nghệ 10 - Bài 3: Công nghệ phổ biến • Giáo viên: Cô Mai Hằng
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 mb-6 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Tìm theo tên học sinh..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
          />
        </div>

        {/* Class Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-slate-600">Lớp:</span>
          <select
            value={selectedClass}
            onChange={e => {
              sound.playClick();
              setSelectedClass(e.target.value);
            }}
            className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
          >
            <option value="all">Tất cả các lớp</option>
            {classes.map(cls => (
              <option key={cls} value={cls}>
                Lớp {cls}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Leaderboard List */}
      {sorted.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center shadow-sm">
          <Medal className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900 mb-1">Chưa Có Dữ Liệu Bảng Xếp Hạng</h3>
          <p className="text-xs sm:text-sm text-slate-500 mb-6">
            Hãy là học sinh đầu tiên tham gia thử sức bài thi trắc nghiệm để ghi danh lên bảng vàng!
          </p>
          <button
            onClick={() => {
              sound.playClick();
              onTakeTest();
            }}
            className="py-3 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/20 transition cursor-pointer"
          >
            Vào Thi Ngay
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map((item, idx) => {
            const rank = idx + 1;
            const isTop3 = rank <= 3;
            return (
              <div
                key={item.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all flex items-center justify-between ${
                  rank === 1
                    ? 'bg-amber-50/70 border-amber-300 shadow-md shadow-amber-500/10'
                    : rank === 2
                    ? 'bg-slate-50 border-slate-300 shadow-sm'
                    : rank === 3
                    ? 'bg-orange-50/50 border-orange-300 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 flex items-center justify-center shrink-0">
                    {getRankBadge(rank)}
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-extrabold text-slate-900 text-base sm:text-lg">
                        {item.studentName}
                      </span>
                      <span className="px-2 py-0.5 rounded-lg text-xs font-bold bg-indigo-100 text-indigo-700 border border-indigo-200">
                        {item.studentClass}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-sky-600" />
                        {formatTime(item.timeSpentSeconds)}
                      </span>
                      <span>•</span>
                      <span className="font-medium text-slate-600">
                        Đúng {item.correctCount}/{item.totalCount} câu
                      </span>
                      <span>•</span>
                      <span className="text-slate-400">Mã đề: {item.examCode}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`text-xl sm:text-2xl font-black ${
                    isTop3 ? 'text-amber-600' : 'text-emerald-600'
                  }`}>
                    {item.totalScore.toFixed(1)} <span className="text-xs font-normal text-slate-400">đ</span>
                  </div>
                  {item.gamifiedScore > 0 && (
                    <div className="text-xs text-purple-700 font-bold flex items-center justify-end gap-1 mt-0.5">
                      <Zap className="w-3 h-3 text-amber-500 fill-current" />
                      <span>{item.gamifiedScore.toLocaleString()} pts</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
