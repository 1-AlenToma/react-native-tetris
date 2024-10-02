import Scores from "../db/Scores";
export default class Missions {
  gameMode = "Random"; // Random or Endless
  constructor(mode) {
    this.gameMode = mode;
    this.currentScore = new Scores();
    this.missionTotalScoreToComplete = undefined;
    this.running = this.completed = false;
  }

  currentScore;
  speed = 20; // how many times faster than real time
  running = false;
  realStartTime;
  timeout;
  missionTotalScoreToComplete;
  completed = false;
  start() {
    this.running = true;
    if (this.realStartTime === undefined)
      this.realStartTime = new Date();
    this.currentScore.time = this.currentScore.time + (Date.now() - this.realStartTime) * this.speed;

    if (this.running)
      this.timeout = setTimeout(()=> this.start(), 50);
  }

  timeString() {
    let gameTime = this.currentScore.time;
    let sec = Math.floor(gameTime / 1000) % 60;
    let min = Math.floor(gameTime / 60000) % 60;
    let hour = Math.floor(gameTime / 3600000) % 24;
    // output in hh:mm:ss format:
    return `${hour}:${min}:${sec}`.replace(/\b\d\b/g, "0$&");
  }

  pause() {
    this.running = false;
    this.realStartTime = undefined;
    clearTimeout(this.timeout);
    return this;
  }

  gameOver() {
    this.pause();
    globalState.dbContext.settings.addScore(this.currentScore);
  }

  line(clearedLinesNr) {
    this.currentScore.lines += clearedLinesNr;
    return this;
  }

  score(scoreNr) {
    this.currentScore.score += scoreNr;
    if (this.missionTotalScoreToComplete !== undefined && this.gameMode == "Random" && this.missionTotalScoreToComplete <= this.currentScore.score) {
      this.completed = true;
      globalState.dbContext.settings.currentLevel++;
      this.gameOver();
    }
  }
}