import {
  Dimensions
} from 'react-native';
import useState from "react-smart-state";
import gameEffects from "./oAssets/Audio";
import {
  GridPieces
} from "./oAssets";
import {
  DBContext
} from "./db";


export const gamePadSize = 60;
export const gamePadHeight = gamePadSize *4;
const statusbarHeight = 0;
const globalState = useState( {
  loaded: false,
  dbContextChanged: "",
  touchHandled: false,
  audio: gameEffects,
  game: new GridPieces(),
  dbContext: new DBContext(()=> {

    globalState.dbContextChanged = newId();

  }),
  NUMBER_OF_CELLS_HORIZONTAL: undefined,
  NUMBER_OF_CELLS_VERTICAL: undefined,
  CELL_LENGTH: undefined,
  setWidth: ()=> {
    globalState.WIDTH_SCREEN = globalState.screen.width;
    globalState.sideWidth = proc(20, globalState.screen.width);
    globalState.HEIGHT_SCREEN = globalState.window.height -= statusbarHeight

  },
  screen: Dimensions.get('screen'),
  window: Dimensions.get('window'),
  WIDTH_SCREEN: Dimensions.get('screen').width,
  HEIGHT_SCREEN: Dimensions.get('window').height -50,
  sideWidth: 0,
  init: async ()=> {
    await globalState.dbContext.load();
    globalState.setWidth();
    const subscription = Dimensions.addEventListener(
      'change',
      ({
        window, screen
      }) => {
        globalState.screen = screen;
        globalState.window = window;
        globalState.setWidth();

      },
    );

    globalState.loaded = true;
    return [subscription]
  }
}).ignore(
  "dbContext",
  "game.grid",
  "game.currentPiece",
  "game.renderedPieces",
  "game.nextPieces",
  "audio").globalBuild();

const computeNumberOfCellsVertical = () => {
  const numberOfCellsVertical = ((globalState.HEIGHT_SCREEN)/(globalState.WIDTH_SCREEN/NUMBER_OF_CELLS_HORIZONTAL))-2;

  return Math.trunc(numberOfCellsVertical);
}

//O menos 100 em HEIGHT_SCREEN é devido ao componente Score que ocupa 100 de altura da tela

const NUMBER_OF_CELLS_HORIZONTAL = 12;
const NUMBER_OF_CELLS_VERTICAL = ()=> computeNumberOfCellsVertical();
const CELL_LENGTH = ()=> globalState.WIDTH_SCREEN/NUMBER_OF_CELLS_HORIZONTAL;


globalState.CELL_LENGTH = CELL_LENGTH;
globalState.NUMBER_OF_CELLS_HORIZONTAL = NUMBER_OF_CELLS_HORIZONTAL;
globalState.NUMBER_OF_CELLS_VERTICAL = NUMBER_OF_CELLS_VERTICAL;
export {
  NUMBER_OF_CELLS_HORIZONTAL,
  NUMBER_OF_CELLS_VERTICAL,
  CELL_LENGTH,
  globalState,
  useState
};