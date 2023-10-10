import { Directive,ElementRef,HostListener,Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
/*
El decorador @HostListener captura el evento. Con mouseenter registra la entrada
del ratón y mouseleave cuando sale del componente.
nativeElement hace referencia al elemento del DOM (el componente en el DOM), no
al componente
*/
export class HighlightDirective {
  private _color: string = 'yellow';
  @Input() set appHighLight(color: string) {
  this._color = color;
  }
  get appHighLight(): string {
  return this._color;
  }
  constructor(private el: ElementRef) {
  this.unsetHighlight();
  }
  @HostListener('mouseenter') onMouseEnter() {
  this.setHighlight(); // Llama a poner el elemento en hightlight
  }
  @HostListener('mouseleave') onMouseLeave() {
  this.unsetHighlight(); // Llama a eliminar el elemento de hightlight
  }
  private setHighlight() {
  this.el.nativeElement.classList.add('highlight'); // Propiedades en el global.css
  }
  private unsetHighlight() {
  this.el.nativeElement.classList.remove('highlight'); // Propiedades en el global.css
  }
  }