import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import GameMenu from './GameMenu';
import Game from './Game';
import {useEffect} from "react";


const MainNavigator = createStackNavigator({
    GameMenu: {screen: GameMenu},
    Game: {screen: Game},
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
  globalState.hook("screen")
  useEffect(()=>{
    let itemToRemove = globalState.init();
    return ()=> itemToRemove.forEach(x=> x?.remove())
  },[])
  
  if(!loaded)
    return null;
  
  return <App />
}

export default Main;