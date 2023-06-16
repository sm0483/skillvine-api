import { StatusCodes } from 'http-status-codes';
import IFileUserRequest from '@/api/interfaces/IFileUserRequest.interfaces';
import { Response } from 'express';
import CustomError from '@/api/utils/customError.utils';
import CategoryServices from '@/api/services/category.services';
import { Query } from '@/api/interfaces/IQuery.interfaces';
import CategoryValidator from '@/api/validators/category.validators';

class CategoryController {
  private categoryServices: CategoryServices = new CategoryServices();
  private categoryValidator: CategoryValidator = new CategoryValidator();
  public getCategory = async (req: IFileUserRequest, res: Response) => {
    const categories = await this.categoryServices.getCategory();
    if (categories.length === 0)
      throw new CustomError('Category not found', StatusCodes.NOT_FOUND);
    return res.status(StatusCodes.OK).json(categories);
  };
  public getActivityHead = async (req: IFileUserRequest, res: Response) => {
    const activityHead = await this.categoryServices.getActivityHead();
    if (activityHead.length === 0)
      throw new CustomError('Activity Head not found', StatusCodes.NOT_FOUND);
    return res.status(StatusCodes.OK).json(activityHead);
  };
  public getActivity = async (req: IFileUserRequest, res: Response) => {
    const activityHead = req.query.name;
    if (!activityHead)
      throw new CustomError('Activity Head not found', StatusCodes.BAD_REQUEST);
    const activity = await this.categoryServices.getActivity(
      activityHead as string
    );
    if (activity.length === 0)
      throw new CustomError('Activity not found', StatusCodes.NOT_FOUND);
    return res.status(StatusCodes.OK).json(activity);
  };
  public getLevel = async (req: IFileUserRequest, res: Response) => {
    const activity = req.query.activity;
    if (!activity)
      throw new CustomError('Activity not found', StatusCodes.BAD_REQUEST);
    const level = await this.categoryServices.getLevel(activity as string);
    return res.status(StatusCodes.OK).json(level);
  };
  public getPoint = async (req: IFileUserRequest, res: Response) => {
    const query: unknown = req.query;
    const error = this.categoryValidator.validateQuery(query as object);
    if (error) throw new CustomError(error, StatusCodes.BAD_REQUEST);
    const points = await this.categoryServices.getPoint(query as Query);
    return res.status(StatusCodes.OK).json(points);
  };
}

export default CategoryController;
