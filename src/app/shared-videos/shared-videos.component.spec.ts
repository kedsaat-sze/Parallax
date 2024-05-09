import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedVideosComponent } from './shared-videos.component';

describe('SharedVideosComponent', () => {
  let component: SharedVideosComponent;
  let fixture: ComponentFixture<SharedVideosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharedVideosComponent]
    });
    fixture = TestBed.createComponent(SharedVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
