import React, { useRef, useState, useEffect } from 'react'; // 引入 useEffect
import { Routes, Route, Link, useLocation } from 'react-router-dom';

// 引入所有需要的頁面和元件
import HomePage from './pages/HomePage.tsx';
import ArticlePage from './pages/ArticlePage.tsx';
import CategoryPage from './pages/CategoryPage.tsx';
import SearchResultsPage from './pages/SearchResultsPage.tsx'; // 引入搜尋結果頁
import BackToTopButton from './components/BackToTopButton.tsx';
import SearchBar from './components/SearchBar.tsx'; // 引入搜尋欄元件

// SVG Icons
const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
  </svg>
);
const YouTubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
  </svg>
);
// 新增 Email 和電話 Icon
const EmailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
);
const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
);


export default function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const location = useLocation();

  // *** 關鍵修改：新增自動播放邏輯 ***
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // 嘗試自動播放
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // 自動播放成功
          setIsPlaying(true);
        })
        .catch(error => {
          // 自動播放失敗，通常是因為使用者還沒有與頁面互動
          // 我們設定一個事件監聽器，等待第一次互動
          console.log("Autoplay was prevented. Waiting for user interaction.");
          const startAudioOnInteraction = () => {
            audio.play();
            setIsPlaying(true);
            // 播放後就移除監聽器，避免重複觸發
            window.removeEventListener('click', startAudioOnInteraction);
            window.removeEventListener('keydown', startAudioOnInteraction);
          };
          window.addEventListener('click', startAudioOnInteraction);
          window.addEventListener('keydown', startAudioOnInteraction);
          
          // 清理函式：當元件卸載時，移除監聽器
          return () => {
            window.removeEventListener('click', startAudioOnInteraction);
            window.removeEventListener('keydown', startAudioOnInteraction);
          }
        });
    }
  }, []); // 空陣列表示這個 effect 只在 App 元件第一次載入時執行

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const startMusic = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const navLinks = [
    { name: '首頁', path: '/' },
    { name: '才旺諾布', path: '/about' },
    { name: '古籍抄本', path: '/manuscripts' },
    { name: '祖寺介紹', path: '/temple' },
    { name: '參考資料', path: '/references' },
    { name: '電子檔下載', path: '/downloads' },
  ];

   return (
    <div className="flex flex-col min-h-screen bg-background">
      <audio ref={audioRef} src="/audio.mp3" loop />

      <header className="bg-surface/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20"> {/* 增加 header 高度 */}
            
            {/* *** 關鍵修改：加入 Logo *** */}
            <Link to="/" className="flex items-center space-x-3">
              <img src="/images/Logo.png" alt="Logo" className="h-12 w-12" />
              <span className="text-xl font-chinese-title font-chinese-title text-primary">才旺諾布全集</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-1">
                {navLinks.map(link => (
                  <Link 
                    key={link.name} 
                    to={link.path} 
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === link.path 
                        ? 'bg-accent/10 text-accent font-semibold' 
                        : 'text-secondary hover:text-primary'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              
              {/* *** 關鍵在這裡：加入了 SearchBar 元件 *** */}
              <div className="hidden md:block">
                <SearchBar />
              </div>

              <button onClick={togglePlayPause} title={isPlaying ? '暫停音樂' : '播放音樂'} className="p-2 rounded-full hover:bg-gray-200 text-xl flex items-center justify-center w-10 h-10">
                {isPlaying ? '⏯' : '▶'}
              </button>
            </div>
          </div>
          {/* 在手機版顯示搜尋欄 */}
          <div className="md:hidden pt-2 pb-4">
             <SearchBar />
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/article/:articleId" element={<ArticlePage />} />
          <Route path="/search" element={<SearchResultsPage />} /> {/* 新增搜尋結果頁路由 */}
          <Route path="/about" element={<div className="p-8 text-center"><h1>才旺諾布</h1><p>頁面內容建置中...</p></div>} />
          <Route path="/manuscripts" element={<div className="p-8 text-center"><h1>古籍抄本</h1><p>頁面內容建置中...</p></div>} />
          <Route path="/temple" element={<div className="p-8 text-center"><h1>祖寺介紹</h1><p>頁面內容建置中...</p></div>} />
          <Route path="/references" element={<div className="p-8 text-center"><h1>參考資料</h1><p>頁面內容建置中...</p></div>} />
          <Route path="/downloads" element={<div className="p-8 text-center"><h1>電子檔下載</h1><p>頁面內容建置中...</p></div>} />
        </Routes>
      </main>

      {/* Floating Icons and Footer */}
      <div className="fixed bottom-24 right-4 z-50 flex flex-col space-y-3">
        <a href="https://www.facebook.com/rigzinchenpoassociation/?locale=zh_TW" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors" title="Facebook">
          <FacebookIcon />
        </a>
        <a href="https://www.youtube.com/@chingyichi7146" target="_blank" rel="noopener noreferrer" className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors" title="YouTube">
          <YouTubeIcon />
        </a>
      </div>
        <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* 關於我們 */}
                <div>
                    <h4 className="font-bold text-white mb-4 text-lg">仁珍才旺諾布全集</h4>
                    <p className="text-sm text-gray-400">致力於保存與弘揚偉大學者噶陀仁珍千寶才旺諾布的一生著作。</p>
                </div>
                {/* 學習連結 */}
                <div>
                    <h4 className="font-bold text-white mb-4 text-lg">網站連結</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="https://rigzin-chenpo.org/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">噶陀仁珍千寶佛學會總網</a></li>
                        <li><a href="https://www.atiorg.com/zh-Hant" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">貝瑪阿諦佛學院</a></li>
                        <li><a href="https://www.facebook.com/p/%E6%B3%95%E6%BA%90%E5%87%BA%E7%89%88%E6%96%87%E5%8C%96%E4%BA%8B%E6%A5%AD%E7%A4%BEChojung-publisher-Co-100064138442996/?locale=zh_TW" className="text-gray-400 hover:text-white">法源文化事業</a></li>
                        <li><a href="https://padmarajasociety-us.org/" className="text-gray-400 hover:text-white">Padma Raja Society</a></li>
                        
                    </ul>
                </div>
                {/* 聯絡資訊 */}
                <div>
                    <h4 className="font-bold text-white mb-4 text-lg">聯絡資訊</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li className="flex items-start"><PhoneIcon /> 04-25630771</li>
                      <li className="flex items-start"><EmailIcon /> rigzinsungbum@gmail.com</li>
                    </ul>
                </div>
                {/* 社群媒體 */}
                <div>
                    <h4 className="font-bold text-white mb-4 text-lg">關注我們</h4>
                    <div className="flex space-x-4">
                        <a href="https://www.facebook.com/rigzinchenpoassociation/?locale=zh_TW" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white" title="Facebook"><FacebookIcon /></a>
                        <a href="https://www.youtube.com/@chingyichi7146" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white" title="YouTube"><YouTubeIcon /></a>
                    </div>
                </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm text-gray-500">
                © 2025 仁珍才旺諾布全集. All Rights Reserved.
            </div>
        </div>
      </footer>

      {/* 不再需要浮動 Icon，所以移除 */}
      <BackToTopButton />
    </div>
  );
}
