import { Validation } from '../../presentation/protocols'
import { MissingFieldError } from '../../presentation/errors'

export class RequiredFieldValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  validate(input: any): any {
    if (!input[this.fieldName]) {
      return new MissingFieldError(this.fieldName)
    }
  }
}
