export class MissingParamError extends Error {
  constructor(paramName: string) {
    super(`O parâmetro: ${paramName} é obrigatório`)
    this.name = 'MissingParamError'
  }
}
