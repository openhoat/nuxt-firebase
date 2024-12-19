import type { GetService } from '~/domains/service'
import type { User } from '~/domains/user/domain/user'

export type UserService = {
  getCurrentUser: () => User | null
  signIn: () => Promise<User | null>
  signOut: () => Promise<void>
}

export type GetUserService<T = void> = GetService<UserService, T>
