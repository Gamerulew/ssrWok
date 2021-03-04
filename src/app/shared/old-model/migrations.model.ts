export interface IMigrations {
  id?: number;
  migration?: string;
  batch?: number;
}

export class Migrations implements IMigrations {
  constructor(public id?: number, public migration?: string, public batch?: number) {}
}
