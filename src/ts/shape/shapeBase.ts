import { Graphics } from 'pixi.js';
import actions from '../config/actions';
import setting from '../config/default_settings';

class Counter {
    id: number;

    constructor() {
        this.id = 0;
    }

    increase(): void {
        this.id++;
    }
}

const count = new Counter();

export interface ShapeOptions {
    tickCount: number;
    appData: {
        width: number;
        height: number;
    };
    x: number;
    y: number;
}

// BASE CLASS FOR ALL SHAPES
export default class BaseShape extends Graphics {
    tickCount: number | null;
    appData: undefined | { width: number; height: number } | null;
    isDelete: boolean;
    isDropped: boolean;
    id: number;

    constructor(...args: any[]) {
        super(...args);
        this.tickCount = null;
        this.appData = null;
        this.isDelete = false;
        this.isDropped = false;
        this.eventMode = 'dynamic';
        this.id = count.id;
    }

    // INITIALIZES SHAPE WITH GIVEN OPTIONS
    init(options: ShapeOptions): this {
        count.increase();
        this.tickCount = options && options.tickCount ? options.tickCount : 0;
        this.appData = (options && options.appData) || setting.app;
        this.isDropped = false;

        // SETS RANDOM X POSITION
        let { width, height } = this.getBounds();
        if (options && options.x) {
            this.x = this.calcPointedWidth(options.x);
        } else {
            if (this.appData) {
                this.x = Math.floor(Math.random() * (this.appData.width - width));
            }
        }
        if (options && options.y) {
            this.y = options.y;
        } else {
            this.y = -height;
        }

        return this;
    }

    // METHOD FOR UPDATING SHAPE'S POSITION BASED ON TICK COUNT
    play(): void {
        if (this.tickCount !== null) {
            this.tickCount += 1;
            this.y += setting.gravity;
            this.checkIfDropped(this);
        }
    }

    // CHECKS IF SHAPE HAS DROPPED OUT OF THE VIEWPORT
    checkIfDropped(shape: BaseShape): void {
        if (this.appData && shape.y > this.appData.height + this.getBounds().height) {
            this.isDropped = true;
            actions.call('dropped', { shape: this });
        }
    }

    // REMOVES SHAPE
    delete(): number {
        if (this.appData) {
            this.y = this.appData.height + this.getBounds().height;
        }
        this.isDelete = true;
        return this.id;
    }

    // GENERATES A RANDOM HEX COLOR
    getRandomColor(): string {
        let hex = '0123456789ABCDEF';
        let color = '0x';
        for (let i = 0; i < 6; i++) {
            color += hex[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // CALCULATES X POSITION TO ENSURE SHAPE STAYS WITHIN BOUNDS
    calcPointedWidth(x: number): number {
        let width = this.getBounds().width;

        if (x < width / 2) {
            return Math.floor(width / 2);
        }
        if (x > (this.appData ? this.appData.width : 0) - width / 2) {
            return Math.floor((this.appData ? this.appData.width : 0) - width / 2);
        }
        return x;
    }
}