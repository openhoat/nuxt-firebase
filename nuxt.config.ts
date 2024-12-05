import { resolve } from 'node:path'
import { inspect } from 'node:util'
import type { NuxtConfig } from '@nuxt/schema'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import type { AppConfig } from '~/types'

const buildConfig = () => {
  console.info('Loading config…')
  const {
    NUXT_FIREBASE_API_KEY: firebaseApiKey = '',
    NUXT_FIREBASE_APP_ID: firebaseAppId = '',
    NUXT_FIREBASE_AUTH_DOMAIN: firebaseAuthDomain = '',
    NUXT_FIREBASE_AUTH_EMULATOR_URL:
      firebaseAuthEmulatorUrl = 'http://localhost:9099',
    NUXT_DEBUG: debug = 'false',
    NUXT_FIREBASE_CLOUD_REGION: region = 'europe-west9',
    NUXT_FIREBASE_CLOUD_MAX_INSTANCES: maxInstances = '3',
    NUXT_FIREBASE_MEASUREMENT_ID: firebaseMeasurementId = '',
    NUXT_FIREBASE_MESSAGING_SENDER_ID: firebaseMessagingSenderId = '',
    NUXT_FIREBASE_PROJECT_ID: firebaseProjectId = '',
    NUXT_FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL:
      firebaseServiceAccountClientEmail,
    NUXT_FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY: firebaseServiceAccountPrivateKey,
    NUXT_FIREBASE_STORAGE_BUCKET: firebaseStorageBucket = '',
    NUXT_FIREBASE_USE_AUTH_EMULATOR: firebaseUseAuthEmulator = 'false',
  } = process.env
  const config: AppConfig = {
    debug: debug === 'true',
    maxInstances: Number(maxInstances),
    region,
    runtimeConfig: {
      firebaseServiceAccountClientEmail,
      firebaseServiceAccountPrivateKey,
      public: {
        firebaseApiKey,
        firebaseAppId,
        firebaseAuthDomain,
        firebaseAuthEmulatorUrl,
        firebaseMeasurementId,
        firebaseMessagingSenderId,
        firebaseProjectId,
        firebaseStorageBucket,
        firebaseUseAuthEmulator: firebaseUseAuthEmulator === 'true',
      },
    },
  }
  if (config.debug) {
    console.info('Loaded config:', inspect(config, { sorted: true }))
  }
  return config
}

const config = buildConfig()
const { debug, maxInstances, region, runtimeConfig } = config

const nuxtConfig: NuxtConfig = {
  build: {
    transpile: ['vuetify'],
  },
  compatibilityDate: '2024-04-03',
  debug,
  devtools: { enabled: true },
  imports: {
    dirs: ['stores'],
  },
  logLevel: 'info',
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        if (config.plugins) {
          config.plugins.push(vuetify({ autoImport: true }))
        }
      })
    },
    '@nuxtjs/robots',
    '@pinia/nuxt',
  ],
  nitro: {
    firebase: {
      gen: 2,
      httpsOptions: {
        maxInstances,
        region,
      },
    },
    output: {
      dir: resolve(__dirname, 'dist/nuxt'),
    },
  },
  routeRules: {
    '/demos/counter': { ssr: false },
    '/demos/login': { ssr: false },
  },
  runtimeConfig,
  srcDir: 'src',
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
}

export default defineNuxtConfig(nuxtConfig)
