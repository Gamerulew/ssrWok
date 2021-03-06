import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserTeamClassroomComponent } from './user-team-classroom.component';
describe('UserTeamClassroomComponent', () => {
  let component: UserTeamClassroomComponent;
  let fixture: ComponentFixture<UserTeamClassroomComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserTeamClassroomComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(UserTeamClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
