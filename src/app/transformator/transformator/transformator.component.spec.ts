import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransformatorComponent } from './transformator.component';

describe('TransformatorComponent', () => {
  let component: TransformatorComponent;
  let fixture: ComponentFixture<TransformatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransformatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransformatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
