import type { Firestore } from 'firebase-admin/firestore'
import type { GetTaskService } from '~/domains/task/domain/task-service'
import { getFirestoreTaskService } from '~/domains/task/infra/firestore/firestore-task.service'
import { getMemoryTaskService } from '~/domains/task/infra/memory/memory-task.service'

export type TaskServiceConfig = { firestore?: Firestore }

export const getTaskService: GetTaskService<TaskServiceConfig> = (config) => {
  const { firestore } = config
  return firestore
    ? getFirestoreTaskService({ firestore })
    : getMemoryTaskService()
}
