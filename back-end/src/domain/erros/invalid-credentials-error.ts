export class InvalidCredentialsError extends Error {
  constructor() {
    super('Username ou senha estão inválidos')
    this.name = 'InvalidCredentialsError'
  }
}
