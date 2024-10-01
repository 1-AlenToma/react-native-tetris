import {
  Piece
} from "./Piece";

export default class GridPieces {
  renderedPieces = {};
  currentPiece = null;
  nextPieces = [];
  grid = [];
  levelSetting = {
    generatingLevel: false,
    totalGenerated: 0,
    lastPosition: undefined,
    totalpointToClear: 0
  }


  resetLevel() {
    this.levelSetting.generatingLevel = false;
    this.levelSetting.totalGenerated = 0;
    this.levelSetting.lastPosition = undefined;
    this.renderedPieces = {};
    this.currentPiece = null;
    this.nextPieces = [];
    return this;
  }

  updatePieces() {
    if (!this.currentPiece) {
      if (this.nextPieces.length > 0) {
        this.currentPiece = this.nextPieces.shift();
        this.renderedPieces[this.currentPiece.id] = this.currentPiece;
      }
    }

    while (this.nextPieces.length < 3) {
      this.nextPieces.push(this.renderPiece());
    }

    return this.currentPiece;
  }

  get length() {
    return this.currentPiece?.position.length;
  }

  createLevel() {
    const totalBlocksToRender = this.grid.length /2;
    // create level map later to calculate betterl!
    this.levelSetting.totalpointToClear = totalBlocksToRender * randomBetween(100,500);
    //logOnce(this.levelSetting.totalpointToClear)
    if (this.levelSetting.generatingLevel) {
      if (this.levelSetting.totalGenerated < totalBlocksToRender) {
        return true;
      } else {
        this.levelSetting.generatingLevel = false;
      }
    } else if (this.levelSetting.totalGenerated < totalBlocksToRender) {
      this.levelSetting.generatingLevel = true;
      return true;
    }
    return false;
  }

  renderPiece = () => {
    let middleColumn = this.grid[0][0];
    while ((middleColumn = this.levelSetting.generatingLevel? randomBetween(0, this.grid[0].length-2): Math.floor(this.grid[0].length/2)) == this.levelSetting.lastPosition && this.levelSetting.generatingLevel);

    this.levelSetting.lastPosition = middleColumn;
    const blockRegister = {
      "0": new Piece("o", "blue", null)
      .add(
        -2, middleColumn-1,
        -2, middleColumn,
        -1, middleColumn-1,
        -1, middleColumn
      ),
      //[]
      "1": new Piece("j", "red")
      .add(
        -2, middleColumn-1,
        -2, middleColumn,
        -2, middleColumn+1,
        -1, middleColumn-1
      ),
      // L
      "2": new Piece("l", "green")
      .add(
        -2, middleColumn-1,
        -2, middleColumn,
        -2, middleColumn+1,
        -1, middleColumn+1
      ),
      //L - invertido
      "3": new Piece("z", "brown")
      .add(
        -2, middleColumn-1,
        -2, middleColumn,
        -1, middleColumn,
        -1, middleColumn +1
      ),
      //S - invertido
      "4": new Piece("t", "yellow")
      .add(
        -2, middleColumn-1,
        -2, middleColumn,
        -2, middleColumn +1,
        -1, middleColumn
      ),
      //T
      "5": new Piece("t", "yellow")
      .add(
        -2, middleColumn-1,
        -2, middleColumn,
        -2, middleColumn +1,
        -1, middleColumn
      ),
      //T
      "6": new Piece("/", "lightblue")
      .add(
        -4, middleColumn-4,
        -3, middleColumn-3,
        -2, middleColumn -2
      ),
      //\/
      "7": new Piece(":", "orange")
      .add(
        -2, middleColumn,
        -1, middleColumn
      ),
      //:
      "8": new Piece("f", "gray")
      .add(
        -1, middleColumn
      ),
      // :
      "9": new Piece("i", "purple")
      .add(
        -4, middleColumn,
        -3, middleColumn,
        -2, middleColumn,
        -1, middleColumn
      ) //I,
    }

    let piece = blockRegister[randomBetween(0, Object.keys(blockRegister).length-1).toString()];

    if (piece.position[0].x < 0 || piece.position[0].x > this.grid[0].length-2)
      return this.renderPiece();

    //loogOnce()

    return piece;
  }

  create() {
    this.currentPiece = null;
    this.renderedPieces = {};
    this.grid = [];
    for (i = 0; i < globalState.NUMBER_OF_CELLS_VERTICAL(); i++) {
      this.grid[i] = [];
      for (j = 0; j < globalState.NUMBER_OF_CELLS_HORIZONTAL; j++) {
        this.grid[i][j] = null;
      }
    }
    this.updatePieces();
    return this.grid;
  }

