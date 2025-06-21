import { JsonPipe } from '@angular/common'
import { Component, inject } from '@angular/core'
import { FormUtils } from '../../../utils/form-utils'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { ToUppercaseDirective } from '../../../shared/directives/to-uppercase.directive'
@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule, ToUppercaseDirective],
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder)
  formUtils = FormUtils

  myForm: FormGroup = this.fb.group(
    {
      name: [
        '',
        [Validators.required, Validators.pattern(this.formUtils.namePattern)]
      ],
      email: [
        '',
        [Validators.required, Validators.pattern(this.formUtils.emailPattern)],
        [this.formUtils.checkingServerResponse]
      ],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(this.formUtils.notOnlySpacesPattern),
          this.formUtils.notStrider
        ]

      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(this.formUtils.passwordPattern)
        ]
      ],
      password2: ['', [Validators.required]]
    },
    {
      validators: [
        this.formUtils.isFieldOneEqualToFieldTwo('password', 'password2')
      ]
    }
  )

  onSubmit() {
    this.myForm.markAllAsTouched()
    console.log('submit', this.myForm.value)
  }
}
