import {useRef,useState} from "react"
export default class EventTracker{
  events = {};
  updateTimeout;
  
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
    
    clearTimeout(this.updateTimeout)
    this.updateTimeout = setTimeout(()=>{
    this.getEvent("updater")?.();
    },100)
  }
  
  getEvent(name){
    for(let key in this.events){
      if(key.endsWith(name))
         return this.events[key];
    }
    return undefined;
  }
}