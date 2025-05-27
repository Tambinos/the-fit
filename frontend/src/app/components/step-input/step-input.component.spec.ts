import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppStepInputComponent } from './step-input.component';

describe('AppStepInputComponent', () => {
  let component: AppStepInputComponent;
  let fixture: ComponentFixture<AppStepInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppStepInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppStepInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
