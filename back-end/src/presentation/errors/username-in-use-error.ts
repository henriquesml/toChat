export class UsernameInUseError extends Error {
  constructor() {
    super('O username informado já está em uso')
    this.name = 'UsernameInUseError'
  }
}
