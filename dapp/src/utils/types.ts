export type Page = 'dashboard' | 'deploy' | 'zk proof' | 'connect'

export type IMessage<T> = {
  type: string
  data: T
}