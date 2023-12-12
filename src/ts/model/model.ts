import Shapes from '../shape/index';

interface ShapeOptions {
    x: number;
    y: number;
    tickCount?: number;
}

type ConstructorType = new (options?: ShapeOptions) => any;

export interface IModel {
    addShape(options: ShapeOptions, Constructor?: ConstructorType): any;
    getActiveShapes(): any[];
    deleteShapeFromMemory(shapeId: string): void;
    changeShapeColor(area: number): any[];
    shapesCountAndArea(): { shapesOnScreenQnt: number; area: number };
}

// MODEL CLASS IMPLEMENTING GAME LOGIC AND DATA MANAGEMENT
export default class Model implements IModel {
    private allShapes: ConstructorType[];
    private shapes: any[];

    constructor() {
        this.allShapes = Shapes;
        this.shapes = [];
    }

    // ADDS A NEW SHAPE
    public addShape(options?: ShapeOptions, Constructor?: ConstructorType): any {
        let primitiveType: any;
        if (!Constructor) {
            const Primitive = this._getRandomShape();
            primitiveType = new Primitive();
            primitiveType.draw().init(options);
            this.shapes.push(primitiveType);
        } else {
            primitiveType = new Constructor();
            primitiveType.draw().init(options);
            this.shapes.push(primitiveType);
        }
        return primitiveType;
    }

    // RETRIEVES ALL ACTIVE SHAPES
    public getActiveShapes(): any[] {
        return this.shapes.filter(shape => !shape.isDelete);
    }

    // REMOVES A SHAPE FROM GAME MEMORY
    public deleteShapeFromMemory(shapeId: string): void {
        this.shapes = this.shapes.filter(el => el.id !== shapeId);
    }

    // CHANGES THE COLOR OF SHAPES BASED ON THE SPECIFIED AREA
    public changeShapeColor(area: number): any[] {
        const newShapes: { constructor: ConstructorType; options: ShapeOptions }[] = [];
        this.shapes.forEach(el => {
            if (el.area === area) {
                const ShapeConst = this.allShapes.find(shape => shape.name === el.constructor.name);
                if (ShapeConst) {
                    const options: ShapeOptions = {
                        x: el.x,
                        y: el.y,
                        tickCount: el.tickCount
                    };
                    el.delete();
                    this.deleteShapeFromMemory(el.id);
                    newShapes.push({ constructor: ShapeConst, options: options });
                }
            }
        });
        return newShapes;
    }

    // SELECTS A RANDOM SHAPE FROM AVAILABLE SHAPES
    private _getRandomShape(): ConstructorType {
        return this.allShapes[Math.floor(Math.random() * this.allShapes.length)];
    }

    // CALCULATES TOTAL NUMBER AND AREA OF SHAPES ON SCREEN
    public shapesCountAndArea(): { shapesOnScreenQnt: number; area: number } {
        let count = 0, area = 0;
        for (const shape of this.shapes) {
            if (shape.isDelete || shape.isDropped) {
                continue;
            }
            count++;
            area += shape.getArea();
        }
        return { shapesOnScreenQnt: count, area: area };
    }
}