import { View, Text, Dimensions } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { AuthContext } from '../auth/authContext'
type IOptionBlock = {
  name: string
  icon: string
}

const optionBlock = ({ name, icon }: IOptionBlock) => {
  return (
    <AuthContext>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 6,
          paddingRight: 6,
          paddingTop: 16,
          paddingBottom: 16,
          borderBottomWidth: 1,
          borderBottomColor: '#ececec',
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <MaterialIcons name={icon} size={18}></MaterialIcons>
          <Text style={{ fontSize: 14, marginLeft: 12 }}>{name}</Text>
        </View>
        <MaterialIcons name="chevron-right" size={18}></MaterialIcons>
      </View>
    </AuthContext>
  )
}

export const ProfileView = () => {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window')
  const bgHeight = screenHeight * 0.15
  const viewHeight = screenHeight - bgHeight
  const optionsArr = [
    {
      name: '待发布的订单',
      icon: 'flight-takeoff',
    },
    {
      name: '进行中的订单',
      icon: 'flight',
    },
    {
      name: '已完成的订单',
      icon: 'flight-land',
    },
  ]
  return (
    <View style={{ height: screenHeight, backgroundColor: '#ececec' }}>
      <View
        style={{
          height: bgHeight,
          padding: 12,
          backgroundColor: '#fff',
          paddingLeft: 12,
          paddingTop: 52,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: '#181818',
          }}
        >
          用户未登录
        </Text>
        <Text style={{ marginTop: 6, color: '#14c4ff' }}>点击登录 </Text>
      </View>
      <View>
        <Text style={{ marginTop: 12, marginBottom: 12, marginLeft: 6 }}>
          订单信息
        </Text>
        <View
          style={{
            backgroundColor: '#fff',
            paddingLeft: 6,
            paddingRight: 6,
            paddingTop: 0,
            paddingBottom: 0,
          }}
        >
          {optionsArr.map(t => {
            return optionBlock(t)
          })}
        </View>
      </View>
    </View>
  )
}
