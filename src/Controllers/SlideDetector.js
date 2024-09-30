import {
  Animated,
  PanResponder
} from "react-native";

const SlideDetector = ({
  children,
  onSwipeUp,
  onSwipeDown,
  onSwipeLeft,
  onSwipeRight,
  config
})=> {
  const state = buildState( {
    ref: {
      x: 0,
      y: 0,
      value: 0,
      animate: new Animated.ValueXY()
    }
  }).ignore("ref").build();
  let timer = useTime(10)

  const onRelease = (
    evt,
    gestureState
  ) => {
    state.ref.animate.extractOffset();
    let newValueX = gestureState.dx;
    let newValueY = gestureState.dy;

    let diff = {
      y: newValueY - state.ref.value.y,
      x: newValueX - state.ref.value.x
    }

    timer.create(()=> {
      if (diff.x < 0 && Math.abs(diff.x) >= config.vLeft) {
        onSwipeLeft?.();
      } else
        if (diff.x > 0 && Math.abs(diff.x) >= config.vLeft) {
        if (Math.abs(diff.x) >= config.vRight)
          onSwipeRight?.();
      }
      if (diff.y < 0 && Math.abs(diff.y) >= config.vTop) {
        onSwipeUp?.();
      } else if (diff.y > 0 && Math.abs(diff.y) >= config.vBottom) {
        onSwipeDown?.();
      }
      
      globalState.touchHandled = false;
    });

  }

  const pan = PanResponder.create({
    onMoveShouldSetPanResponder: (
      evt,
      gestureState
    ) => {
      const {
        dx,
        dy
      } = gestureState;
      let lng = config.vLeft;

      let should = (
        (dx > lng ||
          dx < -lng ||
          dy > lng ||
          dy < -lng)
      );
      if(should)
      globalState.touchHandled = true;
      
      return should;
    },
    onPanResponderGrant: (
      e,
      gestureState
    ) => {
      
      state.ref.value = {
        x: gestureState.dx,
        y: gestureState.dy
      };
      state.ref.animate.setValue({
        x: gestureState.dx,
        y: gestureState.dy
      });
      state.ref.animate.extractOffset();
      return true;
    },
    onPanResponderTerminationRequest: (
      ev,
      gus
    ) => {
      // onRelease(ev, gus);
      return true;
    },
    onPanResponderTerminate: () => {
      //tAnimate(state.refItem.index ?? 0, 1);
      return true;
    },
    onPanResponderMove: Animated.event(
      [
        null,
        {
          dx: state.ref.animate.x, dy: state.ref.animate.y
        }],
      {
        useNativeDriver: false,
        listener: (
          event,
          gestureState
        ) => {
          state.ref.animate.setValue({
            x: gestureState.dx,
            y: gestureState.dy
          });

        },

      }
    ),
    onPanResponderEnd: onRelease,
    onPanResponderRelease: onRelease
  });

  return (
    <Animated.View {...pan.panHandlers} style={ { flex: 1 }}>
      {children}
    </Animated.View>);
}

export default SlideDetector;