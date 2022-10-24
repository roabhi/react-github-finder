import React from 'react'
import { createRoot } from 'react-dom'

import App from './App'
import './index.css'

const container = document.getElementById('root'),
  root = createRoot(container)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
