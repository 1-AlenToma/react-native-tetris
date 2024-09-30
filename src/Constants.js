import {
  Dimensions
} from 'react-native';
import useState from "react-smart-state";
import gameEffects from "./oAssets/Audio";
import {GridPieces} from "./oAssets"

const GAME_SPEED = 10; //min = 1
export const gamePadSize = 60;
export const gamePadHeight = gamePadSize *4;
const statusbarHeight = 50;
const globalState = useState({
  updater:"",
  touchHandled: false,
  audio:gameEffects,
  game: new GridPieces(),
  settings:{
    gamePad: false,
    randomColor:true
  },
  NUMBER_OF_CELLS_HORIZONTAL: undefined,
  NUMBER_OF_CELLS_VERTICAL: undefined,
  CELL_LENGTH: undefined,
  gameSpeed:GAME_SPEED,
  setWidth:()=>{
    globalState.WIDTH_SCREEN=globalState.screen.width;
    globalState.sideWidth = proc(20,globalState.screen.width);
    globalState.HEIGHT_SCREEN = globalState.window.height-= statusbarHeight
    if(globalState.settings.gamePad){
      //globalState.HEIGHT_SCREEN -= gamePadHeight;
    };
  },
  screen: Dimensions.get('screen'),
  window: Dimensions.get('window'),
  WIDTH_SCREEN:Dimensions.get('screen').width,
  HEIGHT_SCREEN:Dimensions.get('window').height -50,
  sideWidth: 0,
  init:()=> {
    globalState.setWidth();
    const subscription = Dimensions.addEventListener(
      'change',
      ({window, screen}) => {
        globalState.screen = screen;
        globalState.window = window;
        globalState.setWidth();
        
      },
    );
    return [subscription]
  }
}).ignore("game.grid","game.currentPiece","game.renderedPieces","game.nextPieces","audio").globalBuild();

const computeNumberOfCellsVertical = () => {
  const numberOfCellsVertical = ((globalState.HEIGHT_SCREEN)/(globalState.WIDTH_SCREEN/NUMBER_OF_CELLS_HORIZONTAL));

  return Math.trunc(numberOfCellsVertical);
}

//O menos 100 em HEIGHT_SCREEN é devido ao componente Score que ocupa 100 de altura da tela

const NUMBER_OF_CELLS_HORIZONTAL = 12;
const NUMBER_OF_CELLS_VERTICAL =()=> computeNumberOfCellsVertical();
const CELL_LENGTH =()=> globalState.WIDTH_SCREEN/NUMBER_OF_CELLS_HORIZONTAL;


globalState.CELL_LENGTH = CELL_LENGTH;
globalState.NUMBER_OF_CELLS_HORIZONTAL = NUMBER_OF_CELLS_HORIZONTAL;
globalState.NUMBER_OF_CELLS_VERTICAL = NUMBER_OF_CELLS_VERTICAL;
export {
  NUMBER_OF_CELLS_HORIZONTAL,
  NUMBER_OF_CELLS_VERTICAL,
  CELL_LENGTH,
  GAME_SPEED,
  globalState,
  useState
};