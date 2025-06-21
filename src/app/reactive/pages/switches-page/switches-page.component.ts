import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { pipe } from 'rxjs';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-switches-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './switches-page.component.html',
  styles: ``
})
export class SwitchesPageComponent {
  private fb = inject(FormBuilder)
  formUtils = FormUtils

  myForm : FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    notifications: [true],
    terms: [false, Validators.requiredTrue],
  });

  onSubmit() {
    this.myForm.markAllAsTouched();
    console.log('submit', this.myForm.value);
  }
}
