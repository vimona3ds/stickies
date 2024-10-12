
// from https://stackoverflow.com/questions/25654558/html5-js-play-same-sound-multiple-times-at-the-same-time
window.AudioContext = window.AudioContext || (window as any).webkitAudioContext;

const context = new AudioContext();

export class Sound {
  url: string;
  buffer: AudioBuffer | null;
  sources: AudioBufferSourceNode[];
  loop: boolean;

  constructor(url: string, loop: boolean = false) {
    this.url = url;
    this.buffer = null;
    this.sources = [];
    this.loop = loop;
  }

  load() {
    if (this.buffer) return Promise.resolve(this.buffer);

    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();

      request.open('GET', this.url, true);
      request.responseType = 'arraybuffer';

      // Decode asynchronously:

      request.onload = () => {
        context.decodeAudioData(request.response, (buffer) => {
          if (!buffer) {
            console.log(`Sound decoding error: ${this.url}`);

            reject(new Error(`Sound decoding error: ${this.url}`));

            return;
          }

          this.buffer = buffer;

          resolve(buffer);
        });
      };

      request.onerror = (err) => {
        console.log('Sound XMLHttpRequest error:', err);

        reject(err);
      };

      request.send();
    });
  }

  play(volume: number = 1, time: number = 0) {
    if (!this.buffer) {
      return;
    }

    // Create a new sound source and assign it the loaded sound's buffer:

    const source = context.createBufferSource();

    source.buffer = this.buffer;

    source.loop = this.loop;

    // Keep track of all sources created, and stop tracking them once they finish playing:

    const insertedAt = this.sources.push(source) - 1;

    source.onended = () => {
      // source.stop(0);

      // this.sources.splice(insertedAt, 1);
    };

    // Create a gain node with the desired volume:

    const gainNode = context.createGain();

    gainNode.gain.value = volume;

    // Connect nodes:

    source.connect(gainNode).connect(context.destination);

    // Start playing at the desired time:

    source.start(time);
  }

  stop() {
    // Stop any sources still playing:

    this.sources.forEach((source) => {
      source.stop(0);
    });

    this.sources = [];
  }

}

export const sounds = {
  countdown: new Sound("./sounds/countdown.mp3"),
  start: new Sound("./sounds/start.mp3"),
  click: new Sound("./sounds/click.mp3"),
  complete: new Sound("./sounds/complete.mp3"),
  incorrect: new Sound("./sounds/incorrect.mp3"),
  playing: new Sound("./sounds/playing.mp3", true)
} as const

export async function loadAllSounds() {
  await Promise.all(Object.values(sounds).map(sound => sound.load()));
}