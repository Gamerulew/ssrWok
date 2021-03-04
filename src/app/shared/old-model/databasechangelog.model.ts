import { Moment } from 'moment';

export interface IDatabasechangelog {
  id?: number;
  author?: string;
  filename?: string;
  dateexecuted?: Moment;
  orderexecuted?: number;
  exectype?: string;
  md5sum?: string;
  description?: string;
  comments?: string;
  tag?: string;
  liquibase?: string;
  contexts?: string;
  labels?: string;
  deploymentId?: string;
}

export class Databasechangelog implements IDatabasechangelog {
  constructor(
    public id?: number,
    public author?: string,
    public filename?: string,
    public dateexecuted?: Moment,
    public orderexecuted?: number,
    public exectype?: string,
    public md5sum?: string,
    public description?: string,
    public comments?: string,
    public tag?: string,
    public liquibase?: string,
    public contexts?: string,
    public labels?: string,
    public deploymentId?: string
  ) {}
}
