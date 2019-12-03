/* klasa bazowa do rysowania obiektów na canvasie */
export class StageObject
{
    constructor(stage)
    {
        this._stage = stage;
        this._stage_width = stage.width;
        this._stage_height = stage.height;

        this._x = 0;
        this._y = 0;

        this._height = 0;
        this._width = 0;
    }

    getX()
    {
        return this._x;
    }
    getY()
    {
        return this._y;
    }

    getHeight()
    {
        return this._height;
    }

    getWidth()
    {
        return this._width;
    }
}