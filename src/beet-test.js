import audioController from './audio-controller';
import WebAudio from './web-audio';

import clap from 'file!./sfx/clap-808.wav';
import kick from 'file!./sfx/kick-big.wav';

export default function() {
  let clapThing = new WebAudio(clap);

  var sound2 = new Howl({
    urls: [kick]
  });

  // initialize beet
  var beet = new Beet({
    context: audioController.context,
    tempo: 140
  });

  let clapBuffer;
  let kickBuffer;
  audioController.load(clap, function(buffer) {
    console.log(buffer);
    clapBuffer = buffer;
  });

  audioController.load(kick, function(buffer) {
    console.log(buffer);
    kickBuffer = buffer;
  });

  // var ntof = beet.utils.ntof;

  // create a euclidean pattern - 5 pulses distrubted in 7 steps
  var pattern = beet.pattern(2, 2);
  var pattern2 = beet.pattern(3, 3);

  // create a beet layer - pass it the pattern and a callback
  var layer = beet.layer(pattern, callback);
  var layer2 = beet.layer(pattern2, callback2);
  function callback(time, step, timeFromScheduled) {
    // var osc = context.createOscillator();
    // var gain = context.createGain();
    // osc.type = 'square';
    // if (step === 2) {
    //   osc.type = 'sawtooth';
    // }
    // osc.frequency.value = ntof('d3');
    // osc.connect(gain);
    // gain.connect(context.destination);

    // beet.utils.envelope(gain.gain, time, {
    //   start: 0,
    //   peake: 0.5,
    //   attack: 0.2,
    //   decay: 0.2,
    //   sustain: 0.8,
    //   release: 0.2
    // });

    // osc.start(time);
    // osc.stop(time + 0.2);
    console.log('cb1', timeFromScheduled, time);
    // sound.play();

    clapThing.play(time);

    // setTimeout(() => sound.play(), timeFromScheduled * 1000);
  }

  function callback2(time, step, timeFromScheduled) {
    console.log('cb2', timeFromScheduled, time);
    let bufferSource = audioController.context.createBufferSource();
    bufferSource.buffer = kickBuffer;
    bufferSource.connect(audioController.context.destination);
    bufferSource.start(time);

    // setTimeout(() => sound2.play(), timeFromScheduled * 1000);
  }

  // add the layer
  beet.add(layer);
  beet.add(layer2);

  // start the sequencer
  sound2.on('load', () => {
    beet.start();
  });
}
