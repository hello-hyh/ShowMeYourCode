import { Header, Icon } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export const LayoutHead = (): React.JSX.Element => {
  return (
    <Header
      backgroundImageStyle={{}}
      barStyle="default"
      centerComponent={{
        text: 'MY TITLE',
        style: { color: '#fff' },
      }}
      centerContainerStyle={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
      }}
      leftContainerStyle={{
        justifyContent: 'center',
      }}
      leftComponent={{
        icon: 'menu',
        iconStyle: {
          color: '#fff',
        },
      }}
      linearGradientProps={{}}
      placement="center"
      rightContainerStyle={{}}
      statusBarProps={{}}
    />
  )
}
