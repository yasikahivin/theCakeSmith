import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDescriptionComponent } from './custom-description.component';

describe('CustomDescriptionComponent', () => {
  let component: CustomDescriptionComponent;
  let fixture: ComponentFixture<CustomDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
