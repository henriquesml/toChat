export interface GetStorage {
  get: (key: string) => Promise<string|null>
}
