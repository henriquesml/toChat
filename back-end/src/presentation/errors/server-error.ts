export class ServerError extends Error {
  constructor(stack: string) {
    super('Erro interno do servidor')
    this.name = 'ServerError'
    this.stack = stack
  }
}
