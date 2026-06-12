// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import emailjs from '@emailjs/browser'
import App from './App'
import './index.css'

// Initialize EmailJS once at app startup
emailjs.init('uzots8qivXHxGCKRb')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)