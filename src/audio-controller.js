class AudioController {
  constructor(tempo, beats) {
    this.onBeat = this.onBeat.bind(this);

    this.context = new AudioContext();
    this.tempo = tempo || 120;
    this.beatsPerBar = beats || 4;
    this.beet = new Beet({
      context: this.context,
      tempo: this.tempo
    });
    let basePattern = this.beet.pattern(this.beatsPerBar, this.beatsPerBar);
    let baseLayer = this.beet.layer(basePattern, this.beetCallback);
    this.beet.add(baseLayer);
    this.beet.start();

    document.addEventListener('beat', this.onBeat);
  }

  onBeat(event) {
    let detail = event.detail;
    var osc = this.context.createOscillator();
    osc.connect(this.context.destination);
    if (detail.step === 1) {
      osc.frequency.value = 440.0;
    } else {
      osc.frequency.value = 220.0;
    }

    osc.start(detail.time);
    osc.stop(detail.time + 0.1);
  }

  beetCallback(time, step, timeFromScheduled) {
    let eventDetail = {detail: {
      time,
      step,
      timeFromScheduled
    }};
    let beatEvent = new CustomEvent('beat', eventDetail);
    document.dispatchEvent(beatEvent);
  }

  get measureDuration() {
    return this.beatsPerBar / (this.tempo / 60);
  }

  load(path, success, failure) {
    var request = new XMLHttpRequest();
    request.open('GET', path, true);
    request.responseType = 'arraybuffer';
    request.onload = () => {
      this.context.decodeAudioData(request.response, success, failure);
    };
    request.onerror = failure;
    request.send();
  }
}

let instance;

function getInstance() {
  if (!instance) {
    instance = new AudioController();
  }
  return instance;
}

export default getInstance();
