import { useEffect } from 'react'
import { View, Text, ScrollView, Dimensions, Alert } from 'react-native'
import { Badge } from 'react-native-elements'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { AuthContext } from '../auth/authContext'
export const HomeView = () => {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window')
  const bgHeight = screenHeight * 0.35
  const viewHeight = screenHeight - bgHeight
  useEffect(() => {}, [])
  return (
    <AuthContext>
      <ScrollView style={{ width: '100%', height: screenHeight }}>
        <View
          style={{
            backgroundColor: '#3b3bc4',
            height: bgHeight,
            width: '100%',
          }}
        ></View>
        <View
          style={{
            backgroundColor: '#ececec',
            padding: 12,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            width: '100%',
            height: viewHeight,
            transform: [{ translateY: -12 }],
          }}
        >
          <View
            style={{ backgroundColor: '#fff', padding: 4, borderRadius: 15 }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 12,
              }}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Badge
                  textStyle={{ fontSize: 10 }}
                  value="快"
                  status="primary"
                  containerStyle={{ marginRight: 12 }}
                />
                <View>
                  <Text style={{ color: '#181818', marginBottom: 4 }}>
                    填写代取快递信息
                  </Text>
                  <Text style={{ fontSize: 8 }}>如丰巢、快递驿站取件码等</Text>
                </View>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                ></MaterialCommunityIcons>
              </View>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 12,
              }}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Badge
                  textStyle={{ fontSize: 10 }}
                  value="收"
                  status="warning"
                  containerStyle={{ marginRight: 12 }}
                />
                <View>
                  <Text style={{ color: '#181818', marginBottom: 4 }}>
                    填写收获地址
                  </Text>
                  <Text style={{ fontSize: 8 }}>填写相关信息</Text>
                </View>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                ></MaterialCommunityIcons>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </AuthContext>
  )
}
