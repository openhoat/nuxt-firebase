import { requireAuthentication } from '~/domains/user/server/utils/require-authentication'

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('request', (event) => {
    event.context.requireAuthentication = requireAuthentication
  })
})
