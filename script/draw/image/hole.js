import {StageObject} from './stage_object/stage_object.js';

export class Hole extends StageObject {

    constructor(stage)
    {
        super(stage);

        this._hole = new createjs.Bitmap();
        this._flag_stick = new createjs.Bitmap();
        this._flag = new createjs.Bitmap();
    }

    getNewCoordinates()
    {
        let ground = this._stage.getChildByName('grass');
        this._x = Math.random() * (this._stage_width - this._width - this._stage_width * 0.5) + this._stage_width * 0.5;
        this._y = ground.y;
    }

    setCoordinates()
    {
        this.getNewCoordinates();

        this._hole.x = this._x;
        this._hole.y = this._y;
        this._flag_stick.x = this._x + ((this._width - this._flag_stick.image.width) / 2)
            + (this._flag_stick.image.width / 4);
        this._flag_stick.y = this._y - this._flag_stick.image.height * this._flag_stick.scale;

        this._flag.x = this._flag_stick.x;
        this._flag.y = this._flag_stick.y;
    }

    _setSize()
    {
        this._hole.scale = this._stage_width * 0.0006;
        this._flag_stick.scale = this._stage_width * 0.0006;
        this._flag.scale = this._stage_width * 0.0006;

        this._width = this._hole.image.width * this._hole.scale;
        this._height = this._hole.image.height * this._hole.scale;
    }

    draw(hole, flag_stick, flag)
    {
        this._hole.image = hole;
        this._flag_stick.image = flag_stick;
        this._flag.image = flag;

        this._setSize();
        this.setCoordinates();

        this._hole.x = this._x;
        this._hole.y = this._y;
        this._hole.name = 'hole';

        this._stage.addChild(this._hole, this._flag_stick, this._flag);
        this._stage.update();
    }
}