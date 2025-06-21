import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appToUppercase]',
  standalone: true // Añade esto si tu proyecto usa componentes Standalone
})
export class ToUppercaseDirective {

  constructor(private el: ElementRef) { }

  // @HostListener escucha eventos en el elemento que tiene la directiva.
  // Escuchamos el evento 'input' que se dispara con cada cambio.
  @HostListener('input', ['$event']) onInputChange(event: Event): void {
    const inputElement = this.el.nativeElement as HTMLInputElement;

    // Guardamos la posición del cursor para que no salte al final.
    // Esto es CRUCIAL para una buena experiencia de usuario.
    const start = inputElement.selectionStart;
    const end = inputElement.selectionEnd;

    const originalValue = inputElement.value;
    const upperValue = originalValue.toUpperCase();

    // Solo actualizamos el valor si ha cambiado, para evitar bucles.
    if (originalValue !== upperValue) {
      inputElement.value = upperValue;

      // Devolvemos el cursor a su posición original.
      inputElement.setSelectionRange(start, end);

      // Despachamos un nuevo evento 'input' para que los formularios de Angular
      // (ngModel, formControl) se enteren del cambio programático.
      inputElement.dispatchEvent(new Event('input'));
    }
  }
}
