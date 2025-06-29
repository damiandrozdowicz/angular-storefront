import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HttpClient} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {MockProvider} from 'ng-mocks';
import {getElementByTestId} from '../utils/test.utils';
import {Hero} from './hero';

enum ElementTestId {
  Title = 'title',
  Image = 'image',
}

describe('Hero - template integrity', () => {
  it('should render title', () => {
    const {fixture} = setup();
    expect(getElementByTestId(fixture, ElementTestId.Title)).toBeTruthy();
  });

  it('should render image', () => {
    const {fixture} = setup();
    expect(getElementByTestId(fixture, ElementTestId.Image)).toBeTruthy();
  });
});

function setup(): {
  fixture: ComponentFixture<Hero>,
  component: Hero,
} {
  TestBed.configureTestingModule({
    imports: [CommonModule],
    providers: [
      MockProvider(HttpClient),
    ]
  }).compileComponents();

  const fixture = TestBed.createComponent(Hero);
  const component = fixture.componentInstance;

  fixture.detectChanges();

  return {
    fixture,
    component,
  };
}
