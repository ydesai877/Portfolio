import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

// Each page's index.html sets data-page="about", "resume", "projects", "blogs" or "contact".
const root = document.getElementById('root')

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App page={root.dataset.page} />
  </React.StrictMode>
)
