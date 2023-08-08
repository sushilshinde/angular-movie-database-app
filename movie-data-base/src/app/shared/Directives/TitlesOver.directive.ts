import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTitlesOver]',
})
export class TitlesOverDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'red');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'white');
  }
}
