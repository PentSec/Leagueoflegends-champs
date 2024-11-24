import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
    plugins: [react()],
    base: '/Leagueoflegends-champs/',
    resolve: {
        alias: {
            '@': '/src'
        }
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'react-vendors': ['react', 'react-dom'],
                    'ui-vendors': ['@nextui-org/react', 'react-image-gallery']
                }
            }
        },
        chunkSizeWarningLimit: 500
    }
})
