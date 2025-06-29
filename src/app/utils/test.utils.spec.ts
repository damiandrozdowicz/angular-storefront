import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {getElementByTestId} from './test.utils';

@Component({
  standalone: true,
  template: `
    <div data-testid="test-div">Hello World</div>
    <button data-testid="test-button">Click me</button>
  `
})
class TestHostComponent {
}

describe('utils/getElementByTestId', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should find element by data-testid', () => {
    const div = getElementByTestId(fixture, 'test-div');
    expect(div).toBeTruthy();
    expect(div?.textContent).toBe('Hello World');

    const button = getElementByTestId(fixture, 'test-button');
    expect(button).toBeTruthy();
    expect(button?.tagName).toBe('BUTTON');
  });

  it('should return null if no element with testid exists', () => {
    const missing = getElementByTestId(fixture, 'non-existent');
    expect(missing).toBeNull();
  });
});
