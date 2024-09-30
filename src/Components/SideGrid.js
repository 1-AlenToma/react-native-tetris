import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Text
} from "../Controllers"
import {
  useEffect
} from "react";


export default ()=> {
  globalState.hook("game.currentPiece", "sideWidth")


  return (
    <View style={
      {
        height: globalState.HEIGHT_SCREEN -50,
        width: globalState.sideWidth
      }} css="mat:50 zi:3 ali:center sta right:0">
      <View style={{maxHeight:(globalState.game.nextPieces?.length ?? 1) * 19}} css="box juc:space-between">
        <Text css="fow:bold fs:15 co:#fff">Next</Text>
        {
        globalState.game.nextPieces?.map((x, i)=>(
          <Text key={i}
            style={ { color: x.color[0]}}
            css="fof:tetris pa:5 he:100% wi:100% tea:center fos:50">{x.font}</Text>
        ))
        }
      </View>
    </View>
  )
}