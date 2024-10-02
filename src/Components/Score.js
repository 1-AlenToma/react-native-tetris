import React from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Dimensions
} from '../Controllers';

export default function Score() {
  globalState.hook(
    "mission",
    "mission.currentScore.score",
    "mission.currentScore.lines",
    "mission.currentScore.time",
    "mission.running"
  )
  
  return (
    <SafeAreaView css="wi:100% fld:row he:50, bac:#141515 pa:5 juc:space-between ali:center">
      <Text css="co:#fff fos:12 fow:bold">Lines: { globalState.mission.currentScore?.lines }</Text>
      <Text css="co:#fff fos:12 fow:bold">Score: { globalState.mission.currentScore?.score }{globalState.mission.gameMode=="Random" ?"/"+globalState.mission.missionTotalScoreToComplete:""}</Text>
      <Text css="co:#fff fos:12 fow:bold">Time: { globalState.mission?.timeString?.() }</Text>
    </SafeAreaView>
  )
}