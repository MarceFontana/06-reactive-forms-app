import { JsonPipe } from '@angular/common'
import { Component, inject } from '@angular/core'
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { FormUtils } from '../../../utils/form-utils'

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {
  private fb = inject(FormBuilder)
  formUtils = FormUtils

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array(
      [
        ['Metal Gear', Validators.required],
        ['Death Stranding', Validators.required]
      ],
      Validators.minLength(2)
    )
  })

  newFavorite = this.fb.control('', Validators.required)

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray
  }

  onAddToFavorites() {
    if (this.newFavorite.invalid) return;
    const newGame = this.newFavorite.value
    this.favoriteGames.push(this.fb.control(newGame, Validators.required))
    this.newFavorite.reset()
  }

  onDeleteFavorite(indice: number) {
    this.favoriteGames.removeAt(indice)
  }

  onSubmit() {
    console.log('Form submitted:', this.myForm.value);
    this.myForm.markAllAsTouched()
  }
}
