import {useRef,useState} from "react"
export default class EventTracker{
  events = {};
  
  bindEvent(name,fn){
    let id = useRef(newId()).current;
    this.events[id+"-"+name] = fn;
    return this;
  }
  
  hook(){
    let [_, setUpdater] = useState();
    this.bindEvent("updater",()=> setUpdater(newId()));
  }
  
  update(){
    this.getEvent("updater")?.();
  }
  
  getEvent(name){
    for(let key in this.events){
      if(key.endsWith(name))
         return this.events[key];
    }
    return undefined;
  }
}