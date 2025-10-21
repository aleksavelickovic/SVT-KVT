import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RegistrationRequests} from './registration-requests';

describe('RegistrationRequests', () => {
  let component: RegistrationRequests;
  let fixture: ComponentFixture<RegistrationRequests>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationRequests]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegistrationRequests);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
