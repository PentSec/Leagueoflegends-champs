import { createRoot } from 'react-dom/client'
import '@/assets/css/tailwind.css'
import LolChamp from '@/pages/LolChamp'
import { NextUIProvider } from '@nextui-org/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root')).render(
    <NextUIProvider>
        <LolChamp />
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            draggablePercent={true}
        />
    </NextUIProvider>
)
