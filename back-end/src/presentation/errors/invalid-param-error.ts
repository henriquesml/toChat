export class InvalidParamError extends Error {
  constructor(paramName: string) {
    super(`O parâmetro: ${paramName} está inválido`)
    this.name = 'InvalidParamError'
  }
}
