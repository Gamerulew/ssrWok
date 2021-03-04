import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {mergeMap} from 'rxjs/operators';
import {MatDialog} from "@angular/material/dialog";
import {ActivateService} from "./activate.service";
import {LoginModalService} from "../../core/login/login-modal.service";
import {AccountService} from "../../core/auth/account.service";
import {ActivatedDialogComponent} from "./activated-dialog/activated-dialog.component";


@Component({
  selector: 'wok-activate',
  templateUrl: './activate.component.html'
})
export class ActivateComponent implements OnInit {
  error = false;
  success = false;

  constructor(
    public dialog: MatDialog,
    private activateService: ActivateService,
    private loginModalService: LoginModalService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private accountService: AccountService) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ActivatedDialogComponent, {width: '500px'});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['/account/dashboard']);
      } else {
        this.router.navigate(['/home']);
      }
    });
  }

  ngOnInit(): void {
    if (this.accountService.isAuthenticated()) {
      this.openDialog();
    }
    this.activatedRoute.queryParams.pipe(mergeMap(params => this.activateService.get(params.key))).subscribe(
      () => (this.success = true),
      () => (this.error = true)
    );
  }

  login(): void {
    this.loginModalService.open();
  }
}
