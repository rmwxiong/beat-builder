import audioController from './audio-controller';
import WebAudio from './web-audio';

import kick from 'file!./sfx/kick-big.wav';
import hat from 'file!./sfx/hihat-plain.wav';
import snare from 'file!./sfx/snare-analog.wav';

export default function() {
  let waKick = new WebAudio(kick);
  let waSnare = new WebAudio(snare);
  let waHat = new WebAudio(hat);

  // initialize beet
  var beet = new Beet({
    context: audioController.context,
    tempo: 120
  });

  // create a beet layer - pass it the pattern and a callback
  var layer1 = beet.layer('10001000', waKick.play);
  var layer2 = beet.layer('00100010', waSnare.play);
  var layer3 = beet.layer('11111111', waHat.play);

  // add the layer
  beet.add(layer1);
  beet.add(layer2);
  beet.add(layer3);

  // start the sequencer
  beet.start();
}
