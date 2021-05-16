export class MissingFieldError extends Error {
  constructor(filedName: string) {
    super(`O campo: ${filedName} é obrigatório`)
    this.name = 'Campo obrigatório'
  }
}
