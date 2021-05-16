export class ServerError extends Error {
  constructor(stack: string) {
    super('Houve um erro interno do servidor, por favor tente novamente.')
    this.name = 'ServerError'
    this.stack = stack
  }
}
