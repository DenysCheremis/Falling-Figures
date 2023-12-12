import setting from '../config/default_settings';
import actions from '../config/actions';
import { ActionConstants } from '../config/ActionConstants';

export interface IView {
    decreaseGravity(gravity: number): void;
    increaseGravity(gravity: number): void;
    elementCountChange(qnt: number): void;
    gameLoop(options: { shapesOnScreenQnt: number; area: number }): void;
}

// VIEW CLASS IMPLEMENTING THE USER INTERFACE
export default class View implements IView{
    constructor() {
        this.clickEvents();
        const gravityElement = document.querySelector('#gravity-value');
        if (gravityElement) {
            gravityElement.innerHTML = setting.gravity.toString();
        }
    }

    // SETS UP EVENT LISTENERS FOR UI ELEMENTS
    private clickEvents(): void {
        const gravityDecreaseButton: HTMLButtonElement | null = document.querySelector('#gravity-decrease');
        const gravityIncreaseButton: HTMLButtonElement | null = document.querySelector('#gravity-increase');
        const increaseElementsButton: HTMLButtonElement | null = document.querySelector('#increase-elements');
        const decreaseElementsButton: HTMLButtonElement | null = document.querySelector('#decrease-elements');

        // BINDING BUTTON CLICKS TO ACTIONS
        gravityDecreaseButton?.addEventListener('click', () => actions.call(ActionConstants.DECREASE_GRAVITY));
        gravityIncreaseButton?.addEventListener('click', () => actions.call(ActionConstants.INCREASE_GRAVITY));
        increaseElementsButton?.addEventListener('click', () => actions.call(ActionConstants.INCREASE_SHAPE));
        decreaseElementsButton?.addEventListener('click', () => actions.call(ActionConstants.DECREASE_SHAPE));
    }

    // DECREASE THE GRAVITY VALUE IN UI
    public decreaseGravity(gravity: number): void {
        const gravityElement = document.querySelector('#gravity-value');
        if (gravityElement) {
            gravityElement.innerHTML = gravity.toString();
        }
    }

    // INCREASE THE GRAVITY VALUE IN UI
    public increaseGravity(gravity: number): void {
        const gravityElement = document.querySelector('#gravity-value');
        if (gravityElement) {
            gravityElement.innerHTML = gravity.toString();
        }
    }

    // UPDATES ELEMENT COUNT DISPLAY IN THE UI
    public elementCountChange(qnt: number): void {
        const shapesPerSecElement = document.querySelector('#shapes-number-per-sec');
        if (shapesPerSecElement) {
            shapesPerSecElement.innerHTML = qnt.toString();
        }
    }

    // UPDATES SHAPES BASED ON THE CURRENT GAME STATE
    public updateShapes(activeShapes: any): void {
        for (const shape of activeShapes) {
            shape.play();
        }
    }

    // MAIN RENDERING LOOP FOR THE GAME, UPDATES UI COMPONENTS
    public gameLoop(options: { shapesOnScreenQnt: number; area: number; }): void {

        const shapesNumberElement = document.querySelector('#shapes-number');
        const surfaceAreaElement = document.querySelector('#surface-area');

        if (shapesNumberElement) {
            shapesNumberElement.innerHTML = options.shapesOnScreenQnt.toString();
        }

        if (surfaceAreaElement) {
            surfaceAreaElement.innerHTML = options.area.toString();
        }
    }
}