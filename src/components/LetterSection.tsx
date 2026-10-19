import React, { useState } from 'react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Send, MessageCircleHeart } from 'lucide-react';

export const LetterSection: React.FC = () => {
  const [isOpened, setIsOpened] = useState(true);
  const [likes, setLikes] = useState(128);
  const [hasLiked, setHasLiked] = useState(false);

  const toggleLetter = () => {
    sound.playPop();
    setIsOpened(!isOpened);
  };

  const handleLike = () => {
    sound.playSparkle();
    setLikes((prev) => (hasLiked ? prev - 1 : prev + 1));
    setHasLiked(!hasLiked);
    if (!hasLiked) {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#ff69b4', '#ff1493', '#ff85a2'],
      });
    }
  };

  return (
    <section className="mt-12 sm:mt-16 relative">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-bold mb-2">
          <MessageCircleHeart className="w-3.5 h-3.5" /> Tâm Thư Gửi Các Bạn Nữ
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif-display font-bold text-[#bd4674]">
          Một Lời Nhắn Nhỏ 💌
        </h2>
        <p className="text-xs sm:text-sm text-pink-900/70 mt-1">
          Những dòng tâm sự chân thành gửi tới những bông hoa xinh đẹp nhất của lớp
        </p>
      </div>

      <div className="relative mx-auto max-w-3xl">
        {/* Envelope wrapper with wax seal */}
        <div className="relative bg-gradient-to-br from-white via-[#fff2f6] to-[#ffeaf1] p-6 sm:p-10 rounded-3xl border-2 border-dashed border-[#f29ab8] shadow-xl backdrop-blur-sm transition-all duration-300">
          {/* Stamp header */}
          <div className="flex justify-between items-start mb-6 border-b border-pink-200/60 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl">💌</span>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-pink-600 block">
                  Thư gửi ngày 20 Tháng 10
                </span>
                <span className="text-[11px] text-gray-500">Người nhận: Những cô gái tuyệt vời của lớp mình</span>
              </div>
            </div>

            {/* Postage stamp */}
            <div className="w-14 h-16 bg-white border border-pink-300 rounded-lg p-1 flex flex-col items-center justify-center text-center shadow-xs rotate-3 hover:rotate-0 transition-transform">
              <span className="text-xl">🌸</span>
              <span className="text-[9px] font-bold text-pink-700">VN 20/10</span>
            </div>
          </div>

          {/* Letter Content */}
          {isOpened ? (
            <div className="space-y-4 text-base sm:text-lg text-gray-800 leading-relaxed font-body animate-fadeIn">
              <p className="font-semibold text-pink-700 text-lg">
                Gửi các bạn nữ thân mến,
              </p>
              <p>
                Cảm ơn các bạn vì đã luôn làm cho lớp mình thêm vui vẻ, ngập tràn màu sắc và có thật nhiều kỷ niệm đáng nhớ trong mỗi giờ học.
              </p>
              <p>
                Nhân ngày <strong>20/10</strong>, chúc mỗi bạn luôn{' '}
                <span className="text-rose-600 font-bold bg-pink-100/60 px-1.5 py-0.5 rounded">
                  xinh xắn theo cách riêng
                </span>
                ,{' '}
                <span className="text-rose-600 font-bold bg-pink-100/60 px-1.5 py-0.5 rounded">
                  mạnh mẽ khi cần
                </span>
                ,{' '}
                <span className="text-rose-600 font-bold bg-pink-100/60 px-1.5 py-0.5 rounded">
                  dịu dàng khi muốn
                </span>{' '}
                và luôn đủ tự tin để theo đuổi những điều mình yêu thích.
              </p>
              <p>
                Chúc các bạn có một ngày 20/10 thật ngọt ngào, nhận được thật nhiều lời chúc tốt đẹp, hoa thơm và quà xinh — còn các bài kiểm tra thì… luôn{' '}
                <strong>dễ như ăn kẹo</strong> nha! 😆🌷
              </p>

              {/* Signature */}
              <div className="pt-6 border-t border-pink-200/60 flex flex-wrap justify-between items-end gap-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer ${
                    hasLiked
                      ? 'bg-rose-500 text-white'
                      : 'bg-white hover:bg-pink-100 text-pink-700 border border-pink-200'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${hasLiked ? 'fill-white' : 'fill-pink-500 text-pink-500'}`} />
                  <span>{likes} Bạn nữ đã thả tim thư này</span>
                </button>

                <div className="text-right">
                  <span className="text-xs text-gray-500 block">Thân ái & trân trọng,</span>
                  <strong className="text-lg font-bold font-handwriting text-[#bd4674] text-xl">
                    Hội bạn cùng lớp 💗
                  </strong>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-sm text-gray-500 mb-4">Lá thư đã được gấp lại cẩn thận ✉️</p>
              <button
                onClick={toggleLetter}
                className="px-5 py-2.5 bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs rounded-full shadow-md transition"
              >
                Mở lại thư để đọc 💌
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
