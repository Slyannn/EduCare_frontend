import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOrganismComponent } from './update-organism.component';

describe('UpdateOrganismComponent', () => {
  let component: UpdateOrganismComponent;
  let fixture: ComponentFixture<UpdateOrganismComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateOrganismComponent]
    });
    fixture = TestBed.createComponent(UpdateOrganismComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
