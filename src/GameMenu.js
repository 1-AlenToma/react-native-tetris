import React, {
  useState,
  useEffect
} from 'react';

import Slider from '@react-native-community/slider';


//animacoes
import * as Animatable from 'react-native-animatable';

import logo from './assets/logo.png';

import BestScores from './Components/BestScores';

import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Text,
  Image,
  Dialog
} from "./Controllers";

import GamePad from "./Components/GamePad"


export default function GameMenu( {
  navigation
}) {
  
  globalState.dbContext.settings.hook();

  const bestScores = globalState.dbContext.settings.getLevelScores();

  return(
    <SafeAreaView bg={require("./assets/tetrisPlayBg_2.gif")} css="container">

      <View css="container wi:100% bac:transparent">
        <Image source={logo} css="logo" />
        <Animatable.View animation="rubberBand" easing="ease-out" iterationCount="infinite">
          <TouchableOpacity css="btnStart" onPress={() => navigation.navigate('Game', { mode:"Random"})}>
            <Text css="txtBtnStart">Start: (Level:{globalState.dbContext.settings.currentLevel})</Text>
          </TouchableOpacity>
          <TouchableOpacity css="mat:10 btnStart" onPress={() => navigation.navigate('Game', { mode: "Endless"})}>
            <Text css="txtBtnStart">Start: (Endless Mode)</Text>

          </TouchableOpacity>
        </Animatable.View>
        <TouchableOpacity css="btnStart mat:10 bor:5 bac:#131313" onPress={() => {
          globalState.dbContext.settings.inc();
        }}>
          <Text css="txtBtnStart pav:5">Speed: {
            (globalState.dbContext.settings.gameSpeed - globalState.dbContext.settings.gameDefaultSpeed) +1
            }</Text>
        </TouchableOpacity>

        <TouchableOpacity css="btnStart mat:10 bor:5 bac:#131313" onPress={() => {
          globalState.dbContext.settings.gamePad = !globalState.dbContext.settings.gamePad;
        }}>
          <Text css="txtBtnStart pav:5">GamePadType: {
            !globalState.dbContext.settings.gamePad ? "Touch & Swap": "Buttons"
            }</Text>
        </TouchableOpacity>
        <View ifTrue={
          globalState.dbContext.settings.gamePad

          } css="fld:row txtBtnStart mat:10 pav:5 bor:5 bac:#131313">
          <Text css="txtBtnStart pav:5">Opacity:</Text>
          <Slider
            onValueChange={(v)=> {
              globalState.dbContext.settings.gamePadOpacity = Math.round(v * 10) / 10
            }}
            style={ { width: "50%",
              height: 40 }}
            step={0.1}
            value={globalState.dbContext.settings.gamePadOpacity}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            />
        </View>

        <BestScores data={bestScores}></BestScores>
        <GamePad preview={true} />
      </View>
    </SafeAreaView>
  )
}