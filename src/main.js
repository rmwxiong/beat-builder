import './style.styl';

import React from 'react';
import ReactDOM from 'react-dom';
import MainStage from './components/main-stage';

(function() {
  ReactDOM.render(
    <MainStage />,
    document.getElementById('main-container')
  );

  // require('./timbre-test.js')();
  // require('./beet-test.js')();

  createjs.Ticker.setFPS(60);
  // createjs.Ticker.setPaused(true);
  createjs.Ticker.addEventListener('tick', tick);

  function tick() {
    if (createjs.Ticker.getPaused()) return;
  }
})();
