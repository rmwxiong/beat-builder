import audioController from './audio-controller';

export default class WebAudio {
  constructor(url) {
    this.src = url;
    this.load(url, buffer => {
      this.buffer = buffer;
    });
    this.context = audioController.context;
  }

  load(path, success, failure) {
    let request = new XMLHttpRequest();
    request.open('GET', path, true);
    request.responseType = 'arraybuffer';
    request.onload = () => {
      this.context.decodeAudioData(request.response, success, failure);
    };
    request.onerror = failure;
    request.send();
  }

  play(time) {
    time = time || null;
    if (this.buffer) {
      let bufferSource = this.context.createBufferSource();
      bufferSource.buffer = this.buffer;
      bufferSource.connect(audioController.context.destination);
      bufferSource.start(time);
    } else {
      console.warn('Attempting to play web audio with no loaded buffer');
    }
  }
}
