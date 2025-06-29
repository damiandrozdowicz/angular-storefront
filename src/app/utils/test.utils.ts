import {ComponentFixture} from '@angular/core/testing';

export function getElementByTestId<T, K extends string>(
  fixture: ComponentFixture<T>,
  testid: K
): HTMLElement | null {
  return fixture.nativeElement.querySelector(`[data-testid="${testid}"]`);
}
