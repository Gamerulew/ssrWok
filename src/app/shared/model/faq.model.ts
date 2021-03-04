export interface IFaq {
  ask: string;
  answer: string;
  itemorder: number;
  page: string;
  id?: number;
}

export class Faq implements IFaq {
  constructor(public ask: string, public answer: string, public itemorder: number, public page: string, public id?: number) {}
}
