import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhishingComponent } from './phishing.component';

describe('PhishingComponent', () => {
  let component: PhishingComponent;
  let fixture: ComponentFixture<PhishingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhishingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhishingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
