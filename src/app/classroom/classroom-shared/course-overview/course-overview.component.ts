import {FormControl} from '@angular/forms';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ICourse} from "../../../shared/model/course.model";
import {IReportResults} from "../../../shared/model/report-results.model";
import {IUser} from "../../../core/user/user.model";
import {IRegistration} from "../../../shared/model/registration.model";
import {CourseService} from "../../../shared/services/course.service";
import {SharedFunctions} from "../../../shared/shared.functions";
import {AccountService} from "../../../core/auth/account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersUserService} from "../../../shared/services/users-user.service";
import {MatDialog} from "@angular/material/dialog";
import {RegistrationService} from "../../../shared/services/registration.service";
import {HttpResponse} from "@angular/common/http";
import {Authority} from "../../../shared/constants/authority.constants";
import {MatTabChangeEvent} from "@angular/material/tabs";


@Component({
  selector: 'wok-course-overview',
  templateUrl: './course-overview.component.html',
  styleUrls: ['./course-overview.component.scss'],
})
export class CourseOverviewComponent implements OnInit {
  @Input() courseId?: number;
  @Input() routePrefix?: string;
  @Input() hasHighAccess = false;
  courseSlug?: string;
  @Input() redirect = 'tab';
  @Output() selectedModuleId: EventEmitter<number> = new EventEmitter<number>();
  course!: ICourse;
  moduleReportResult?: IReportResults[][];
  moduleReportResultT?: IReportResults[][];
  selectedModule?: number;
  selectedUser = -1;
  users?: IUser[];
  registrations?: IRegistration[];
  selected = new FormControl(0);
  showTrainings?: boolean;
  showTransposition = true;

  constructor(
    private courseService: CourseService,
    public sharedFunctions: SharedFunctions,
    public accountService: AccountService,
    private router: Router,
    protected userService: UsersUserService,
    protected dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    protected registrationService: RegistrationService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      if (params) {
        this.courseSlug = params.courseSlug;
      }
      if (!this.routePrefix) {
        this.activatedRoute.data.subscribe((data) => {
          this.routePrefix = data.accessType;
        });
      }
    });
    this.findCourse();
  }

  getReportResultsByModule(id?: number): void {
    if (id) {
      this.selectedModule = id;
    }
    if (
      this.selectedModule &&
      (!this?.moduleReportResult || this.moduleReportResult?.length === 0)
    ) {
      this.userService
        .getReportResultsByModule(this.selectedModule)
        .subscribe((res: HttpResponse<IReportResults[][]>) => {
          this.moduleReportResult = res.body || [];
          this.transpositionToModule();
        });
    }
  }

  findCourse(): void {
    if (this.courseId) {
      this.courseService
        .findCourse(
          this.courseId,
          this.hasHighAccess ? Authority.TEACHER : Authority.USER
        )
        .subscribe((res: HttpResponse<ICourse>) => {
          this.course = res.body || {};
          this.verifyModules();
          if (this.course.modules && this.course.modules.length > 0) {
            this.selectedModule = this.course.modules[0]?.id;
            this.getRegistrations();
            // this.getReportResultsByModule();
          }
        });
    }
  }

  verifyModules(): void {
    if (this.course.modules.length === 1) {
      if (this.redirect === 'tab') {
        this.selectModule(this.course.modules[0].id);
      } else if (this.redirect === 'page') {
        this.router.navigate([
          '/',
          'teacher',
          'module',
          this.course.modules[0].id,
          'manager',
        ]);
      }
    }
  }

  getRegistrations(): void {
    if (this.course && this.course.id) {
      this.registrationService.getAllRegistrationsByCourse(this.course?.id).subscribe((res: HttpResponse<IRegistration[]>) => {
        this.registrations = res.body || [];
      });
    }
  }

  selectModule(moduleId: number): void {
    this.selectedModuleId.emit(moduleId);
  }


  // getAccount(): void {
  //   this.accountService.identity().subscribe((account) => {
  //     if (account) {
  //       this.account = account;
  //     }
  //   });
  // }

  verify(reportResult: IReportResults): boolean {
    if (reportResult.targetScore && reportResult.point) {
      if (reportResult.point >= reportResult.targetScore) {
        return true;
      }
    }
    return false;
  }

  verifyReportResultEmpty(): boolean {
    let empty = true;
    this.moduleReportResult?.forEach((items) => {
      if (items.length > 0) {
        empty = false;
      }
    });
    return empty;
  }

  openDialog(moduleTopicId?: number, userId?: number): void {
    // this.dialog.open(UserResultDialogComponent, {
    //   data: { moduleTopicId, userId },
    // });
  }

  transpositionToModule(): void {
    if (this.moduleReportResult) {
      const newArray: any[][] = [];
      for (let i = 0; i < this.moduleReportResult.length; i++) {
        newArray[i] = [];
        newArray[i]?.push([]);
      }

      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.moduleReportResult.length; i++) {
        for (let j = 0; j < this.moduleReportResult[i].length; j++) {
          newArray[j]?.push(this.moduleReportResult[i][j]);
        }
      }
      const filteredArray: any[][] = [];
      newArray.forEach((item) => {
        if (item.length > 1) {
          item.shift();
          filteredArray?.push(item);
        }
      });
      this.moduleReportResultT = filteredArray;
      console.warn(this.moduleReportResultT);
    }
  }

  transpositionToUser(): void {
    this.transpositionToModule();
    const vetor: any[] = [];
    if (this.selectedUser && this.selectedUser >= 0 && this.moduleReportResultT) {
      this.moduleReportResultT?.forEach((results: IReportResults[]) => {
        vetor.push(results?.filter((result: IReportResults) => {
          return result?.user?.id === this.selectedUser;
        }));
      });
      this.moduleReportResultT = vetor;
    }
  }

  selectedTabChange(event: MatTabChangeEvent): void {
    if (event.index === 0 && this.hasHighAccess) {
      this.getReportResultsByModule();
    }
  }
}
