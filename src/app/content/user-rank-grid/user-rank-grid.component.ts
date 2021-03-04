import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {IUserRank} from "../../shared/model/user-rank.model";
import {AccountService} from "../../core/auth/account.service";
import {CourseService} from "../../shared/services/course.service";
import {SharedFunctions} from "../../shared/shared.functions";
import {ModuleTopicService} from "../../shared/services/module-topic.service";
import {HttpResponse} from "@angular/common/http";
import {UsersUserService} from "../../shared/services/users-user.service";

@Component({
  selector: 'wok-user-rank-grid',
  templateUrl: './user-rank-grid.component.html',
  styleUrls: ['./user-rank-grid.component.scss'],
})
export class UserRankGridComponent implements OnInit {
  @Input() id?: number;
  @Input() rankFor?: string;
  @Input() msgs?: Msg;
  @ViewChild(MatPaginator, {static: true}) paginator?: MatPaginator;
  displayedColumns = [
    'position',
    'photo',
    'user',
    'description',
    'point',
    'average',
    'totalSub',
  ];
  dataSource = new MatTableDataSource<IUserRank>();
  isLoadingResults = false;
  usePagination = false;
  // Paginator
  pageEvent: PageEvent | null = null;
  pageIndex = 0;
  pageSize = 20;
  length?: number;
  search = '';

  constructor(
    public accountService: AccountService,
    protected courseService: CourseService,
    public sharedFunctions: SharedFunctions,
    protected moduleService: ModuleTopicService,
    protected userService: UsersUserService
  ) {
  }

  ngOnInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    this.loadPage();
  }

  getGeneralRank(req?: any): void {
    this.userService.getGeneralUserRank(req).subscribe(
      (res: HttpResponse<IUserRank[]>) => this.onSuccess(res.body),
      () => this.onError()
    );
    // this.userService.getGeneralUserRank(req).subscribe((res: HttpResponse<IUserRank[]>) => {
    //   this.dataSource = new MatTableDataSource<IUserRank>(res.body!['content'] || []);
    // });
  }

  getUserRankByCourse(): void {
    if (this.id) {
      this.userService
        .getUserRankByCourse(this.id)
        .subscribe((res: HttpResponse<IUserRank[]>) => {
          this.dataSource = new MatTableDataSource<IUserRank>(res.body || []);
        });
    }
  }

  getUserModuleRank(): void {
    if (this.id) {
      this.userService
        .getGeneralUserRankByModule(this.id)
        .subscribe((res: HttpResponse<IUserRank[]>) => {
          // this.usersModuleRank = res.body || [];
          this.dataSource = new MatTableDataSource<IUserRank>(res.body || []);
        });
    }
  }

  getUserExerciseRankByExercise(req?: any): void {
    if (this.id) {
      this.userService
        .getExerciseUserRankByExercise(this.id, req)
        .subscribe((res: HttpResponse<IUserRank[]>) => {
          console.warn(res.headers.get('X-Total-Count'));
          this.length = Number(res.headers.get('X-Total-Count'));
          this.dataSource = new MatTableDataSource<IUserRank>(res.body || []);
          if (this.paginator) {
            this.dataSource.paginator = this.paginator;
          }
        });
    }
  }

  applyFilter(event: Event): void {
    this.pageIndex = 0;
    this.search = (event.target as HTMLInputElement).value;
    this.loadPage();
  }

  cleanSerach(): void {
    this.search = '';
    this.loadPage();
  }

  getClassification(nIndex: number): number {
    return this.pageSize
      ? this.pageSize
      : 0 - (this.pageSize ? this.pageSize : 0 - (nIndex + 1));
  }

  // loadPage(event?: PageEvent): PageEvent | null {
  //   if (event) {
  //     this.pageIndex = event.pageIndex;
  //     this.length = event.length;
  //     this.pageSize = event.pageSize;
  //   } else {
  //     this.pageIndex = 0;
  //     this.pageSize = 20;
  //   }
  //   const options = {
  //     page: this.pageIndex,
  //     size: this.pageSize
  //   };
  //   this.userService.getGeneralUserRank(options).subscribe((res: HttpResponse<IUserRank[]>) => {
  //     this.length = Number(res.headers.get('X-Total-Count'));
  //     this.dataSource = new MatTableDataSource<IUserRank>(res.body || []);
  //   });
  //   if (event) {
  //     return event;
  //   } else {
  //     return null;
  //   }
  // }
  loadPage(page?: PageEvent): PageEvent | null {
    if (page) {
      this.pageIndex = page.pageIndex;
      this.pageSize = page.pageSize;
      this.length = page.length;
    } else {
      this.pageIndex = 0;
      this.pageSize = 20;
    }
    let req: any = {page: this.pageIndex, size: this.pageSize};
    if (this.search) {
      req = {page: this.pageIndex, size: this.pageSize, query: this.search};
    }
    if (this.rankFor === 'course') {
      this.getUserRankByCourse();
    } else if (this.rankFor === 'module') {
      this.getUserModuleRank();
    } else if (this.rankFor === 'exercise') {
      this.getUserExerciseRankByExercise(req);
    } else if (this.rankFor === 'general') {
      this.getGeneralRank(req);
    }
    if (page) {
      return page;
    }
    return null;
  }

  protected onSuccess(data: IUserRank[] | null | any): void {
    this.length = data.totalElements;
    this.dataSource = new MatTableDataSource<IUserRank>(data.content || []);
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  protected onError(): void {
  }
}

export interface Msg {
  title: string;
  subTitle: string;
}
