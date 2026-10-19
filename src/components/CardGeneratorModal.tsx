import React, { useState } from 'react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { X, Copy, Check, Sparkles, Heart } from 'lucide-react';

interface CardGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CardGeneratorModal: React.FC<CardGeneratorModalProps> = ({ isOpen, onClose }) => {
  const [recipient, setRecipient] = useState('Những đóa hoa của lớp mình');
  const [sender, setSender] = useState('Hội bạn nam trong lớp 💖');
  const [theme, setTheme] = useState<'pink' | 'yellow' | 'purple' | 'red'>('pink');
  const [message, setMessage] = useState(
    'Nhân ngày 20/10, chúc bạn luôn xinh đẹp, rạng rỡ như ánh bình minh, học tập đỉnh chóp và luôn nở nụ cười thật tươi nhé!'
  );
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const quickMessages = [
    'Chúc bạn ngày 20/10 ngập tràn niềm vui, nhận thật nhiều hoa quà và luôn rạng ngời!',
    'Chúc bạn xinh đẹp rạng rỡ, ăn hoài không béo, thi đâu đỗ đó và luôn hạnh phúc!',
    'Cảm ơn bạn đã luôn mang lại năng lượng tích cực và tiếng cười cho cả lớp. Happy Women’s Day!',
    'Chúc bạn mãi duyên dáng, đáng yêu và tự tin tỏa sáng với những gì bạn yêu thích!',
  ];

  const themeStyles = {
    pink: {
      cardBg: 'bg-gradient-to-br from-pink-50 via-rose-100/60 to-pink-100 border-pink-300',
      titleColor: 'text-pink-700',
      tagColor: 'bg-pink-200/80 text-pink-800',
      borderPattern: 'border-pink-300',
      stamp: '🌸',
    },
    yellow: {
      cardBg: 'bg-gradient-to-br from-amber-50 via-yellow-100/60 to-orange-50 border-amber-300',
      titleColor: 'text-amber-800',
      tagColor: 'bg-amber-200/80 text-amber-900',
      borderPattern: 'border-amber-300',
      stamp: '🌻',
    },
    purple: {
      cardBg: 'bg-gradient-to-br from-purple-50 via-fuchsia-100/60 to-pink-50 border-purple-300',
      titleColor: 'text-purple-800',
      tagColor: 'bg-purple-200/80 text-purple-900',
      borderPattern: 'border-purple-300',
      stamp: '💜',
    },
    red: {
      cardBg: 'bg-gradient-to-br from-rose-50 via-red-100/60 to-rose-100 border-rose-300',
      titleColor: 'text-rose-800',
      tagColor: 'bg-rose-200/80 text-rose-900',
      borderPattern: 'border-rose-300',
      stamp: '🌹',
    },
  };

  const currentTheme = themeStyles[theme];

