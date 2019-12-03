export class Dots
{
    constructor(stage)
    {
        this._stage = stage;

        this._path_dots = new createjs.Container();
        this._path_dots.name = 'path_dots';
        this._image_src = null;

        this._start_point = new createjs.Point();
        this._end_point = new createjs.Point();
        this._control_point = new createjs.Point();

        this._point_offset = null;
        this._speed = 10;
        this.position = 0.1;
        this._max_width = null;
    }

    setSpeed(change_speed)
    {
        this._speed += change_speed;
    }
    defaultSpeed()
    {
        this._speed = 10;
    }


    getQuadraticCurvePoint()
    {
        const invert_position = 1 - this.position;
        return {
            x: invert_position * invert_position * this._start_point.x + 2 * invert_position * this.position
                * this._control_point.x + this.position * this.position * this._end_point.x,
            y: invert_position * invert_position * this._start_point.y + 2 * invert_position * this.position
                * this._control_point.y + this.position * this.position * this._end_point.y
        };
    }

    drawNextPoint(img_dot)
    {
        let pt = this.getQuadraticCurvePoint();
        this.position = (this.position + 0.1) % 1.0;

        let dot = new createjs.Bitmap(img_dot);
        dot.x = pt.x - 1;
        dot.y = pt.y - 1;
        this._path_dots.addChild(dot);
    }

    addImageSrc(img_dot)
    {
        this._image_src = img_dot;
        this.setCoordinates();
    }

    draw()
    {
        this.setPoints();
        for (let point = 0; point < 10; point++)
        {
            this.drawNextPoint(this._image_src);
        }
        this._stage.addChild(this._path_dots);
        this._stage.update();
        this._point_offset += this._speed;
        this.position = 0.1 ;
    }

    setCoordinates()
    {
        let ball = this._stage.getChildByName('ball');
        this._start_point.x = ball.x;
        this._start_point.y = ball.y;
        this._max_width = this._stage.width - (ball.getBounds().width * ball.scale);
        this._point_offset = this._stage.width / 6;
    }

    setPoints()
    {
        this._end_point.x = this._start_point.x + this._point_offset;
        this._end_point.y = this._start_point.y;
        this._control_point.x = (this._start_point.x + this._end_point.x) / 2;
        this._control_point.y = this._start_point.y - this._point_offset;
    }

    _getPath()
    {
        return [
            this._start_point.x,
            this._start_point.y,
            this._control_point.x,
            this._control_point.y,
            this._end_point.x,
            this._end_point.y];
    }

    getPathOFBall() {
        return this._getPath().concat([
            this._end_point.x + (this._end_point.x - this._start_point.x) / 8,
            this._end_point.y + (this._control_point.y - this._start_point.y) / 8,
            this._end_point.x + (this._end_point.x - this._start_point.x) / 4,
            this._end_point.y,
            this._end_point.x + (this._end_point.x - this._start_point.x) / 3,
            this._end_point.y,
            this._end_point.x + (this._end_point.x - this._start_point.x) / 2,
            this._end_point.y]);
    }

    checkPosition()
    {
        return this._end_point.x >= this._max_width;
    }

    clean()
    {
        this._path_dots.removeAllChildren();
    }
}
