export class BallAnimation
{
    constructor(stage, ball, hole, status)
    {
        this._stage = stage;
        this._ball = ball;
        this._hole = hole;
        this._status = status;
        this._animation = null;

    }

    startAnimation(path, time)
    {
        this._animation = createjs.Tween.get(this._ball.getBall()).to({guide: {path: path}}, time);
        setTimeout(function(){
            if(this._status.check('wait'))
                this._status.change('game_over')
        }.bind(this),time + time * 0.25);
    }

    goToHole()
    {
        this._status.change('next_level');
        let path_hole = this._pathGoToHole();
        createjs.Tween.get(this._ball.getBall()).pause(this._animation)
            .to({guide: {path: [this._ball.getBall().x, this._ball.getBall().y].concat(path_hole)}}, 100)
    }


    checkPosition()
    {
        return this._ball.getBall().x >= this._hole.getX() &&
            this._ball.getBall().y + this._ball.getHeight() + 5 >= this._hole.getY() &&
            this._ball.getBall().x + this._ball.getWidth() <= this._hole.getX() + this._hole.getWidth();
    }

    _pathGoToHole()
    {
        const x = this._ball.getBall().x - this._hole.getX();
        const hole_frame = this._hole.getWidth()*0.10;
        const path = [this._hole.getY(),
            this._hole.getX() + this._hole.getWidth() - this._ball.getWidth() - hole_frame,
            this._hole.getY() + this._hole.getHeight() - this._ball.getHeight() - hole_frame];

        if(hole_frame < x < this._hole.getWidth() - hole_frame)
        {
            return [this._hole.getX() + this._hole.getWidth() - this._ball.getWidth() - hole_frame].concat(path);
        } else if(hole_frame > x)
        {
            return [this._hole.getX() + hole_frame].concat(path);
        } else {
            return [this._hole.getX() + this._hole.getWidth() - hole_frame - this._ball.getWidth()].concat(path);
        }
    }

}
