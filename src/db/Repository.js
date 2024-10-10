import AsyncStorage from '@react-native-async-storage/async-storage';
import EventTracker from "../oAssets/EventTracker";

let dataMap = new Map();
export default class Repository extends EventTracker {
  RepositoryTimeout;
  dbItemKey;
  onSave;
  initiolized = false;
  constructor(dbItemKey) {
    super();
    this.dbItemKey = dbItemKey;
  }

  clear() {
    AsyncStorage.removeItem(this.dbItemKey);
  }

  getIgnoredKeys() {
    return [...Object.keys(new EventTracker()),
      ...Object.keys(new Repository(""))];
  }

  async save() {
    return;
    let data = {
      ...this
    }
    removeKeys(data,
      this.getIgnoredKeys());
    let jsonData = JSON.stringify(data);
    if(dataMap.get(this.dbItemKey) == jsonData)
       return;
    dataMap.set(this.dbItemKey,jsonData)
    this.update();
    
    AsyncStorage.setItem(this.dbItemKey, jsonData);
    this.onSave?.();
  }

  async load() {
    let data =dataMap.get(this.dbItemKey) ?? await AsyncStorage.getItem(this.dbItemKey);
    if (data && data.length > 0) {
      data = JSON.parse(data);
      for (let key in data) {
        this[key] = data[key];
      }
    }

    this.init();
    this.update();
    return this;
  }

  init() {
    if(this.initiolized)
      return;
    const keysToIgnore = this.getIgnoredKeys();
    for (let key in this) {
      if (keysToIgnore.includes(key))
        continue;
      let value = this[key];
      Object.defineProperty(this, key, {
        enumerable: true,
        get: ()=> value,
        set: (v)=> {
          value = v;
          this.save()
        }
      })
    }
    
    this.initiolized = true;
  }
}