import { Application } from 'pixi.js';
import setting from './config/default_settings';
import Controller from './controller/controller';
import View from './view/view';
import Model from './model/model';

interface AppSetting {
    width: number;
    height: number;
}

interface ISetting {
    app: AppSetting;
}

const appSetting: ISetting = setting as ISetting;

// SETUP APP WIDTH AND HEIGHT
appSetting.app = appSetting.app || {};
appSetting.app.width = Math.floor(0.95 * window.innerWidth);
appSetting.app.height = Math.floor(0.70 * window.innerHeight);

// INIT PIXI APPLICATION
const app = new Application({
    width: appSetting.app.width!,
    height: appSetting.app.height!,
    antialias: true,
    transparent: true,
    resolution: 1
} as any);

// INIT VIEW CONTROLLER
const view = new View();
const model = new Model();

// INIT APP CONTROLLER
const controller = new Controller(app, view, model);
controller.startAction();

export default app;