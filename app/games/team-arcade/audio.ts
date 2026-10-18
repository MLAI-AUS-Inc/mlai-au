import type { CombatEvent } from "./core/combat";

/** Small synthesised arcade cues: no audio download or third-party request. */
export class ArcadeAudio {
  private context: AudioContext | null = null;
  private gain: GainNode | null = null;
  private volume = 0.3;
  async unlock() {
    if (!this.context) {
      this.context = new AudioContext();
      this.gain = this.context.createGain();
      this.gain.connect(this.context.destination);
      this.gain.gain.value = this.volume;
    }
    if (this.context.state === "suspended") await this.context.resume();
  }
  setVolume(volume: number) {
    this.volume = volume;
    if (this.gain) this.gain.gain.value = volume;
  }
  cue(event: CombatEvent) {
    const context = this.context,
      gain = this.gain;
    if (!context || !gain || context.state !== "running") return;
    const oscillator = context.createOscillator(),
      envelope = context.createGain();
    const time = context.currentTime;
    const frequency = {
      hit: 150,
      block: 600,
      special: 320,
      round: 440,
      fight: 880,
    }[event.type];
    oscillator.type = event.type === "block" ? "triangle" : "square";
    oscillator.frequency.setValueAtTime(frequency, time);
    oscillator.frequency.exponentialRampToValueAtTime(
      event.type === "special" ? 1000 : frequency * 0.35,
      time + 0.12,
    );
    envelope.gain.setValueAtTime(0.18, time);
    envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.16);
    oscillator.connect(envelope);
    envelope.connect(gain);
    oscillator.start();
    oscillator.stop(time + 0.17);
    oscillator.onended = () => {
      oscillator.disconnect();
      envelope.disconnect();
    };
  }
  suspend() {
    void this.context?.suspend().catch(() => {});
  }
  destroy() {
    void this.context?.close().catch(() => {});
    this.context = null;
    this.gain = null;
  }
}
