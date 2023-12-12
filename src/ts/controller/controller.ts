import { Graphics, Application } from 'pixi.js';
import setting from '../config/default_settings';
import actions from '../config/actions';
import { ActionConstants } from '../config/ActionConstants';
import Model from '../model/model';
import View from '../view/view';

interface ShapeOptions {
    x: number;
    y: number;
}

type ConstructorFunction = new (options?: ShapeOptions) => any;

// CONTROLLER CLASS FOR APPLICATION LOGIC
export default class Controller {
    private model!: Model;
    private view!: View;
    private app!: Application;
    private background: Graphics | null = null;
    private countShapesPerSecond: number = 1;
    private lastShapeCreationTime: number = 0;
    private shapeCreationInterval: number = 1000;

    constructor(app: Application, view: any, model: any) {
        this.model = model;
        this.view = view;
        this.app = app;
        this.init();
        this.actionsInit();
    }

    // INIT CANVAS BACKGROUND
    private init() {
        this.background = new Graphics();
        this.background.beginFill(0xFFFFFF);
        this.background.lineStyle(1, 0x000000);

        if (setting.app) {
            this.background.drawRect(0, 0, setting.app.width, setting.app.height);
        }

        this.background.endFill();
        this.background.eventMode = 'dynamic';

        this.app?.stage.addChild(this.background);
        
        this.background.on('pointerdown', this.onBackgroundClick.bind(this));
    }

    // INITIALIZES EVENT HANDLERS FOR VARIOUS ACTIONS
    private actionsInit(): void {
        actions.add( ActionConstants.DROPPED, this.shapeDropped.bind(this));
        actions.add( ActionConstants.INCREASE_SHAPE, this.increaseShape.bind(this));
        actions.add( ActionConstants.DECREASE_SHAPE, this.decreaseShape.bind(this));
        actions.add( ActionConstants.INCREASE_GRAVITY, this.increaseGravity.bind(this));
        actions.add( ActionConstants.DECREASE_GRAVITY, this.decreaseGravity.bind(this));
    }

    // STARTS THE MAIN GAME LOOP
    public startAction(): void {
        this.lastShapeCreationTime = performance.now();
        this.app?.ticker.add(() => this.gameLoop()); 
        this.view.elementCountChange(this.countShapesPerSecond);
    }

    // ADDS A NEW SHAPE TO THE SCENE
    public addPrimitive(options?: ShapeOptions, constructor?: ConstructorFunction): void {
        const newShape = this.model.addShape(options, constructor);
        this.app?.stage.addChild(newShape);
        newShape.on('pointerdown', this.onShapeClick.bind(this));
    }

    // HANDLES THE EVENT WHEN A SHAPE FALLS OFF THE SCENE, REMOVING IT FROM MEMORY
    private shapeDropped(options: { shape: any }): void {
        const shape = options.shape;
        this.model.deleteShapeFromMemory(shape.delete());
    }

    // INCREASES THE RATE OF SHAPE CREATION
    private increaseShape(options: ShapeOptions): void {
        this.countShapesPerSecond++
        this.addPrimitive(options);
        this.view.elementCountChange(this.countShapesPerSecond);
    }

    // DECREASES THE RATE OF SHAPE CREATION
    private decreaseShape(): void {
        if (this.countShapesPerSecond > 1) {
            this.countShapesPerSecond--;
        }
        this.view.elementCountChange(this.countShapesPerSecond);
    }

    // INCREASES GRAVITY
    private increaseGravity(): void {
        setting.gravity += setting.gravityStep;
        this.view.increaseGravity(setting.gravity);
    }

    // DECREASES GRAVITY
    private decreaseGravity(): void {
        if (setting.gravity > setting.gravityStep) {
            setting.gravity -= setting.gravityStep;
        }
        this.view.decreaseGravity(setting.gravity);
    }

    // HANDLES BACKGROUND CLICK EVENT
    private onBackgroundClick(event: any): void {
        this.addPrimitive({ x: event.data.global.x, y: event.data.global.y });
    }

    // HANDLES SHAPE CLICK EVENT
    private onShapeClick(event: any): void {
        this.model.deleteShapeFromMemory(event.currentTarget.delete());
        const newShapes = this.model.changeShapeColor(event.currentTarget.area);
        newShapes.map((el: { options: ShapeOptions, constructor: ConstructorFunction }) => this.addPrimitive(el.options, el.constructor));
        this.view.elementCountChange(this.countShapesPerSecond);
    }

    // MAIN GAME LOOP HANDLING LOGIC AND RENDERING
    private gameLoop(): void {
        const currentTime = performance.now();

        if (currentTime - this.lastShapeCreationTime > this.shapeCreationInterval) {
            for (let i = 0; i < this.countShapesPerSecond; i++) {
                this.addPrimitive();
            }
            this.lastShapeCreationTime = currentTime;
        }

        const activeShapes = this.model.getActiveShapes();
        const qntAndArea = this.model.shapesCountAndArea();
        this.view.updateShapes(activeShapes);
        this.view.gameLoop(qntAndArea);
    }
}