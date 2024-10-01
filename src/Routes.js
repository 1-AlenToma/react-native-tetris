import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import GameMenu from './GameMenu';
import Game from './Game';
import {useEffect} from "react";
import {Loader} from "./Controllers";


const MainNavigator = createStackNavigator({
    GameMenu: { screen: GameMenu },
    Game: { screen: Game }
},{
  initialRouteName:"GameMenu"
});

// Hide the header from GameMenu stack
GameMenu.navigationOptions = {
	headerShown: false,
};

// Hide the header from Game stack
Game.navigationOptions = {
	headerShown: false,
};

const App = createAppContainer(MainNavigator);

const Main = ()=>{
 const [loaded]= useFont();
  globalState.hook("screen","loaded")
  useEffect(()=>{
     globalState.init();
  },[]);
  
  if(!loaded || !globalState.loaded)
    return <Loader loading={globalState.loaded} />;
  
  return <App />
}

export default Main;