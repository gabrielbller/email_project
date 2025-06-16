import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/App';
import { initializeIcons } from '@fluentui/react';

/* global document, Office, module, require */

initializeIcons();

let isOfficeInitialized = false;

const render = (component: React.ReactElement) => {
    const container = document.getElementById('container');
    if (container) {
        const root = createRoot(container);
        root.render(component);
    }
};

/* Render application after Office initializes */
Office.onReady(() => {
    isOfficeInitialized = true;
    render(<App />);
});

if ((module as any).hot) {
    (module as any).hot.accept('./components/App', () => {
        const NextApp = require('./components/App').App;
        render(<NextApp />);
    });
} 