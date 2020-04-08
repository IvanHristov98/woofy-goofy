let bufferSize = 4096;

function getLowPassEffect(audioCtx) {
    let lastOut = 0.0;

    let node = audioCtx.createScriptProcessor(bufferSize, 1, 1);

    node.onaudioprocess = function(e) {
        let input = e.inputBuffer.getChannelData(0);
        let output = e.outputBuffer.getChannelData(0);

        for (let i = 0; i < bufferSize; ++i) {
            output[i] = (input[i] + lastOut) / 2.0;
            lastOut = output[i];
        }
    }

    return node;
};


function startLowPass() {
    console.log("Starting low pass...")

    let audioCtx = getAudioContext();
    let lowPassEffect = getLowPassEffect(audioCtx);

    let soundPlayer = new SoundPlayer(audioCtx, lowPassEffect);
    soundPlayer.play(400, 0.5, "sine").stop(1);

    lowPassEffect.connect(audioCtx.destination);

}
