import React from 'react';


import {
  View,
  TouchableOpacity,
  SafeAreaView
} from "../Controllers"
import {
  CELL_LENGTH
} from '../Constants';

import Cell from './Cell';


const Lines = ({
  grid,
  validPieces
})=> {
  let incIndex = [];
  let currentPiecePath = globalState.game.currentPiece;
  return (
    <View css="lineContainer">
      {
      [...Array(grid[0].length).keys()].map((x, i)=> {
        const selected = validPieces.find(f => (f.index == i) && f.piece.id == currentPiecePath?.id);
        return (
          <View style={[{
            width: CELL_LENGTH(),
            height: "100%",
            borderRightWidth: selected?0: 0,
            opacity: selected ? .5: .5,
            backgroundColor: selected ? "#083e38": undefined
          }]} key={"line"+i} />
        )})
      }
    </View>

  )


}

export default function Grid() {
  globalState.hook("game.grid")
  const grid = globalState.game.grid;
  const validPieces = [];

  let finalCells = [];
  let keyValue = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      let id = grid[i][j];
      if (id && typeof id == "string" && globalState.game.renderedPieces[id])
        validPieces.push({
        index: j, piece: globalState.game.renderedPieces[id]
      });
      finalCells.push(
        (
          <Cell
            key={keyValue}
            color={id} index={j} />
        ))
      keyValue++;
    }

  }

  return (
    <View css="gcontainer" style={ {
      width: globalState.WIDTH_SCREEN,
      height: globalState.HEIGHT_SCREEN,
    }}>
      <View css="grid" style={ {
        width: globalState.WIDTH_SCREEN,
        height: globalState.HEIGHT_SCREEN
      }}>
        <View css="grid pat:24">
          {finalCells}
        </View>
        <Lines grid={grid} validPieces={validPieces} />
      </View>

    </View>
  )
}