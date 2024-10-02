import Repository from "./Repository";
import Scores from "./Scores";

export default class AppSettings extends Repository{
  scores = [];
  gamePad = false;
  currentLevel= 1;
  gameSpeed = 8;
  gameMaxSpeed = 20;
  gameDefaultSpeed = 8;
  gamePadOpacity = 0.8; // .2 => 1 max
  constructor(){
    super("AppSettings");
  }
  
  getLevelScores(){
    return this.scores.filter(x=> x.level === this.currentLevel)
  }
  
  // increase level
  inc(){
    if(this.gameSpeed +1> this.gameMaxSpeed)
        this.gameSpeed = this.gameDefaultSpeed;
      else
      this.gameSpeed++;
  }
  
  gameValidSpeed(){
    let value = this.gameSpeed - this.gameDefaultSpeed;
    
    value = this.gameDefaultSpeed - value;
    return value >0 ?value  :1;
       
  }
  
  async addScore(score){
    try{
        score.level = this.currentLevel;
        let aux = this.getLevelScores();
        if(aux === null){
            aux = [score];
        }else{
            //Como o array vem em ordem decrescente -> invertemos
            aux.reverse();

            //adiciona o novo score no fim do array
            aux.push(score);

            //Precisamos dessa funcao sortNumber porque o metodo sort() trata os elementos
            //do array como strings 
            const sortNumber = (x, y) => (x.score - y.score);

            //ordena o array de forma crescente
            aux.sort(sortNumber);

            //Como o sort ordena em ordem crescente, uso o reverse() para inverter a order no array
            aux.reverse();

            // each level must contain max tow scores
            if(aux.length > 2)
                aux.pop();
        }
        this.scores = [...(aux || []).filter(x=> x.score >0), ...this.scores.filter(x=> x.level !== this.currentLevel)]
    }catch(error){
        console.log(error);
    }
}
  
}