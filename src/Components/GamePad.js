import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Icon
} from "../Controllers"
import {
  GAME_SPEED
} from '../Constants';
const WhilePressed = ({
  ...props
})=> {
  let time = useTime(props.ms || 80);
  const pressIn = (first)=> {
    if (first) {
      time.create(()=> {
        if (!globalState.touchHandled) {
          props?.onPressIn?.();
          time.create(pressIn)
        }
      },
        100)
    } else if (!globalState.touchHandled) {
      props?.onPressIn?.();
      time.create(pressIn)
    }
  }

    const pressOut = ()=> {
      props?.onPressOut?.();
      time.clear();
    }
    return (
      <TouchableOpacity {...props} onPressIn={()=>pressIn(true)} onPressOut={pressOut} />
    )
  }
  export default ({
    engine,
    children
  })=> {
    const btnSize = (screen, window)=> {
      return {
        width: screen.width/2,
        height: window.height
      }
    }

    globalState.hook("settings.gamePad");
    if (!globalState.settings.gamePad) {
      return (
        <View css="buttons zi:5 bac:transparent">
          <WhilePressed onPress={()=> engine.dispatch({ type: "move-left" })} size={btnSize} css="button" onPressIn={() => { engine.dispatch({ type: "move-left" })} } />
          <WhilePressed onPress={()=>engine.dispatch({ type: "move-right" })} size={btnSize} css="button" onPressIn={() => { engine.dispatch({ type: "move-right" })} } />
        </View>
      )
    } else {
      let iconColor = "white"
      let iconSize = gamePadSize;
      return (<View style={ { width: globalState.screen.width }} css="gamepad di:flex zi:10">

        <WhilePressed onPressIn={()=> {
          engine.dispatch({ type: "move-left" })
        }} css="gamepadTouchableOpacity flex:1">
          <Icon size={iconSize} type="AntDesign" name="leftcircle" color={iconColor} />
        </WhilePressed>

        <View css="gamepadCenter flex:1">
          <WhilePressed ms={100} onPressIn={()=> {
            engine.dispatch({ type: "rotate" });
          }} style={ { height: "33%" }} css="gamepadTouchableOpacity">
            <Icon size={iconSize} type="FontAwesome6" color={iconColor} name="arrows-rotate" />
          </WhilePressed>
          <WhilePressed style={ { height: "33%" }} onPress={()=> {
            engine.dispatch({ type: "slide" })
          }} css="gamepadTouchableOpacity">
            <Icon color={iconColor} size={iconSize} type="AntDesign" name="downcircle" />
          </WhilePressed>
          <WhilePressed style={ { height: "33%" }} ms={50} onPressIn={()=> {
            engine.dispatch({ type: "down" })
          }} css="gamepadTouchableOpacity">
            <Icon color={iconColor} size={iconSize} type="AntDesign" name="downcircle" />
          </WhilePressed>
        </View>
        <WhilePressed onPressIn={()=> {
          engine.dispatch({ type: "move-right" })
        }} css="gamepadTouchableOpacity flex:1">
          <Icon color={iconColor} size={iconSize} type="AntDesign" name="rightcircle" />
        </WhilePressed>

      </View>)
    }
  }