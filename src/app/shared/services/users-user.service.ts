import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import {IUsersUser} from "../model/users-user.model";
import {IReportResults} from "../model/report-results.model";
import {IUserRank} from "../model/user-rank.model";
import {IUserResult, UserResult} from "../model/user-results.model";
import {IUserSkill} from "../model/user-skill.model";
import {SERVER_API_URL} from "../../app.constants";
import {AccountService} from "../../core/auth/account.service";
import {IUserSimpleAuthorities} from "../model/basic-dto/userSimpleAuthorities.model";
import {IUsersUserBasic} from "../model/basic-dto/usersUser-basic.model";
import {IUserBasic} from "../model/basic-dto/user-basic.model";
import {createRequestOption, SearchWithPagination} from "../util/request-util";
import {IUsersAuthoritiesBasic} from "../model/basic-dto/userAuthorities-basic.model";
import {IProfile} from "../model/profile.model";
import {IUserScore} from "../userScores.model";


type EntityResponseType = HttpResponse<IUsersUser>;
type EntityArrayReportResponseType = HttpResponse<IReportResults[][]>;
type EntityArrayResponseType = HttpResponse<IUsersUser[]>;
type EntityArrayRankResponseType = HttpResponse<IUserRank[]>;
type EntityArrayResultsResponseType = HttpResponse<IUserResult[]>;
type EntityMapResultsResponseType = HttpResponse<IUserResult[][]>;
type EntityMapSkillsResponseType = HttpResponse<IUserSkill[][]>;
type EntityArraySkillsResponseType = HttpResponse<IUserSkill[]>;

@Injectable({ providedIn: 'root' })
export class UsersUserService {
  public resourceUrl = SERVER_API_URL + 'api/admin/users';
  public resourceSearchUrl = SERVER_API_URL + 'api/admin/_search/users';
  formattedUserResult?: IUserResult[][];

  constructor(
    protected http: HttpClient,
    protected accountService: AccountService
  ) {}

  create(usersUser: IUsersUser): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(usersUser);
    return this.http
      .post<IUsersUser>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(usersUser: IUsersUser): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(usersUser);
    return this.http
      .put<IUsersUser>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  updateUserBasic(
    usersUser: IUserSimpleAuthorities
  ): Observable<EntityResponseType> {
    return this.http.put<IUserSimpleAuthorities>(
      `${this.resourceUrl}/${usersUser.id}/authorities`,
      usersUser,
      { observe: 'response' }
    );
  }

  getUserResults(
    moduleTopicId: number,
    userId?: number
  ): Observable<EntityMapResultsResponseType> {
    let url = ``;
    if (moduleTopicId && !userId) {
      url = `${SERVER_API_URL}api/account/modules/topics/${moduleTopicId}/submissions/studentResults`;
    } else if (moduleTopicId && userId) {
      url = `${SERVER_API_URL}api/teacher/modules/topics/${moduleTopicId}/users/${userId}/submissions/studentResults`;
    }
    return this.http
      .get<IUserResult[][]>(url, {
        observe: 'response',
      })
      .pipe(
        map((res: EntityMapResultsResponseType) =>
          this.convertMapUserResultDateFromServer(res)
        )
      );
  }

