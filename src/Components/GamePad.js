import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Icon
} from "../Controllers"

const WhilePressed = ({
  ...props
})=> {
  let time = useTime(props.ms || 80);
  const pressIn = (first)=> {
    if(props.timeout !== false){
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
    }else {
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
  children,
  preview
})=> {
  globalState.dbContext.settings.hook();
  const btnSize = (screen, window)=> {
    return {
      width: screen.width/2,
      height: window.height
    }
  }
  
  const gamePadStyle = {opacity:globalState.dbContext.settings.gamePadOpacity};
 // globalState.dbContext.settings.clear()
  if(preview && !globalState.dbContext.settings.gamePad)
  return null;
  
  if (!globalState.dbContext.settings.gamePad) {
    return (
      <View css="buttons zi:5 bac:transparent">
        <WhilePressed onPress={()=> engine?.dispatch({ type: "move-left" })} size={btnSize} css="button" onPressIn={() => { engine?.dispatch({ type: "move-left" })} } />
        <WhilePressed onPress={()=>engine?.dispatch({ type: "move-right" })} size={btnSize} css="button" onPressIn={() => { engine?.dispatch({ type: "move-right" })} } />
      </View>
    )
  } else {
    let iconColor = "#a5a5a5"
    let iconSize = gamePadSize;
    return (<View style={
      {
        width: globalState.screen.width,
        opacity:globalState.dbContext.settings.gamePadOpacity,
        zIndex: preview ? -1 : 10
      }} css="gamepad di:flex">
      <WhilePressed timeout={false} onPressIn={()=> {
        engine?.dispatch({ type: "move-left" })
      }} style={gamePadStyle} css="gamepadTouchableOpacity flex:1">
        <Icon size={iconSize} type="AntDesign" name="leftcircle" color={iconColor} />
      </WhilePressed>

      <View css="gamepadCenter flex:1">
        <WhilePressed timeout={false} ms={100} onPressIn={()=> {
          engine?.dispatch({ type: "rotate" });
        }} style={ { height: "33%", ...gamePadStyle}} css="gamepadTouchableOpacity">
          <Icon size={iconSize} type="FontAwesome6" color={iconColor} name="arrows-rotate" />
        </WhilePressed>
        <WhilePressed timeout={false} style={ { height: "33%",...gamePadStyle }} onPress={()=> {
          engine?.dispatch({ type: "slide" })
        }} css="gamepadTouchableOpacity">
          <Icon color={iconColor} size={iconSize} type="AntDesign" name="downcircle" />
        </WhilePressed>
        <WhilePressed timeout={false} style={ { height: "33%",...gamePadStyle }} ms={50} onPressIn={()=> {
          engine?.dispatch({ type: "down" })
        }} css="gamepadTouchableOpacity">
          <Icon color={iconColor} size={iconSize} type="AntDesign" name="downcircle" />
        </WhilePressed>
      </View>
      <WhilePressed timeout={false} onPressIn={()=> {
        engine?.dispatch({ type: "move-right" })
      }} style={gamePadStyle} css="gamepadTouchableOpacity flex:1">
        <Icon color={iconColor} size={iconSize} type="AntDesign" name="rightcircle" />
      </WhilePressed>

    </View>)
  }
}