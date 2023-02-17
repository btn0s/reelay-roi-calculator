import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const ROOT_ID = 'calculator-root';

ReactDOM.createRoot(document.getElementById(ROOT_ID) as HTMLElement).render(
    <React.StrictMode>
            <App/>
    </React.StrictMode>,
)
