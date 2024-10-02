import {globalState,useState,gamePadSize} from "./src/Constants";
import {styles} from "./src/Controllers/NativeViews"
import {
  useFonts
} from 'expo-font';
import {Missions} from "./src/oAssets";
import uuid from 'react-native-uuid';
var RandomColor = require('randomcolor'); // import the script


import { useEffect, useRef } from "react";
const useFont = ()=>{
  const [loaded,
    error] = useFonts( {
      'tetris': require('./src/assets/fonts/tetris.ttf'),
    });
    
    
    return [loaded,error]
}

const useTime =(ms) => {
  const timer = useRef();

  let create = (func, mss) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(func, mss || ms);
  };
  
  let clear =()=>{
    clearTimeout(timer.current);
  }
  
  useEffect(()=>{
    return ()=> clearTimeout(timer.current);
  },[])
  
  return {create,clear};
};

let logged = false;
global.randomBetween = (min, max) => {
  let x = Math.floor(Math.random() * (max - min + 1) + min);
  return x;
}
global.randomColor = (option)=> RandomColor(option);
global.emptyArray = (nr)=> Array.from(Array(nr).keys());
global.removeKeys = (item, ...keys)=> {
  for(let key of keys){
    if(key in item)
      delete item[key];
  }
}
// mode Random or Endless
global.getGameConfig = (mode)=>{
  let mission = new Missions(mode);
  return mission;
}
global.newId = ()=> uuid.v4();
global.globalState =globalState;
global.buildState = useState;
global.logOnce =(...items)=> {
  if(!logged)
  console.warn(JSON.stringify(items,undefined,4));
  logged = true;
}
global.useFont = useFont;
global.sts = styles;
global.gamePadSize=gamePadSize;
global.useTime = useTime;
global.sleep = (ms)=> new Promise((r)=> setTimeout(r,ms || 10))
global.proc = (partialValue, totalValue) => {
   let v = ( partialValue / 100)  * totalValue;
   return v;
};
global.serArray = (arr)=> {
  if(arr && Array.isArray(arr))
     return arr.filter(x=> x !== null && x !== undefined)
  return [arr].filter(x=> x !== null && x !== undefined)
}