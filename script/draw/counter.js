import {StageObject} from './image/stage_object/stage_object.js';

export class Counter extends StageObject{
    constructor(stage) {
        super(stage);
        this._counter = 0;
    }
    _setCoordinates() {
        this._x =  this._stage_width * 0.9;
        this._y = this._stage_height * 0.1;
    }

    set_counter() {
        this._counter += 1;
    }

    getCounter() {
        return this._counter;
    }

    reset_counter() {
        this._counter = 0;
    }

    draw() {
        this._setCoordinates();
        let text = new createjs.Text(this._counter, '30px Arial', 'white');
        text.x = this._x;
        text.y = this._y;
        text.name = 'counter';
        this._stage.addChild(text);
    }


}