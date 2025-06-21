import { Component, effect, inject, signal } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { FormUtils } from '../../../utils/form-utils'
import { JsonPipe } from '@angular/common'
import { CountryService } from '../../services/country.service'
import { Country } from '../../interfaces/country.interfaces'
import { filter, switchMap, tap } from 'rxjs'

@Component({
  selector: 'app-country-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent {
  private fb = inject(FormBuilder)

  formUtils = FormUtils

  countryService = inject(CountryService)

  regions = signal(this.countryService.regions)
  countriesByRegion = signal<Country[]>([])
  borders = signal<Country[]>([])

  myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required]
  })

  onFormChange = effect((onCleanup) => {
    const regionSubscription = this.onRegionChange()
    const countrySubscription = this.onCountryChange()

    onCleanup(() => {
      regionSubscription.unsubscribe()
      countrySubscription.unsubscribe()
    })
  })

  onRegionChange() {
    return this.myForm.get('region')!.valueChanges
      .pipe(
        tap (() => this.myForm.get('country')!.setValue('')),
        tap (() => this.myForm.get('border')!.setValue('')),
        tap (() => {
          this.borders.set([])
          this.countriesByRegion.set([])
        }),
        switchMap ( region => this.countryService.getCountriesByRegion(region) ),
      )
      .subscribe((countries) => {
        this.countriesByRegion.set(countries)
        console.log('Countries by region updated:', countries)
    })
  }

  onCountryChange() {
    return this.myForm
      .get('country')!
      .valueChanges.pipe(
        tap(() => this.myForm.get('border')!.setValue('')),
        filter((value) => value!.length > 0),
        switchMap((countryCode) =>
          this.countryService.getCountryByCode(countryCode ?? '')
        ),
        switchMap((country) =>
          this.countryService.getCountryNameByCodeArray((country as Country).borders)
        )
      )
      .subscribe((borders) => {
        console.log('Selected country borders:', borders);
        this.borders.set(borders);
      });
  }
}
