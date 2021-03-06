import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import * as moment from 'moment-timezone';
import {Moment} from 'moment';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {MatSort, Sort} from "@angular/material/sort";
import {ModuleTopicService} from "../../../shared/services/module-topic.service";
import {UsersUserService} from "../../../shared/services/users-user.service";
import {ModuleService} from "../../../shared/services/module.service";
import {IModuleTopic} from "../../../shared/model/module-topic.model";
import {IModule} from "../../../shared/model/module.model";
import {IReportResults} from "../../../shared/model/report-results.model";
import {AccountService} from "../../../core/auth/account.service";
import {Authority} from "../../../shared/constants/authority.constants";

interface TimeRemain {
  days: number;
  hours: number;
  minutes: number;
}

@Component({
  selector: 'wok-module-topic-list',
  templateUrl: './module-topic-list.component.html',
  styleUrls: ['./module-topic-list.component.scss'],
})
export class ModuleTopicListComponent implements OnInit {
  @Input() moduleId!: number;
  @Input() hasHighAccess = false;
  @Output()
  selectedTopicContent: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  selectedTopicHistoric: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild(MatPaginator, {static: true}) paginator?: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<IModuleTopic>();
  courseSlug?: string;
  disciplineSlug?: string;
  selectedModule!: IModule;
  topicByLevel?: IModuleTopic[][];
  currentDate?: Moment;
  treeView = false;
  userScore = 1000;
  reportResults?: IReportResults[][];
  showResults = false;
  routePrefix?: string;
  // config$?: Observable<IModuleTopic[][]>;
  resultColumns = [
    'name',
    'status',
    'S/T/M',
    'exercisesA',
    'exercisesB',
    'exercisesC',
    'exercisesD',
    'buttons',
  ];
  commonColumns = ['name', 'status', 'buttons'];

  constructor(
    private moduleService: ModuleService,
    private moduleTopicService: ModuleTopicService,
    public dialog: MatDialog,
    public accountService: AccountService,
    protected userService: UsersUserService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    if (this.hasHighAccess) {
      this.routePrefix = '/teacher';
    } else {
      this.routePrefix = '/account';
    }
    this.activatedRoute.params.subscribe((params: any) => {
      if (params) {
        this.courseSlug = params.courseSlug;
        this.disciplineSlug = params.disciplineSlug;
      }
    });
    // this.cache();
    this.currentDate = moment();
    this.getAccountModuleById();
    this.getReportResultsByModule();
    this.getModuleTopics();
    if (this.paginator && this.sort) {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }

  }

  sortData(sort: Sort): void {
    console.warn(sort);
  }

  getReportResultsByModule(): void {
    if (!this.reportResults) {
      this.userService
        .getReportResultsByModule(this.moduleId)
        .subscribe((res: HttpResponse<IReportResults[][]>) => {
          this.reportResults = res.body || [];
        });
    }
  }

  getI(id: number): number {
    let index = -1;
    if (this.reportResults && this.reportResults.length > 0) {
      this.reportResults.forEach((itemArray, i) => {
        itemArray.forEach((item) => {
          if (item.topic?.id === id) {
            index = i;
          }
        });
      });
    }
    // console.warn(`J:${index} ID parameter: ${id} ID topic: ${idT}`)
    return index;
  }

  getJ(id: number): number {
    let index = -1;
    if (this.reportResults && this.reportResults.length > 0) {
      this.reportResults.forEach((itemArray) => {
        itemArray.forEach((item, j) => {
          if (item.topic?.id === id) {
            index = j;
          }
        });
      });
    }
    // console.warn(`J:${index} ID parameter: ${id} ID topic: ${idT}`)
    return index;
  }

  getTopicLevelFlat(): void {
    if (this.topicByLevel) {
      const topicsModule = this.topicByLevel.reduce(
        (acc, val) => acc.concat(val),
        []
      );
      if (this.showResults) {
        this.getReportResultsByModule();
      }
      this.dataSource = new MatTableDataSource<IModuleTopic>(topicsModule);
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    }
  }

  getModuleTopics(): void {
    this.topicByLevel = undefined;
    this.moduleTopicService
      .getAllModuleTopicByModule(
        this.moduleId,
        this.hasHighAccess ? Authority.TEACHER : Authority.USER
      )
      .subscribe(
        (res: HttpResponse<IModuleTopic[][]>) => {
          this.topicByLevel = res.body || [];
          this.getTopicLevelFlat();
        },
        () => {
          this.topicByLevel = [];
        }
      );
  }

  // private cache():void {
  //   console.warn(this.config$)
  //   if (!this.config$) {
  //     console.warn("nao");
  //     this.config$ = this.http.get(`${SERVER_API_URL}api/account/modules/${this.moduleId}/topics`).pipe(
  //       map(data => data["body"] || []),
  //       shareReplay(200)
  //     );
  //   }
  // }

  getAccountModuleById(): void {
    // if(!this.accountService.isUser()) {
    this.moduleService
      .find(
        this.moduleId,
        this.hasHighAccess ? Authority.TEACHER : Authority.USER
      )
      .subscribe({
        next: (res: HttpResponse<IModule>) => {
          this.selectedModule = res.body || {};
        },
        error: () => (this.selectedModule = {}),
      });
    // }else{
    //   this.modulesService.findBasic(this.moduleId).subscribe((res: HttpResponse<IModuleBasic>) => {
    //     this.selectedModule = res.body || {};
    //   });
    // }
  }

  filterTopics(): void {
    if (this.topicByLevel) {
      const filteredTopics: IModuleTopic[][] = [];
      this.topicByLevel.forEach((topics, i) => {
        filteredTopics[i] = [];
        topics.forEach((topic) => {
          if (
            this.currentDate?.isBetween(topic?.activeTime, topic?.deactiveTime)
          ) {
            filteredTopics[i].push(topic);
          }
        });
      });
      this.topicByLevel = filteredTopics;
      this.getTopicLevelFlat();
    }
  }

  selectTopicContent(selectedTopic: number): void {
    this.selectedTopicContent.emit(selectedTopic);
  }

  selectTopicHistoric(topicId: number): void {
    this.selectedTopicHistoric.emit(topicId);
  }

  toggleSlider(): void {
    this.treeView = !this.treeView;
  }

  public dateEndCompare(endTime: Moment): boolean {
    const currentDate = moment();
    return moment(endTime).isBefore(currentDate);
  }

  dateStartCompare(startTime: Moment, endTime: Moment): boolean {
    const currentDate = moment();
    if (startTime && endTime) {
      return moment(currentDate).isBetween(startTime, endTime);
    }
    return false;
  }

  convertData(date?: Moment): Moment {
    return moment.tz(date, Intl.DateTimeFormat().resolvedOptions().timeZone);
  }

  openDialog(id: number): void {
    // this.dialog.open(UserResultDialogComponent, {
    //   width: '600px',
    //   data: id,
    // });
  }

  verifyInvalidData(element: IModuleTopic): boolean {
    if (
      !element?.startTime ||
      !element?.endTime ||
      !element?.activeTime ||
      !element?.deactiveTime
    ) {
      return true;
    }
    return false;
  }

  checkData(data: Moment): TimeRemain {
    let days = 0;
    let hours = 0;
    let minutes = 0;
    if (this.currentDate) {
      days = data.diff(this.currentDate, 'days');
      hours = data.diff(this.currentDate, 'hours');
      minutes = data.diff(this.currentDate, 'minutes');
    }
    return {days, hours, minutes};
  }

}
