import Repository from "./Repository";

export default class AppSettings extends Repository{
  scores = [];
  gamePad = false;
  currentLevel= 1;
  gameSpeed = 12;
  gameMaxSpeed = 20;
  gameDefaultSpeed = 10;
  gamePadOpacity = 0.8; // .2 => 1 max
  constructor(){
    super("AppSettings");
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
        let aux = this.scores;
        if(aux === null){
            aux = [];
            aux[0] = score;
        }else{
            //Como o array vem em ordem decrescente -> invertemos
            aux.reverse();

            //adiciona o novo score no fim do array
            aux.push(score);

            //Precisamos dessa funcao sortNumber porque o metodo sort() trata os elementos
            //do array como strings 
            const sortNumber = (x, y) => (x - y);

            //ordena o array de forma crescente
            aux.sort(sortNumber);

            //Como o sort ordena em ordem crescente, uso o reverse() para inverter a order no array
            aux.reverse();

            //Eu só quero guardar os 5 melhores scores -> apago a ultima posicao se o array
            //tiver mais que 5 elementos
            if(aux.length > 5)
                aux.pop();
        }

        //grava o array no AsyncStorage como um String
        this.scores = aux || [];
        await this.save();
        

    }catch(error){
        console.log(error);
    }
}
  
}