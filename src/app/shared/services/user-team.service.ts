import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {IUserTeam} from "../model/user-team.model";
import {SERVER_API_URL} from "../../app.constants";
import {AccountService} from "../../core/auth/account.service";
import {IRegistration} from "../model/registration.model";
import {createRequestOption, SearchWithPagination} from "../util/request-util";


type EntityResponseType = HttpResponse<IUserTeam>;
type EntityArrayResponseType = HttpResponse<IUserTeam[]>;

@Injectable({ providedIn: 'root' })
export class UserTeamService {
  public resourceUrl = SERVER_API_URL + 'api/admin/users/teams';
  public resourceSearchUrl = SERVER_API_URL + 'api/admin/_search/users/teams';

  constructor(
    protected http: HttpClient,
    protected accountService: AccountService
  ) {}

  create(usersUserTeam: IUserTeam): Observable<EntityResponseType> {
    return this.http.post<IUserTeam>(this.resourceUrl, usersUserTeam, {
      observe: 'response',
    });
  }

  update(usersUserTeam: IUserTeam): Observable<EntityResponseType> {
    return this.http.put<IUserTeam>(this.resourceUrl, usersUserTeam, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUserTeam>(`${this.resourceUrl}/${id}`, {
      observe: 'response',
    });
  }

  findAll(): Observable<EntityArrayResponseType> {
    return this.http.get<IUserTeam[]>(this.resourceUrl, {
      observe: 'response',
    });
  }

  findUserTeamsByAccount(): Observable<EntityArrayResponseType> {
    let url = '';
    if (this.accountService.isTeacher()) {
      url = `${SERVER_API_URL}api/teacher/userteams`;
    } else if (
      this.accountService.isUser() &&
      !this.accountService.isTeacher()
    ) {
      url = `${SERVER_API_URL}api/account/userteams`;
    }
    return this.http.get<IRegistration[]>(url, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUserTeam[]>(this.resourceUrl, {
      params: options,
      observe: 'response',
    });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {
      observe: 'response',
    });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUserTeam[]>(this.resourceSearchUrl, {
      params: options,
      observe: 'response',
    });
  }
}
