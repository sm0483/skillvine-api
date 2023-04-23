import Joi from 'joi';
import extractErrorMessages from '@/api/utils/extractErrorMessages.utils';

class ValidateCertificate {
  private schema = Joi.object({
    categoryId: Joi.string().hex().length(24),
    level: Joi.number(),
    duration: Joi.number(),
    year: Joi.number().min(1).max(4),
    certificateDescription: Joi.string(),
    certificateName: Joi.string().min(4).max(50),
    participationDate: Joi.date(),
  });

  public validateUploadCertificate = (data: object) => {
    const scheme = this.schema.fork(
      [
        'categoryId',
        'level',
        'duration',
        'year',
        'certificateDescription',
        'certificateName',
        'participationDate',
      ],
      (schema) => schema.required()
    );

    return extractErrorMessages(scheme, data);
  };

  public validateEditCertificate = (data: object) => {
    return extractErrorMessages(this.schema, data);
  };
}

export default ValidateCertificate;
