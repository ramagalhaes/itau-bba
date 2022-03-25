import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessViewOneComponent } from './business-view-one.component';

describe('BusinessViewOneComponent', () => {
  let component: BusinessViewOneComponent;
  let fixture: ComponentFixture<BusinessViewOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessViewOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessViewOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
