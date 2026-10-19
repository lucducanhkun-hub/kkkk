import React, { useState, useEffect } from 'react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Music, VolumeX, Sparkles, Heart, Search, Gift, FileText } from 'lucide-react';

interface NavbarProps {
  onToggleGoogleMode: () => void;
  isGoogleMode: boolean;
  onOpenCardMaker: () => void;
  onOpenFortune: () => void;
  heartsCount: number;
  onAddHeart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onToggleGoogleMode,
  isGoogleMode,
  onOpenCardMaker,
  onOpenFortune,
  heartsCount,
  onAddHeart,
}) => {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const toggleMusic = () => {
    const active = sound.toggleBgm((playing) => {
      setIsPlayingMusic(playing);
    });
    setIsPlayingMusic(active);
  };

  const handleHeartClick = () => {
    sound.playPop();
    onAddHeart();
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.1 },
      colors: ['#ff69b4', '#ff1493', '#ff85a2'],
    });
  };

  return (
    <nav className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/75 border-b border-pink-200/60 shadow-xs transition-all">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
        {/* Brand / Title */}
        <div className="flex items-center gap-2">
          <span className="text-2xl animate-bounce">💐</span>
          <div>
            <div className="font-bold text-sm sm:text-base text-[#bd4674] flex items-center gap-1.5">
              <span>20/10 Phụ Nữ Việt Nam</span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] bg-pink-100 text-pink-700 font-semibold">
                Happy Day!
              </span>
            </div>
            <div className="text-[10px] text-pink-900/60 font-medium">
              Tôn vinh phái đẹp & các bạn nữ
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Toggle Google Doodle Mode button */}
          <button
            onClick={onToggleGoogleMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer ${
              isGoogleMode
                ? 'bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 text-white shadow-md'
                : 'bg-white hover:bg-pink-50 text-gray-700 border border-pink-200 hover:border-pink-300'
            }`}
            title="Chuyển chế độ Google tìm kiếm 20/10"
          >
            <Search className="w-3.5 h-3.5 text-blue-500" />
            <span className="hidden md:inline">Giao diện Google</span>
            <span className="md:hidden">Google</span>
          </button>

          {/* Draw fortune button */}
          <button
            onClick={onOpenFortune}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold bg-pink-100 hover:bg-pink-200 text-pink-700 transition cursor-pointer"
            title="Rút quẻ may mắn"
          >
            <Gift className="w-3.5 h-3.5 text-pink-600" />
            <span className="hidden sm:inline">Rút quẻ</span>
          </button>

          {/* Create card button */}
          <button
            onClick={onOpenCardMaker}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold bg-pink-500 hover:bg-pink-600 text-white transition shadow-xs cursor-pointer"
            title="Tự tạo thiệp chúc mừng"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tạo thiệp</span>
          </button>

          {/* Music player toggle */}
          <button
            onClick={toggleMusic}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
              isPlayingMusic
                ? 'bg-rose-500 text-white shadow-xs'
                : 'bg-gray-100 hover:bg-pink-100 text-gray-700'
            }`}
            title={isPlayingMusic ? 'Tắt nhạc du dương' : 'Bật nhạc du dương'}
          >
            {isPlayingMusic ? (
              <>
                <Music className="w-3.5 h-3.5 animate-spin" />
                <span className="hidden lg:inline text-[11px]">Đang phát nhạc 🎵</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden lg:inline text-[11px]">Bật nhạc 🎵</span>
              </>
            )}
          </button>

          {/* Interactive Hearts counter */}
          <button
            onClick={handleHeartClick}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold bg-pink-50 hover:bg-rose-100 text-rose-600 border border-pink-200 transition cursor-pointer active:scale-95"
            title="Bấm để thả tim cho các bạn nữ"
          >
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>{heartsCount}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
