export default defineNuxtConfig({
  appConfig: {
    'features.task': true,
  },
  routeRules: {
    '/demos/tasks': { ssr: false },
  },
})
