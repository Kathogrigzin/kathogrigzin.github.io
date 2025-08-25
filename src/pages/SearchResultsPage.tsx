import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getArticles, Article } from '../data/articles';
import LoadingSpinner from '../components/LoadingSpinner.tsx'; // 引入新元件

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const query = searchParams.get('q') || ''; // 從 URL 獲取搜尋關鍵字 'q'

  useEffect(() => {
    async function performSearch() {
      if (!query) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      const allArticles = await getArticles();
      const lowerCaseQuery = query.toLowerCase();

      const filtered = allArticles.filter(article => 
        article.title_ch.toLowerCase().includes(lowerCaseQuery) ||
        article.title_ti.toLowerCase().includes(lowerCaseQuery) ||
        article.category.toLowerCase().includes(lowerCaseQuery) ||
        // 簡單的內文搜尋，移除 HTML 標籤後進行比對
        article.content_ch.replace(/<[^>]+>/g, '').toLowerCase().includes(lowerCaseQuery) ||
        article.content_ti.replace(/<[^>]+>/g, '').toLowerCase().includes(lowerCaseQuery)
      );

      setResults(filtered);
      setLoading(false);
    }
    performSearch();
    window.scrollTo(0, 0);
  }, [query]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">
        搜尋結果：<span className="text-accent">{query}</span>
      </h1>
      <p className="text-secondary mb-8">找到了 {results.length} 篇文章</p>

      {if (loading) return <LoadingSpinner />}
      
      {!loading && results.length === 0 && (
        <p>找不到與 "{query}" 相關的文章。</p>
      )}

      {!loading && results.length > 0 && (
        <div className="space-y-6">
          {results.map(article => (
            <Link to={`/article/${article.id}`} key={article.id} className="block p-6 bg-surface rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <p className="text-sm text-accent font-semibold">{article.category}</p>
              <h2 className="text-xl font-bold mt-1">{article.title_ch}</h2>
              <p className="text-secondary mt-2 text-sm line-clamp-3">
                {article.content_ch.replace(/<[^>]+>/g, '')}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}