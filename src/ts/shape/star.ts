import '@pixi/graphics-extras';
import BaseShape from './shapeBase'

export default class Star extends BaseShape {
    private radius: number;
    private area: number;

    constructor(...args: any[]) {
        super(...args);
        this.name = 'star';
        this.radius = 50;
        this.area = Math.floor(2.5 * this.radius * this.radius * Math.sin(Math.PI / 5));
    }

    draw(): this {
        this.beginFill(this.getRandomColor());
        if (this.drawStar) {
            this.drawStar(0, 0, 5, this.radius, this.radius / 2);
        }
        this.endFill();
        return this;
    }

    getArea(): number {
        return this.area;
    }
}