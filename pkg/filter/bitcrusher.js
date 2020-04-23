function getBitcrusherEffect(audioCtx) {
    let node = audioCtx.createScriptProcessor(BUFFER_SIZE, 1, 1);
    node.bits = 4; // between 1 and 16
    node.normfreq = 0.1; // between 0.0 and 1.0

    let step = Math.pow(1/2, node.bits);
    let phaser = 0;
    let last = 0;

    node.onaudioprocess = function(e) {
        let input = e.inputBuffer.getChannelData(0);
        let output = e.outputBuffer.getChannelData(0);

        for (let i = 0; i < BUFFER_SIZE; i++) {
            phaser += node.normfreq;

            if (phaser >= 1.0) {
                phaser -= 1.0;
                last = step * Math.floor(input[i] / step + 0.5);
            }

            output[i] = last;
        }
    };

    return node; 
}

function startBitcrusher() {
    playFilter(HYENA_SOUND_FILE, getBitcrusherEffect);
}