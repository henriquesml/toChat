export class UnexpectedError extends Error {
  constructor() {
    super('Ocorreu um erro inesperado, por favor tente novamente.')
    this.name = 'UnexpectedError'
  }
}
