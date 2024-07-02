import { createTRPCClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '@showmeyourcode/backend/src/index'
import router from '../router'

let fetchWarp = (...option: Parameters<typeof fetch>) => {
  return fetch(option[0], {
    ...option[1],
    credentials: 'include',
  }).then((res) => {
    const status = res.status
    if (status === 401) {
      localStorage.removeItem('token')
      router.replace({
        name: 'login',
      })
      return Promise.reject(res)
    }

    if (status === 403) {
    }
    return Promise.resolve(res)
  })
}

// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${import.meta.env.VITE_BASE_API}/trpc`,
      fetch: fetchWarp,
      headers() {
        return {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      },
    }),
  ],
})
export { trpc as Api }
