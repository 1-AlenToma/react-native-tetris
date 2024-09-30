let working = false;
let sleep = ()=> new Promise((r)=> setTimeout(r, 10))
export const GameLoop = (entities, {
  touches, dispatch, events
}) => {
  try
  {
   // globalState.grid = entities.grid.grid;
    globalState.game.update(entities, {
      touches, dispatch, events
    });
    //entities.grid.grid = globalState.grid;
  }catch(e) {
    console.error(e)
  }
  return entities;
};