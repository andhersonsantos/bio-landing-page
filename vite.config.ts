import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    root: 'public',
    server: {
      port: 3000,
      host: '0.0.0.0',
      fs: {
        allow: ['..'],
      },
    },
    plugins: [
      react(),
      {
        name: 'resolve-src-paths',
        resolveId(id) {
          if (id.startsWith('/src/')) {
            return path.resolve(__dirname, id.slice(1));
          }
          if (id.startsWith('../src/')) {
            return path.resolve(__dirname, 'src', id.replace('../src/', ''));
          }
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    build: {
      outDir: '../dist',
      emptyOutDir: true,
      // Otimizações de build para melhor performance
      rollupOptions: {
        output: {
          manualChunks: {
            // Separa bibliotecas grandes em chunks próprios
            'react-vendor': ['react', 'react-dom'],
            'framer-motion': ['framer-motion'],
            'recharts': ['recharts'],
            'lucide-react': ['lucide-react'],
          },
        },
      },
      // Otimizações de minificação
      minify: 'esbuild',
      // Aumenta o limite de aviso de tamanho de chunk
      chunkSizeWarningLimit: 1000,
      // Habilita source maps apenas em desenvolvimento
      sourcemap: false,
    },
    // Otimizações de dependências
    optimizeDeps: {
      include: ['react', 'react-dom', 'framer-motion', 'lucide-react'],
    },
  };
});
