class PCMWorkletProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
  }

  process(inputs) {
    const input = inputs[0];
    if (input.length > 0) {
      const samples = input[0];
      const int16 = new Int16Array(samples.length);
      for (let i = 0; i < samples.length; i++) {
        int16[i] = Math.max(-1, Math.min(1, samples[i])) * 0x7fff;
      }
      // Send PCM data to main thread
      this.port.postMessage(int16.buffer, [int16.buffer]);
    }
    return true;
  }
}

registerProcessor('pcm-worklet-processor', PCMWorkletProcessor);
