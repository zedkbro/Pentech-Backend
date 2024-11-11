import Joi from 'joi';

/* ------Validation For Contact message -----*/
const messageValidator = Joi.object({
  fullName: Joi.string().trim().required().messages({
    'any.required': 'Full name is required',
    'string.empty': 'Full name cannot be empty',
  }),
  email: Joi.string().email().trim().required().messages({
    'any.required': 'Email is required',
    'string.email': 'Email must be a valid email address',
    'string.empty': 'Email cannot be empty',
  }),
  phoneNumber: Joi.string().trim().allow(null).empty('').min(10).max(15).regex(/^\+?\d+$/).messages({
    'string.min': 'Phone number must be at least {#limit} characters',
    'string.max': 'Phone number cannot exceed {#limit} characters',
    'string.pattern.base': 'Phone number must be a valid format',
  }),
  subject: Joi.string().trim().required().messages({
    'any.required': 'Subject is required',
    'string.empty': 'Subject cannot be empty',
  }),
  message: Joi.string().trim().required().messages({
    'any.required': 'Message is required',
    'string.empty': 'Message cannot be empty',
  })
}).unknown(true);

const validateMessage = (message) => {
  return messageValidator.validate(message, { abortEarly: false });
};


/* ------Validation For Partnership  -----*/
const partnershipValidator = Joi.object({
    businessName: Joi.string().trim().required().messages({
      'any.required': 'Business name is required',
      'string.empty': 'Business name cannot be empty',
    }),
    email: Joi.string().email().trim().required().messages({
      'any.required': 'Email is required',
      'string.email': 'Email must be a valid email address',
      'string.empty': 'Email cannot be empty',
    }),
    phoneNumber: Joi.string().trim().allow(null).empty('').min(10).max(15).regex(/^\+?\d+$/).messages({
      'string.min': 'Phone number must be at least {#limit} characters',
      'string.max': 'Phone number cannot exceed {#limit} characters',
      'string.pattern.base': 'Phone number must be a valid format',
    }),
    logo: Joi.string().allow(null).empty('').messages({
      'string.empty': 'Logo cannot be empty',
    }),
    specializeArea: Joi.string().trim().allow(null).default(null),
    description: Joi.string().trim().required().messages({
      'any.required': 'Description is required',
      'string.empty': 'Description cannot be empty',
    }),
    website: Joi.string().trim().allow(null).default(null),
  }).unknown(true);
  
  const validatePartnership = (partnership) => {
    return partnershipValidator.validate(partnership, { abortEarly: false });
  };


/* ------Validation For AboutUS  -----*/
  const aboutUSchema = Joi.object({
    background: Joi.string().trim().required().messages({
      'any.required': 'Background is required',
      'string.empty': 'Background cannot be empty',
    }),
    mission: Joi.string().trim().required().messages({
      'any.required': 'Mission is required',
      'string.empty': 'Mission cannot be empty',
    }),
    vision: Joi.string().trim().required().messages({
      'any.required': 'Vision is required',
      'string.empty': 'Vision cannot be empty',
    }),
    values: Joi.string().trim().required().messages({
      'any.required': 'Values are required',
      'string.empty': 'Values cannot be empty',
    }),
    slogan: Joi.string().trim().allow(null).messages({
      'string.empty': 'Slogan cannot be empty',
    }),
    goals: Joi.string().trim().required().messages({
      'any.required': 'Goals are required',
      'string.empty': 'Goals cannot be empty',
    }),
    programs: Joi.string().trim().required().messages({
      'any.required': 'Programs are required',
      'string.empty': 'Programs cannot be empty',
    }),
    plans: Joi.string().trim().required().messages({
      'any.required': 'Plans are required',
      'string.empty': 'Plans cannot be empty',
    }),
    image: Joi.string().allow(null).messages({
      'string.empty': 'Image cannot be empty',
    }),
  }).unknown(true);
  
  const validateAboutUs = (aboutUs) => {
    return aboutUSchema.validate(aboutUs, { abortEarly: false });
  };
  
  
/* ------Validation For Home  -----*/
const homeSchema = Joi.object({
  heroTitle: Joi.string().required().messages({
    'any.required': 'Hero Title is required',
    'string.empty': 'Hero Title cannot be empty',
  }),
  heroDescription: Joi.string().required().messages({
    'any.required': 'Hero Description is required',
    'string.empty': 'Hero Description cannot be empty',
  }),
  heroImage: Joi.string().allow(null).messages({
    'string.empty': 'Hero Image cannot be empty',
  })
}).unknown(true);

const validateHome = (home) => {
  return homeSchema.validate(home, { abortEarly: false });
};


  /* ------Validation For Career  -----*/
const applicationValidator = Joi.object({
  fullName: Joi.string().trim().required().messages({
    'any.required': 'Full name is required',
    'string.empty': 'Full name cannot be empty',
  }),
  email: Joi.string().email().trim().required().messages({
    'any.required': 'Email is required',
    'string.email': 'Email must be a valid email address',
    'string.empty': 'Email cannot be empty',
  }),
  phoneNumber: Joi.string().trim().min(10).max(15).regex(/^\+?\d+$/).messages({
    'string.min': 'Phone number must be at least {#limit} characters',
    'string.max': 'Phone number cannot exceed {#limit} characters',
    'string.pattern.base': 'Phone number must be a valid format',
  })
}).unknown(true);

const validateApplication = (application) => {
  return applicationValidator.validate(application, { abortEarly: false });
};
  
  /* ------Validation For Career Files  -----*/

  const applicationFileValidator = Joi.object({
    cv: Joi.any().required().messages({
      'any.required': 'CV file is required',
    }),
    applicationLetter: Joi.any().required().messages({
      'any.required': 'Application letter is required',
    })
  }).unknown(true);
  
  const validateApplicationFiles = (files) => {
    return applicationFileValidator.validate(files, { abortEarly: false });
  };
  
  export default { validateMessage, validatePartnership, validateAboutUs, validateHome,
    validateApplication, validateApplicationFiles
   };