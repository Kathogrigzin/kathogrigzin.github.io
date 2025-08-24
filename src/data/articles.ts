import { categories } from './categories.ts';

export interface Article {
  id: string;
  category: string;
  title_ch: string;
  title_ti: string;
  content_ch: string;
  content_ti: string;
  author?: string; // <-- 關鍵修改：新增 author 欄位 (? 代表它是可選的)
  imageUrl?: string;
  reading_time: { ch: number; ti: number };
}

// 建立一個 { "上師瑜伽": "guru-yoga", ... } 的映射，方便查找
const categoryNameToIdMap = categories.reduce((acc, cat) => {
  acc[cat.name] = cat.id;
  return acc;
}, {} as Record<string, string>);

const articleModules = import.meta.glob('/src/data/*.json');
let allArticlesCache: Article[] | null = null;

function calculateReadingTime(text: string): number {
  if (!text) return 1;
  const words = text.replace(/<[^>]+>/g, '').length;
  const time = Math.ceil(words / 300);
  return time > 0 ? time : 1;
}

// 這個函式現在可以根據分類 ID 來篩選文章
export async function getArticles(categoryId?: string): Promise<Article[]> {
  if (!allArticlesCache) {
    const loadedArticles: Article[] = [];
    const categoryFiles = categories.map(cat => ({ name: cat.name, file: `${cat.name}.json` }));
    
    for (const { name, file } of categoryFiles) {
      const modulePath = `/src/data/${file}`;
      if (articleModules[modulePath]) {
        const module = (await articleModules[modulePath]()) as { default: any[] };
        module.default.forEach((rawArticle: any, index: number) => {
          loadedArticles.push({
            id: rawArticle.id || `${categoryNameToIdMap[name]}-${index}`,
            category: name,
            title_ch: rawArticle.chineseTitle,
            title_ti: rawArticle.tibetanTitle,
            content_ch: rawArticle.ContentChinese,
            content_ti: rawArticle.ContentTibetan,
            author: rawArticle.author, // <-- 關鍵修改：讀取 JSON 中的 author 欄位
            imageUrl: rawArticle.imageUrl,
            reading_time: {
              ch: calculateReadingTime(rawArticle.ContentChinese),
              ti: calculateReadingTime(rawArticle.ContentTibetan),
            },
          });
        });
      }
    }
    allArticlesCache = loadedArticles;
  }

  if (categoryId) {
    const categoryName = categories.find(c => c.id === categoryId)?.name;
    return allArticlesCache.filter(article => article.category === categoryName);
  }

  return allArticlesCache;
}