import {
  Audio
} from 'expo-av';
import EventTracker from "./EventTracker"
import {
  useState
} from "react"
let timeout = undefined;
class AudioEffects extends EventTracker {
  createdAudio = undefined;
  playing = false;
  trackAudio = undefined;
  bind = false;
  disabled= false;
  async play(file, volume) {
    
    if (this.createdAudio) {
      try {
        await this.createdAudio.sound.unloadAsync();
      }catch {}
    }
    const audio = await Audio.Sound.createAsync(file, {
      shouldPlay: true, volume: volume ?? .2
    });
    this.createdAudio = audio;
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
    this.play(file, 1);
  }
  
  disable(){
    //clearTimeout(timeout)
    this.disabled = true;
    this.stopAll();
    
    return this;
  }
  
  enable(){
    this.disabled = false;
    return this;
  }

  async stopAll() {
    try {
      // await this.trackAudio?.stopAsync?.();
      
      await this.trackAudio?.sound?.unloadAsync();
    }catch {}
  }

  useAudioState() {
    let tracBackgrounds = [
      require("../assets/tetrisPlayBg.gif"),
      require("../assets/tetrisPlayBg_1.gif"),
      require("../assets/tetrisPlayBg_2.gif"),
      require("../assets/tetrisPlayBg_3.gif")
    ]
    const [state,
      setState] = useState( {
        bg: tracBackgrounds[randomBetween(0, tracBackgrounds.length -1)]
      });

    this.bindEvent("audioState", ()=> {
      let tracs = tracBackgrounds.filter(x=> x!== state);
      setState({
        ...state,
        bg: tracs[randomBetween(0, tracs.length -1)]
      });
    });

    return state;
  }

  async gameTrack() {
    try {
      
      if(this.disabled)
       return;
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
      this.trackAudio = await Audio.Sound.createAsync(file, {
          shouldPlay: true
        });

      const statusCheck = async ()=> {
        let status = await this.trackAudio.sound.getStatusAsync();
        if (!status.isPlaying && this.bind && !this.disabled) {
          this.getEvent("audioState")?.();
          this.gameTrack();
          return;
        }
        if (this.bind && !this.disabled)
          setTimeout(()=>statusCheck(), 100)
      }

    
      statusCheck();
    }catch(e) {
      console.error(e)
    }
  }
}

const gameEffects = new AudioEffects();
export default gameEffects;