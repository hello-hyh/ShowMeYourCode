import React, { useEffect, useContext, createContext, useState } from 'react'
import { Alert, useColorScheme } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginView } from '../auth/login'
import { TabBar } from '../layouts/Tabbar'
import { ConfirmationCodeView } from '../components/Confirmation-Code'
import storage from '../store'

const Stack = createNativeStackNavigator()
export const LoginStatusCtx = createContext({
  status: false,
  setStauts: (status: boolean) => {},
})
function App(): React.JSX.Element {
  const [loginStatus, setLoginStauts] = useState(false)
  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        // await Api.user.getUserInfo.query()
      } catch (error) {
        Alert.alert(JSON.stringify(error))
      }
    }
    bootstrapAsync().catch(err => {
      Alert.alert(JSON.stringify(err))
    })
  }, [])
  return (
    <LoginStatusCtx.Provider
      value={{ status: loginStatus, setStauts: setLoginStauts }}
    >
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Tab"
            component={TabBar}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="Login"
            component={LoginView}
            options={{
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="veiflyCode"
            component={ConfirmationCodeView}
            options={{
              headerShown: true,
            }}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </LoginStatusCtx.Provider>
  )
}

export default App
