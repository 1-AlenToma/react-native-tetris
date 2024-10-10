import React, {
  useRef,
  useState,
  useEffect
} from 'react';
import {
  StyleSheet,
  StatusBar,
  Alert,
  TouchableWithoutFeedback
} from 'react-native';

import {
  View,
  TouchableOpacity,
  SafeAreaView,
  SlideDetector,
  Dialog,
  Text,
  TextSplash
} from "./Controllers"

import {
  GameEngine
} from 'react-native-game-engine';

import GestureRecognizer, {
  swipeDirections
} from 'react-native-swipe-gestures';


import {
  GameLoop
} from "./Systems";

import GamePad from "./Components/GamePad";

import Grid from './Components/Grid';
import SideGrid from "./Components/SideGrid"

import Score from './Components/Score';

export default function App( {
  navigation,
  mode
}) {
  globalState.dbContext.settings.hook();
  globalState.hook("mission", "mission.completed", "mission.running");
  let audioState = globalState.audio.useAudioState();
  const timer = useTime();
  const state = buildState( {
    engine: {},
    visible:false,
    text:"",
    btnNext: "",
    btnHome:"",
    textScore: ""
  }).ignore("engine").build();
  
  const startGame = ()=>{
    let config = getGameConfig(navigation.getParam('mode'));
    globalState.mission = config;
    globalState.game.create(globalState.mission.gameMode);
    globalState.audio.enable().gameTrack();
    
    globalState.mission.start();
  }

  globalState.useEffect(async ()=> {
    if (globalState.mission.completed) {
      globalState.audio.disable();
      state.visible = true;
      state.text = "You have completed the level!";
      state.btnNext = "Next Level";
    }
  },
    "mission.completed")
  
  useEffect(()=> {
    globalState.audio.bind = true;
    startGame();
    return ()=> {
      globalState.audio.bind = false;
      globalState.audio.stopAll();
    }
  },[])
    
    

  const onEvent = async (e) => {
    if (e.type === "game-over") {
      globalState.mission.gameOver();
      state.text = "Game Over";
      state.btnNext = "Restart";
      state.visible = true;
      globalState.audio.disable();
    } else if (e.type === "add-score") {
      state.textScore = e.score;
      globalState.mission.score(e.score);
    }
  }

  const config = {
    vLeft: 40,
    vRight: 40,
    vTop: 10,
    vBottom: 10,
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 10
  };


  const GestureRecognizerView = globalState.dbContext.settings.gamePad ? View: SlideDetector;
  return(
    <SafeAreaView bgStyle={ { opacity: .2 }} bg={audioState.bg} css="container fld:row juc:flex-start ali:flex-start">
      <TextSplash text={state.textScore} onAnimationEnd={()=>{
        timer.create(()=> state.textScore = "")
      }} />
      <Dialog css="ali:center" title="Congrats" height={200} visible={state.visible}>
        <Text css="fos:18 fow:bold co:red">
          {state.text}
        </Text>
        <View css="buttons ri:5 wi:100% sta bo:5 juc:space-around">
          <TouchableOpacity onPress={()=>{
             state.visible = false;
             navigation.navigate('GameMenu')
          }
          } css="mar:5 fl:1 bor:5 bac:#d7d7d7">
            <Text css="txtBtnStart co:#fff tea:center">Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{
            state.visible = false;
            startGame();
          }} css="fl:1 bor:5 bac:#2e4ed5">
            <Text css="tea:center txtBtnStart co:#fff">{state.btnNext}</Text>
          </TouchableOpacity>
        </View>
      </Dialog>
      <GestureRecognizerView
        onSwipeUp={() => state.engine.dispatch({ type: "rotate" })}
        onSwipeDown={() => state.engine.dispatch({ type: "slide" })}
        config={config}
        style={ { flex: 1, zIndex: 100 }}>
        <StatusBar hidden={true} />
        <Score />
        <GameEngine
          ref={(ref) => { state.engine = ref; }}
          systems={[GameLoop]}
          entities={ {
            grid: {
              //Velocidade do jogo
              nextMove: globalState.dbContext.settings.gameValidSpeed(),
              updateFrequency: globalState.dbContext.settings.gameValidSpeed(),
              //Conponente rederizado
              renderer: <Grid />
            }
          }}
          running={globalState.mission.running}
          onEvent={onEvent} />
        <GamePad engine={state.engine} />
        <SideGrid />
      </GestureRecognizerView>
    </SafeAreaView>
  );
}