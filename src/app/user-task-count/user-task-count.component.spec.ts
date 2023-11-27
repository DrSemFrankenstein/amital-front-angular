import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTaskCountComponent } from './user-task-count.component';

describe('UserTaskCountComponent', () => {
  let component: UserTaskCountComponent;
  let fixture: ComponentFixture<UserTaskCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserTaskCountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserTaskCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
