import React, { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

//animacoes
import * as Animatable from 'react-native-animatable';

import logo from './assets/logo.png';

import BestScores from './Components/BestScores';

import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Text,
  Image
} from "./Controllers/index"


export default function GameMenu({navigation}){
    const[gameOver, setGameOver] = useState(true);
    const[bestScores, setBestScores] = useState(null);

    useEffect(() => {
        async function scores(){
            try{
                let data = await AsyncStorage.getItem('Best_Scores')
                setBestScores(JSON.parse(data));
                setGameOver(false);
            }catch(e){
                console.log(e);
            }
        }

        if(gameOver == true){
            scores();
        }
    }, [gameOver]);

    return(
        <SafeAreaView bg={require("./assets/black-bg.jpg")} css="container">
          <View css="container bac:transparent">
            <Image source={logo} css="logo"/>
            <Animatable.View animation="rubberBand" easing="ease-out" iterationCount="infinite">
                <TouchableOpacity css="btnStart" onPress={() => navigation.navigate('Game', { setGameOver })}>
                    <Text css="txtBtnStart">Start</Text>
                </TouchableOpacity>
            </Animatable.View>

            <BestScores data={bestScores}></BestScores>
            </View>
        </SafeAreaView>
    )
}

