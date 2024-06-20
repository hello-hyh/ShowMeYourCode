import { createTRPCClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '@showmeyourcode/backend/src/index'
import { useNavigation, CommonActions } from '@react-navigation/native'
import storage from '../store'
import { Alert } from 'react-native'

let fetchWarp = async (...option: Parameters<typeof fetch>) => {
  return fetch(option[0], {
    ...option[1],
    credentials: 'include',
  }).then(async res => {
    const status = res.status
    const nav = useNavigation()
    Alert.alert(status.toString())
    if (status === 401) {
      // await storage.save({
      //   key: 'loginStatus',
      //   data: false,
      // })
      // nav.dispatch(({}) => {
      //   return CommonActions.navigate('Login')
      // })
      return Promise.reject(res)
    }
    return Promise.resolve(res)
  })
}

const useTrpc = async () => {
  let token = ''
  try {
    token = await storage.load({
      key: 'token',
    })
  } catch (error) {
    Alert.alert('获取token失败')
  }
  return {
    apiClient: createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          url: 'http://localhost:3000/trpc',
          fetch: fetchWarp,
          headers() {
            return {
              Authorization: `Bearer ${token}`,
            }
          },
        }),
      ],
    }),
  }
}

// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
export { useTrpc }
