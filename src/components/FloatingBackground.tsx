import React, { useEffect, useState } from 'react';

interface FloatingItem {
  id: number;
  char: string;
  left: number;
  duration: number;
  delay: number;
  size: number;
}

interface ClickSparkle {
  id: number;
  x: number;
  y: number;
  char: string;
}

export const FloatingBackground: React.FC = () => {
  const [items, setItems] = useState<FloatingItem[]>([]);
  const [clickSparkles, setClickSparkles] = useState<ClickSparkle[]>([]);

  useEffect(() => {
    const chars = ['🌸', '🌷', '💗', '✨', '🌼', '💕', '💐', '🎀', '🌺'];
    const generated: FloatingItem[] = Array.from({ length: 26 }, (_, i) => ({
      id: i,
      char: chars[Math.floor(Math.random() * chars.length)],
      left: Math.random() * 98,
      duration: 10 + Math.random() * 14,
      delay: -(Math.random() * 20),
      size: 15 + Math.random() * 22,
    }));
    setItems(generated);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only spawn when clicking on empty background
    if ((e.target as HTMLElement).tagName === 'BUTTON' || (e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'TEXTAREA') {
      return;
    }
    const chars = ['💖', '🌸', '✨', '🌷', '💕', '💐'];
    const newSparkle: ClickSparkle = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
      char: chars[Math.floor(Math.random() * chars.length)],
    };

    setClickSparkles((prev) => [...prev.slice(-15), newSparkle]);

    setTimeout(() => {
      setClickSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
    }, 1200);
  };

  return (
    <div
      onClick={handleClick}
      className="fixed inset-0 pointer-events-auto overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      {/* Background radial gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-pink-200/30 via-rose-100/40 to-amber-100/25 rounded-full blur-3xl pointer-events-none" />

      {/* Floating rising elements */}
      {items.map((item) => (
        <span
          key={item.id}
          className="absolute bottom-[-60px] animate-rise pointer-events-none opacity-70 will-change-transform"
          style={{
            left: `${item.left}%`,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
            fontSize: `${item.size}px`,
          }}
        >
          {item.char}
        </span>
      ))}

      {/* Interactive click sparkles */}
      {clickSparkles.map((sparkle) => (
        <span
          key={sparkle.id}
          className="fixed animate-heartpop pointer-events-none text-2xl font-bold select-none z-50 drop-shadow-md"
          style={{
            left: `${sparkle.x - 12}px`,
            top: `${sparkle.y - 12}px`,
          }}
        >
          {sparkle.char}
        </span>
      ))}
    </div>
  );
};
