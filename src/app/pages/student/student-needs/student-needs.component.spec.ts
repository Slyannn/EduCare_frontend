import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentNeedsComponent } from './student-needs.component';

describe('StudentNeedsComponent', () => {
  let component: StudentNeedsComponent;
  let fixture: ComponentFixture<StudentNeedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentNeedsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentNeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
