import Joi from 'joi';
import extractErrorMessages from '../utils/extractErrorMessages.utils';

const validateStudent = (data: object) => {
  const regexAdmissionNumber = /^\d{2}[a-z]{2}\d{5}$/i;
  const regexKtuId = /^(LKTE|[a-z]{3})\d{2}[a-z]{2}\d{3,4}$/i;

  const scheme = Joi.object({
    ktuId: Joi.string().pattern(regexKtuId),
    college: Joi.string().required(),
    admissionNumber: Joi.string().pattern(regexAdmissionNumber),
    batch: Joi.string().required(),
  });

  return extractErrorMessages(scheme, data);
};

export default {
  validateStudent,
};
