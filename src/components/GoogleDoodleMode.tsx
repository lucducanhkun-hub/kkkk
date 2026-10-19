import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';
import { Search, Sparkles, Heart, Mic, Camera, ArrowLeft, ExternalLink, Award, Share2, Check } from 'lucide-react';

interface GoogleDoodleModeProps {
  onSwitchToCelebration: () => void;
  onOpenCardMaker: () => void;
  onOpenFortune: () => void;
}

export const GoogleDoodleMode: React.FC<GoogleDoodleModeProps> = ({
  onSwitchToCelebration,
  onOpenCardMaker,
  onOpenFortune,
}) => {
  const [query, setQuery] = useState('Người phụ nữ tuyệt vời nhất hôm nay');
  const [hasSearched, setHasSearched] = useState(false);
  const [copied, setCopied] = useState(false);

  const triggerConfetti = () => {
    sound.playSparkle();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#4285F4', '#EA4335', '#FBBC05', '#34A853', '#ff69b4', '#ff1493'],
    });
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    sound.playChime();
    setHasSearched(true);
    triggerConfetti();
  };

  const handleLucky = () => {
    sound.playSparkle();
    onOpenFortune();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    sound.playPop();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-[#202124] relative z-10 transition-colors">
      {/* Top Google Bar */}
      <header className="flex justify-between items-center px-4 md:px-8 py-3 text-sm border-b border-gray-100">
        <div className="flex items-center gap-4 text-[#5f6368]">
          <button
            onClick={onSwitchToCelebration}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-50 text-pink-700 hover:bg-pink-100 font-medium text-xs md:text-sm transition-all border border-pink-200 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Về trang chúc mừng 20/10 🌷
          </button>
          <span className="hidden sm:inline hover:underline cursor-pointer">Giới thiệu</span>
          <span className="hidden sm:inline hover:underline cursor-pointer">Cửa hàng</span>
        </div>

        <div className="flex items-center gap-4 text-[#5f6368]">
          <span className="hidden sm:inline hover:underline cursor-pointer">Gmail</span>
          <span className="hidden sm:inline hover:underline cursor-pointer">Hình ảnh</span>
          <button
            onClick={triggerConfetti}
            title="Thả pháo hoa"
            className="p-2 hover:bg-pink-50 rounded-full text-pink-600 transition"
          >
            <Sparkles className="w-5 h-5 animate-pulse" />
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-400 to-rose-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
            20/10
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-4xl mx-auto w-full">
        {!hasSearched ? (
          <div className="w-full flex flex-col items-center animate-fadeIn">
            {/* Google Doodle 20/10 Logo */}
            <div className="relative mb-6 text-center select-none group cursor-pointer" onClick={triggerConfetti}>
              <div className="relative inline-block">
                {/* Google styled logo with floral decorations */}
                <div className="text-6xl md:text-8xl font-black tracking-tighter flex items-center justify-center">
                  <span className="text-[#4285F4]">G</span>
                  <span className="text-[#EA4335] relative">
                    o
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl animate-bounce">🌸</span>
                  </span>
                  <span className="text-[#FBBC05] relative">
                    o
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-2xl">🌷</span>
                  </span>
                  <span className="text-[#4285F4]">g</span>
                  <span className="text-[#34A853]">l</span>
                  <span className="text-[#EA4335]">e</span>
                </div>

                {/* Doodle 20/10 Ribbon Badge */}
                <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs md:text-sm font-bold px-4 py-1 rounded-full shadow-md mt-2 group-hover:scale-105 transition-transform">
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  Doodle Chúc Mừng Ngày Phụ Nữ Việt Nam 20/10
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2">Bấm vào logo để nhận pháo hoa may mắn ✨</p>
            </div>

            {/* Google Search Bar */}
            <form onSubmit={handleSearch} className="w-full max-w-2xl">
              <div className="relative flex items-center rounded-full border border-gray-200 hover:border-gray-300 focus-within:border-pink-400 focus-within:shadow-md hover:shadow-sm px-4 py-3 bg-white transition-all">
                <Search className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Tìm kiếm điều kỳ diệu..."
                  className="w-full text-base outline-none bg-transparent text-gray-800 placeholder-gray-400"
                />
                <div className="flex items-center gap-3 text-gray-500 ml-2">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playPop();
                      setQuery('Chúc mừng các bạn nữ lớp mình 20/10!');
                    }}
                    title="Gợi ý tìm kiếm"
                    className="hover:text-pink-600 transition"
                  >
                    <Mic className="w-5 h-5 text-blue-500" />
                  </button>
                  <button
                    type="button"
                    onClick={onOpenCardMaker}
                    title="Tạo thiệp chúc mừng"
                    className="hover:text-pink-600 transition"
                  >
                    <Camera className="w-5 h-5 text-amber-500" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <button
                  type="submit"
                  className="bg-[#f8f9fa] hover:bg-[#f1f3f4] text-[#3c4043] hover:border-gray-300 border border-transparent px-5 py-2.5 rounded text-sm font-medium transition cursor-pointer shadow-sm active:bg-gray-200"
                >
                  Tìm trên Google 🔍
                </button>
                <button
                  type="button"
                  onClick={handleLucky}
                  className="bg-[#f8f9fa] hover:bg-[#f1f3f4] text-[#3c4043] hover:border-gray-300 border border-transparent px-5 py-2.5 rounded text-sm font-medium transition cursor-pointer shadow-sm active:bg-gray-200"
                >
                  Tôi cảm thấy may mắn 🥠
                </button>
              </div>
            </form>

            {/* Quick suggested searches */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8 text-xs text-gray-600">
              <span className="text-gray-400">Gợi ý tìm kiếm:</span>
              {[
                '🌸 Các bạn nữ lớp mình',
                '💖 Lời chúc 20/10 ý nghĩa nhất',
                '🎁 Quẻ may mắn 20/10',
                '🌷 Bí quyết thi cử đạt 10 điểm',
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuery(item.replace(/^[^\s]+\s/, ''));
                    sound.playPop();
                  }}
                  className="px-3 py-1 bg-gray-100 hover:bg-pink-100 hover:text-pink-700 rounded-full transition cursor-pointer"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Language footer */}
            <div className="mt-8 text-xs text-gray-500">
              Google có các thứ tiếng:{' '}
              <span className="text-[#1a0dab] hover:underline cursor-pointer">Tiếng Việt</span>{' '}
              <span className="text-[#1a0dab] hover:underline cursor-pointer ml-2">English</span>{' '}
              <span className="text-pink-600 font-semibold ml-2">Ngôn ngữ yêu thương 💖</span>
            </div>
          </div>
        ) : (
          /* Google Search Results View */
          <div className="w-full text-left animate-fadeIn">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
              <button
                onClick={() => setHasSearched(false)}
                className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-medium"
              >
                ← Quay lại tìm kiếm
              </button>
              <div className="text-xs text-gray-500">
                Khoảng 20.100.000 kết quả (0,20 giây) - <strong>Kết quả đặc biệt ngày 20/10</strong>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left results column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Top Google Result */}
                <div className="bg-white p-5 rounded-2xl border border-pink-200 shadow-sm hover:shadow-md transition">
                  <div className="flex items-center gap-2 text-xs text-pink-700 font-medium mb-1">
                    <span>https://google.com.vn/vietnamese-womens-day/20-10</span>
                  </div>
                  <h3 className="text-xl text-[#1a0dab] hover:underline cursor-pointer font-semibold mb-2">
                    Chúc Mừng Ngày Phụ Nữ Việt Nam 20/10 - Những Người Phụ Nữ Tuyệt Vời Nhất
                  </h3>
                  <p className="text-sm text-[#4d5156] leading-relaxed">
                    Hôm nay ngày 20 tháng 10, toàn thể vũ trụ xin gửi lời chúc ngọt ngào nhất tới các bạn nữ, các mẹ, các cô giáo và những người phụ nữ Việt Nam. Chúc phái đẹp luôn giữ nụ cười tỏa nắng, luôn tự tin, duyên dáng và tràn đầy hạnh phúc!
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-pink-50">
                    <button
                      onClick={onSwitchToCelebration}
                      className="px-3.5 py-1.5 bg-pink-500 hover:bg-pink-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
                    >
                      <Sparkles className="w-3.5 h-3.5" /> Mở trang thiệp lớn
                    </button>
                    <button
                      onClick={onOpenFortune}
                      className="px-3.5 py-1.5 bg-pink-50 text-pink-700 hover:bg-pink-100 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-pink-200 transition"
                    >
                      🥠 Rút quẻ may mắn
                    </button>
                    <button
                      onClick={handleShare}
                      className="px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Share2 className="w-3.5 h-3.5" />}
                      {copied ? 'Đã sao chép link!' : 'Chia sẻ'}
                    </button>
                  </div>
                </div>

                {/* Secondary Result: Class special */}
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="text-xs text-gray-500 mb-1">lop-chung-minh.edu.vn › 20-10-danh-cho-cac-ban-nu</div>
                  <h3 className="text-lg text-[#1a0dab] hover:underline cursor-pointer font-semibold mb-2">
                    Lá Thư Thân Thương Gửi Đến Những Bông Hoa Của Lớp Mình 🌷
                  </h3>
                  <p className="text-sm text-[#4d5156] leading-relaxed">
                    &ldquo;Cảm ơn các bạn nữ vì đã làm cho lớp học luôn rực rỡ, vui tươi và có thật nhiều kỷ niệm đáng nhớ. Chúc các bạn luôn xinh xắn theo cách riêng, mạnh mẽ khi cần và bài thi nào cũng dễ như ăn kẹo!&rdquo;
                  </p>
                </div>

                {/* People also ask */}
                <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/50">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-pink-500" /> Mọi người cũng tìm kiếm
                  </h4>
                  <div className="space-y-2 text-sm text-[#1a0dab]">
                    <div
                      onClick={() => {
                        setQuery('Cách để các bạn nữ luôn vui vẻ mỗi ngày?');
                        handleSearch();
                      }}
                      className="p-2 hover:bg-white rounded cursor-pointer border-b border-gray-100 flex justify-between"
                    >
                      <span>Cách để các bạn nữ luôn vui vẻ mỗi ngày?</span>
                      <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                    <div
                      onClick={onOpenCardMaker}
                      className="p-2 hover:bg-white rounded cursor-pointer border-b border-gray-100 flex justify-between"
                    >
                      <span>Mẫu thiệp chúc mừng 20/10 đẹp nhất 2026?</span>
                      <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                    <div
                      onClick={onOpenFortune}
                      className="p-2 hover:bg-white rounded cursor-pointer flex justify-between"
                    >
                      <span>Năm nay các bạn nữ sẽ nhận được điều may mắn gì?</span>
                      <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Knowledge Panel */}
              <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-white p-5 rounded-2xl border border-pink-200 shadow-sm">
                <div className="relative mb-3 rounded-xl overflow-hidden bg-pink-100 aspect-video flex items-center justify-center text-5xl">
                  🌸💐✨
                </div>
                <div className="flex items-center gap-1.5 text-pink-600 text-xs font-bold uppercase tracking-wider mb-1">
                  <Award className="w-4 h-4" /> Bảng Tri Thức Google
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">Các Bạn Nữ Tuyệt Vời</h2>
                <div className="text-xs text-gray-500 mb-3">Thành phần quan trọng nhất của vũ trụ & lớp học</div>

                <div className="flex items-center gap-1 text-amber-500 text-sm font-bold mb-4">
                  ★★★★★ <span className="text-gray-700 text-xs">(100.000+ đánh giá 5 sao từ mọi người)</span>
                </div>

                <div className="space-y-2.5 text-xs text-gray-700 border-t border-pink-100 pt-3">
                  <div>
                    <strong className="text-gray-900">Đặc điểm nhận dạng:</strong> Xinh đẹp, thông minh, hay cười, đáng yêu.
                  </div>
                  <div>
                    <strong className="text-gray-900">Siêu năng lực:</strong> Biến lớp học buồn tẻ thành nơi rộn rã tiếng cười.
                  </div>
                  <div>
                    <strong className="text-gray-900">Món quà yêu thích:</strong> Hoa, trà sữa, điểm 10, sự chân thành và những lời khen!
                  </div>
                  <div>
                    <strong className="text-gray-900">Ngày vinh danh:</strong> 20 tháng 10 hàng năm.
                  </div>
                </div>

                <button
                  onClick={onSwitchToCelebration}
                  className="w-full mt-5 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold rounded-xl text-xs shadow-md transition"
                >
                  Khám phá toàn bộ trang chúc mừng 20/10 💖
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Google Footer */}
      <footer className="bg-[#f2f2f2] text-[#70757a] text-xs border-t border-gray-200">
        <div className="px-4 md:px-8 py-3 border-b border-gray-300 flex justify-between">
          <span>Việt Nam</span>
          <span className="text-pink-600 font-medium">Hưởng ứng ngày Phụ Nữ Việt Nam 20/10 🌷</span>
        </div>
        <div className="px-4 md:px-8 py-3 flex flex-wrap justify-between gap-4">
          <div className="flex gap-4">
            <span className="hover:underline cursor-pointer">Bảo mật</span>
            <span className="hover:underline cursor-pointer">Điều khoản</span>
            <span className="hover:underline cursor-pointer">Cài đặt</span>
          </div>
          <div className="text-pink-600 font-medium">
            Made with 💖 for all amazing women & classmates
          </div>
        </div>
      </footer>
    </div>
  );
};
