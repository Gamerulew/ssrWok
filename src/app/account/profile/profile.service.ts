import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import {IProfile} from "../../shared/model/profile.model";
import {SERVER_API_URL} from "../../app.constants";
import {createRequestOption, SearchWithPagination} from "../../shared/util/request-util";

type EntityResponseType = HttpResponse<IProfile>;
type EntityArrayResponseType = HttpResponse<IProfile[]>;

@Injectable({ providedIn: 'root' })
export class ProfileService {
  public resourceUrl = SERVER_API_URL + 'api/account/profile/';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/profiles';
  public imageUploadUrl = SERVER_API_URL + 'api/account/users/image';

  constructor(protected http: HttpClient) {}

  update(profile: IProfile): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(profile);
    return this.http
      .put<IProfile>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProfile>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProfile[]>(this.resourceUrl, {
        params: options,
        observe: 'response',
      })
      .pipe(
        map((res: EntityArrayResponseType) =>
          this.convertDateArrayFromServer(res)
        )
      );
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProfile[]>(this.resourceSearchUrl, {
        params: options,
        observe: 'response',
      })
      .pipe(
        map((res: EntityArrayResponseType) =>
          this.convertDateArrayFromServer(res)
        )
      );
  }

  protected convertDateFromClient(profile: IProfile): IProfile {
    const copy: IProfile = Object.assign({}, profile, {
      birthday:
        profile.birthday && profile.birthday.isValid()
          ? profile.birthday.toJSON()
          : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.birthday = res.body.birthday
        ? moment(res.body.birthday)
        : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(
    res: EntityArrayResponseType
  ): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((profile: IProfile) => {
        profile.birthday = profile.birthday
          ? moment(profile.birthday)
          : undefined;
      });
    }
    return res;
  }

  getProfile(): Observable<EntityResponseType> {
    return this.http.get<IProfile>(`${this.resourceUrl}`, {
      observe: 'response',
    });
    // .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  imageUpload(image: File): Observable<HttpResponse<boolean>> {
    const formData: FormData = new FormData();
    formData.append('file', image, image.name);
    return this.http.put<boolean>(this.imageUploadUrl, formData, {
      observe: 'response',
    });
    // .pipe(map(() => { return true; }));
  }
}
