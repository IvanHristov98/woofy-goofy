function getLowPassEffect(audioCtx) {
    let lastOut = 0.0;
    let node = audioCtx.createScriptProcessor(BUFFER_SIZE, 1, 1);

    node.onaudioprocess = function(e) {
        let input = e.inputBuffer.getChannelData(0);
        let output = e.outputBuffer.getChannelData(0);

        for (let i = 0; i < BUFFER_SIZE; ++i) {
            output[i] = (input[i] + lastOut) / 2.0;
            lastOut = output[i];
        }
    }

    return node;
};


function startLowPass() {
    playFilter(HYENA_SOUND_FILE, getLowPassEffect);
}
