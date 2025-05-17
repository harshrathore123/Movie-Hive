import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { GoogleOAuthProvider } from "@react-oauth/google";


const CLIENT_ID = "1083435366613-m6s6e2k7mq8ok9v6s504541qb0u8da16.apps.googleusercontent.com";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
    <App/>
    </GoogleOAuthProvider>
  </StrictMode>,
)