  const handleCopy = () => {
    sound.playPop();
    const fullText = `💌 Thiệp chúc mừng ngày 20/10 🌷\n\nThân gửi: ${recipient}\n\n"${message}"\n\nTừ: ${sender}\n✨ Chúc mừng ngày Phụ nữ Việt Nam!`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.6 },
    });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 md:p-8 shadow-2xl border-2 border-pink-200 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-pink-600 hover:bg-pink-50 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Tạo Thiệp Chúc Mừng 20/10
          </div>
          <h3 className="text-2xl font-bold font-serif-display text-[#bd4674]">
            Tự Tay Thiết Kế Thiệp Gửi Người Thương 💌
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Điền tên người nhận, chọn thông điệp và sao chép để gửi tặng ngay trên Zalo, Messenger, Facebook!
          </p>
        </div>

        {/* Live Card Preview */}
        <div className="mb-6">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Bản xem trước thiệp điện tử:</span>
            <span className="text-pink-600 flex items-center gap-1">
              <Heart className="w-3 h-3 fill-pink-600" /> 20/10 Special Edition
            </span>
          </div>

          <div
            id="greeting-card-preview"
            className={`relative p-6 sm:p-8 rounded-2xl border-2 border-dashed ${currentTheme.borderPattern} ${currentTheme.cardBg} shadow-lg transition-all duration-300`}
          >
            {/* Stamp decoration */}
            <div className="absolute top-4 right-4 w-12 h-12 bg-white/80 rounded-xl border border-pink-200 flex flex-col items-center justify-center shadow-xs">
              <span className="text-lg">{currentTheme.stamp}</span>
              <span className="text-[8px] font-bold text-pink-800">20.10</span>
            </div>

            <div className="text-xs uppercase font-bold tracking-widest text-pink-500 mb-2">
              HAPPY VIETNAMESE WOMEN&apos;S DAY 🌷
            </div>

            <h4 className={`text-xl sm:text-2xl font-bold font-serif-display ${currentTheme.titleColor} mb-3`}>
              Thân gửi: {recipient || 'Người phụ nữ tôi yêu mến'}
            </h4>

            <p className="font-handwriting text-2xl sm:text-3xl text-gray-800 leading-relaxed mb-6 italic">
              &ldquo;{message}&rdquo;
            </p>

            <div className="flex justify-between items-end pt-4 border-t border-pink-200/50 text-xs">
              <div className="text-[11px] text-gray-500">
                Chúc bạn một ngày tràn đầy yêu thương & tiếng cười! 💐
              </div>
              <div className="text-right">
                <span className="text-gray-500 block text-[10px]">Người gửi:</span>
                <strong className={`font-bold text-sm ${currentTheme.titleColor}`}>{sender}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Gửi tới ai? (Tên người nhận):</label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Ví dụ: Bạn Lan Chi / Mẹ yêu / Cô giáo..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition text-sm text-gray-800"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Từ ai? (Tên người gửi):</label>
              <input
                type="text"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                placeholder="Ví dụ: Tập thể nam sinh / Con trai..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition text-sm text-gray-800"
              />
            </div>
          </div>

          {/* Theme Palette Selection */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1.5">Chọn tông màu thiệp:</label>
            <div className="flex gap-2">
              {[
                { id: 'pink', label: '🌸 Hồng Ngọt Ngào', bg: 'bg-pink-100 text-pink-800' },
                { id: 'yellow', label: '🌻 Vàng Rực Rỡ', bg: 'bg-amber-100 text-amber-800' },
                { id: 'purple', label: '💜 Tím Mộng Mơ', bg: 'bg-purple-100 text-purple-800' },
                { id: 'red', label: '🌹 Đỏ Kiêu Sa', bg: 'bg-rose-100 text-rose-800' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    sound.playPop();
                    setTheme(item.id as 'pink' | 'yellow' | 'purple' | 'red');
                  }}
                  className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                    theme === item.id ? 'ring-2 ring-pink-500 font-bold shadow-xs' : 'opacity-70 hover:opacity-100'
                  } ${item.bg}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Message text area */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Nội dung lời chúc:</label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition text-sm text-gray-800 resize-none"
            />
          </div>

          {/* Quick choices */}
          <div>
            <span className="text-gray-500 text-[11px] block mb-1">Gợi ý câu chúc nhanh:</span>
            <div className="flex flex-wrap gap-1.5">
              {quickMessages.map((msg, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    sound.playPop();
                    setMessage(msg);
                  }}
                  className="px-2.5 py-1 bg-gray-100 hover:bg-pink-50 hover:text-pink-700 rounded-md text-[11px] transition text-left cursor-pointer"
                >
                  &ldquo;{msg.substring(0, 36)}...&rdquo;
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap justify-between items-center gap-3 mt-6 pt-4 border-t border-gray-100">
          <button
            onClick={() => {
              sound.playSparkle();
              confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
            }}
            className="flex items-center gap-1.5 text-xs text-pink-600 hover:text-pink-800 font-semibold px-3 py-2 rounded-lg hover:bg-pink-50 transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-pink-500" /> Bắn pháo bông chúc mừng!
          </button>

          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Đã sao chép thiệp & lời chúc!' : 'Sao chép thiệp để gửi'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
