import React, { useState } from 'react';
import { FORTUNES, FortuneCookie } from '../data/wishes';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { X, Sparkles, RefreshCw, Gift } from 'lucide-react';

interface FortuneWheelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FortuneWheelModal: React.FC<FortuneWheelModalProps> = ({ isOpen, onClose }) => {
  const [selectedFortune, setSelectedFortune] = useState<FortuneCookie | null>(null);
  const [openedEnvelopes, setOpenedEnvelopes] = useState<number[]>([]);

  if (!isOpen) return null;

  const handlePickEnvelope = (fortune: FortuneCookie) => {
    sound.playChime();
    setSelectedFortune(fortune);
    if (!openedEnvelopes.includes(fortune.id)) {
      setOpenedEnvelopes((prev) => [...prev, fortune.id]);
    }
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#ff69b4', '#ffd700', '#ff1493', '#ff85a2'],
    });
  };

  const handleReset = () => {
    sound.playPop();
    setSelectedFortune(null);
    setOpenedEnvelopes([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#fff7f9] to-[#fff] rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-pink-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-pink-400 hover:text-pink-600 hover:bg-pink-100 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Quẻ Bói May Mắn 20/10
          </div>
          <h3 className="text-2xl font-bold font-serif-display text-[#bd4674]">
            Rút Quẻ May Mắn Cho Phái Đẹp 🥠
          </h3>
          <p className="text-xs text-pink-900/70 mt-1">
            Chọn 1 phong bao bên dưới để nhận quẻ dự đoán vận may và lời chúc đặc biệt của bạn nhé!
          </p>
        </div>

        {/* Envelope Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {FORTUNES.map((fortune, index) => {
            const isOpened = openedEnvelopes.includes(fortune.id);
            const isSelected = selectedFortune?.id === fortune.id;

            return (
              <button
                key={fortune.id}
                onClick={() => handlePickEnvelope(fortune)}
                className={`relative p-3.5 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 transform active:scale-95 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-tr from-pink-500 to-rose-400 text-white shadow-lg scale-105 ring-4 ring-pink-200'
                    : isOpened
                    ? 'bg-pink-100 text-pink-700 opacity-80'
                    : 'bg-white hover:bg-pink-50 text-pink-600 border border-pink-200 shadow-sm hover:shadow hover:-translate-y-1'
                }`}
              >
                <div className="text-2xl mb-1">{fortune.emoji}</div>
                <div className="text-xs font-bold">Bao số {index + 1}</div>
                <div className="text-[10px] opacity-75 mt-0.5">
                  {isOpened ? 'Đã mở' : 'Chưa mở'}
                </div>
              </button>
            );
          })}
        </div>

        {/* Revealed Fortune Box */}
        {selectedFortune ? (
          <div className="bg-gradient-to-r from-pink-50 via-rose-50 to-pink-50 border-2 border-dashed border-pink-300 rounded-2xl p-5 text-center animate-fadeIn shadow-sm">
            <div className="text-3xl mb-1">{selectedFortune.emoji}</div>
            <h4 className="text-lg font-bold text-[#b53b6b] mb-2">{selectedFortune.title}</h4>
            <p className="text-sm text-gray-800 leading-relaxed font-medium mb-3">
              &ldquo;{selectedFortune.prediction}&rdquo;
            </p>

            <div className="flex justify-center gap-4 text-xs font-semibold text-pink-700 pt-2 border-t border-pink-200/60">
              <span>Số may mắn: <strong className="text-pink-900">{selectedFortune.luckyNumber}</strong></span>
              <span>Màu sắc may mắn: <strong className="text-pink-900">{selectedFortune.luckyColor}</strong></span>
            </div>
          </div>
        ) : (
          <div className="text-center p-6 border-2 border-dashed border-pink-200 rounded-2xl text-xs text-pink-600 bg-pink-50/50">
            <Gift className="w-8 h-8 text-pink-400 mx-auto mb-2 animate-bounce" />
            Nhấn vào một trong 6 phong bao may mắn ở trên để khám phá quẻ bói của bạn!
          </div>
        )}

        {/* Footer actions */}
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-pink-100">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-pink-600 hover:text-pink-800 font-semibold"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Rút lại từ đầu
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-xs rounded-full shadow-md transition"
          >
            Đã nhận quẻ! 💖
          </button>
        </div>
      </div>
    </div>
  );
};
