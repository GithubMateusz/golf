import {Game} from './game.js';


window.onload = main;

export function main() {
    createjs.MotionGuidePlugin.install();
    const canvas = document.querySelector('canvas');
    canvas.width = document.documentElement.clientWidth * 0.8;
    canvas.height = canvas.width * 0.5;

    const stage = new createjs.Stage(canvas);
    stage.width = canvas.width;
    stage.height = canvas.height;

    const game = new Game(stage);
    game.startGame();
}
