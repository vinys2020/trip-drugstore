import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['vite.svg'], // u otros archivos estáticos si los tenés
      manifest: {
        name: 'Trip Drugstore',
        short_name: 'Trip Store',
        description: 'Pedidos en línea desde trip',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'icons/logotrippc.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/logotrippc.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
