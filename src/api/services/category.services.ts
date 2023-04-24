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
}

export default CategoryServices;
