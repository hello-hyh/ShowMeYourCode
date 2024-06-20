import { View, Text, ScrollView, Dimensions } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { useEffect, useState } from 'react'
import { useNavigation, CommonActions } from '@react-navigation/native'
const { width: screenWidth, height: screenHeight } = Dimensions.get('window')
const bgHeight = screenHeight * 0.2
const viewHeight = screenHeight - bgHeight
export const LoginView = () => {
  const [inputEmail, setInputEmail] = useState('')
  const nav = useNavigation()
  const onGetVeifyCode = () => {
    nav.dispatch(({}) => {
      return CommonActions.navigate('veiflyCode', {
        from: inputEmail,
      })
    })
  }
  useEffect(() => {}, [])
  return (
    <ScrollView style={{ width: '100%', height: screenHeight }}>
      <View
        style={{
          backgroundColor: '#3b3bc4',
          height: bgHeight,
          width: '100%',
        }}
      ></View>
      <View style={{ paddingLeft: 12, paddingRight: 12 }}>
        <View
          style={{
            backgroundColor: '#fff',
            padding: 16,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            width: '100%',
            transform: [{ translateY: -12 }],
          }}
        >
          <Input
            label="请输入邮箱"
            leftIcon={{
              name: 'email',
            }}
            placeholder="请输入邮箱"
            value={inputEmail}
            onChangeText={e => {
              setInputEmail(e)
            }}
          ></Input>
          <Text style={{ marginBottom: 20 }}>未注册的用户验证后自动注册</Text>
          <Button onPress={onGetVeifyCode} title="获取验证码"></Button>
        </View>
      </View>
    </ScrollView>
  )
}