  getUserResultsByModuleAndTopic(
    moduleId: number,
    topicId?: number
  ): Observable<EntityArrayResultsResponseType> {
    return this.http
      .get<IUserResult[]>(
        `${SERVER_API_URL}api/account/modules/${moduleId}/topics/${topicId}/submissions/studentResults`,
        {
          observe: 'response',
        }
      )
      .pipe(
        map((res: EntityArrayResultsResponseType) =>
          this.convertArrayUserResultDateFromServer(res)
        )
      );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IUsersUser>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  findAll(): Observable<EntityArrayResponseType> {
    return this.http.get<IUsersUserBasic[]>(this.resourceUrl, {
      observe: 'response',
    });
  }

  findUsersByTeam(id: number): Observable<EntityArrayResponseType> {
    return this.http
      .get<IUsersUser[]>(`${SERVER_API_URL}api/admin/team/${id}/users`, {
        observe: 'response',
      })
      .pipe(
        map((res: EntityArrayResponseType) =>
          this.convertDateArrayFromServer(res)
        )
      );
  }

  findBasic(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IUserBasic>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  getUserByAccount(): Observable<EntityResponseType> {
    return this.http
      .get<IUsersUser>(`${SERVER_API_URL}api/account/users`, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUsersAuthoritiesBasic[]>(this.resourceUrl, {
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
    return this.http
      .get<IUsersUser[]>(this.resourceSearchUrl, {
        params: options,
        observe: 'response',
      })
      .pipe(
        map((res: EntityArrayResponseType) =>
          this.convertDateArrayFromServer(res)
        )
      );
  }

  getGeneralUserRankByModule(
    moduleId: number
  ): Observable<EntityArrayRankResponseType> {
    let url = ``;
    if (this.accountService.isTeacher()) {
      url = `${SERVER_API_URL}api/teacher/modules/${moduleId}/users/moduleRank`;
    } else if (
      this.accountService.isUser() &&
      !this.accountService.isTeacher()
    ) {
      url = `${SERVER_API_URL}api/account/modules/${moduleId}/users/moduleRank`;
    }
    return this.http.get<IUserRank[]>(url, { observe: 'response' });
  }

  getExerciseUserRankByExercise(
    exerciseId: number,
    req?: any
  ): Observable<EntityArrayRankResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUserRank[]>(
      `${SERVER_API_URL}api/public/exercises/${exerciseId}/users/exerciseRank`,
      {
        params: options,
        observe: 'response',
      }
    );
  }

  getGeneralUserRank(req?: any): Observable<EntityArrayRankResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUserRank[]>(
      `${SERVER_API_URL}api/public/users/generalRank`,
      {
        params: options,
        observe: 'response',
      }
    );
  }

  getUserRankByCourse(
    courseId: number
  ): Observable<EntityArrayRankResponseType> {
    return this.http.get<IUserRank[]>(
      `${SERVER_API_URL}api/public/courses/${courseId}/users/courseRank`,
      { observe: 'response' }
    );
  }

  getReportResultsByModule(
    moduleId: number
  ): Observable<EntityArrayReportResponseType> {
    let url = '';
    if (this.accountService.isTeacher()) {
      url = `${SERVER_API_URL}api/teacher/modules/${moduleId}/reportResults`;
    } else if (this.accountService.isUser()) {
      url = `${SERVER_API_URL}api/account/modules/${moduleId}/reportResults`;
    }
    return this.http
      .get<IReportResults[][]>(url, { observe: 'response' })
      .pipe(
        map((res: EntityArrayReportResponseType) =>
          this.convertReportArrayFromServer(res)
        )
      );
  }

  getUserSkills(): Observable<EntityMapSkillsResponseType> {
    return this.http.get<IUserSkill[][]>(
      `${SERVER_API_URL}api/account/users/skills/`,
      { observe: 'response' }
    );
  }

  getRankUserSkills(slug: string): Observable<EntityArraySkillsResponseType> {
    return this.http.get<IUserSkill[]>(
      `${SERVER_API_URL}api/public/skills/${slug}/users/rankSkill`,
      { observe: 'response' }
    );
  }

  public getProfileByLogin(login: string): Observable<IProfile> {
    return this.http.get<IProfile>(
      `${SERVER_API_URL}api/public/profiles/${login}`
    );
  }

  public getAccountScores(): Observable<IUserScore> {
    return this.http.get<IUserScore>(`${SERVER_API_URL}api/account/reportUser`);
  }

  public getUserSkillsByLogin(
    login: string
  ): Observable<EntityMapSkillsResponseType> {
    return this.http.get<IUserSkill[][]>(
      `${SERVER_API_URL}api/account/users/${login}/skills`,
      { observe: 'response' }
    );
  }

  protected convertDateFromClient(usersUser: IUsersUser): IUsersUser {
    const copy: IUsersUser = Object.assign({}, usersUser, {
      emailVerifiedAt:
        usersUser.emailVerifiedAt && usersUser.emailVerifiedAt.isValid()
          ? usersUser.emailVerifiedAt.toJSON()
          : undefined,
      lastAccess:
        usersUser.lastAccess && usersUser.lastAccess.isValid()
          ? usersUser.lastAccess.toJSON()
          : undefined,
      firstAccess:
        usersUser.firstAccess && usersUser.firstAccess.isValid()
          ? usersUser.firstAccess.toJSON()
          : undefined,
      resetDate:
        usersUser.resetDate && usersUser.resetDate.isValid()
          ? usersUser.resetDate.toJSON()
          : undefined,
      createdDate:
        usersUser.createdDate && usersUser.createdDate.isValid()
          ? usersUser.createdDate.toJSON()
          : undefined,
      lastModifiedDate:
        usersUser.lastModifiedDate && usersUser.lastModifiedDate.isValid()
          ? usersUser.lastModifiedDate.toJSON()
          : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.emailVerifiedAt = res.body.emailVerifiedAt
        ? moment(res.body.emailVerifiedAt)
        : undefined;
      res.body.lastAccess = res.body.lastAccess
        ? moment(res.body.lastAccess)
        : undefined;
      res.body.firstAccess = res.body.firstAccess
        ? moment(res.body.firstAccess)
        : undefined;
      res.body.resetDate = res.body.resetDate
        ? moment(res.body.resetDate)
        : undefined;
      res.body.createdDate = res.body.createdDate
        ? moment(res.body.createdDate)
        : undefined;
      res.body.lastModifiedDate = res.body.lastModifiedDate
        ? moment(res.body.lastModifiedDate)
        : undefined;
      if (res.body.profile) {
        res.body.profile.birthday = res.body.profile?.birthday
          ? moment(res.body.profile?.birthday)
          : undefined;
      }
    }
    return res;
  }

  protected convertDateArrayFromServer(
    res: EntityArrayResponseType
  ): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((usersUser: IUsersUser) => {
        usersUser.emailVerifiedAt = usersUser.emailVerifiedAt
          ? moment(usersUser.emailVerifiedAt)
          : undefined;
        usersUser.lastAccess = usersUser.lastAccess
          ? moment(usersUser.lastAccess)
          : undefined;
        usersUser.firstAccess = usersUser.firstAccess
          ? moment(usersUser.firstAccess)
          : undefined;
        usersUser.resetDate = usersUser.resetDate
          ? moment(usersUser.resetDate)
          : undefined;
        usersUser.createdDate = usersUser.createdDate
          ? moment(usersUser.createdDate)
          : undefined;
        usersUser.lastModifiedDate = usersUser.lastModifiedDate
          ? moment(usersUser.lastModifiedDate)
          : undefined;
      });
    }
    return res;
  }

  protected convertReportArrayFromServer(
    res: EntityArrayReportResponseType
  ): EntityArrayReportResponseType {
    if (res.body) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      res.body = Object.keys(res.body).map((key) =>
        res.body ? res.body[key] : []
      );
    }
    return res;
  }

  protected convertResultArrayFromServer(
    res: EntityMapResultsResponseType
  ): EntityMapResultsResponseType {
    if (res.body) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      res.body = Object.keys(res.body).map((key) =>
        res.body ? res.body[key] : []
      );
    }
    return res;
  }

