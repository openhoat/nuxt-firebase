export default defineNuxtPlugin({
  name: 'auth-guard-middleware-plugin',
  setup: async () => {
    const authGuardMiddleware = (
      await import('~/domains/user/middleware/auth-guard.middleware')
    ).default
    return {
      provide: {
        authGuardMiddleware,
      },
    }
  },
})
