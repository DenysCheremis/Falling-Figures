import './css/style.css';
import app from './ts/app';

declare const module: NodeModule & { hot: { accept(callback: (err: Error) => void): void } };

// SELECTS THE APP CONTAINER AND UPDATES IT WITH THE APPLICATION VIEW
const appElement = document.querySelector('#app');
if (appElement) {
    // REMOVES EXISTING CANVAS IF PRESENT TO REPLACE WITH UPDATED VIEW
    const existingCanvas = appElement.getElementsByTagName('canvas').item(0);
    if (existingCanvas) {
        appElement.removeChild(existingCanvas);
    }
    // APPENDS PIXI APPLICATION VIEW TO THE DOM
    appElement.appendChild(app.view as any);
}

if (module.hot) {
    module.hot.accept((err: Error) => {
        if (err) {
            console.error('Cannot apply HMR update.', err);
        }
    });
}