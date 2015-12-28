import audioController from './audio-controller';
import WebAudio from './web-audio';

import clap from 'file!./sfx/clap-808.wav';
import kick from 'file!./sfx/kick-big.wav';

export default function() {
  let clapThing = new WebAudio(clap);
  let waKick = new WebAudio(kick);

  // initialize beet
  var beet = new Beet({
    context: audioController.context,
    tempo: 140
  });

  // create a euclidean pattern - 5 pulses distrubted in 7 steps
  var pattern = beet.pattern(2, 2);
  var pattern2 = beet.pattern(3, 3);

  // create a beet layer - pass it the pattern and a callback
  var layer = beet.layer(pattern, clapThing.play);
  var layer2 = beet.layer(pattern2, waKick.play);

  // add the layer
  beet.add(layer);
  beet.add(layer2);

  // start the sequencer
  beet.start();
}
