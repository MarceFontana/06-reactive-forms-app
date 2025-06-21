import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms'

async function sleep() {
    // Simulamos una espera de 3 segundos, por ejemplo, para simular una llamada al servidor
    return new Promise((resolve) => {
      setTimeout( () => {
        resolve(true);
      }, 3000);
    });
  }

export class FormUtils {
  static namePattern = '^[ a-zA-ZáéíóúÁÉÍÓÚñÑ]+( [ a-zA-ZáéíóúÁÉÍÓÚñÑ ]+)+$'
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$'
  static usernamePattern = '^[a-zA-Z0-9_-]{6,}$'
  static passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$'

  static getTextError(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es obligatorio.'
        case 'minlength':
          return `Mínimo de ${errors[key].requiredLength} caracteres.`
        case 'maxlength':
          return `Máximo de ${errors[key].requiredLength} caracteres.`
        case 'min':
          return `Valor mínimo de ${errors[key].min}`
        case 'max':
          return `Valor máximo de ${errors[key].max}`
        case 'email':
          return 'El correo electrónico no es válido.'
        case 'emailTaken':
          return 'El correo electrónico ingresado ya existe.'
        case 'notStrider':
          return 'El usuario no puede ser strider.'

        case 'pattern':
          switch ( errors[key].requiredPattern ) {
            case FormUtils.namePattern:
              return 'El nombre debe contener al menos dos palabras.'
            case FormUtils.emailPattern:
              return 'El correo electrónico no es válido.'
            case FormUtils.notOnlySpacesPattern:
              return 'El campo no puede contener espacios.'
            case FormUtils.usernamePattern:
              return 'El nombre de usuario debe tener al menos 6 caracteres y no puede contener espacios.'
            case FormUtils.passwordPattern:
              return 'La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula, un número y un carácter especial.'
            default:
              return `Error desconocido. ${key}`
          }
        default:
        return `Error desconocido. ${key}`
      }
    }
    return null
  }

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return form.controls[fieldName].errors && form.controls[fieldName].touched
  }

  static isValidFieldInArray(
    formArray: FormArray,
    index: number
  ): boolean | null {
    return formArray.controls[index].errors && formArray.controls[index].touched
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    // If the field does not exist, return null
    if (!form.controls[fieldName]) return null

    const errors = form.controls[fieldName]?.errors ?? {}
    return this.getTextError(errors)
  }

  static getFieldErrorInArray(
    formArray: FormArray,
    index: number
  ): string | null {
    // If the field does not exist, return null
    if (!formArray.controls[index]) return null

    const errors = formArray.controls[index]?.errors ?? {}
    return this.getTextError(errors)
  }

  static isFieldOneEqualToFieldTwo (fieldOne: string, fieldTwo: string) {
    return (formGroup: AbstractControl) => {
      const fieldOneValue = formGroup.get(fieldOne)?.value;
      const fieldTwoValue = formGroup.get(fieldTwo)?.value;
      if (fieldOneValue !== fieldTwoValue) {
        return { notEqual: true };
      }
      return null;
    }
  }

  static async checkingServerResponse( control: AbstractControl ):Promise<ValidationErrors | null>
   {
    // Simulamos una llamada al servidor
    console.log('Checking server response for email...');

    await sleep();
    const formValue = control.value;
    if( formValue  === 'hola@mundo.com') {
      return {
        emailTaken: true,
       };
    }
    return null;
  }

  static notStrider ( control: AbstractControl ): ValidationErrors | null {
    const value = control.value;
    return value === 'strider' ? { notStrider: true } : null;
  }


}
