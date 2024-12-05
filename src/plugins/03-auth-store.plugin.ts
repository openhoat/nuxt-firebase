export default defineNuxtPlugin({
  name: 'auth-store-plugin',
  setup: () => ({
    provide: {
      authStore: useAuthStore(),
    },
  }),
})