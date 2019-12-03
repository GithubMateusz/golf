import {BallAnimation} from './image/ball_animation.js';
import {DotsAnimation} from './image/dots_animation.js';


export class GameAnimation
{
    constructor(stage, images, status)
    {
        this._stage = stage;
        this._images = images;
        this._status = status;

        this._ball_animation = new BallAnimation(this._stage, this._images.ball, this._images.hole, this._status);
        this._dots_animation = new DotsAnimation(this._stage, this._images.dots, this._status);
    }

    startAnimation()
    {
        this._dots_animation.startAnimationDots();
        this._status.change('start_animation');
        this._stage.stage.on('tick', this._animationLoop.bind(this));
    }

    _animationLoop(event)
    {
        if (this._status.check('end_animation'))
        {
            this._ballAnimation();
        }

        if(this._status.check('wait') && this._ball_animation.checkPosition())
        {
            this._ball_animation.goToHole();

        }
    }

    _ballAnimation()
    {
        this._status.change('wait');
        let  value = this._dots_animation.getPathAndTime();
        this._ball_animation.startAnimation(value.path, value.time);
        console.log(value.time);
    }


    restartAnimation()
    {
        this._dots_animation.restart();
    }

}