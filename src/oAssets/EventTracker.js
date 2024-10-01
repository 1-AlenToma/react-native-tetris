import {useRef} from "react"
export default class EventTracker{
  events = {};
  
  bindEvent(name,fn){
    let id = useRef(newId()).current;
    this.events[id+"-"+name] = fn;
    return this;
  }
  
  getEvent(name){
    for(let key in this.events){
      if(key.endsWith(name))
         return this.events[key];
    }
    return undefined;
  }
}