import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const solo = import.meta.env.DEV ? new URLSearchParams(window.location.search).get('solo') : null

if (solo) {
  import('./solo.tsx').then(({ montarSolo }) => montarSolo(solo))
} else {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
