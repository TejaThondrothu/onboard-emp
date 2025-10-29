import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AlertProvider } from './context/AlertContext.jsx'

createRoot(document.getElementById('root')).render(
  <AlertProvider>
     <BrowserRouter> 
        <StrictMode>
          <App />
        </StrictMode>
      </BrowserRouter> 
  </AlertProvider>
 
)
