import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import {IModule} from "../model/module.model";
import {IModuleBasic} from "../model/basic-dto/module-basic.model";
import {SERVER_API_URL} from "../../app.constants";
import {AccountService} from "../../core/auth/account.service";
import {Authority} from "../constants/authority.constants";
import {createRequestOption, SearchWithPagination} from "../util/request-util";


type EntityResponseType = HttpResponse<IModule>;
type EntityResponseBasicType = HttpResponse<IModuleBasic>;
type EntityArrayResponseType = HttpResponse<IModule[]>;

@Injectable({ providedIn: 'root' })
export class ModuleService {
  public resourceUrl = SERVER_API_URL + 'api/admin/modules';
  public resourceSearchUrl = SERVER_API_URL + 'api/admin/_search/modules';

  constructor(
    protected http: HttpClient,
    protected accountService: AccountService
  ) {}

  getAccountModuleById(moduleId: number): Observable<EntityResponseType> {
    return this.http.get<IModule>(
      SERVER_API_URL + `api/account/modules/${moduleId}`,
      { observe: 'response' }
    );
  }

  create(module: IModule): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(module);
    return this.http
      .post<IModule>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(module: IModule): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(module);
    return this.http
      .put<IModule>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number, authority?: string): Observable<EntityResponseType> {
    let url = '';
    if (authority === Authority.ADMIN || this.accountService.isAdmin()) {
      url = `${this.resourceUrl}/${id}`;
    } else if (authority === Authority.TEACHER) {
      url = `${SERVER_API_URL}api/teacher/modules/${id}`;
    } else if (authority === Authority.USER || !authority) {
      url = `${SERVER_API_URL}api/account/modules/${id}`;
    }
    return this.http
      .get<IModule>(url, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  findBasic(id: number): Observable<EntityResponseBasicType> {
    return this.http
      .get<IModuleBasic>(`${SERVER_API_URL}api/account/modules/${id}/basic`, {
        observe: 'response',
      })
      .pipe(
        map((res: EntityResponseBasicType) => this.convertDateFromServer(res))
      );
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IModule[]>(this.resourceUrl, {
        params: options,
        observe: 'response',
      })
      .pipe(
        map((res: EntityArrayResponseType) =>
          this.convertDateArrayFromServer(res)
        )
      );
  }

  getModulesByCourseId(courseId: number): Observable<EntityArrayResponseType> {
    return this.http
      .get<IModule[]>(
        `${SERVER_API_URL}api/admin/courses/${courseId}/modules`,
        { observe: 'response' }
      )
      .pipe(
        map((res: EntityArrayResponseType) =>
          this.convertDateArrayFromServer(res)
        )
      );
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {
      observe: 'response',
    });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IModule[]>(this.resourceSearchUrl, {
        params: options,
        observe: 'response',
      })
      .pipe(
        map((res: EntityArrayResponseType) =>
          this.convertDateArrayFromServer(res)
        )
      );
  }

  protected convertDateFromClient(module: IModule): IModule {
    const copy: IModule = Object.assign({}, module, {
      createdDate:
        module.createdDate && module.createdDate.isValid()
          ? module.createdDate.toJSON()
          : undefined,
      lastModifiedDate:
        module.lastModifiedDate && module.lastModifiedDate.isValid()
          ? module.lastModifiedDate.toJSON()
          : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdDate = res.body.createdDate
        ? moment(res.body.createdDate)
        : undefined;
      res.body.lastModifiedDate = res.body.lastModifiedDate
        ? moment(res.body.lastModifiedDate)
        : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(
    res: EntityArrayResponseType
  ): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((module: IModule) => {
        module.createdDate = module.createdDate
          ? moment(module.createdDate)
          : undefined;
        module.lastModifiedDate = module.lastModifiedDate
          ? moment(module.lastModifiedDate)
          : undefined;
      });
    }
    return res;
  }
}
