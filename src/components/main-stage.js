import React from 'react';

export default class MainStage extends React.Component {
  componentDidMount() {
    let stage = new createjs.Stage('main-stage');
    var circle = new createjs.Shape();
    circle.graphics.beginFill('#369').drawCircle(0, 0, 50);
    circle.x = 100;
    circle.y = 100;
    stage.addChild(circle);

    console.log(circle);

    stage.update();
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
