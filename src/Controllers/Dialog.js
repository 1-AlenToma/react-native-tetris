import {
  Animated,
  PanResponder,
  Dimensions,
  Easing
} from "react-native";

import {
  useEffect
} from "react";

import controller from "./NativeViews";
const {
  View,
  Text,
  Icon,
  TouchableOpacity
} = controller;


export default ({
  visible,
  height,
  width,
  onHide,
  children,
  buttons,
  title,
  style,
  css
})=> {
  const timer = useTime(100);
  let state = buildState( {
    animate: new Animated.ValueXY(),
    visible: undefined,
    size: {
      width: 0,
      height: 0,
      current: undefined,
      animating: false
    }
  }).ignore("animate", "size").build();

  const animate = () => {
    state.size.animating = true;
    state.size.current?.stop();
    timer.create(()=> {
      state.size.current = Animated.timing(state.animate, {
        toValue: visible ? 1: 0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: false
      });
      state.size.current.start(()=> {
        state.size.animating = false;
        state.visible = visible;
        if (visible == false)
          state.size = {
          ...state.size
        } // force an update
        //timer.create(()=> onHide(),1000)
      });
    })
  }



  if (visible != state.visible && state.size.width !== undefined && !state.size.animating) {
    animate();
  }

  if (!state.visible && !state.size.animating)
    return null;
  let stl = serArray(style)
  let btns = [...serArray(buttons),
    {
      icon: (<Icon type="AntDesign" name="closesquare" size={40} color="red" />),
      onPress: ()=>onHide(),
      ifTrue: ()=> {
        onHide !== undefined
      }
    }]

  const interpolate = state.animate.x.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });

  let left = (globalState.window.width - state.size.width)/2;
  let top = (globalState.window.height - state.size.height)/2;
  return (
    <>
      <View css="bac:#000 op:0.5 sta zi:400 wi:100% he:100%" />
      <Animated.View style={
        [{
          ...sts.sta,
          borderRadius: 5,
          overflow: "hidden",
          height: height ?? "40%",
          width: width ?? "80%",
          zIndex: 500,
          left: isNaN(left) ? 0: left,
          top: isNaN(top) ? 0: top,
          backgroundColor: "#000000",
          transform: [{
            scale: interpolate
          }]
        }, ...stl]} onLayout={(event) => {
          const { x,
            y,
            width,
            height } = event.nativeEvent.layout;
          state.size = { ...state.size, width, height }
        }}>
        <View css="fld:row di:flex juc:flex-end ali:center bac:#19191a mih:40">
          <Text ifTrue={()=> title} css="fos:18 sta le:5 fow:bold co:#fff">Congrats</Text>
          {
          btns.map((x, i)=>(
            <TouchableOpacity ifTrue={x.ifTrue} key={i}
              onPress={()=> x.onPress()}>
              {x.icon}
            </TouchableOpacity>
          ))
          }
        </View>
        <View style={ { flex: 1, padding: 5 }} css={css}>
          {children}
        </View>
      </Animated.View>
    </>
  )
}