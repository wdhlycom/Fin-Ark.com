import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * 定时发布用的「构建日」（香港时间 YYYY-MM-DD）。
 *
 * 必须是构建期常量：客户端 bundle 与 SSR 预渲染要用同一个值，否则未到期的文章
 * 会在浏览器 hydration 后突然出现（详见 src/publish.ts 注释）。
 * 构建机默认 UTC，这里 +8 小时再取日期。dev 服务器跨午夜不自动更新，重启即可。
 */
const publishCutoff = new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString().slice(0, 10);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __PUBLISH_CUTOFF__: JSON.stringify(publishCutoff),
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
