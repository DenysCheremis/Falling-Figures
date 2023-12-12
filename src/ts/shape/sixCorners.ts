import BaseShape from './shapeBase'

export default class SixCorners extends BaseShape {

    private area: number;

    constructor(...arg: any[]) {
        super(...arg)
        this.name = 'six corners'
        this.area = Math.floor(((3 * Math.sqrt(3)) * Math.pow(25, 2)) / 2)
    }

    draw(): this {
        this.beginFill(this.getRandomColor())
        this.drawPolygon([-25, 25, -50, 0, -25, -25, 0, -25, 25, 0, 0, 25, -25, 25])
        this.endFill()
        return this
    }

    getArea(): number {
        return this.area
    }
}