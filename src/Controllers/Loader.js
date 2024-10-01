import {
  View,
  Text
} from "./NativeViews";
import {
  ActivityIndicator
} from 'react-native';
export default ({
  loading
})=> {

  if (!loading)
    return null;
  return (
    <View css="sta le:0 to:0 fl:1 wi:100% wi:100% juc:center ali:center zi:999999">
      <View css="sta le:0 to:0 fl:1 wi:100% wi:100% bac:#000 opacity:.5 zi:1"/>
      <View css="zi:2 wi:150">
        <ActivityIndicator size="small" color="#fff" />
        <Text css="fos:12 fow:bold">loading...</Text>
      </View>
    </View>
  )
}