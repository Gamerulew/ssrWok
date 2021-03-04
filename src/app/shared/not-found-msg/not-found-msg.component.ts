import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'wok-not-found-msg',
  templateUrl: './not-found-msg.component.html',
  styleUrls: ['./not-found-msg.component.scss']
})
export class NotFoundMsgComponent implements OnInit {
  @Input() message:string;
  constructor() { }

  ngOnInit(): void {
  }

}
