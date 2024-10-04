import * as Animatable from 'react-native-animatable';


export default ({text, onAnimationEnd})=>{
  
  const zoomOut = {
    0: {
      opacity: 0,
      scale: 0,
    },
    0.5: {
      opacity: 1,
      scale: 0.3,
    },
    0.8: {
      opacity: 1,
      scale: 1,
    },
    1: {
      opacity: 1,
      scale: 1.5,
    },
  };
  
  if(!text || text == "")
     return null;
  
  return(
     <Animatable.Text duration={500} onAnimationEnd={onAnimationEnd} animation={zoomOut} style={ { fontWeight:"bold", zIndex: 9999, color: "red", ...sts.sta, top: "20%", left:"45%", fontSize: 20 }}>{text}</Animatable.Text>
    )
}