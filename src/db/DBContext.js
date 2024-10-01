import Settings from "./Settings";

export default class DBContext{
  settings;
  onChange;
  constructor(onChange){
    this.onChange = onChange;
  }
  
  async load(){
    this.settings = await new Settings().load();
    
    this.settings.onSave = this.onChange;
   // alert(this.onSave)
   // logOnce(this.settings);
  }
}