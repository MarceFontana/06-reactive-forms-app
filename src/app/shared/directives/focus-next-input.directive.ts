import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFocusNextInput]',
  standalone: true // Si usas standalone components, si no, quita esta línea
})
export class FocusNextInputDirective {

  constructor(private _el: ElementRef) { }

  @HostListener('keydown.enter', ['$event'])
  public onEnterKeyDown(event: KeyboardEvent): void {
    // 1. Prevenimos la acción por defecto (enviar el formulario)
    event.preventDefault();

    // 2. Buscamos el formulario contenedor
    const form = (event.target as HTMLElement).closest('form');
    if (!form) {
      return;
    }

    // 3. Obtenemos todos los elementos "enfocables" dentro del formulario
    const focusableElements = Array.from(
      form.querySelectorAll<HTMLElement>('input, textarea, select, button')
    );

    // 4. Encontramos el índice del elemento actual
    const currentElementIndex = focusableElements.findIndex(
      el => el === event.target
    );

    // 5. Movemos el foco al siguiente elemento si existe
    const nextElement = focusableElements[currentElementIndex + 1];
    if (nextElement) {
      nextElement.focus();
    }
  }
}
