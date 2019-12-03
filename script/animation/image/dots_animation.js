export class DotsAnimation
{
    constructor(stage, dots, status)
    {
        this._stage = stage;
        this._path_dots = dots;
        this._status = status;

        this._pressed = false;
        this._no_click = true;
        this._path = null;

        this._time = 1800;
    }

    startAnimationDots()
    {
        this._animation = createjs.Ticker.on('tick', this._tick.bind(this));
        this._mousedown = this._stage.stage.on('mousedown', this._handlePress.bind(this));
        this._pressup = this._stage.stage.on('pressup', this._handleRelease.bind(this));
    }

    _handlePress(event)
    {
        if (this._no_click)
        {
            this._pressed = true;
        }
    }

    _handleRelease(event)
    {
        this._pressed = false;
        if (this._no_click)
        {
            return;
        }
        this._stage.stage.off('pressup', this._pressup);
        this._stage.stage.off('mousedown', this._mousedown);
        this._path = this._path_dots.getPathOFBall();
        createjs.Ticker.off('tick', this._animation);
        this._status.change('end_animation');
    }

    _tick(event)
    {
        if(this._pressed)
        {
            if(this._path_dots.checkPosition())
            {
                this._pressed = false;
                this._handleRelease(event);

            }
            this._path_dots.draw();
            this._time += 30;
            this._path_dots.clean();
            this._no_click = false;
        }
    }

    getPathAndTime()
    {
        if(this._path)
        {
            return {
                path: this._path,
                time: this._time
            };
        }
    }

    restart()
    {
        this._pressed = false;
        this._no_click = true;
        this._path = null;

        this._path_dots.setCoordinates();
        this._path_dots.setPoints();
        this._time = 2000;
    }

}