import BaseShape from './shapeBase'

export default class Rectangle extends BaseShape {
    private shapeWidth: number;
    private shapeHeight: number;
    private area: number;

    constructor(...arg: any[]) {
        super(...arg)
        this.name = 'rectangle';
        this.shapeWidth = 64
        this.shapeHeight = 64
        this.area = this.shapeWidth * this.shapeHeight;
    }

    draw(): this {
        this.beginFill(this.getRandomColor());
        this.drawRect(0, 0, this.shapeWidth, this.shapeHeight);
        this.endFill();
        return this;
    }

    getArea(): number {
        return this.area;
    }
}