import {
  Styleable
} from "react-native-short-style";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
  ImageBackground
} from "react-native";
import * as Icons from "@expo/vector-icons";
import {
  gamePadSize,
  gamePadHeight
} from "../Constants"
export const styles = StyleSheet.create({
  gcontainer: "bow:0 overflow:hidden boc:#ccc maw:100%",
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sta: {
    position: "absolute"
  },

  gamepad: `zi:2 sta fld:row bo:40 fl:1 wi:100% he:${gamePadHeight} juc:center ali:center bac:red  bor:5 bow:0 bac:transparent`,

  "gamepad.View": `he:${gamePadHeight} ali:center juc:center`,

  "gamepadCenter": `wi:250 he:100% mih:${gamePadSize+20}`,

  "gamepadTouchableOpacity": `juc:center ali:center he:100% wi:${gamePadSize} mih:${gamePadSize}`,

  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',

  },

  box: "mat:10 bor:5 juc:center ali:center boc:gray wi:80%",

  cell: {
    opacity: 0.7,
    borderWidth: 0,
    justifyContent: "center",
    alignItems: "center",
  },



  lineContainer: "po:absolute le:0 top:0 wi:100% he:100% fld:row",

  "lineContainer.View": {
    borderRightWidth: 0,
    borderColor: "#fff",
    opacity: 0.5,
  },

  "lineContainer.lightView": "bac:#083e38",

  buttons: {
    flexDirection: 'row'
  },

  button: {
    backgroundColor: 'rgba(255,255,255, 0)',
  },

  logo: {
    width: 200,
    height: 40,
    marginBottom: 30
  },

  btnStart: "bor:5 bac:#fff",

  txtBtnStart: {
    fontSize: 20,
    color: '#006400',
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontWeight:"bold",
  }
});

const Icon = ({
  type, ...props
})=> {
  let IconView = Icons[type];

  return (
    <IconView {...props} />
  )
}

const views = {};
const GenericView = (props) => {
  const {
    bg,
    bgStyle,
    ifTrue,
    viewName,
    size,
    style,
    children
  } = props;
  if (ifTrue !== undefined) {
    let value = ifTrue;
    if (typeof ifTrue === "function") {
      value = value();
    }
    if (!value)
      return null;
  }
  let image = null;
  if (bg !== undefined) {
    image = (<ImageBackground source={bg} resizeMode="cover" style={[{
      flex: 0, position: "absolute", left: 0, top: 0, height: "100%", justifyContent: "center",
      width: "100%"
    },bgStyle]} />)
  }
  

  const stArray = serArray(style);
  if (typeof size === "function") {
    stArray.push(size(globalState.screen, globalState.window))
  }
  const VIEW = views[viewName];
  return <VIEW {...props} size={size} style={stArray}>
    {viewName !== "Image"
    ? (
      <>
        {image}
        {children}
      </>
    ): null
    }
  </VIEW>
}

const cn = {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Icon
};

let Controller = {};

Object.keys(cn).forEach((x) => {
  views[x] = Styleable(
    cn[x],
    x,
    styles
  );

  Controller[x] = (props) => (<GenericView {...props} viewName={x} />)
})


export default Controller;