import {
  Audio
} from 'expo-av';
class AudioEffects {
  createdAudio = undefined;
  playing = false;
  trackAudio = undefined;
  bind = false;
  async play(file, volume) {

    if (this.createdAudio) {
      try{
      await this.createdAudio.sound.unloadAsync();
      }catch{}
    }
    const audio = await Audio.Sound.createAsync(file, {
      shouldPlay: true, volume:volume ?? .2
    });
    this.createdAudio = audio;

    //else alert(JSON.stringify(this.createdAudio[file].status))
    //await this.createdAudio[file].unloadAsync(file);
    //await this.createdAudio[file].loadAsync();
    // await this.createdAudio[file].sound.playAsync();
    // await this.createdAudio[file].sound?.unloadAsync();
  }

  async clear() {
    let file = require("../assets/sound/effects/clear.wav");
    this.play(file);
  }

  async success() {
    let file = require("../assets/sound/effects/success.wav");
    this.play(file);
  }

  async gameOver() {
    let file = require("../assets/sound/effects/gameOver.wav");
    this.play(file,1);
  }

  async stopAll() {
    try {
      // await this.trackAudio?.stopAsync?.();

      await this.trackAudio?.unloadAsync();
    }catch {}
  }

  async gameTrack() {
    try {
      await this.stopAll();
      if (!this.bind)
        return;
      let tracks = [
        require("../assets/sound/cossack-dance-edm-russian-tetris-electronika.mp3"),
        require("../assets/sound/high-voltage-background-action.mp3"),
        require("../assets/sound/machiavellian-nightmare-electronic-dystopia-ai-robot.mp3"),
        require("../assets/sound/tetris-theme.mp3"),
        require("../assets/sound/Tetris.mp3")
      ];
      let file = 0;
      while ((file = tracks[Math.ceil(Math.random() * tracks.length)]) === undefined) {
        await sleep(10)
      }
      const {
        sound
      } = await Audio.Sound.createAsync(file, {
          shouldPlay: true,
          progressUpdateIntervalMillis: 100
        });

      const statusCheck = async ()=> {
        let status = await sound.getStatusAsync();
        if (!status.isPlaying && this.bind) {
          console.info("track finished")
          this.gameTrack();
          return;
        }
        if (this.bind)
          setTimeout(()=>statusCheck(), 100)
      }
      
      this.trackAudio = sound;
      statusCheck();
    }catch(e) {
      console.error(e)
    }
  }
}

const gameEffects = new AudioEffects();
export default gameEffects;