import {ComponentFixture, TestBed} from '@angular/core/testing';
import {App} from './app';
import {getElementByTestId} from './utils/test.utils';
import {HttpClient} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {MockProvider} from 'ng-mocks';

enum ElementTestId {
  Games = 'games',
  Hero = 'hero',
  Header = 'header'
}

describe('App - template integrity', () => {
  it('should render hero', () => {
    const {fixture} = setup();
    expect(getElementByTestId(fixture, ElementTestId.Hero)).toBeTruthy();
  });

  it('should render header', () => {
    const {fixture} = setup();
    expect(getElementByTestId(fixture, ElementTestId.Header)).toBeTruthy();
  });

  it('should render games', () => {
    const {fixture} = setup();
    expect(getElementByTestId(fixture, ElementTestId.Games)).toBeTruthy();
  });
});

function setup(): {
  fixture: ComponentFixture<App>,
  component: App,
} {
  TestBed.configureTestingModule({
    imports: [CommonModule],
    providers: [
      MockProvider(HttpClient),
    ]
  }).compileComponents();

  const fixture = TestBed.createComponent(App);
  const component = fixture.componentInstance;

  fixture.detectChanges();

  return {
    fixture,
    component,
  };
}
