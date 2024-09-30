import React, {
  PureComponent
} from "react";
import {
  View,
  Image,
  Dimensions,
  ImageBackground,
  Text
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';


import green from './../assets/green.png';
import blue from './../assets/blue.png';
import brown from './../assets/brown.png';
import pink from './../assets/pink.png';
import purple from './../assets/purple.png';
import red from './../assets/red.png';
import yellow from './../assets/yellow.png';
import gray from './../assets/gray.png';

import {
  CELL_LENGTH
} from '../Constants';

export default class Cell extends PureComponent {
  render() {
    const color =this.props.color && this.props.color !== null ? globalState.game.renderedPieces[this.props.color]?.color : null;
    //logOnce(globalState.game.renderedPieces)
    let RView = color ? LinearGradient : View;
    return (
      <RView style={[{
        width: CELL_LENGTH(),
        height: CELL_LENGTH(),
        overFlow: "hidden",
        borderRadius: 10
      },
        (color == null? null: sts.cell),
        this.props.style,
      ]} colors={color} start={{x:.1,y:.2}} >
        
      </RView>
    );
  }
}