  protected convertArrayUserResultDateFromServer(
    res: EntityArrayResultsResponseType
  ): EntityArrayResultsResponseType {
    if (res.body) {
      res.body.forEach((userResult, i) => {
        if (res.body) {
          res.body[i] = new UserResult();
          res.body[i].submitTime = userResult.submitTime
            ? moment(userResult.submitTime)
            : undefined;
          res.body[i].difficultyLevelId = userResult.difficultyLevelId;
          res.body[i].nameExercise = userResult.nameExercise;
          res.body[i].idExercise = userResult.idExercise;
          res.body[i].idSubmission = userResult.idSubmission;
          res.body[i].slugExercise = userResult.slugExercise;
          res.body[i].descriptionExercise = userResult.descriptionExercise;
          res.body[i].descriptionRunResult = userResult.descriptionRunResult;
          res.body[i].runPercentA = userResult.runPercentA;
          res.body[i].runPercentB = userResult.runPercentB;
          res.body[i].runPercentC = userResult.runPercentC;
          res.body[i].runPercentD = userResult.runPercentD;
          res.body[i].idRunResult = userResult.idRunResult;
          res.body[i].cacheResultScoreExercise =
            userResult.cacheResultScoreExercise;
          res.body[i].cacheResultScoreTopic = userResult.cacheResultScoreTopic;
          res.body[i].cacheResultLevelExercise =
            userResult.cacheResultLevelExercise;
          res.body[i].cacheResultLevelTopic = userResult.cacheResultLevelTopic;
        }
      });
    }
    return res;
  }

