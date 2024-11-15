import { createRoot } from 'react-dom/client'
import '@/assets/css/tailwind.css'
import LolChamp from '@/pages/LolChamp'
import { NextUIProvider } from '@nextui-org/react'

createRoot(document.getElementById('root')).render(
    <NextUIProvider>
        <LolChamp />
    </NextUIProvider>
)
