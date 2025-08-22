import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // 用於頁面跳轉

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // 防止表單提交時頁面重新整理
    if (searchTerm.trim()) {
      // 跳轉到搜尋結果頁，並將搜尋詞作為 URL 參數
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm(''); // 清空搜尋欄 (可選)
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <input
        type="text"
        placeholder="搜尋..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full md:w-56 px-4 py-2 pr-10 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-accent"
      />
      <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </form>
  );
}