  protected convertMapUserResultDateFromServer(
    res: EntityMapResultsResponseType
  ): EntityMapResultsResponseType {
    if (res.body) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      res.body = Object.keys(res.body).map((key) =>
        res.body ? res.body[key] : []
      );
      // console.warn(res.body)
      res.body.forEach((userResults, i) => {
        userResults.forEach((userResult, j) => {
          if (res.body) {
            res.body[i][j] = new UserResult();
            res.body[i][j].submitTime = userResult.submitTime
              ? moment(userResult.submitTime)
              : undefined;
            res.body[i][j].difficultyLevelId = userResult.difficultyLevelId;
            res.body[i][j].nameExercise = userResult.nameExercise;
            res.body[i][j].idExercise = userResult.idExercise;
            res.body[i][j].idSubmission = userResult.idSubmission;
            res.body[i][j].slugExercise = userResult.slugExercise;
            res.body[i][j].descriptionExercise = userResult.descriptionExercise;
            res.body[i][j].descriptionRunResult =
              userResult.descriptionRunResult;
            res.body[i][j].runPercentA = userResult.runPercentA;
            res.body[i][j].runPercentB = userResult.runPercentB;
            res.body[i][j].runPercentC = userResult.runPercentC;
            res.body[i][j].runPercentD = userResult.runPercentD;
            res.body[i][j].idRunResult = userResult.idRunResult;
            res.body[i][j].cacheResultScoreExercise =
              userResult.cacheResultScoreExercise;
            res.body[i][j].cacheResultScoreTopic =
              userResult.cacheResultScoreTopic;
            res.body[i][j].cacheResultLevelExercise =
              userResult.cacheResultLevelExercise;
            res.body[i][j].cacheResultLevelTopic =
              userResult.cacheResultLevelTopic;
            // res.body[i][j] = {
            //   ...new UserResult(),
            //   submitTime: userResult.submitTime ? moment(userResult.submitTime) : undefined,
            //   difficultyLevelId: userResult.difficultyLevelId,
            //   exercise: userResult.exercise,
            //   runPercentA: userResult.runPercentA,
            //   runPercentB: userResult.runPercentB,
            //   runPercentC: userResult.runPercentC,
            //   runPercentD: userResult.runPercentD,
            //   runResult: userResult.runResult,
            //   expectedResults: userResult.expectedResults,
            //   cacheResultScoreExercise: userResult.cacheResultScoreExercise,
            //   cacheResultScoreTopic: userResult.cacheResultScoreTopic,
            //   cacheResultExercise: userResult.cacheResultExercise,
            //   cacheResultTopic: userResult.cacheResultTopic
            // };
          }
          // userResult.dateSubmission = userResult.dateSubmission ? moment(userResult.dateSubmission) : undefined;
        });
      });
    }
    return res;
  }
}