  isValid(j, step, value) {
    value = value || this.currentPiece.path;
    for (let i = 0; i <= step; i++) {
      let v = value[j][step]
      if (isNaN(v) || v === null || v === undefined)
        return false;
    }

    return true;
  }

  downPiece = (dispatch) => {
    try {
      let aux = [[],
        1,
        2,
        3];
      for (let i = 0; i < this.length; i++) {
        aux[i] = [];
        aux[i][0] = this.currentPiece.path[i][0];
        aux[i][1] = this.currentPiece.path[i][1];

        if (aux[i][0] >= 0 && aux[i][0] < this.grid.length) {
          if (this.isValid(i, 1, aux))
            this.grid[aux[i][0]][aux[i][1]] = null;
        }
        aux[i][0]++;

        if (aux[i][0] >= this.grid.length) {
          for (let j = 0; j < this.length; j++) {

            if (this.isValid(j, 1)) {
              this.grid[this.currentPiece.path[j][0]][this.currentPiece.path[j][1]] = this.currentPiece.path[4];
            }

          }

          return false;
        }
      }

      aux[4] = this.currentPiece.path[4];
      aux[5] = this.currentPiece.path[5];

      //Se a peca virtual tiver uma posicao ocupada ou chegar ao fim da matriz, retorna falso
      for (let i = 0; i < this.length; i++) {
        if (aux[i][0] >= 0 && aux[i][0] < this.grid.length)
          if (this.grid[aux[i][0]][aux[i][1]]) {

          for (let j = 0; j < this.length; j++) {
            if (this.isValid(j, 1) && this.currentPiece.path[j][0] >= 0)
              this.grid[this.currentPiece.path[j][0]][this.currentPiece.path[j][1]] = this.currentPiece.path[4];
          }

          if (aux[i][0] == 0 && !this.levelSetting.generatingLevel) {
            dispatch( {
              type: "game-over"
            });
          }
          return false;
        }
      }

      //Se nao, copia o novo valor para a peca atual
      for (let i = 0; i < this.length; i++) {
        if (aux[i][0] >= 0 && aux[i][0] < this.grid.length)
          this.grid[aux[i][0]][aux[i][1]] = aux[4];

        this.currentPiece.path[i][0] = aux[i][0];
        this.currentPiece.path[i][1] = aux[i][1];
      }
    }catch(e) {
      console.error(e)
    }
    return true;
  }

  moveLeftOrRight = (direction) => {
    let aux = [];

    for (i = 0; i < this.length; i++)
      if (direction == 1 && this.currentPiece.path[i][1] == this.grid[0].length-1)
      return;
    else if (direction == -1 && this.currentPiece.path[i][1] == 0)
      return;

    for (let i = 0; i < this.length; i++)
      if (this.isValid(i, 1) && this.currentPiece.path[i][0] >= 0)
      this.grid[this.currentPiece.path[i][0]][this.currentPiece.path[i][1]] = null;

    //Movimenta a peca virtual na horizontal
    for (let i = 0; i < this.length; i++) {
      aux[i] = [];
      if (this.isValid(i, 1)) {
        aux[i][0] = this.currentPiece.path[i][0];
        aux[i][1] = this.currentPiece.path[i][1];
        aux[i][1] += direction;
      }
    }

    aux[4] = this.currentPiece.path[4];
    aux[5] = this.currentPiece.path[5];

    //Verifica se a posicao esta ocupada -> nao move a peca
    for (i = 0; i < this.length; i++)
      if (aux[i][0] >= 0 && this.grid[aux[i][0]][aux[i][1]]) {
      for (let j = 0; j < this.length; j++)
        if (this.isValid(j, 1) && this.currentPiece.path[j][0] >= 0)
        this.grid[this.currentPiece.path[j][0]][this.currentPiece.path[j][1]] = this.currentPiece.path[4];

      return;
    }

    for (let i = 0; i < this.length; i++) {
      this.currentPiece.path[i][0] = aux[i][0];
      this.currentPiece.path[i][1] = aux[i][1];

      if (aux[i][0] >= 0 && aux[i][0] < this.grid.length)
        this.grid[aux[i][0]][aux[i][1]] = aux[4];
    }

  }


