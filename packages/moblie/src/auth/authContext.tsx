import { useContext, useEffect } from 'react'
import storage from '../store'
import { Alert, Dimensions, GestureResponderEvent, View } from 'react-native'
import { useNavigation, CommonActions } from '@react-navigation/native'

import { LoginStatusCtx } from '../layouts/App'

export const AuthContext = (props: React.PropsWithChildren) => {
  const loginStatus = useContext(LoginStatusCtx)
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window')
  const nav = useNavigation()
  const onTouch = (e: GestureResponderEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // todo 跳转到login
    nav.dispatch(({}) => {
      return CommonActions.navigate('Login')
    })
  }
  return loginStatus ? (
    <View onTouchEndCapture={onTouch}>{props.children}</View>
  ) : (
    props.children
  )
}
