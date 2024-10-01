import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Repository {
  timeout;
  loading = true;
  dbItemKey;
  onSave;
  constructor(dbItemKey) {
    this.dbItemKey = dbItemKey;
  }
  
  clear(){
    AsyncStorage.removeItem(this.dbItemKey);
  }

  async save() {
    let data = {
      ...this
    }
    removeKeys(data,
      "timeout",
      "loading",
      "dbItemKey",
      "onSave");
     AsyncStorage.setItem(this.dbItemKey, JSON.stringify(data));
    this.onSave?.();
  }

  async load() {
    this.loading = true;
    let data = await AsyncStorage.getItem(this.dbItemKey);
    if (data && data.length > 0) {
      data = JSON.parse(data);
      for (let key in data) {
        this[key] = data[key];
      }
    }

    this.init();
    this.loading = false;
    return this;
  }

  init() {
    for (let key in this) {
      if ([
        "save",
        "timeout",
        "loading",
        "dbItemKey",
        "onSave"].includes(key))
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