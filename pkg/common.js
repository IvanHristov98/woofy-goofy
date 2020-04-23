const HYENA_SOUND_FILE = "https://hyenabucket.s3.amazonaws.com/hyena.mp3";
const BUFFER_SIZE = 4096;

function getAudioContext() {
    let AudioContext = window.AudioContext || window.webkitAudioContext;
    return new AudioContext();
}

function getAudioFromFile(soundFile) {
    var audio = new Audio();
    audio.src = soundFile;
    audio.crossOrigin = "anonymous";
    document.body.appendChild(audio);

    return audio;
}

function playFilter(soundFile, effectProvisioner) {
    let context = getAudioContext();
    let effect = effectProvisioner(context);
    let audio = getAudioFromFile(soundFile);
    let source = context.createMediaElementSource(audio);

    source.connect(effect);
    effect.connect(context.destination);
    
    audio.play();
}

function playHyena() {
    let audio = getAudioFromFile(HYENA_SOUND_FILE);
    audio.play();
}

function generateStereoNoise(context) {
    let noiseBuffer = context.createBuffer(2, 0.5 * context.sampleRate, context.sampleRate);

    let left = noiseBuffer.getChannelData(0);
    let right = noiseBuffer.getChannelData(1);

    for (let i = 0; i < noiseBuffer.length; i++) {
        left[i] = Math.random() * 2 - 1;
        right[i] = Math.random() * 2 - 1;
    }

    return noiseBuffer;
}