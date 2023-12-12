import BaseShape from './shapeBase';

export default class Circle extends BaseShape {
    private shapeRadius: number;
    private area: number;

    constructor(...args: any[]) {
        super(...args);
        this.name = 'circle';
        this.shapeRadius = 32;
        this.area = Math.floor(Math.PI * this.shapeRadius * this.shapeRadius);
    }

    draw(): this {
        this.beginFill(this.getRandomColor());
        this.drawCircle(0, 0, this.shapeRadius);
        this.endFill();
        return this;
    }

    getArea(): number {
        return this.area;
    }
}