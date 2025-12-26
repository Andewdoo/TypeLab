import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Background from './background.jsx'
import TypingCard from './typing.jsx'
import TopBar from './topbar.jsx'
import SubBar from './subbar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TopBar />
    <Background />
    <TypingCard />
    <SubBar />
  </StrictMode>,
)
