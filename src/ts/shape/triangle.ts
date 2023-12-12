import BaseShape from './shapeBase'

export default class Triangle extends BaseShape {

    private shapeWidth: number;
    private shapeHeight: number;
    private area: number;

    constructor(...arg: any[]) {
        super(...arg)
        this.name = 'triangle'
        this.shapeWidth = 64
        this.shapeHeight = 32
        this.area =  Math.floor((this.shapeWidth * this.shapeHeight) / 2);
    }

    draw(): this {
        this.beginFill(this.getRandomColor())
        this.drawPolygon([
            -this.shapeHeight, this.shapeWidth,
            this.shapeHeight, this.shapeWidth,
            0, 0
        ])
        this.endFill()
        return this
    }

    getArea(): number {
        return this.area
    }
}