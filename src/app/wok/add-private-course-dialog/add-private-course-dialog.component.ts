import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import {IUserTeam} from "../../shared/model/user-team.model";
import {RegistrationService} from "../../shared/services/registration.service";
import {UserTeamService} from "../../shared/services/user-team.service";

@Component({
  selector: 'wok-add-private-course-dialog',
  templateUrl: './add-private-course-dialog.component.html',
  styleUrls: ['./add-private-course-dialog.component.scss']
})
export class AddPrivateCourseDialogComponent implements OnInit {
  userTeams?: IUserTeam[];

  constructor(
    public dialogRef: MatDialogRef<AddPrivateCourseDialogComponent>,
    protected registrationService: RegistrationService,
    protected userTeamService: UserTeamService,
    protected toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUserTeams();
  }

  getUserTeams(): void {
    this.userTeamService.findUserTeamsByAccount().subscribe((res: HttpResponse<IUserTeam[]>) => {
      this.userTeams = res.body || [];
    });
  }

  joinCourse(code: string, userTeamId: string): void {
    this.subscribeToSaveResponse(this.registrationService.createPublicRegistration(code, Number(userTeamId)));
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserTeam>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.toastService.success('Joined successfully');
    this.onNoClick();
  }

  protected onSaveError(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
