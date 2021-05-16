import { Validation } from '../../presentation/protocols'
import { InvalidFieldError } from '../../presentation/errors'

// rever
export class CompareFieldsValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly fieldToCompareName: string
  ) {}

  validate(input: any): any {
    if (input[this.fieldName] !== input[this.fieldToCompareName]) {
      return new InvalidFieldError(this.fieldToCompareName)
    }
  }
}
