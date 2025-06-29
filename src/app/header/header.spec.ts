import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { MockComponent, MockProvider } from 'ng-mocks';
import { getElementByTestId } from '../utils/test.utils';
import { Header } from './header';
import { Cart } from '../cart/cart';
import { HttpClient } from '@angular/common/http';

enum ElementTestId {
  Logo = 'logo',
  Cart = 'cart',
}

describe('Header - template integrity', () => {
  it('should render logo', () => {
    const { fixture } = setup();
    expect(getElementByTestId(fixture, ElementTestId.Logo)).toBeTruthy();
  });

  it('should render cart', () => {
    const { fixture } = setup();
    expect(getElementByTestId(fixture, ElementTestId.Cart)).toBeTruthy();
  });
});

function setup(): {
  fixture: ComponentFixture<Header>;
  component: Header;
} {
  TestBed.configureTestingModule({
    imports: [CommonModule, MockComponent(Cart)],
    providers: [MockProvider(HttpClient)],
  }).compileComponents();

  const fixture = TestBed.createComponent(Header);
  const component = fixture.componentInstance;

  fixture.detectChanges();

  return {
    fixture,
    component,
  };
}
