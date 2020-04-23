function startConvolvingEffect() {
    let context = getAudioContext();

    let audio = getAudioFromFile(HYENA_SOUND_FILE);
    let source = context.createMediaElementSource(audio);

    let noiseBuffer = generateStereoNoise(context);

    let convolver = context.createConvolver();
    convolver.buffer = noiseBuffer;    

    source.connect(convolver);
    convolver.connect(context.destination);
    
    audio.play();
}