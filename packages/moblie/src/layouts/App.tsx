import React from 'react'
import { useColorScheme } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { HomeView } from '../home/index'
import { ProfileView } from '../profile/index'

const Tab = createBottomTabNavigator()

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeView}
          options={{
            tabBarLabel: '首页',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="home"
                color={color}
                size={size}
              ></MaterialCommunityIcons>
            ),
          }}
        />
        <Tab.Screen
          name="profile"
          component={ProfileView}
          options={{
            tabBarLabel: '我的',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              ></MaterialCommunityIcons>
            ),
          }}
        />
      </Tab.Navigator>
      {/* <SafeAreaView style={backgroundStyle}>
      
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}
        >
          <Text>this is Home</Text>
        </ScrollView>
      </SafeAreaView> */}
    </NavigationContainer>
  )
}

export default App
