function getAudioContext() {
    let AudioContext = window.AudioContext || window.webkitAudioContext;
    return new AudioContext();
}