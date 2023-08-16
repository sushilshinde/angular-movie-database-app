import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component,ElementRef, DebugElement, Renderer2 } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TitlesOverDirective } from './TitlesOver.directive';

@Component({
  template: `
    <p appTitlesOver>Hover over me</p>
  `,
})
class TestComponent {}

describe('TitlesOverDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let paragraphDebugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TitlesOverDirective, TestComponent],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    paragraphDebugElement = fixture.debugElement.query(By.directive(TitlesOverDirective));
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = new TitlesOverDirective(
      paragraphDebugElement.injector.get(ElementRef),
      paragraphDebugElement.injector.get(Renderer2)
    );
    expect(directive).toBeTruthy();
  });

  it('should change text color to red on mouseenter', () => {
    paragraphDebugElement.triggerEventHandler('mouseenter', {});
    fixture.detectChanges();
    const paragraphElement = paragraphDebugElement.nativeElement;
    expect(paragraphElement.style.color).toBe('red');
  });

  it('should change text color to white on mouseleave', () => {
    paragraphDebugElement.triggerEventHandler('mouseleave', {});
    fixture.detectChanges();
    const paragraphElement = paragraphDebugElement.nativeElement;
    expect(paragraphElement.style.color).toBe('white');
  });
});
