import Category from '@/api/models/category.models';
import ICategory from '@/api/interfaces/ICategory.interfaces';

class CategoryServices {
  public getCategory = async () => {
    return Category.find();
  };

  public isPresent = async (categoryId: string) => {
    return Category.findOne({ _id: categoryId });
  };

  public validateCategory = async (
    category: ICategory,
    level: number,
    isLeadership: boolean,
    leadershipLevel: number,
    points: number
  ) => {
    let pointsArray: number[] = [];
    const categoryObject = category.toObject();
    if (isLeadership) {
      pointsArray = Object.values(categoryObject.leadershipPoints);
      return pointsArray[leadershipLevel - 1] >= points;
    }

    pointsArray = Object.values(categoryObject.activityPoints);
    return pointsArray[level - 1] >= points;
  };

  public getActivityHead = async () => {
    return Category.find().distinct('activityHead');
  };
  public getActivity = async (activityHead: string) => {
    const data = await Category.find({ activityHead }, { activity: 1, _id: 0 });
    const newData = data.map((item) => {
      return item.activity;
    });
    return newData;
  };
  public getLevel = async (activity: string) => {
    const data = await Category.findOne(
      { activity },
      {
        level: 1,
        isLeadership: 1,
        leadershipPoints: 1,
        activityPoints: 1,
      }
    );
    return { isLeadership: data.isLeadership };
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getPoint = async (query: any) => {
    const { activity, level } = query;
    const isLeadership = query['is-leadership'];
    const leadershipLevel = query['leadership-level'];
    const data = await Category.findOne({ activity, isLeadership });
    const points = data.activityPoints;
    if (isLeadership === 'true') {
      const points = data.leadershipPoints;
      const levelPoints = {
        1: points.coreCoordinator,
        2: points.subCoordinator,
        3: points.volunteer,
      };
      return { point: levelPoints[leadershipLevel] };
    }

    const levelPoints = {
      1: points.level1,
      2: points.level2,
      3: points.level3,
      4: points.level4,
      5: points.level5,
    };
    return { point: levelPoints[level] };
  };
}

export default CategoryServices;
