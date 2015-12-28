class AudioController {
  constructor() {
    this.context = new AudioContext();
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
