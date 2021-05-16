export class UnauthorizedError extends Error {
  constructor() {
    super('Username ou senha estão inválidos')
    this.name = 'UnauthorizedError'
  }
}
