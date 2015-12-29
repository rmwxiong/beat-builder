import React from 'react';

import AudioController from '../audio-controller';
import Moveable from '../moveable';

export default class MainStage extends React.Component {
  constructor() {
    super();
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    let stage = this.stage = new createjs.Stage('main-stage');
    console.log(stage);
    let sweeper = this.sweeper = new Moveable(stage, {
      width: 10,
      height: stage.canvas.height,
      dx: stage.canvas.width / AudioController.measureDuration,
      aabb: [0, 0, stage.canvas.width, stage.canvas.height]
    });
    sweeper.fillRect();

    createjs.Ticker.addEventListener('tick', this.tick);
    createjs.Ticker.addEventListener('tick', stage);
    document.addEventListener('beat', this.onBeat);
  }

  tick(event) {
    this.sweeper.move(event.delta);
    if (this.sweeper.x >= this.stage.canvas.width) {
      this.sweeper.x = 0;
    }
  }

  onBeat(event) {
    console.log(event);
  }

  render() {
    return (
    <canvas
      className="main-stage"
      height="600"
      id="main-stage"
      width="900"
    ></canvas>
    );
  }
}
