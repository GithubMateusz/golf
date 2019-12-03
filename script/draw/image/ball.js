import {StageObject} from './stage_object/stage_object.js';

export class Ball extends StageObject {

    constructor(stage) {
        super(stage);

        this._ball = new createjs.Bitmap();
        this._ball.name = 'ball';
    }

    getBall() {
        return this._ball;
    }

    setCoordinates() {
        let ground = this._stage.getChildByName('grass');

        this._x = this._stage_width / 4;
        this._y = ground.y - this._height + 5;

        this._ball.x = this._x;
        this._ball.y = this._y;
    }

    _setSize() {
        this._ball.scale = this._stage_width * 0.0006;

        this._width = this._ball.image.width * this._ball.scale;
        this._height = this._ball.image.height * this._ball.scale;
    }

    draw(ball) {
        this._ball.image = ball;
        this._setSize();
        this.setCoordinates();

        this._stage.addChild(this._ball);
        this._stage.update();
    }


}
