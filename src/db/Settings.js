import Repository from "./Repository";
import Scores from "./Scores";
import GameSpeed from "./GameSpeed";

export default class AppSettings extends Repository{
  gameSpeeds =[];
  gamePad = false;
  currentGameSpeed;
  gameSpeed = 15;
  gameMaxSpeed = 30;
  gameDefaultSpeed = 15;
  gamePadOpacity = 0.8; // .2 => 1 max
  constructor(){
    super("AppSettings");
    this.currentGameSpeed = new GameSpeed(this.gameSpeed)
  }
  
  validateGameSpeed(){
   // return;
    if(!this.gameSpeeds.find(x=> x.gameSpeed === this.gameSpeed)){
      this.gameSpeeds.push(new GameSpeed(this.gameSpeed))
    }
    if(!this.currentGameSpeed || this.currentGameSpeed.gameSpeed !== this.gameSpeed)
    this.currentGameSpeed= this.gameSpeeds.find(x=> x.gameSpeed === this.gameSpeed)
  }
  
  // increase speed
  inc(){
    if(this.gameSpeed +1> this.gameMaxSpeed)
        this.gameSpeed = this.gameDefaultSpeed;
      else
      this.gameSpeed++;
      
    this.validateGameSpeed();
   // this.update();
  }
  
  gameValidSpeed(){
    let value = this.gameSpeed - this.gameDefaultSpeed;
    
    value = this.gameDefaultSpeed - value;
    
    return value >0 ?value  :1;
       
  }
  
  async addScore(score){
    try{
         
        let aux = this.currentGameSpeed.scores;
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
        this.currentGameSpeed.scores = (aux || []);
      await  this.save();
    }catch(error){
        console.log(error);
    }
}
  
}