import Joi from 'joi';
import extractErrorMessages from '@/api/utils/extractErrorMessages.utils';

class CategoryValidator {
  private querySchema = Joi.object({
    activity: Joi.string().required(),
    level: Joi.number().integer().required(),
    'is-leadership': Joi.string().required(),
    'leadership-level': Joi.number().integer().required(),
  });

  public validateQuery = (data: object) => {
    return extractErrorMessages(this.querySchema, data);
  };
}

export default CategoryValidator;
