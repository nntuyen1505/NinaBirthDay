// Web Audio API Music Box Synthesizer & Audio Controller
// Pure JavaScript - Zero external dependencies, 100% reliable offline

class MusicBox {
    constructor() {
        this.ctx = null;
        this.isPlaying = false;
        this.currentNoteIndex = 0;
        this.timer = null;
        this.tempo = 110; // BPM
        this.customAudio = null;
        this.isCustomMode = false;

        // "Happy Birthday To You" melody in C Major / G Major
        // Note format: [midiNote, durationInBeats]
        // 60 = C4, 62 = D4, 64 = E4, 65 = F4, 67 = G4, 69 = A4, 71 = B4, 72 = C5
        this.happyBirthday = [
            [67, 0.75], [67, 0.25], [69, 1], [67, 1], [72, 1], [71, 2],
            [67, 0.75], [67, 0.25], [69, 1], [67, 1], [74, 1], [72, 2],
            [67, 0.75], [67, 0.25], [79, 1], [76, 1], [72, 1], [71, 1], [69, 1.5],
            [77, 0.75], [77, 0.25], [76, 1], [72, 1], [74, 1], [72, 2.5]
        ];

        // "Twinkle Twinkle Little Star" as secondary tune
        this.twinkle = [
            [72, 1], [72, 1], [79, 1], [79, 1], [81, 1], [81, 1], [79, 2],
            [77, 1], [77, 1], [76, 1], [76, 1], [74, 1], [74, 1], [72, 2],
            [79, 1], [79, 1], [77, 1], [77, 1], [76, 1], [76, 1], [74, 2],
            [79, 1], [79, 1], [77, 1], [77, 1], [76, 1], [76, 1], [74, 2],
            [72, 1], [72, 1], [79, 1], [79, 1], [81, 1], [81, 1], [79, 2],
            [77, 1], [77, 1], [76, 1], [76, 1], [74, 1], [74, 1], [72, 2]
        ];

        this.currentSong = this.happyBirthday;
        this.songName = "Happy Birthday (Hộp Nhạc Xinh)";
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioCtx();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    // Convert MIDI note number to frequency in Hz
    midiToFreq(midi) {
        return 440 * Math.pow(2, (midi - 69) / 12);
    }

    // Synthesize a gentle music box chime sound (sine + high harmonics with exponential decay)
    playChime(midiNote, duration = 1.2) {
        if (!this.ctx) this.init();

        const now = this.ctx.currentTime;
        const freq = this.midiToFreq(midiNote);

        // Primary fundamental bell tone
        const osc1 = this.ctx.createOscillator();
        const gain1 = this.ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(freq, now);

        gain1.gain.setValueAtTime(0, now);
        gain1.gain.linearRampToValueAtTime(0.35, now + 0.005);
        gain1.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc1.connect(gain1);
        gain1.connect(this.ctx.destination);
        osc1.start(now);
        osc1.stop(now + duration);

        // Subtle bell harmonic overtone (3x or 2.76x frequency)
        const osc2 = this.ctx.createOscillator();
        const gain2 = this.ctx.createGain();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(freq * 2.76, now);

        gain2.gain.setValueAtTime(0, now);
        gain2.gain.linearRampToValueAtTime(0.12, now + 0.004);
        gain2.gain.exponentialRampToValueAtTime(0.0001, now + (duration * 0.4));

        osc2.connect(gain2);
        gain2.connect(this.ctx.destination);
        osc2.start(now);
        osc2.stop(now + duration);

        // Cheerful shimmer sparkle for celebration
        const osc3 = this.ctx.createOscillator();
        const gain3 = this.ctx.createGain();
        osc3.type = 'sine';
        osc3.frequency.setValueAtTime(freq * 4, now);

        gain3.gain.setValueAtTime(0, now);
        gain3.gain.linearRampToValueAtTime(0.08, now + 0.002);
        gain3.gain.exponentialRampToValueAtTime(0.0001, now + (duration * 0.25));

        osc3.connect(gain3);
        gain3.connect(this.ctx.destination);
        osc3.start(now);
        osc3.stop(now + duration);
    }

    playMelodyStep() {
        if (!this.isPlaying) return;

        const noteInfo = this.currentSong[this.currentNoteIndex];
        const midi = noteInfo[0];
        const beats = noteInfo[1];
        const beatDuration = 60 / this.tempo;
        const noteDurationMs = beats * beatDuration * 1000;

        if (midi > 0) {
            this.playChime(midi, Math.max(1.2, beats * beatDuration * 1.5));
        }

        this.currentNoteIndex++;
        if (this.currentNoteIndex >= this.currentSong.length) {
            this.currentNoteIndex = 0; // loop melody
            // Brief pause before repeating
            this.timer = setTimeout(() => {
                this.playMelodyStep();
            }, 1200);
            return;
        }

        this.timer = setTimeout(() => {
            this.playMelodyStep();
        }, noteDurationMs);
    }

    start() {
        if (this.isCustomMode && this.customAudio) {
            this.customAudio.play().catch(e => console.log("Audio autoplay prevented", e));
            this.isPlaying = true;
            return;
        }

        this.init();
        if (this.isPlaying) return;

        this.isPlaying = true;
        this.playMelodyStep();
    }

    stop() {
        this.isPlaying = false;
        if (this.isCustomMode && this.customAudio) {
            this.customAudio.pause();
            return;
        }

        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

    loadCustomAudio(fileOrUrl, customTitle = "Nhạc Đã Chọn") {
        this.stop();
        if (this.customAudio) {
            this.customAudio.pause();
            this.customAudio = null;
        }
        if (typeof fileOrUrl === 'string') {
            this.customAudio = new Audio(fileOrUrl);
        } else if (fileOrUrl instanceof File || fileOrUrl instanceof Blob) {
            this.customAudio = new Audio(URL.createObjectURL(fileOrUrl));
        }
        if (this.customAudio) {
            this.customAudio.loop = true;
            this.isCustomMode = true;
            this.songName = customTitle;
            this.start();
        }
    }

    switchToMusicBox() {
        if (this.customAudio) {
            this.customAudio.pause();
        }
        this.isCustomMode = false;
        this.currentSong = this.happyBirthday;
        this.songName = "Happy Birthday (Hộp Nhạc Xinh)";
        this.currentNoteIndex = 0;
        this.start();
        return this.songName;
    }

    toggle() {
        if (this.isPlaying) {
            this.stop();
            return false;
        } else {
            this.start();
            return true;
        }
    }

    switchSong() {
        if (this.currentSong === this.happyBirthday) {
            this.currentSong = this.twinkle;
            this.songName = "Twinkle Twinkle (Ánh Sao Nhỏ)";
        } else {
            this.currentSong = this.happyBirthday;
            this.songName = "Happy Birthday (Hộp Nhạc Xinh)";
        }
        this.currentNoteIndex = 0;
        return this.songName;
    }

    // Play a cheerful celebration chime chord (e.g. when candle is blown)
    playCelebrationChord() {
        this.init();
        const chord = [72, 76, 79, 84]; // C major high sparkle
        chord.forEach((note, index) => {
            setTimeout(() => {
                this.playChime(note, 2.0);
            }, index * 90);
        });
    }
}

window.musicBox = new MusicBox();
