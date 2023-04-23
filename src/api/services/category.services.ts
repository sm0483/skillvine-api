import Category from '@/api/models/category.models';

class CategoryServices {
  public getCategory = async () => {
    return Category.find();
  };
}

export default CategoryServices;
