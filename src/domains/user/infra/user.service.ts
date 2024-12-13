import type { Auth } from 'firebase/auth'
import type { GetUserService } from '~/domains/user/domain/user-service'
import { getFirebaseUserService } from '~/domains/user/infra/firebase/firebase-user.service'
import { getMemoryUserService } from '~/domains/user/infra/memory/memory-user.service'

export type UserServiceConfig = { firebaseAuth?: Auth } | undefined

export const getUserService: GetUserService<UserServiceConfig> = (config) => {
  if (config?.firebaseAuth) {
    const { firebaseAuth } = config
    return getFirebaseUserService({ firebaseAuth })
  }
  console.warn('/!\\ Firebase auth not provided: using memory user service')
  return getMemoryUserService()
}