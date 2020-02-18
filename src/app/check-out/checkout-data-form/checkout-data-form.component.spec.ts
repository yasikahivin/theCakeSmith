import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutDataFormComponent } from './checkout-data-form.component';

describe('CheckoutDataFormComponent', () => {
  let component: CheckoutDataFormComponent;
  let fixture: ComponentFixture<CheckoutDataFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutDataFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
