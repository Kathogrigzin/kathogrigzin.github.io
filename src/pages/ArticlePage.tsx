import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticles, Article } from '../data/articles.ts';
import { categories, Category } from '../data/categories.ts';
import LoadingSpinner from '../components/LoadingSpinner'; // 確保引入了 LoadingSpinner

export default function ArticlePage() {
  const [viewMode, setViewMode] = useState<'ch' | 'ti' | 'both'>('ch');
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const { articleId } = useParams();

  useEffect(() => {
    async function loadArticle() {
      window.scrollTo(0, 0);
      const allArticles = await getArticles();
      const foundArticle = allArticles.find(a => a.id === articleId);
      setArticle(foundArticle || null);
      setLoading(false);
    }
    loadArticle();
  }, [articleId]);

  if (loading) return <LoadingSpinner />;
  }

  if (!article) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold">文章未找到</h2>
        <Link to="/" className="text-accent hover:text-accent-hover mt-4 inline-block">返回首頁</Link>
      </div>
    );
  }
  
  // *** 關鍵修改：設定標題和字體 class 的邏輯 ***
  let titleToDisplay = article.title_ch; // 預設顯示中文標題
  let titleClassName = 'font-chinese-title'; // 預設使用中文行楷

  if (viewMode === 'ti') {
    titleToDisplay = article.title_ti; // 如果是藏文模式，顯示藏文標題
    titleClassName = 'font-tibetan-title'; // 如果是藏文模式，使用藏文標題字體
  }
  // 在 'ch' (中文) 和 'both' (藏中對照) 模式下，都會使用預設的中文標題和中文字體

  const readingTime = viewMode === 'ti' && article.reading_time.ti ? article.reading_time.ti : article.reading_time.ch;
  
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 animate-fadeInUp">
      <div className="mb-6">
        {/* *** 關鍵修改：應用上面設定好的變數 *** */}
        <h1 className={`text-3xl md:text-4xl font-bold text-center ${titleClassName}`}>
          {titleToDisplay}
        </h1>
          <p className="text-center text-secondary mt-2">
          分類：{article.category}
          {/* 只有當 author 存在時，才顯示作者欄位 */}
          {article.author && <span> | 作者：{article.author}</span>}
          | 閱讀時間：約 {readingTime} 分鐘
         </p>
      </div>

      <div className="flex justify-center my-6 bg-surface p-2 rounded-lg shadow-sm sticky top-20 z-10">
        <button onClick={() => setViewMode('ch')} className={`lang-button px-4 py-2 rounded-md ${viewMode === 'ch' ? 'active' : ''}`}>中文</button>
        <button onClick={() => setViewMode('ti')} className={`lang-button px-4 py-2 rounded-md ${viewMode === 'ti' ? 'active' : ''}`}>藏文</button>
        <button onClick={() => setViewMode('both')} className={`lang-button px-4 py-2 rounded-md ${viewMode === 'both' ? 'active' : ''}`}>藏中對照</button>
      </div>

      <div className="prose lg:prose-xl max-w-none bg-surface p-6 rounded-lg shadow">
        {viewMode === 'ch' && <div dangerouslySetInnerHTML={{ __html: article.content_ch }} />}
        
        {viewMode === 'ti' && <div className="font-tibetan-body" dangerouslySetInnerHTML={{ __html: article.content_ti }} />}
        
        {viewMode === 'both' && (
          <div className="side-by-side">
            <div className="font-tibetan-body" dangerouslySetInnerHTML={{ __html: article.content_ti }} />
            <div dangerouslySetInnerHTML={{ __html: article.content_ch }} />
          </div>
        )}
      </div>
    </div>
  );
