// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'EggInHealth',
        short_name: 'Eggs',
        theme_color: '#ffffff',
        scope: '/',
        start_url: '/',
        icons: [
            {
                "src": 'src/assets/icons/maskable_icon_x48.png',
                "sizes": "48x48",
                "type": "image/png"
            },
            {
                "src": 'src/assets/icons/maskable_icon_x72.png',
                "sizes": `72x72`,
                "type": "image/png"
            },
            {
                "src": 'src/assets/icons/maskable_icon_x96.png',
                "sizes": "96x96",
                "type": "image/png"
            },
            {
                "src": 'src/assets/icons/maskable_icon_x128.png',
                "sizes": "128x128",
                "type": "image/png"
            },
            {
              "src": 'src/assets/icons/maskable_icon_x192.png',
              "sizes": '192x192',
              "type": "image/png"
          },
            {
                "src": 'src/assets/icons/maskable_icon_x384.png',
                "sizes": "384x384",
                "type": "image/png"
            },
            {
                "src": 'src/assets/icons/maskable_icon_x512.png',
                "sizes": "512x512",
                "type": "image/png"
            }
        ],
      }, 
    })
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://we8mpmqycc.apigw.ntruss.com', // 백엔드 API의 URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
