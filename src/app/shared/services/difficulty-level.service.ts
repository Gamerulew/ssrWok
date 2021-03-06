import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import {IDifficultyLevel} from "../model/difficulty-level.model";
import {SERVER_API_URL} from "../../app.constants";
import {SharedFunctions} from "../shared.functions";
import {createRequestOption, SearchWithPagination} from "../util/request-util";


type EntityResponseType = HttpResponse<IDifficultyLevel>;
type EntityArrayResponseType = HttpResponse<IDifficultyLevel[]>;

@Injectable({ providedIn: 'root' })
export class DifficultyLevelService {
  public resourceUrl = SERVER_API_URL + 'api/admin/difficulty-levels';
  public resourceSearchUrl =
    SERVER_API_URL + 'api/admin/_search/difficulty-levels';

  constructor(
    protected http: HttpClient,
    protected sharedFunctions: SharedFunctions
  ) {}

  create(difficultyLevel: IDifficultyLevel): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(difficultyLevel);
    return this.http
      .post<IDifficultyLevel>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(difficultyLevel: IDifficultyLevel): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(difficultyLevel);
    return this.http
      .put<IDifficultyLevel>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDifficultyLevel>(`${this.resourceUrl}/${id}`, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDifficultyLevel[]>(this.resourceUrl, {
        params: options,
        observe: 'response',
      })
      .pipe(
        map((res: EntityArrayResponseType) =>
          this.convertDateArrayFromServer(res)
        )
      );
  }
  getAllDifficultyLevels(): Observable<EntityArrayResponseType> {
    if (this.sharedFunctions.isAdmin()) {
      return this.query();
    } else {
      return this.http.get<IDifficultyLevel[]>(
        `${SERVER_API_URL}api/teacher/difficulty-levels`,
        { observe: 'response' }
      );
    }
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {
      observe: 'response',
    });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDifficultyLevel[]>(this.resourceSearchUrl, {
        params: options,
        observe: 'response',
      })
      .pipe(
        map((res: EntityArrayResponseType) =>
          this.convertDateArrayFromServer(res)
        )
      );
  }

  protected convertDateFromClient(
    difficultyLevel: IDifficultyLevel
  ): IDifficultyLevel {
    return Object.assign({}, difficultyLevel, {
      createdDate:
        difficultyLevel.createdDate && difficultyLevel.createdDate.isValid()
          ? difficultyLevel.createdDate.toJSON()
          : undefined,
      lastModifiedDate:
        difficultyLevel.lastModifiedDate &&
        difficultyLevel.lastModifiedDate.isValid()
          ? difficultyLevel.lastModifiedDate.toJSON()
          : undefined,
    });
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
      res.body.forEach((difficultyLevel: IDifficultyLevel) => {
        difficultyLevel.createdDate = difficultyLevel.createdDate
          ? moment(difficultyLevel.createdDate)
          : undefined;
        difficultyLevel.lastModifiedDate = difficultyLevel.lastModifiedDate
          ? moment(difficultyLevel.lastModifiedDate)
          : undefined;
      });
    }
    return res;
  }

  getDifficultyColor(difficultyId: string): string {
    if (difficultyId === 'A') {
      return 'success';
    }
    if (difficultyId === 'B') {
      return 'info';
    }
    if (difficultyId === 'C') {
      return 'warning';
    }
    if (difficultyId === 'D') {
      return 'danger';
    }
    return 'dark';
  }
}
