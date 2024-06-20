import {
  useRoute,
  useNavigation,
  CommonActions,
} from '@react-navigation/native'
import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'

import { CodeField, Cursor } from 'react-native-confirmation-code-field'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const styles = StyleSheet.create({
  root: { flex: 1, padding: 20, marginTop: 40 },
  title: { textAlign: 'center', fontSize: 30, fontWeight: 700 },
  subTitle: { textAlign: 'center', fontSize: 16, fontWeight: 500 },
  codeFiledRoot: { marginTop: 30, width: width / 1.2 },
  // 里面每个密码小框的样式
  cell: {
    width: 50,
    height: 50,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
    borderRadius: 10,
  },
  focusCell: {
    borderColor: '#000',
  },
})

export function ConfirmationCodeView() {
  const [vcodeTxt, setVcodeTxt] = useState('')
  const route = useRoute()
  const nav = useNavigation()
  function onVcodeChangeText(e) {
    // 这里是输入框的值
    console.log('e', e)
    setVcodeTxt(e)
    if (e.length === 6) {
      // 验证后设置状态后跳转
      nav.dispatch(({}) => {
        return CommonActions.navigate('home')
      })
    }
  }

  return (
    <View style={[styles.root]}>
      <Text style={[styles.title]}>请输入验证码</Text>
      <Text style={[styles.subTitle]}>{route.params!.from}</Text>
      <CodeField
        value={vcodeTxt}
        onChangeText={onVcodeChangeText}
        // 输入密码框的个数
        cellCount={6}
        rootStyle={styles.codeFiledRoot}
        keyboardType="number-pad"
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
    </View>
  )
}
