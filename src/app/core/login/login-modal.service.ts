import {Injectable} from '@angular/core';

import {MatDialog} from "@angular/material/dialog";
import {LoginModalComponent} from "../../shared/login/login.component";

@Injectable({providedIn: 'root'})
export class LoginModalService {
  private isOpen = false;

  constructor(public dialog: MatDialog) {
  }

  open(data?: any): void {
    if (this.isOpen) {
      return;
    }
    this.isOpen = true;

    this.openDialog(data);
  }

  openDialog(data?: any): void {
    const dialogRef = this.dialog.open(LoginModalComponent, data);

    dialogRef.afterClosed().subscribe(() => {
      this.isOpen = false;
    });
  }
}
