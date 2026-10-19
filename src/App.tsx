import React, { useState } from 'react';
import { FloatingBackground } from './components/FloatingBackground';
import { Navbar } from './components/Navbar';
import { GoogleDoodleMode } from './components/GoogleDoodleMode';
import { LetterSection } from './components/LetterSection';
import { FortuneWheelModal } from './components/FortuneWheelModal';
import { CardGeneratorModal } from './components/CardGeneratorModal';
import { WISHES_DATA, WishItem } from './data/wishes';
import { sound } from './utils/audio';
import confetti from 'canvas-confetti';
import {
  Heart,
  Sparkles,
  Gift,
  Copy,
  Check,
  ChevronRight,
  Smile,
  GraduationCap,
  Sun,
  Flame,
  Search,
  BookOpen,
} from 'lucide-react';

export default function App() {
  const [isGoogleMode, setIsGoogleMode] = useState(false);
  const [isFortuneOpen, setIsFortuneOpen] = useState(false);
  const [isCardMakerOpen, setIsCardMakerOpen] = useState(false);
  const [showHiddenMessage, setShowHiddenMessage] = useState(false);
  const [heartsCount, setHeartsCount] = useState(520);
  const [copiedWishId, setCopiedWishId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentWishIndex, setCurrentWishIndex] = useState(0);

  // Trigger heart and flower burst
  const burstHearts = (count: number = 28) => {
    sound.playPop();
    setHeartsCount((prev) => prev + count);

    confetti({
      particleCount: count,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#ff6f9f', '#ffb5c9', '#ff1493', '#ffa8c5', '#ff4d88'],
    });
  };

  const handleRevealWish = () => {
    sound.playChime();
    setShowHiddenMessage((prev) => !prev);
    burstHearts(35);
  };

  const handleCopyWish = (wish: WishItem) => {
    sound.playPop();
    navigator.clipboard.writeText(wish.content);
    setCopiedWishId(wish.id);
    confetti({
      particleCount: 20,
      spread: 40,
      origin: { y: 0.7 },
    });
    setTimeout(() => setCopiedWishId(null), 2000);
  };

  const filteredWishes =
    activeCategory === 'all'
      ? WISHES_DATA
      : WISHES_DATA.filter((w) => w.category === activeCategory);

  if (isGoogleMode) {
    return (
      <GoogleDoodleMode
        onSwitchToCelebration={() => {
          sound.playPop();
          setIsGoogleMode(false);
        }}
        onOpenCardMaker={() => setIsCardMakerOpen(true)}
        onOpenFortune={() => setIsFortuneOpen(true)}
      />
    );
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-pink-300 selection:text-pink-900">
      {/* Dynamic Floating Flowers and Particles */}
      <FloatingBackground />

      {/* Main Top Navigation */}
      <Navbar
        onToggleGoogleMode={() => {
          sound.playPop();
          setIsGoogleMode(true);
        }}
        isGoogleMode={isGoogleMode}
        onOpenCardMaker={() => {
          sound.playPop();
          setIsCardMakerOpen(true);
        }}
        onOpenFortune={() => {
          sound.playPop();
          setIsFortuneOpen(true);
        }}
        heartsCount={heartsCount}
        onAddHeart={() => burstHearts(1)}
      />

      {/* Main Container */}
      <main className="relative z-10 w-[min(960px,92%)] mx-auto pt-6 pb-20">
        {/* Topline Badge */}
        <div className="text-center font-bold text-xs sm:text-sm tracking-widest uppercase text-[#a54c70] flex items-center justify-center gap-2 mb-3">
          <span className="animate-pulse">🌸</span>
          <span>Một Ngày Thật Đặc Biệt · 20 Tháng 10</span>
          <span className="animate-pulse">🌸</span>
        </div>

        {/* Hero Card */}
        <header className="relative text-center rounded-[32px] border-2 border-white/90 bg-white/75 backdrop-blur-md px-5 sm:px-12 py-10 sm:py-16 shadow-[0_18px_55px_rgba(200,93,130,0.18)] transition-all">
          {/* Flower Mascot */}
          <div
            onClick={() => burstHearts(20)}
            className="text-6xl sm:text-8xl select-none cursor-pointer transform hover:scale-110 active:scale-95 transition-transform inline-block drop-shadow-[0_8px_7px_rgba(233,138,170,0.35)]"
            title="Bấm vào bó hoa để nhận ngập tràn yêu thương"
          >
            💐
          </div>

          {/* Heading */}
          <h1 className="mt-4 mb-2 font-serif-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#d84d82] leading-[1.1]">
            Happy <br />
            <span className="bg-gradient-to-r from-[#d84d82] via-[#ff6f9f] to-[#e4467d] bg-clip-text text-transparent">
              Women’s Day!
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-xl mx-auto text-base sm:text-lg sm:leading-relaxed text-[#6b3151] mt-3 font-medium">
            Chúc mừng ngày Phụ nữ Việt Nam <strong>20/10</strong> đến những cô gái tuyệt vời của lớp mình! 💗
          </p>

          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 mt-4 px-5 py-2 rounded-full text-xs sm:text-sm font-bold text-[#a53b68] bg-[#ffe0eb] border border-pink-200/80 shadow-xs animate-float-gentle">
            <Sparkles className="w-4 h-4 text-pink-600" />
            <span>✨ Xinh đẹp · Tự tin · Rạng rỡ · Hạnh phúc ✨</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mt-7">
            <button
              onClick={handleRevealWish}
              className="px-6 py-3 rounded-full font-bold text-sm text-white bg-gradient-to-r from-[#ff6e9d] to-[#ed4f85] hover:from-[#ff598f] hover:to-[#df3d75] shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer flex items-center gap-2"
            >
              <Gift className="w-4 h-4" />
              <span>{showHiddenMessage ? 'Đóng lời chúc 💌' : 'Nhận lời chúc 💌'}</span>
            </button>

            <button
              onClick={() => burstHearts(32)}
              className="px-6 py-3 rounded-full font-bold text-sm text-[#b13d6b] bg-white hover:bg-pink-50 border border-[#ffc2d4] shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer flex items-center gap-2"
            >
              <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
              <span>Thả tim cho hội chị em 💖</span>
            </button>

            <button
              onClick={() => {
                sound.playPop();
                setIsFortuneOpen(true);
              }}
              className="px-5 py-3 rounded-full font-bold text-sm text-pink-700 bg-pink-100/80 hover:bg-pink-200/90 border border-pink-200 shadow-xs hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>🥠 Rút quẻ may mắn</span>
            </button>
          </div>

          {/* Hidden special reveal message */}
          {showHiddenMessage && (
            <div className="mt-8 max-w-xl mx-auto p-5 sm:p-6 rounded-2xl bg-[#fff0f5] border-2 border-dashed border-[#f49dbb] text-[#6b3151] text-sm sm:text-base leading-relaxed animate-fadeIn shadow-sm">
              <div className="flex items-center justify-center gap-1.5 text-pink-600 font-bold mb-2">
                <span>🌷</span>
                <span>Thông điệp gửi riêng các bạn nữ</span>
                <span>🌷</span>
              </div>
              <p>
                Chúc các bạn nữ luôn vui vẻ, học tốt, gặp thật nhiều may mắn và luôn được yêu thương.
                Mong rằng mỗi ngày đến trường đều có tiếng cười rộn rã, những kỷ niệm thật đẹp và những người bạn chân thành kề bên! 💕
              </p>
              <div className="mt-3 pt-3 border-t border-pink-200/60 flex items-center justify-center gap-2 text-xs font-semibold text-pink-600">
                <span>Bấm nút tạo thiệp nếu bạn muốn gửi lời chúc này đến từng người nha!</span>
                <button
                  onClick={() => setIsCardMakerOpen(true)}
                  className="underline font-bold hover:text-pink-800"
                >
                  Tạo ngay
                </button>
              </div>
            </div>
          )}
        </header>

        {/* Section 1: The 3 Core Blessing Cards */}
        <section className="mt-12 sm:mt-16">
          <div className="text-center mb-6">
            <h2 className="font-serif-display font-bold text-2xl sm:text-3xl text-[#bd4674]">
              Gửi Những Bông Hoa Của Lớp 🌼
            </h2>
            <p className="text-xs sm:text-sm text-pink-900/70 mt-1">
              Ba điều tuyệt vời nhất mà cả lớp luôn mong ước dành tặng các bạn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {/* Card 1 */}
            <article
              onClick={() => burstHearts(12)}
              className="p-6 rounded-2xl bg-white/80 hover:bg-white border border-white shadow-[0_8px_24px_rgba(200,93,130,0.08)] hover:shadow-[0_12px_28px_rgba(200,93,130,0.18)] hover:-translate-y-1 transition-all text-center cursor-pointer group"
            >
              <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-50 text-3xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-xs">
                🌻
              </div>
              <h3 className="text-lg font-bold text-[#bd4674] mb-1.5">Luôn Rạng Rỡ</h3>
              <p className="text-xs sm:text-sm text-[#5a2e45] leading-relaxed">
                Mong nụ cười tươi tắn luôn nở trên môi, mỗi ngày thức dậy đều có những niềm vui nhỏ bé và đáng yêu để kể.
              </p>
            </article>

            {/* Card 2 */}
            <article
              onClick={() => burstHearts(12)}
              className="p-6 rounded-2xl bg-white/80 hover:bg-white border border-white shadow-[0_8px_24px_rgba(200,93,130,0.08)] hover:shadow-[0_12px_28px_rgba(200,93,130,0.18)] hover:-translate-y-1 transition-all text-center cursor-pointer group"
            >
              <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 text-3xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-xs">
                📚
              </div>
              <h3 className="text-lg font-bold text-[#bd4674] mb-1.5">Học Gì Cũng Đỉnh</h3>
              <p className="text-xs sm:text-sm text-[#5a2e45] leading-relaxed">
                Thi cử thuận lợi, làm bài thi đến đâu đúng đến đó, điểm số như ý và từng bước chinh phục mọi ước mơ hoài bão.
              </p>
            </article>

            {/* Card 3 */}
            <article
              onClick={() => burstHearts(12)}
              className="p-6 rounded-2xl bg-white/80 hover:bg-white border border-white shadow-[0_8px_24px_rgba(200,93,130,0.08)] hover:shadow-[0_12px_28px_rgba(200,93,130,0.18)] hover:-translate-y-1 transition-all text-center cursor-pointer group"
            >
              <div className="w-14 h-14 mx-auto rounded-2xl bg-pink-50 text-3xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-xs">
                💝
              </div>
              <h3 className="text-lg font-bold text-[#bd4674] mb-1.5">Được Yêu Thương</h3>
              <p className="text-xs sm:text-sm text-[#5a2e45] leading-relaxed">
                Luôn tự tin là chính mình, gặp nhiều điều tử tế, được che chở, trân trọng và giữ mãi nét duyên dáng hồn nhiên.
              </p>
            </article>
          </div>
        </section>

        {/* Section 2: Interactive Wishes Showcase & Category Filter */}
        <section className="mt-12 sm:mt-16 bg-white/70 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-md">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
            <div>
              <h2 className="font-serif-display font-bold text-xl sm:text-2xl text-[#bd4674]">
                Kho Lời Chúc Ý Nghĩa Ngày 20/10 💌
              </h2>
              <p className="text-xs text-pink-900/70">
                Bấm vào lời chúc để sao chép nhanh và gửi tặng bạn bè, người thân
              </p>
            </div>

            {/* Quick action buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setIsCardMakerOpen(true)}
                className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-pink-500 hover:bg-pink-600 text-white shadow-xs transition cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" /> Tự viết thiệp
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { id: 'all', label: 'Tất cả lời chúc 🌸' },
              { id: 'class', label: 'Các bạn nữ lớp mình 🌻' },
              { id: 'mother', label: 'Mẹ yêu 💖' },
              { id: 'teacher', label: 'Cô giáo 📚' },
              { id: 'girlfriend', label: 'Bạn gái / Crush 🌹' },
              { id: 'friend', label: 'Bạn thân 🌷' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playPop();
                  setActiveCategory(tab.id);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-pink-600 text-white shadow-xs'
                    : 'bg-white hover:bg-pink-100 text-pink-800 border border-pink-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Wishes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredWishes.map((wish) => {
              const isCopied = copiedWishId === wish.id;
              return (
                <div
                  key={wish.id}
                  className="bg-white/90 p-4 sm:p-5 rounded-2xl border border-pink-100 hover:border-pink-300 shadow-xs hover:shadow transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-pink-700 bg-pink-50 px-2.5 py-0.5 rounded-full">
                        <span>{wish.icon}</span>
                        <span>{wish.categoryLabel}</span>
                      </span>
                      <button
                        onClick={() => handleCopyWish(wish)}
                        title="Sao chép lời chúc"
                        className="text-gray-400 hover:text-pink-600 p-1 hover:bg-pink-50 rounded-lg transition cursor-pointer"
                      >
                        {isCopied ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-body">
                      &ldquo;{wish.content}&rdquo;
                    </p>
                  </div>

                  <div className="mt-3 pt-3 border-t border-pink-50 flex items-center justify-between">
                    <span className="text-[11px] text-gray-400 italic">20/10 đong đầy yêu thương</span>
                    <button
                      onClick={() => handleCopyWish(wish)}
                      className="text-xs font-semibold text-pink-600 hover:text-pink-800 flex items-center gap-1"
                    >
                      {isCopied ? 'Đã sao chép!' : 'Sao chép câu này'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 3: The Class Letter */}
        <LetterSection />

        {/* Google Mode Banner Prompt */}
        <section className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-50 via-pink-50 to-amber-50 border border-blue-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-3xl shrink-0 shadow-xs">
              🔍
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900 text-base">Khám phá Google Doodle 20/10</span>
                <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full">
                  Tính năng đặc biệt
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                Xem giao diện tìm kiếm Google ngày 20/10 với Bảng Tri Thức, quà tặng may mắn và pháo hoa rực rỡ!
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playPop();
              setIsGoogleMode(true);
            }}
            className="px-5 py-2.5 rounded-full bg-white hover:bg-blue-50 text-blue-600 border border-blue-200 hover:border-blue-300 font-bold text-xs sm:text-sm shadow-xs transition flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <span>Mở giao diện Google 20/10</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </section>

        {/* Footer */}
        <footer className="mt-16 text-center text-xs text-[#9c5571] space-y-1">
          <div className="font-medium">
            Made with 💖 for the amazing girls in our class · 20/10 Phụ Nữ Việt Nam
          </div>
          <div className="text-[11px] opacity-75">
            Trang web chúc mừng ngày 20/10 tràn ngập yêu thương và hạnh phúc!
          </div>
        </footer>
      </main>

      {/* Modals */}
      <FortuneWheelModal
        isOpen={isFortuneOpen}
        onClose={() => setIsFortuneOpen(false)}
      />

      <CardGeneratorModal
        isOpen={isCardMakerOpen}
        onClose={() => setIsCardMakerOpen(false)}
      />
    </div>
  );
}
