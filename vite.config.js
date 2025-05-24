import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['vite.svg'],
      manifest: {
        name: 'Trip Drugstore',
        short_name: 'Trip Drugstore',
        description: 'Pedidos en línea desde trip',
        theme_color: '#000000',   
        background_color: '#000000', 
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'icons/triplogoapp.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/triplogoapp.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
