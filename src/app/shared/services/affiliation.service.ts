import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import {IAffiliation} from "../model/affiliation.model";
import {SERVER_API_URL} from "../../app.constants";
import {SharedFunctions} from "../shared.functions";
import {createRequestOption, SearchWithPagination} from "../util/request-util";
import {IAffiliationBasic} from "../model/basic-dto/affiliation-basic.model";



type EntityResponseType = HttpResponse<IAffiliation>;
type EntityArrayResponseType = HttpResponse<IAffiliation[]>;

@Injectable({ providedIn: 'root' })
export class AffiliationService {
  public resourceUrl = SERVER_API_URL + 'api/admin/affiliations';
  public resourceSearchUrl = SERVER_API_URL + 'api/admin/_search/affiliations';

  constructor(protected http: HttpClient, protected sharedFunctions: SharedFunctions) {}

  create(affiliation: IAffiliation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(affiliation);
    return this.http
      .post<IAffiliation>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(affiliation: IAffiliation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(affiliation);
    return this.http
      .put<IAffiliation>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAffiliation>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAffiliation[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  getAllAffiliation(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAffiliationBasic[]>(`${SERVER_API_URL}api/public/affiliations`, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAffiliation[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(affiliation: IAffiliation): IAffiliation {
    const copy: IAffiliation = Object.assign({}, affiliation, {
      createdDate: affiliation.createdDate && affiliation.createdDate.isValid() ? affiliation.createdDate.toJSON() : undefined,
      lastModifiedDate:
        affiliation.lastModifiedDate && affiliation.lastModifiedDate.isValid() ? affiliation.lastModifiedDate.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdDate = res.body.createdDate ? moment(res.body.createdDate) : undefined;
      res.body.lastModifiedDate = res.body.lastModifiedDate ? moment(res.body.lastModifiedDate) : undefined;
      res.body.imageUrl = this.sharedFunctions.getImageDir() + res.body.imageUrl;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((affiliation: IAffiliation) => {
        affiliation.createdDate = affiliation.createdDate ? moment(affiliation.createdDate) : undefined;
        affiliation.lastModifiedDate = affiliation.lastModifiedDate ? moment(affiliation.lastModifiedDate) : undefined;
        affiliation.imageUrl = this.sharedFunctions.getImageDir() + affiliation.imageUrl;
      });
    }
    return res;
  }
}
