import React from 'react'
import ReactDOM from 'react-dom/client'
import LoginPage from './pages/LoginPage'
import './index.css'

const rootElement = document.getElementById('root') as HTMLElement;
rootElement.style.width = '100%';

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <LoginPage />
  </React.StrictMode>,
)
