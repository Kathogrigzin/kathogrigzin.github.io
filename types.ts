
export interface DocumentMeta {
  readTime: string;
  preview: string;
}

export interface Document {
  id: string;
  tibetanTitle?: string;
  chineseTitle?: string;
  englishTitle?: string;
  author?: string;
  category?: string;
  ContentTibetan?: string;
  ContentChinese?: string;
  ContentEnglish?: string;
  availableLanguages: string[];
  meta: DocumentMeta;
}

export interface DownloadItem {
  title: string;
  description: string;
  date: string;
  file_size: string;
  file_type: string;
  file_url: string;
}

export interface FileManifest {
  documents: string[];
  images: {
    manuscripts: string[];
    rigzintsewangnorbu: string[];
    others: string[];
  };
}

export interface StaticPageConfig {
    [key: string]: {
        title: string;
        path: string;
    }
}
