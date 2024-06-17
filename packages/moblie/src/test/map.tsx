import { MapView, MapType, AMapSdk } from 'react-native-amap3d'
export const map = () => {
  return (
    <MapView
      style={{ height: '50%', width: '100%' }}
      mapType={MapType.Navi}
      initialCameraPosition={{
        target: {
          latitude: 39.91095,
          longitude: 116.37296,
        },
        zoom: 8,
      }}
    ></MapView>
  )
}
