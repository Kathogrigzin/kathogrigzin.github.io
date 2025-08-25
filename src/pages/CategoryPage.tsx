import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getArticles, Article } from '../data/articles';
import { categories, Category } from '../data/categories';
import LoadingSpinner from '../components/LoadingSpinner.tsx'; // 引入新元件

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (categoryId) {
        const foundCategory = categories.find(c => c.id === categoryId);
        setCategory(foundCategory || null);
        const filteredArticles = await getArticles(categoryId);
        setArticles(filteredArticles);
        setLoading(false);
      }
    }
    loadData();
    window.scrollTo(0, 0);
  }, [categoryId]);

  if (loading) return <LoadingSpinner />;
  if (!category) return <div className="text-center p-20">找不到此分類</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-chinese-title text-center mb-2">{category.name}</h1>
      <p className="text-center text-secondary mb-12">{category.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map(article => (
          <Link to={`/article/${article.id}`} key={article.id} className="block bg-surface rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
            {article.imageUrl && (
              <div className="overflow-hidden h-40">
                <img 
                  src={article.imageUrl}
                  alt={article.title_ch}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
            )}
            <div className="p-6">
              <h4 className="text-lg font-bold text-primary truncate">{article.title_ch}</h4>
              <p className="text-sm font-tibetan-title text-secondary truncate mt-1">{article.title_ti}</p>
              <p className="text-secondary text-sm mt-4">
                {article.content_ch.replace(/<[^>]+>/g, '').substring(0, 50)}...
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}