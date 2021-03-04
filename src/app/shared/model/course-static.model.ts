export interface ICourseStatistic {
  amountExercises?: number;
  amountTopics?: number;
}

export class CourseStatistic implements ICourseStatistic {
  constructor(
    public amountExercises?: number,
    public amountTopics?: number
  ) {
  }
}
