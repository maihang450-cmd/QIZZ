import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  Search, 
  Plus, 
  Trash2, 
  Edit3, 
  RotateCcw, 
  Download, 
  Clock, 
  BarChart3, 
  FileSpreadsheet, 
  Printer, 
  Layers, 
  Eye, 
  X, 
  BookOpen
} from 'lucide-react';
import { Question, QuizSubmission, DifficultyLevel } from '../types';
import { 
  TEACHER_CREDENTIALS, 
  saveQuestions, 
  resetQuestionsToDefault, 
  deleteSubmission, 
  clearSubmissions,
  generateExam,
  PreparedExam
} from '../utils/storage';
import { sound } from '../utils/audio';

interface TeacherPortalProps {
  isLoggedIn: boolean;
  onLoginSuccess: () => void;
  onLogout: () => void;
  questions: Question[];
  onUpdateQuestions: (qs: Question[]) => void;
  submissions: QuizSubmission[];
  onRefreshSubmissions: () => void;
}

export const TeacherPortal: React.FC<TeacherPortalProps> = ({
  isLoggedIn,
  onLoginSuccess,
  onLogout,
  questions,
  onUpdateQuestions,
  submissions,
  onRefreshSubmissions,
}) => {
  // Login State - Inputs start empty with NO visible credentials hint
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Dashboard Tabs
  const [activeTab, setActiveTab] = useState<'questions' | 'submissions' | 'print' | 'matrix'>('questions');

  // Question bank filters
  const [levelFilter, setLevelFilter] = useState<'all' | DifficultyLevel>('all');
  const [questionSearch, setQuestionSearch] = useState('');

  // Question Edit/Create Modal
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [isNewQuestion, setIsNewQuestion] = useState(false);

  // Student Submission Detail Modal
  const [viewingSubmission, setViewingSubmission] = useState<QuizSubmission | null>(null);

  // Print Exam Generator State
  const [printExam, setPrintExam] = useState<PreparedExam | null>(null);
  const [showAnswerKeyInPrint, setShowAnswerKeyInPrint] = useState(true);

  // ================= LOGIN HANDLER =================
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      username.trim().toLowerCase() === TEACHER_CREDENTIALS.username.toLowerCase() &&
      password.trim() === TEACHER_CREDENTIALS.password
    ) {
      sound.playCorrect();
      setLoginError('');
      onLoginSuccess();
    } else {
      sound.playWrong();
      setLoginError('Tên đăng nhập hoặc mật khẩu không chính xác!');
    }
  };

  // ================= QUESTION HANDLERS =================
  const handleSaveQuestion = (q: Question) => {
    sound.playClick();
    let updated: Question[];
    if (isNewQuestion) {
      updated = [q, ...questions];
    } else {
      updated = questions.map(item => (item.id === q.id ? q : item));
    }
    onUpdateQuestions(updated);
    saveQuestions(updated);
    setEditingQuestion(null);
  };

  const handleDeleteQuestion = (id: string) => {
    if (!confirm('Cô Mai Hằng có chắc chắn muốn xóa câu hỏi này khỏi ngân hàng?')) return;
    sound.playClick();
    const updated = questions.filter(q => q.id !== id);
    onUpdateQuestions(updated);
    saveQuestions(updated);
  };

  const handleResetQuestions = () => {
    if (!confirm('Khôi phục toàn bộ 100 câu hỏi chuẩn ban đầu (40 Biết, 30 Hiểu, 30 Vận dụng) theo SGK Công nghệ 10?')) return;
    sound.playClick();
    const def = resetQuestionsToDefault();
    onUpdateQuestions(def);
  };

  const handleExportQuestionsJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(questions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `Ngan_Hang_100_Cau_Cong_Nghe_10_Maihang.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // ================= SUBMISSION HANDLERS =================
  const handleDeleteSubmission = (id: string) => {
    if (!confirm('Xóa bài làm này của học sinh?')) return;
    sound.playClick();
    deleteSubmission(id);
    onRefreshSubmissions();
  };

  const handleClearAllSubmissions = () => {
    if (!confirm('Cô Mai Hằng có chắc chắn muốn xóa TOÀN BỘ lịch sử bài làm của học sinh?')) return;
    sound.playClick();
    clearSubmissions();
    onRefreshSubmissions();
  };

  const handleExportSubmissionsCSV = () => {
    if (submissions.length === 0) {
      alert('Chưa có bài thi nào để xuất!');
      return;
    }
    const headers = [
      'STT',
      'Họ và tên',
      'Lớp',
      'Mã đề',
      'Điểm tổng',
      'Đúng/Tổng',
      'Mức Biết (/4)',
      'Mức Hiểu (/3)',
      'Mức Vận dụng (/3)',
      'Thời gian (giây)',
      'Thời gian nộp',
    ];
    const rows = submissions.map((s, idx) => [
      idx + 1,
      `"${s.studentName}"`,
      s.studentClass,
      s.examCode,
      s.totalScore,
      `${s.correctCount}/${s.totalCount}`,
      `${s.breakdown.biet.correct}/${s.breakdown.biet.total}`,
      `${s.breakdown.hieu.correct}/${s.breakdown.hieu.total}`,
      `${s.breakdown.van_dung.correct}/${s.breakdown.van_dung.total}`,
      s.timeSpentSeconds,
      `"${new Date(s.submittedAt).toLocaleString('vi-VN')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Bang_Diem_Hoc_Sinh_Cong_Nghe_10_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // ================= PRINT EXAM HANDLER =================
  const handleGeneratePrintExam = () => {
    sound.playClick();
    const exam = generateExam({
      bietCount: 4,
      hieuCount: 3,
      vanDungCount: 3,
      shuffleOptions: false,
      shuffleQuestions: true,
    });
    setPrintExam(exam);
  };

  // Stats
  const countBiet = questions.filter(q => q.level === 'biet').length;
  const countHieu = questions.filter(q => q.level === 'hieu').length;
  const countVanDung = questions.filter(q => q.level === 'van_dung').length;

  const avgScore = submissions.length > 0 
    ? (submissions.reduce((acc, s) => acc + s.totalScore, 0) / submissions.length).toFixed(1)
    : '0.0';
  const passRate = submissions.length > 0
    ? Math.round((submissions.filter(s => s.totalScore >= 5.0).length / submissions.length) * 100)
    : 0;

  // Filtered questions
  const filteredQuestions = questions.filter(q => {
    const matchLevel = levelFilter === 'all' || q.level === levelFilter;
    const matchSearch = 
      q.question.toLowerCase().includes(questionSearch.toLowerCase()) ||
      q.topic.toLowerCase().includes(questionSearch.toLowerCase()) ||
      q.code.toLowerCase().includes(questionSearch.toLowerCase());
    return matchLevel && matchSearch;
  });

  // ================= IF NOT LOGGED IN =================
  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-purple-600/20">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Đăng Nhập Giáo Viên</h2>
            <p className="text-xs text-slate-500 mt-1">
              Dành riêng cho giáo viên bộ môn Công nghệ 10
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
              ⚠️ {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Tài khoản giáo viên
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Nhập tên tài khoản..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-sm shadow-md shadow-purple-600/25 transition cursor-pointer"
            >
              ĐĂNG NHẬP HỆ THỐNG
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ================= LOGGED IN DASHBOARD =================
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
      {/* Teacher Welcome Header */}
      <div className="bg-gradient-to-r from-purple-50 via-white to-indigo-50 border border-purple-200 rounded-3xl p-6 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 border border-purple-300 flex items-center justify-center text-2xl shadow-sm">
            👩‍🏫
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                Khu Vực Quản Trị Giáo Viên: Cô Mai Hằng
              </h1>
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-xs text-slate-500">
              Môn: Công nghệ 10 • Quản lý ngân hàng câu hỏi, tạo đề thi ma trận & theo dõi điểm số
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              sound.playClick();
              onLogout();
            }}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-300 shadow-sm transition cursor-pointer"
          >
            Đăng xuất
          </button>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase">Tổng câu hỏi</div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            {questions.length}
            <span className="text-xs text-slate-400 font-normal ml-1">câu</span>
          </div>
          <div className="text-[11px] text-indigo-600 font-semibold mt-1">
            {countBiet} Biết • {countHieu} Hiểu • {countVanDung} Vận dụng
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase">Lượt học sinh thi</div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            {submissions.length}
            <span className="text-xs text-slate-400 font-normal ml-1">lượt</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Lưu trữ tự động</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase">Điểm trung bình</div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600 mt-1">
            {avgScore}
            <span className="text-xs text-slate-400 font-normal ml-1">/10</span>
          </div>
          <div className="text-[11px] text-amber-700 font-medium mt-1">Toàn trường</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase">Tỷ lệ đạt (≥ 5.0)</div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">
            {passRate}%
          </div>
          <div className="text-[11px] text-emerald-700 font-medium mt-1">Hoàn thành bài</div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4 mb-6">
        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('questions');
          }}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition cursor-pointer ${
            activeTab === 'questions'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/25'
              : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Ngân Hàng 100 Câu Hỏi ({questions.length})</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('submissions');
          }}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition cursor-pointer ${
            activeTab === 'submissions'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/25'
              : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Kết Quả Học Sinh ({submissions.length})</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('print');
            if (!printExam) handleGeneratePrintExam();
          }}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition cursor-pointer ${
            activeTab === 'print'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/25'
              : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Printer className="w-4 h-4" />
          <span>Tạo & In Đề Thi Chuẩn</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('matrix');
          }}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition cursor-pointer ${
            activeTab === 'matrix'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/25'
              : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Quy Tắc Ma Trận Đề</span>
        </button>
      </div>

      {/* ================= TAB 1: QUESTION BANK ================= */}
      {activeTab === 'questions' && (
        <div className="space-y-6">
          {/* Controls: Search, Filter, Add, Reset, Export */}
          <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-sm">
            <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
              {/* Search */}
              <div className="relative flex-1 min-w-[200px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={questionSearch}
                  onChange={e => setQuestionSearch(e.target.value)}
                  placeholder="Tìm câu hỏi, từ khóa..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white"
                />
              </div>

              {/* Level Filter Buttons */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setLevelFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    levelFilter === 'all' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Tất cả ({questions.length})
                </button>
                <button
                  onClick={() => setLevelFilter('biet')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    levelFilter === 'biet' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Biết ({countBiet})
                </button>
                <button
                  onClick={() => setLevelFilter('hieu')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    levelFilter === 'hieu' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Hiểu ({countHieu})
                </button>
                <button
                  onClick={() => setLevelFilter('van_dung')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    levelFilter === 'van_dung' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Vận dụng ({countVanDung})
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setIsNewQuestion(true);
                  setEditingQuestion({
                    id: `custom-${Date.now()}`,
                    code: `QS-${questions.length + 1}`,
                    level: 'biet',
                    topic: 'Luyện kim, cơ khí',
                    question: '',
                    options: ['', '', '', ''],
                    correctIndex: 0,
                    explanation: '',
                  });
                }}
                className="py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Thêm Câu Hỏi</span>
              </button>

              <button
                onClick={handleExportQuestionsJSON}
                className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 border border-slate-300 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Xuất JSON</span>
              </button>

              <button
                onClick={handleResetQuestions}
                title="Khôi phục 100 câu chuẩn ban đầu"
                className="py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Khôi phục 100 câu gốc</span>
              </button>
            </div>
          </div>

          {/* Question List */}
          <div className="space-y-3">
            {filteredQuestions.map((q) => {
              const levelBadge = 
                q.level === 'biet' ? 'text-emerald-800 bg-emerald-100 border-emerald-300' :
                q.level === 'hieu' ? 'text-sky-800 bg-sky-100 border-sky-300' :
                'text-purple-800 bg-purple-100 border-purple-300';
              const levelLabel = 
                q.level === 'biet' ? 'Biết (Mức 1)' :
                q.level === 'hieu' ? 'Hiểu (Mức 2)' : 'Vận dụng (Mức 3)';

              return (
                <div
                  key={q.id}
                  className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 hover:border-slate-300 shadow-sm transition"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {q.code}
                      </span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded border ${levelBadge}`}>
                        {levelLabel}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {q.topic}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1 shrink-0">
                      <button
                        onClick={() => {
                          sound.playClick();
                          setIsNewQuestion(false);
                          setEditingQuestion(q);
                        }}
                        className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                        title="Chỉnh sửa câu hỏi"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteQuestion(q.id)}
                        className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                        title="Xóa câu hỏi"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-3">
                    {q.question}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.options.map((opt, optIdx) => {
                      const isCorrect = optIdx === q.correctIndex;
                      const labels = ['A', 'B', 'C', 'D'];
                      return (
                        <div
                          key={optIdx}
                          className={`p-2.5 rounded-xl border flex items-center space-x-2 ${
                            isCorrect
                              ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold'
                              : 'bg-slate-50 border-slate-200 text-slate-600'
                          }`}
                        >
                          <span className="font-mono font-bold">{labels[optIdx]}.</span>
                          <span>{opt}</span>
                          {isCorrect && (
                            <span className="ml-auto text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded font-black">
                              ĐÁP ÁN ĐÚNG
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {q.explanation && (
                    <div className="mt-3 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <strong className="text-amber-700 font-bold">Giải thích: </strong>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= TAB 2: SUBMISSIONS & SCORES ================= */}
      {activeTab === 'submissions' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-sm">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-purple-600" />
              <span>Danh Sách Bài Thi Của Học Sinh ({submissions.length})</span>
            </h2>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleExportSubmissionsCSV}
                className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Xuất Bảng Điểm (Excel / CSV)</span>
              </button>

              <button
                onClick={handleClearAllSubmissions}
                className="py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Xóa hết bài</span>
              </button>
            </div>
          </div>

          {submissions.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center shadow-sm">
              <Clock className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900 mb-1">Chưa có học sinh nào nộp bài</h3>
              <p className="text-xs text-slate-500">
                Khi học sinh tham gia làm bài ở "Phòng Thi HS", kết quả bài thi sẽ tự động hiển thị tại đây.
              </p>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[11px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Thí sinh</th>
                      <th className="py-3 px-3">Lớp</th>
                      <th className="py-3 px-3">Mã đề</th>
                      <th className="py-3 px-3 text-center">Điểm số</th>
                      <th className="py-3 px-3 text-center">Biết (/4)</th>
                      <th className="py-3 px-3 text-center">Hiểu (/3)</th>
                      <th className="py-3 px-3 text-center">Vận dụng (/3)</th>
                      <th className="py-3 px-3">Thời gian</th>
                      <th className="py-3 px-3">Ngày nộp</th>
                      <th className="py-3 px-3 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {submissions.map((sub) => (
                      <tr key={sub.id} className="hover:bg-slate-50 transition">
                        <td className="py-3 px-4 font-bold text-slate-900">
                          {sub.studentName}
                        </td>
                        <td className="py-3 px-3 font-bold text-indigo-600">
                          {sub.studentClass}
                        </td>
                        <td className="py-3 px-3 font-mono text-xs text-slate-500">
                          {sub.examCode}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className={`font-extrabold px-2.5 py-0.5 rounded-lg ${
                            sub.totalScore >= 8.0
                              ? 'bg-emerald-100 text-emerald-800'
                              : sub.totalScore >= 5.0
                              ? 'bg-sky-100 text-sky-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}>
                            {sub.totalScore.toFixed(1)}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center text-emerald-700 font-bold">
                          {sub.breakdown.biet.correct} / {sub.breakdown.biet.total}
                        </td>
                        <td className="py-3 px-3 text-center text-sky-700 font-bold">
                          {sub.breakdown.hieu.correct} / {sub.breakdown.hieu.total}
                        </td>
                        <td className="py-3 px-3 text-center text-purple-700 font-bold">
                          {sub.breakdown.van_dung.correct} / {sub.breakdown.van_dung.total}
                        </td>
                        <td className="py-3 px-3 text-xs text-slate-600">
                          {Math.floor(sub.timeSpentSeconds / 60)}m {sub.timeSpentSeconds % 60}s
                        </td>
                        <td className="py-3 px-3 text-xs text-slate-500">
                          {new Date(sub.submittedAt).toLocaleDateString('vi-VN')} {new Date(sub.submittedAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="py-3 px-3 text-right">
                          <div className="flex items-center justify-end space-x-1">
                            <button
                              onClick={() => setViewingSubmission(sub)}
                              className="p-1.5 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition cursor-pointer"
                              title="Xem chi tiết bài thi"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteSubmission(sub.id)}
                              className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                              title="Xóa bài thi"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 3: PRINT EXAM PAPER ================= */}
      {activeTab === 'print' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-sm no-print">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <Printer className="w-5 h-5 text-purple-600" />
                <span>In Đề Thi & Phiếu Đáp Án (Chuẩn Ma Trận 10 Câu)</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Tự động rút ngẫu nhiên 4 câu Biết + 3 câu Hiểu + 3 câu Vận dụng để in ra giấy
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <label className="flex items-center space-x-2 text-xs font-bold text-slate-700 cursor-pointer mr-2">
                <input
                  type="checkbox"
                  checked={showAnswerKeyInPrint}
                  onChange={e => setShowAnswerKeyInPrint(e.target.checked)}
                  className="rounded text-purple-600 focus:ring-purple-500"
                />
                <span>Kèm Đáp Án & Lời Giải</span>
              </label>

              <button
                onClick={handleGeneratePrintExam}
                className="py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Sinh Đề Mới</span>
              </button>

              <button
                onClick={() => window.print()}
                className="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold transition flex items-center gap-1.5 shadow-md shadow-emerald-600/20 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>IN ĐỀ RA GIẤY / PDF</span>
              </button>
            </div>
          </div>

          {/* Printable Sheet */}
          {printExam && (
            <div className="bg-white text-black p-8 sm:p-12 rounded-3xl border border-slate-300 shadow-xl font-serif text-sm">
              {/* Exam Header */}
              <div className="flex justify-between border-b-2 border-black pb-4 mb-6">
                <div className="text-center font-bold">
                  <div>SỞ GIÁO DỤC VÀ ĐÀO TẠO</div>
                  <div>TRƯỜNG THPT</div>
                  <div className="text-xs font-normal mt-1">Giáo viên ra đề: <strong>Mai Hằng</strong></div>
                </div>

                <div className="text-center">
                  <div className="font-bold text-base uppercase">ĐỀ THI TRẮC NGHIỆM HỌC KÌ</div>
                  <div className="font-bold text-sm">MÔN: CÔNG NGHỆ 10 (BÀI 3: CÔNG NGHỆ PHỔ BIẾN)</div>
                  <div className="text-xs italic mt-1">Thời gian làm bài: 15 phút (không kể thời gian phát đề)</div>
                  <div className="font-bold text-sm text-red-600 mt-1">MÃ ĐỀ THI: {printExam.examCode}</div>
                </div>
              </div>

              {/* Student info lines */}
              <div className="flex justify-between mb-6 pb-2 border-b border-gray-300 text-xs">
                <div>Họ và tên thí sinh: ............................................................................</div>
                <div>Lớp: ......................... SBD: .........................</div>
              </div>

              {/* Questions List */}
              <div className="space-y-4">
                {printExam.questions.map((q, idx) => {
                  const labels = ['A', 'B', 'C', 'D'];
                  const levelStr = 
                    q.level === 'biet' ? 'Nhận biết' :
                    q.level === 'hieu' ? 'Thông hiểu' : 'Vận dụng';

                  return (
                    <div key={idx} className="pb-3 border-b border-gray-200">
                      <div className="font-bold mb-1">
                        Câu {idx + 1} ({levelStr}): <span className="font-normal">{q.question}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 pl-4 text-xs">
                        {q.options.map((opt, optIdx) => (
                          <div key={optIdx} className="flex items-start space-x-1.5">
                            <span className={`font-bold ${showAnswerKeyInPrint && optIdx === q.correctIndex ? 'text-red-600 underline' : ''}`}>
                              {labels[optIdx]}.
                            </span>
                            <span className={showAnswerKeyInPrint && optIdx === q.correctIndex ? 'font-bold text-red-700' : ''}>
                              {opt}
                            </span>
                          </div>
                        ))}
                      </div>

                      {showAnswerKeyInPrint && (
                        <div className="mt-1 pl-4 text-[11px] text-gray-700 italic">
                          → Đáp án đúng: <strong>{labels[q.correctIndex]}</strong>. Giải thích: {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Answer Key Summary */}
              {showAnswerKeyInPrint && (
                <div className="mt-8 pt-4 border-t-2 border-dashed border-gray-400">
                  <h4 className="font-bold text-center mb-2 uppercase text-xs">
                    BẢNG ĐÁP ÁN MÃ ĐỀ: {printExam.examCode}
                  </h4>
                  <div className="grid grid-cols-10 gap-1 text-center text-xs">
                    {printExam.questions.map((q, idx) => (
                      <div key={idx} className="border border-black p-1">
                        <div className="font-bold text-[10px]">C{idx + 1}</div>
                        <div className="font-bold text-red-600">{['A', 'B', 'C', 'D'][q.correctIndex]}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 4: MATRIX SPECIFICATIONS ================= */}
      {activeTab === 'matrix' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-600" />
              <span>Ma Trận & Đặc Tả Đề Thi Công Nghệ 10 (Bài 3: Công Nghệ Phổ Biến)</span>
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Thiết lập theo đúng yêu cầu của giáo viên Mai Hằng: Ngân hàng 100 câu (40 Biết - 30 Hiểu - 30 Vận dụng). Mỗi đề thi rút 10 câu (4 Biết - 3 Hiểu - 3 Vận dụng).
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[11px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Mức độ nhận thức</th>
                    <th className="py-3 px-3 text-center">Số câu trong ngân hàng</th>
                    <th className="py-3 px-3 text-center">Tỷ lệ ngân hàng</th>
                    <th className="py-3 px-3 text-center">Số câu / 1 Đề thi</th>
                    <th className="py-3 px-3 text-center">Điểm số / Đề</th>
                    <th className="py-3 px-4">Mục tiêu yêu cầu cần đạt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-emerald-700">
                      1. Nhận biết (Biết)
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-slate-900">40 câu</td>
                    <td className="py-3 px-3 text-center">40%</td>
                    <td className="py-3 px-3 text-center font-extrabold text-emerald-600 text-base">4 câu</td>
                    <td className="py-3 px-3 text-center font-bold">4.0 điểm</td>
                    <td className="py-3 px-4 text-xs text-slate-600">
                      Kể tên được các công nghệ phổ biến trong lĩnh vực luyện kim, cơ khí, điện - điện tử; nhận diện tên thiết bị, năm phát minh, bộ phận chính.
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-sky-700">
                      2. Thông hiểu (Hiểu)
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-slate-900">30 câu</td>
                    <td className="py-3 px-3 text-center">30%</td>
                    <td className="py-3 px-3 text-center font-extrabold text-sky-600 text-base">3 câu</td>
                    <td className="py-3 px-3 text-center font-bold">3.0 điểm</td>
                    <td className="py-3 px-4 text-xs text-slate-600">
                      Tóm tắt được nội dung cơ bản của một số công nghệ phổ biến; giải thích nguyên lý hoạt động của nhà máy thủy điện, đèn LED, động cơ điện, rơ le, đúc ly tâm,...
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-purple-700">
                      3. Vận dụng
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-slate-900">30 câu</td>
                    <td className="py-3 px-3 text-center">30%</td>
                    <td className="py-3 px-3 text-center font-extrabold text-purple-600 text-base">3 câu</td>
                    <td className="py-3 px-3 text-center font-bold">3.0 điểm</td>
                    <td className="py-3 px-4 text-xs text-slate-600">
                      Lựa chọn công nghệ chế tạo phù hợp cho các sản phẩm thực tế (vỏ động cơ, bánh răng, dây đồng, cổng sắt hoa văn,...); phân tích giải pháp năng lượng tiết kiệm, bảo vệ môi trường.
                    </td>
                  </tr>

                  <tr className="bg-slate-100 font-bold text-slate-900 border-t-2 border-slate-300">
                    <td className="py-3 px-4">TỔNG CỘNG</td>
                    <td className="py-3 px-3 text-center text-amber-700">100 câu</td>
                    <td className="py-3 px-3 text-center">100%</td>
                    <td className="py-3 px-3 text-center text-amber-700 text-base">10 câu</td>
                    <td className="py-3 px-3 text-center text-amber-700">10.0 điểm</td>
                    <td className="py-3 px-4 text-xs text-slate-700">Chuẩn ma trận đề thi 15 phút</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= EDIT / CREATE QUESTION MODAL ================= */}
      {editingQuestion && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl my-8">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900">
                {isNewQuestion ? 'Thêm Câu Hỏi Mới Vào Ngân Hàng' : `Chỉnh Sửa Câu Hỏi: ${editingQuestion.code}`}
              </h3>
              <button
                onClick={() => setEditingQuestion(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mã câu</label>
                  <input
                    type="text"
                    value={editingQuestion.code}
                    onChange={e => setEditingQuestion({ ...editingQuestion, code: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mức độ nhận thức</label>
                  <select
                    value={editingQuestion.level}
                    onChange={e => setEditingQuestion({ ...editingQuestion, level: e.target.value as DifficultyLevel })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white cursor-pointer"
                  >
                    <option value="biet">Mức 1: Nhận Biết (Biết)</option>
                    <option value="hieu">Mức 2: Thông Hiểu (Hiểu)</option>
                    <option value="van_dung">Mức 3: Vận Dụng</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Chủ đề bài học</label>
                <input
                  type="text"
                  value={editingQuestion.topic}
                  onChange={e => setEditingQuestion({ ...editingQuestion, topic: e.target.value })}
                  placeholder="Luyện kim, cơ khí hoặc Điện - điện tử"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nội dung câu hỏi</label>
                <textarea
                  rows={3}
                  value={editingQuestion.question}
                  onChange={e => setEditingQuestion({ ...editingQuestion, question: e.target.value })}
                  placeholder="Nhập câu hỏi trắc nghiệm..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white resize-none"
                />
              </div>

              {/* 4 Choices */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  4 Phương án trả lời (nhấn chọn nút ký tự để đặt làm đáp án đúng):
                </label>
                {editingQuestion.options.map((opt, idx) => {
                  const labels = ['A', 'B', 'C', 'D'];
                  const isCorrect = editingQuestion.correctIndex === idx;
                  return (
                    <div key={idx} className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => setEditingQuestion({ ...editingQuestion, correctIndex: idx })}
                        className={`w-7 h-7 rounded-xl font-bold text-xs flex items-center justify-center transition cursor-pointer ${
                          isCorrect ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-300' : 'bg-slate-200 text-slate-700'
                        }`}
                        title="Chọn làm đáp án đúng"
                      >
                        {labels[idx]}
                      </button>
                      <input
                        type="text"
                        value={opt}
                        onChange={e => {
                          const newOpts = [...editingQuestion.options] as [string, string, string, string];
                          newOpts[idx] = e.target.value;
                          setEditingQuestion({ ...editingQuestion, options: newOpts });
                        }}
                        placeholder={`Phương án ${labels[idx]}`}
                        className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white"
                      />
                    </div>
                  );
                })}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Lời giải chi tiết</label>
                <textarea
                  rows={2}
                  value={editingQuestion.explanation}
                  onChange={e => setEditingQuestion({ ...editingQuestion, explanation: e.target.value })}
                  placeholder="Giải thích vì sao đáp án đúng..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditingQuestion(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveQuestion(editingQuestion)}
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/20 cursor-pointer"
                >
                  Lưu Câu Hỏi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= VIEW STUDENT SUBMISSION DETAIL MODAL ================= */}
      {viewingSubmission && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Chi Tiết Bài Thi: {viewingSubmission.studentName} ({viewingSubmission.studentClass})
                </h3>
                <div className="text-xs text-slate-600 mt-1 flex items-center gap-3">
                  <span>Mã đề: <strong className="text-indigo-600">{viewingSubmission.examCode}</strong></span>
                  <span>•</span>
                  <span>Điểm số: <strong className="text-emerald-600 font-bold text-sm">{viewingSubmission.totalScore.toFixed(1)}/10</strong></span>
                  <span>•</span>
                  <span>Đúng: {viewingSubmission.correctCount}/{viewingSubmission.totalCount} câu</span>
                </div>
              </div>
              <button
                onClick={() => setViewingSubmission(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Questions detail in submission */}
            <div className="space-y-4">
              {viewingSubmission.answers.map((ans, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border text-xs sm:text-sm ${
                    ans.isCorrect ? 'bg-emerald-50/50 border-emerald-300' : 'bg-rose-50/50 border-rose-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-900">
                      Câu {idx + 1} ({ans.level === 'biet' ? 'Biết' : ans.level === 'hieu' ? 'Hiểu' : 'Vận dụng'}):
                    </span>
                    <span className={`font-black ${ans.isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {ans.isCorrect ? '✓ Đúng (+1.0đ)' : '✗ Sai (0đ)'}
                    </span>
                  </div>

                  <p className="font-semibold text-slate-800 mb-3">{ans.questionText}</p>

                  <div className="space-y-1.5 pl-2">
                    {ans.options.map((opt, oIdx) => {
                      const labels = ['A', 'B', 'C', 'D'];
                      const isCorrect = oIdx === ans.correctOptionIndex;
                      const isStudentPick = oIdx === ans.selectedOptionIndex;
                      return (
                        <div
                          key={oIdx}
                          className={`p-2 rounded-lg flex items-center justify-between text-xs ${
                            isCorrect ? 'bg-emerald-100 text-emerald-950 font-bold' :
                            isStudentPick ? 'bg-rose-100 text-rose-950 line-through' :
                            'text-slate-600'
                          }`}
                        >
                          <span>{labels[oIdx]}. {opt}</span>
                          {isCorrect && <span className="text-[10px] text-emerald-700 font-bold">ĐÁP ÁN ĐÚNG</span>}
                          {isStudentPick && !isCorrect && <span className="text-[10px] text-rose-700 font-bold">HỌC SINH CHỌN</span>}
                        </div>
                      );
                    })}
                  </div>

                  {ans.explanation && (
                    <div className="mt-2 text-xs text-indigo-900 bg-white p-2 rounded-xl border border-indigo-200">
                      💡 <strong>Giải thích:</strong> {ans.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 mt-4 border-t border-slate-200">
              <button
                onClick={() => setViewingSubmission(null)}
                className="py-2 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
