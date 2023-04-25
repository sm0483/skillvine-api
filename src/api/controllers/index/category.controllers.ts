import { StatusCodes } from 'http-status-codes';
import IFileUserRequest from '@/api/interfaces/IFileUserRequest.interfaces';
import { Response } from 'express';
import CustomError from '@/api/utils/customError.utils';
import CategoryServices from '@/api/services/category.services';

class CategoryController {
  private categoryServices: CategoryServices = new CategoryServices();
  public getCategory = async (req: IFileUserRequest, res: Response) => {
    const categories = await this.categoryServices.getCategory();
    if (categories.length === 0)
      throw new CustomError('Category not found', StatusCodes.NOT_FOUND);
    return res.status(StatusCodes.OK).json(categories);
  };
}

export default CategoryController;
