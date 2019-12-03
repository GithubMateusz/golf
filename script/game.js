import {DrawObject} from './draw/draw_object.js';
import {GameAnimation} from './animation/game_animation.js';
import {Status} from './status.js';


export class Game
{
    constructor(stage)
    {
        this._stage = stage;
        this._draw_object = new DrawObject(this._stage, this._counter);
        this._status = new Status();
        this._game_animation = new GameAnimation(this._stage, this._draw_object.getImages(), this._status);

        this._stage.stage.on('tick', this._gameLoop, this);

        createjs.Ticker.on('tick', this._stage);
    }

    startGame() {
        this._draw_object.draw();
        this._game_animation.startAnimation();
    }

    _gameLoop()
    {
        if(this._status.check('next_level'))
        {
            this._status.change('start_game');
            setTimeout(this._nextLevel.bind(this), 2000);
        }
        else if (this._status.check('game_over'))
        {
            this._status.change('start_game');
            this._gameOver();
        }
    }

    _restart()
    {
        this._stage.removeAllEventListeners();
        this._stage.stage.on('tick', this._gameLoop, this);
        this._draw_object.restart(false);
        this._game_animation.restartAnimation();
        this._game_animation.startAnimation();
    }

    _nextLevel()
    {
        this._draw_object.restart(true);
        this._game_animation.restartAnimation();
        this._game_animation.startAnimation();
    }

    _gameOver()
    {
        let game_over_text = new createjs.Text('Game Over', '30px Arial', 'white');
        game_over_text.x = (this._stage.width - game_over_text.getBounds().width) / 2;
        game_over_text.y = (this._stage.height - game_over_text.getBounds().height) / 2;
        game_over_text.name = 'game_over';
        this._stage.addChild(game_over_text);
        this._stage.update();
        this._stage.on('click', this._restart.bind(this));
    }
}