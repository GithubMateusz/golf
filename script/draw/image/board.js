import {StageObject} from './stage_object/stage_object.js';


export class Board extends StageObject
{

    draw(background, ground, grass)
    {
        const background_shape = this.drawImage(
            'background',
            background,
            0,
            1);

        const ground_shape = this.drawImage(
            'ground',
            ground,
            this._stage_height - (this._stage_height * 0.075),
            0.075);

        const grass_shape = this.drawImage(
            'grass',
            grass,
            this._stage_height - (this._stage_height * 0.125 + this._stage_height * 0.075 - 1),
            0.125);

        this._stage.addChild(background_shape, ground_shape, grass_shape);
        this._stage.update();
    }

    drawImage(name, img, position_y, scaling_percentage) {
        let graphic_scale = new createjs.Matrix2D();
        graphic_scale.scale(
            this._stage_height / img.width * scaling_percentage,
            this._stage_height / img.height * scaling_percentage);

        let shape = new createjs.Shape();

        shape.graphics.clear()
            .beginBitmapFill(img, 'repeat-x', graphic_scale)
            .drawRect(0, 0, this._stage_width, this._stage_height);

        shape.y = position_y - (this._stage_height / img.height * scaling_percentage);
        shape.name = name;

        return shape;
    }
}
