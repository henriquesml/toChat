export type GetMessageClientReturn = any

export interface GetMessageClient {
  get: (room: string) => GetMessageClientReturn
}
