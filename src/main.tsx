import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App';

const rootElement = document.getElementById('root') as HTMLElement;
rootElement.style.width = '100%';

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
