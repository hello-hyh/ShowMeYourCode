import { AppRegistry, Platform } from 'react-native'
import App from './src/layouts/App'
import { name as appName } from './app.json'
import { AMapSdk } from 'react-native-amap3d'

AppRegistry.registerComponent(appName, () => App)
AMapSdk.init(
  Platform.select({
    android: 'a26cb2233f40b9b5c540525eabb263f5',
    ios: '',
  })
)