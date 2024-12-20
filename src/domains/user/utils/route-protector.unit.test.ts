import type { User } from 'firebase/auth'
import {
  type Mock,
  afterEach,
  beforeAll,
  describe,
  expect,
  test,
  vi,
} from 'vitest'
import { requireAuthentication } from '~/domains/user/utils/route-protector'
import type { RouteLocationNormalized } from '#vue-router'

describe('Unit tests', () => {
  describe('domains', () => {
    describe('user', () => {
      describe('utils', () => {
        describe('route-protector', () => {
          describe('requireAuthentication', () => {
            let abortNavigationMock: Mock
            beforeAll(async () => {
              abortNavigationMock = vi.fn(() => false)
            })
            afterEach(() => {
              vi.resetAllMocks()
            })
            test('should abort navigation given user is not logged in', async () => {
              // Given
              const to = {
                name: '/foo',
              } as RouteLocationNormalized
              const user = null
              // When
              requireAuthentication(to, user, abortNavigationMock)
              // Then
              expect(abortNavigationMock).toHaveBeenCalled()
            })
            test('should do nothing given user is logged in', () => {
              // Given
              const to = {
                name: '/foo',
              } as RouteLocationNormalized
              const user: User = {
                email: 'foo@bar.io',
                displayName: 'John Doe',
              } as User
              // When
              requireAuthentication(to, user, abortNavigationMock)
              // Then
              expect(abortNavigationMock).not.toHaveBeenCalled()
            })
          })
        })
      })
    })
  })
})
