const ctx = new AudioContext();
const buffers = {};
const volumes = {};

async function load(name, url, volume = 1) {
  const res = await fetch(url);
  const arr = await res.arrayBuffer();
  buffers[name] = await ctx.decodeAudioData(arr);
  volumes[name] = volume;
}

export async function initSounds() {
  await Promise.all([
    load('startup', '/sounds/startup.mp3', 0.0),
    load('select', '/sounds/select.wav', 0.2),
  ]);
}

export function play(name) {
  const buf = buffers[name];
  if (!buf) return;

  const gain = ctx.createGain();
  gain.gain.value = volumes[name] ?? 1;
  gain.connect(ctx.destination);

  const source = ctx.createBufferSource();
  source.buffer = buf;
  source.connect(gain);
  source.start();
}
