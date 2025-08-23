import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // *** 關鍵修改：移除 base 設定，讓它使用預設的 '/' ***
  // base: './', // <--- 刪除或註解掉這一行
})