export interface ITopicBasic {
  id?: number;
  name?: string;
  slug?: string;
  imageUrl?: string;
  langKey?: string;
}

export class TopicBasic implements ITopicBasic {
  constructor(public id?: number, public name?: string, public slug?: string, public imageUrl?: string, public langKey?: string) {}
}
