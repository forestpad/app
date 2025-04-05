import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
      buffer: 'buffer',
      util: 'util',
      assert: 'assert',
      process: require.resolve('process/browser'),
    },
  },
  define: {
    global: 'globalThis',
    'process.env': {}, // 최소 환경 변수 선언
  },
  optimizeDeps: {
    include: ['process', 'buffer'],
    esbuildOptions: {
      define: {
        global: 'globalThis',
        'process.env': '{}',
      },
    },
  },
})
