function getPinkingEffect(audioCtx) {
    let bufferSize = 4096;
    
    let b0, b1, b2, b3, b4, b5, b6;
    b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
    
    let node = audioCtx.createScriptProcessor(bufferSize, 1, 1);

    node.onaudioprocess = function(e) {
        let input = e.inputBuffer.getChannelData(0);
        let output = e.outputBuffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            b0 = 0.99886 * b0 + input[i] * 0.0555179;
            b1 = 0.99332 * b1 + input[i] * 0.0750759;
            b2 = 0.96900 * b2 + input[i] * 0.1538520;
            b3 = 0.86650 * b3 + input[i] * 0.3104856;
            b4 = 0.55000 * b4 + input[i] * 0.5329522;
            b5 = -0.7616 * b5 - input[i] * 0.0168980;
            output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + input[i] * 0.5362;
            output[i] *= 0.11;
            b6 = input[i] * 0.115926;
        }
    }

    return node;
}

function startPinking() {
    console.log("Starting pinking...");

    let audioCtx = getAudioContext();
    let pinkingEffect = getPinkingEffect(audioCtx);

    var src = audioCtx.createOscillator();
    src.frequency.value = 400;

    src.connect(pinkingEffect);
    pinkingEffect.connect(audioCtx.destination);
    src.start();
}