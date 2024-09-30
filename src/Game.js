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
  SlideDetector
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

import {
  NUMBER_OF_CELLS_HORIZONTAL,
  NUMBER_OF_CELLS_VERTICAL,
  GAME_SPEED
} from './Constants';

import {
  addScore
} from './Data/score';

import Score from './Components/Score';

export default function App( {
  navigation
}) {
  globalState.hook("settings.gamePad")

  const[running,
    setRunning] = useState(true);
  const[score,
    setScore] = useState(0);

  const state = buildState( {
    engine: {}
  }).ignore("engine").build();

  useEffect(()=> {
    globalState.game.create();
    globalState.audio.gameTrack();
    globalState.audio.bind = true;

    return ()=> {
      globalState.audio.bind = false;
      globalState.audio.stopAll();
    }
  }, [])

  const onEvent = async (e) => {
    if (e.type === "game-over") {
      setRunning(false);

      if (score > 0) {
        await addScore(score);
        let gameMenuFunction = navigation.getParam('setGameOver');
        gameMenuFunction(true);
      }

      Alert.alert("Game Over");
      navigation.navigate('GameMenu');
    } else if (e.type === "add-score") {
      setScore(score + e.score);
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


  const GestureRecognizerView = globalState.settings.gamePad ? View: SlideDetector;
  return(
    <SafeAreaView css="container fld:row juc:flex-start ali:flex-start">

      <GestureRecognizerView
        onSwipeUp={() => state.engine.dispatch({ type: "rotate" })}
        onSwipeDown={() => state.engine.dispatch({ type: "slide" })}
        config={config}
        style={ { flex: 1, zIndex: 100 }}>
        <StatusBar hidden={true} />
        <Score score={score} />
            <GameEngine
              ref={(ref) => { state.engine = ref; }}
              systems={[GameLoop]}
              entities={ {
                grid: {
                  //Velocidade do jogo
                  nextMove: GAME_SPEED,
                  updateFrequency: GAME_SPEED,
                  //Conponente rederizado
                  renderer: <Grid />
                }
              }}
              running={running}
              onEvent={onEvent} />
            <GamePad engine={state.engine} />
            <SideGrid />
      </GestureRecognizerView>
    </SafeAreaView>
  );
}