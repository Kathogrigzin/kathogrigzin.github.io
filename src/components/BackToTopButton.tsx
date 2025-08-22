import React, { useState, useEffect } from 'react';

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // 監聽滾動事件，決定按鈕是否顯示
  const toggleVisibility = () => {
    if (window.scrollY > 300) { // 滾動超過 300px 才顯示
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // 點擊後平滑滾動到頁面頂部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    // 當元件掛載時，開始監聽滾動
    window.addEventListener('scroll', toggleVisibility);

    // 當元件卸載時，移除監聽，避免記憶體洩漏
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []); // 空陣列表示這個 effect 只在元件第一次渲染時執行一次

  return (
    <button
      // 根據 isVisible 狀態決定是否要加上 'visible' 這個 class
      className={`back-to-top-button ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
    >
      ↑
    </button>
  );
}