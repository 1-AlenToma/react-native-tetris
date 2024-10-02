import AsyncStorage from '@react-native-async-storage/async-storage';
import EventTracker from "../oAssets/EventTracker";

export default class Repository extends EventTracker {
  timeout;
  dbItemKey;
  onSave;
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
    let data = {
      ...this
    }
    this.update();
    removeKeys(data,
      this.getIgnoredKeys());
    AsyncStorage.setItem(this.dbItemKey, JSON.stringify(data));
    this.onSave?.();
    
  }

  async load() {
    let data = await AsyncStorage.getItem(this.dbItemKey);
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
          this.timeout = setTimeout(()=>this.save(), 10);
        }
      })
    }
  }
}