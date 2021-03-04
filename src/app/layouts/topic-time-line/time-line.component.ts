import {MatDialog} from '@angular/material/dialog';
import {Component, Input} from '@angular/core';
import {IDisciplineTopic} from "../../shared/model/discipline-topic.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SharedFunctions} from "../../shared/shared.functions";
import {RegisterComponent} from "../../shared/register/register.component";
import {TopicService} from "../../shared/services/topic.service";


@Component({
  selector: 'wok-topic-timeline',
  templateUrl: 'time-line.component.html'
})
export class TimeLineComponent {
  @Input() public topicByLevel!: IDisciplineTopic[][];
  @Input() courseId?: number;
  @Input() link?: string;

  constructor(
    protected topicService: TopicService,
    protected modalService: NgbModal,
    public sharedFunctions: SharedFunctions,
    public dialog: MatDialog
  ) {
  }

  setImgLink(link: string): string {
    return this.sharedFunctions.getImageDir() + link;
  }

  setLink(id: number): string {
    if (this.sharedFunctions.isAdmin()) {
      return `#/admin/topic/${id}/view`;
    } else if (this.sharedFunctions.isUser() || this.sharedFunctions.isTeacher()) {
      // return `account/classroom/${this.courseId}?moduleId=${moduleId}&topicId=${topicId}`
    }
    return "";

  }

  verifyLogin(): boolean {
    if (!this.sharedFunctions.isAdmin() && !this.sharedFunctions.isUser() && !this.sharedFunctions.isTeacher()) {
      return false;
    } else {
      return true;
    }
  }

  openDialog(): void {
    this.dialog.open(RegisterComponent, {
      width: '500px'
    });
  }
}
