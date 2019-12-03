import {getManifest} from '../manifest.js';
import {Ball} from './image/ball.js';
import {Board} from './image/board.js';
import {Hole} from './image/hole.js';
import {Dots} from './image/dots.js';
import {Counter} from './counter.js';


export class DrawObject
{
    constructor(stage, counter)
    {
        this._stage = stage;
        this._queue = new createjs.LoadQueue(true);

        this._board = new Board(this._stage);
        this._ball = new Ball(this._stage);
        this._hole = new Hole(this._stage);
        this._dots = new Dots(this._stage);
        this._counter = new Counter(this._stage);
    }

    draw()
    {
        this._queue.on('complete', this._completeFileLoad, this);
        this._queue.loadManifest(getManifest());
    }

    _completeFileLoad(event)
    {
        const queue = event.target;
        this._board.draw(
            queue.getResult('background'),
            queue.getResult('ground'),
            queue.getResult('grass'));

        this._hole.draw(
            queue.getResult('hole'),
            queue.getResult('flag_stick'),
            queue.getResult('flag_anim01'));

        this._ball.draw(
            queue.getResult('ball'));

        this._dots.addImageSrc(
            queue.getResult('dot'));

        this._counter.draw();
    }

    getImages()
    {
        return {
            dots: this._dots,
            ball: this._ball,
            hole: this._hole,
        };
    }

    restart(next)
    {
        this._ball.setCoordinates();
        this._hole.setCoordinates();
        if(next)
        {
            this._counter.set_counter();
            this._dots.setSpeed(this._counter.getCounter())
        } else {
            this._counter.reset_counter();
            this._dots.defaultSpeed();
            this._stage.removeChild(this._stage.getChildByName('game_over'));
        }
        this._stage.removeChild(this._stage.getChildByName('counter'));
        this._stage.update();
        this._counter.draw();
    }




}

