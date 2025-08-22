import type { StaticPageConfig } from './types';

export const BACKGROUND_IMAGES = [
  'images/木拉寺遠景.jpg',
  'images/木拉大德眾.jpg',
  'images/佛學院大殿.jpg',
  'images/金剛瑜伽母洞.jpg',
  'images/馬頭洞.jpg',
  'images/金剛猛王母洞.jpg'
];

export const NAV_LINKS = [
    { name: '首頁', path: '/' },
    { name: '文獻總覽', path: '/documents' },
    { name: '關於才旺諾布', path: '/page/tsewangnorbu' },
    { name: '古籍抄本', path: '/page/manuscripts' },
    { name: '祖寺介紹', path: '/page/temple' },
    { name: '編者的話', path: '/page/preface' },
    { name: '電子檔下載', path: '/downloads' },
];

export const STATIC_PAGE_CONFIG: StaticPageConfig = {
  'preface': { title: '編者的話', path: 'data/pages/preface.html' },
  'tsewangnorbu': { title: '關於才旺諾布', path: 'data/pages/about_tsewang_norbu.html' },
  'manuscripts': { title: '古籍抄本', path: 'data/pages/manuscripts.html' },
  'temple': { title: '祖寺介紹', path: 'data/pages/temple.html' }
};

export const CONTACT_INFO = {
    donate: { title: '護持贊助', body: `1、戶名：中華民國噶陀仁珍千寶佛學會\n   郵局劃撥帳號：18856281\n\n2、戶名:中華民國噶陀仁珍千寶佛學會 / 紀靜宜\n  （Beneficiary:Kathog Rigzin Chenpo Dharma association/ Chi Ching-Yi)\n    轉帳或匯款銀行:台北富邦商業銀行信義分行\n\n3、海外匯款：\n   Beneficiary：Kathog Rigzin Chenpo Dharma association\n   Bank：TAIPEI FUBON COMMERCIAL BANK CO., LTD(Hsinyi Branch)\n   swift code：TPBKTWTP460\n   account No.：460-210836692` },
    contact: { title: '聯繫客服', body: `電話：0968500586、0906357073\n\nEmail：rigzinsungbum@gmail.com\n\nAddress：No. 322, Shenqing Rd., Shengang Dist., Taichung City 429014, Taiwan (R.O.C.)\n\n服務時間：週一至週五 9:00~17:00 週末 10:00~15:00` }
};