  rotateCurrentPiece = () => {

    let aux = [];
    if (this.length == 1)
      return;
    //console.warn(this.currentPiece.path)
    //Remove the current part from the matrix to avoid collision with the block of the current part itself
    for (let i = 0; i < 4; i++)
      if (this.currentPiece.path[i][0] >= 0)
      this.grid[this.currentPiece.path[i][0]][this.currentPiece.path[i][1]] = null;

    for (let i = 0; i < 4; i++) {
      aux[i] = [];

      aux[i][0] = this.currentPiece.path[i][0];
      aux[i][1] = this.currentPiece.path[i][1];
    }

    aux[4] = this.currentPiece.path[4];
    aux[5] = this.currentPiece.path[5];

    for (let i = 0; i < 4; i++) {
      if (i != aux[5] && aux[5]) {
        let newX = aux[i][1] + aux[1][0] - aux[1][1];
        let newY = aux[1][0] + aux[1][1] - aux[i][0];

        aux[i][0] = newX;
        aux[i][1] = newY;
      }

      if (aux[i][0] >= this.grid.length || aux[i][1] < 0 || aux[i][1] >= this.grid[0].length) {
        for (let j = 0; j < 4; j++) {
          if (this.currentPiece.path[j][0] >= 0)
            this.grid[this.currentPiece.path[j][0]][this.currentPiece.path[j][1]] = this.currentPiece.path[4];

        }
        return;
      }
    }

    //If the virtual piece has an occupied position or on one of the edges -> the piece does not rotate
    for (let i = 0; i < 4; i++) {
      if (aux[i][1] < 0 || aux[i][1] >= this.grid[0].length) {
        for (let j = 0; j < 4; j++) {
          if (this.currentPiece.path[j][0] >= 0)
            this.grid[this.currentPiece.path[j][0]][this.currentPiece.path[j][1]] = this.currentPiece.path[4];
        }

        return;
      }

      if (aux[i][0] >= 0 && aux[i][0] < this.grid.length && aux[i][1] < this.grid[0].length && aux[i][1] >= 0) {
        if (this.grid[aux[i][0]][aux[i][1]]) {
          for (let j = 0; j < 4; j++) {
            if (this.currentPiece.path[j][0] >= 0)
              this.grid[this.currentPiece.path[j][0]][this.currentPiece.path[j][1]] = this.currentPiece.path[4];
          }

          return;
        }
      }
    }

    //If not, copy the new value to the current part

    for (let i = 0; i < 4; i++) {
      if (aux[i][0] >= 0 && aux[i][0] < this.grid.length) {
        //console.warn("cpoy")
        this.grid[aux[i][0]][aux[i][1]] = aux[4];
      }

      this.currentPiece.path[i][0] = aux[i][0];
      this.currentPiece.path[i][1] = aux[i][1];
    }
  }



  update(entities, {
    touches, dispatch, events
  }) {

    this.updatePieces();

    if (this.levelSetting.generatingLevel && this.createLevel()) {
      globalState.audio.disabled = true;
      this.rotateCurrentPiece();

      while (this.downPiece(dispatch));
      this.levelSetting.totalGenerated = Object.keys(this.renderedPieces).length;
    }else globalState.audio.disabled = false;
    if (events.length) {
      for (let i = 0; i < events.length; i++) {
        if (events[i].type === 'move-left') {
          this.moveLeftOrRight(-1);
        } else if (events[i].type === 'move-right') {
          this.moveLeftOrRight(1);
        } else if (events[i].type === 'rotate') {
          this.rotateCurrentPiece();
        } else if (events[i].type === 'slide') {
          while (this.downPiece(dispatch));
        } else if (events[i].type === 'down') {
          this.downPiece(dispatch);
        } else if (events[i].type === 'game-over') {
          globalState.audio.gameOver();
        } else if (events[i].type === 'add-score') {
          globalState.audio.success();
        }
      }
    }

    entities.grid.nextMove -= 1;
    if (entities.grid.nextMove === 0) {
      entities.grid.nextMove = entities.grid.updateFrequency;

      if (!this.downPiece(dispatch)) {
        this.currentPiece = null;
        globalState.audio.clear();
        let bonus = 0;

        for (let i = this.grid.length-1; i >= 0; i--) {
          if (this.grid[i].filter((value) => {
            return value === null
          }).length == 0) {
            this.grid.splice(i, 1);

            let newLine = [];

            for (let j = 0; j < this.grid[0].length; j++)
              newLine[j] = null;

            this.grid.unshift(newLine);

            i++;
            if (!this.levelSetting.generatingLevel) {
              dispatch( {
                type: "add-score",
                score: 100*(++bonus)});
            }
          }
        }
      }
    }
  }
}