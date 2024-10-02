import Settings from "./Settings";

export default class DBContext{
  settings;
  async load(){
    let items = {Settings};
    for(let key in items){
      let bKey = key[0].toLowerCase()+ key.substring(1);
      this[bKey]= await new items[key]().load();
    }
  }
}