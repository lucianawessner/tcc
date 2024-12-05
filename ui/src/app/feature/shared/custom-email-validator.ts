import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Função do validador personalizado
export class MainValidator{
  static emailValidator(control: AbstractControl): ValidationErrors | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const valid = emailRegex.test(control.value);
    return valid ? null : { invalidEmail: true };
  }

  public static isValid(email: string) {
    const exp = new RegExp(
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    );
    return exp.test(email);
  }
}
