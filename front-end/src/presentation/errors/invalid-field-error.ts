export class InvalidFieldError extends Error {
  constructor(fieldName: string) {
    super(`O campo: ${fieldName} está inválido`)
    this.name = 'Campo inválido'
  }
}
