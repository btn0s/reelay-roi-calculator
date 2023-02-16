import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const appRoot = document.getElementById('root') as HTMLElement;

const mountApp = () => {
    ReactDOM.createRoot(appRoot).render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>,
    )
};

const waitForAppRoot = () => {
    if (appRoot) {
        mountApp();
    } else {
        setTimeout(waitForAppRoot, 100);
    }
};

if (!appRoot) {
    waitForAppRoot();
}