import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PresentationApp } from './client/presentation/PresentationApp'
import './client/presentation/theme/index.css'

createRoot(document.getElementById('presentation-root')!).render(
  <StrictMode>
    <PresentationApp />
  </StrictMode>,
)
