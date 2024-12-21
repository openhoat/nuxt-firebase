import { useAuthStore } from '~/domains/user/stores/auth-store'

export default defineNuxtPlugin({
  dependsOn: ['auth-store-plugin'],
  name: 'user-jwt-plugin',
  setup: () => {
    const authStore = useAuthStore()
    return {
      provide: {
        withAuthorization: async (headers: Headers = new Headers()) => {
          const { user } = authStore
          if (!user) {
            return undefined
          }
          const token = await user.getJwt()
          headers.append('Authorization', `Bearer ${token}`)
          return headers
        },
      },
    }
  },
})
