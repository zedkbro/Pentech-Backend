import Joi from "joi";

  /* ------Validation For validate Login -----*/
  const loginValidator = Joi.object({
    username: Joi.string().trim().required().messages({
      'any.required': 'Username is required',
      'string.empty': 'Username cannot be empty'
    }),
    password: Joi.string().trim().strict().min(8).required().messages({
      'any.required': 'Password is required',
      'string.empty': 'Password cannot be empty',
      'string.min': 'Password must have a minimum length of {#limit}',
    })
  });

const validateLogin = (login) => {
  return loginValidator.validate(login);
};



/* ------Validation For Admin -----*/
const validator = Joi.object({
  name: Joi.string().trim().required().messages({
    "any.required": "Name is required",
    "string.empty": "Name cannot be empty",
  }),
  email: Joi.string().email().trim().required().messages({
    "any.required": "Email is required",
    "string.email": "Email must be a valid email address",
    "string.empty": "Email cannot be empty",
  }),
  phoneNumber: Joi.string()
    .trim()
    .required()
    .min(10)
    .max(15)
    .regex(/^\+?\d+$/)
    .messages({
      "string.min": "Phone number must be at least {#limit} characters",
      "string.max": "Phone number cannot exceed {#limit} characters",
      "string.pattern.base": "Phone number must be a valid format",
    }),
  password: Joi.string().trim().strict().min(8).required().messages({
    "any.required": "Password is required",
    "string.min": "Password must be at least {#limit} characters",
  }),
  role: Joi.string().trim().valid("admin", "shareholder").required().messages({
    "any.required": "Role is required",
    "string.base": "Role must be a string",
    "any.only": "Role must be either admin or shareholder",
    "string.valid": "Role must be either admin or shareholder",
  }),
  avatar: Joi.string().allow(null).allow("").messages({
    "string.empty": "Avatar cannot be empty",
  }),
}).unknown(true);

const validateAdmin = (admin) => {
  return validator.validate(admin, { abortEarly: false });
};

/* ------Validation For Blogs -----*/
const blogValidator = Joi.object({
  title: Joi.string().trim().required().messages({
    "any.required": "Title is required",
    "string.empty": "Title cannot be empty",
  }),
  category: Joi.string().trim().required().messages({
    "any.required": "Category is required",
    "string.empty": "Category cannot be empty",
  }),
  description: Joi.string().trim().required().messages({
    "any.required": "Description is required",
    "string.empty": "Description cannot be empty",
  }),
  date: Joi.date().required().messages({
    "any.required": "Date is required",
    "date.base": "Date must be a valid date",
  }),
  image: Joi.string().trim().allow(null).default(""),
}).unknown(true);

const validateBlogs = (blog) => {
  return blogValidator.validate(blog, { abortEarly: false });
};

/* ------Validation For News -----*/
const newSchema = Joi.object({
  title: Joi.string().trim().required().messages({
    "any.required": "Title is required",
    "string.empty": "Title cannot be empty",
  }),
  category: Joi.string().trim().required().messages({
    "any.required": "Category is required",
    "string.empty": "Category cannot be empty",
  }),
  body: Joi.string().trim().required().messages({
    "any.required": "Body is required",
    "string.empty": "Body cannot be empty",
  }),
  date: Joi.date().allow(null).default(Date.now).messages({
    "date.base": "Date must be a valid date",
  }),
  image: Joi.string().trim().allow(null).messages({
    "string.empty": "Image cannot be empty",
  }),
}).unknown(true);

const validateNews = (news) => {
  return newSchema.validate(news, { abortEarly: false });
};

/* ------Validation For Products -----*/
const productSchema = Joi.object({
  productTitle: Joi.string().trim().required().messages({
    "any.required": "Product Title is required",
    "string.empty": "Product Title cannot be empty",
  }),
  productDescription: Joi.string().trim().required().messages({
    "any.required": "Product Description is required",
    "string.empty": "Product Description cannot be empty",
  }),
  productImage: Joi.string().trim().allow(null).messages({
    "string.empty": "Product Image cannot be empty",
  }),
}).unknown(true);

const validateProducts = (product) => {
  return productSchema.validate(product, { abortEarly: false });
};

/* ------Validation For  Sub-Services -----*/
const subServiceValidator = Joi.object({
  subServiceTitle: Joi.string().trim().required().messages({
    "any.required": "SubService title is required",
    "string.empty": "SubService title cannot be empty",
  }),
  subServiceDescription: Joi.string().trim().required().messages({
    "any.required": "SubService description is required",
    "string.empty": "SubService description cannot be empty",
  }),
  subServiceImage: Joi.string().trim().default(null),
}).unknown(true);

const validateSubServices = (subservice) => {
  return subServiceValidator.validate(subservice, { abortEarly: false });
};


/* ------Validation For  Services -----*/
const serviceValidator = Joi.object({
  serviceTitle: Joi.string().trim().required().messages({
    "any.required": "Service title is required",
    "string.empty": "Service title cannot be empty",
  }),
  serviceDescription: Joi.string().trim().required().messages({
    "any.required": "Service description is required",
    "string.empty": "Service description cannot be empty",
  }),
  serviceImage: Joi.string().trim().default(""),
}).unknown(true);

const validateServices = (service) => {
  return serviceValidator.validate(service, { abortEarly: false });
};

/* ------Validation For  Careers -----*/
const careerSchema = Joi.object({
  jobTitle: Joi.string().required().messages({
    "any.required": "Job Title is required",
    "string.empty": "Job Title cannot be empty",
  }),
  vacancyNumber: Joi.string().allow(null).messages({
    "string.empty": "Vacancy Number cannot be empty",
  }),
  employmentType: Joi.string().allow(null).messages({
    "string.empty": "Employment Type cannot be empty",
  }),
  responsiblity: Joi.string().allow(null).messages({
    "string.empty": "Responsibility cannot be empty",
  }),
  qualification: Joi.string().required().messages({
    "any.required": "Qualification is required",
    "string.empty": "Qualification cannot be empty",
  }),
  experience: Joi.string().allow(null).messages({
    "string.empty": "Experience cannot be empty",
  }),
  salary: Joi.string().allow(null).messages({
    "string.empty": "Salary cannot be empty",
  }),
  workPlace: Joi.string().allow(null).messages({
    "string.empty": "Work Place cannot be empty",
  }),
  description: Joi.string().required().messages({
    "any.required": "Description is required",
    "string.empty": "Description cannot be empty",
  }),
  deadline: Joi.date().required().messages({
    "any.required": "Deadline is required",
    "date.base": "Deadline must be a valid date",
  }),
  status: Joi.string().allow(null).default("opened").messages({
    "string.empty": "Status cannot be empty",
  }),
}).unknown(true);

const validateCareers = (service) => {
  return careerSchema.validate(service, { abortEarly: false });
};

/* ------Validation For  Professionals -----*/
const professionalSchema = Joi.object({
  titlePrefix: Joi.string().trim().required().messages({
    "any.required": "Title prefix is required",
    "string.empty": "Title prefix cannot be empty",
  }),
  fullName: Joi.string().trim().required().messages({
    "any.required": "Full Name is required",
    "string.empty": "Full Name cannot be empty",
  }),
  profession: Joi.string().trim().required().messages({
    "any.required": "Profession is required",
    "string.empty": "Profession cannot be empty",
  }),
  description: Joi.string().trim().required().messages({
    "any.required": "Description is required",
    "string.empty": "Description cannot be empty",
  }),
  avatar: Joi.string().trim().allow(null).messages({
    "string.empty": "Avatar cannot be empty",
  }),
}).unknown(true);

const validateProfessionals = (professional) => {
  return professionalSchema.validate(professional, { abortEarly: false });
};

/* ------Validation For  Videos -----*/
const videoSchema = Joi.object({
  title: Joi.string().trim().allow(null).messages({
    "string.empty": "Title cannot be empty",
  }),
  description: Joi.string().trim().allow(null).messages({
    "string.empty": "Description cannot be empty",
  }),
  video: Joi.string().trim().required().messages({
    "any.required": "Video is required",
    "string.empty": "Video cannot be empty",
  }),
}).unknown(true);

const validateVideos = (video) => {
  return videoSchema.validate(video, { abortEarly: false });
};

/* ------Validation For  Gallery -----*/
const galleryFileValidator = Joi.object({
  gallery: Joi.any().required().messages({
    "any.required": "Gallery file is required",
  }),
}).unknown(true);

const validateGallery = (gallery) => {
  return galleryFileValidator.validate(gallery, { abortEarly: false });
};

/* ------Validation For  Awards -----*/
const awardSchema = Joi.object({
  title: Joi.string().trim().required().messages({
    "any.required": "Title is required",
    "string.empty": "Title cannot be empty",
  }),
  awardFrom: Joi.string().trim().required().messages({
    "any.required": "Award from is required",
    "string.empty": "Award from cannot be empty",
  }),
  reason: Joi.string().trim().required().messages({
    "any.required": "Reason is required",
    "string.empty": "Reason cannot be empty",
  }),
  body: Joi.string().trim().allow(null).messages({
    "string.empty": "Body cannot be empty",
  }),
  date: Joi.date().allow(null).messages({
    "date.base": "Date is not a valid date",
  }),
  image: Joi.string().trim().allow(null).messages({
    "string.empty": "Image cannot be empty",
  }),
}).unknown(true);

const validateAwards = (award) => {
  return awardSchema.validate(award, { abortEarly: false });
};

/* ------Validation For  organization -----*/
const organizationSchema = Joi.object({
  title: Joi.string().trim().required().messages({
    "any.required": "Title is required",
    "string.empty": "Title cannot be empty",
  }),
  image: Joi.string().trim().allow(null).messages({
    "string.empty": "Image cannot be empty",
  }),
}).unknown(true);

const validateOrganizations = (organization) => {
  return organizationSchema.validate(organization, { abortEarly: false });
};

/*------------ Validation for Privacy and policy ----------------*/

const privacyPolicySchema = Joi.object({
  title: Joi.string().trim().required().messages({
    "any.required": "Title is required",
    "string.empty": "Title cannot be empty",
  }),
  policy: Joi.string().trim().required().messages({
    "any.required": "policy is required",
    "string.empty": "policy cannot be empty",
  }),
}).unknown(true);

const validatePrivacyPolicy = (privacyPolicy) => {
  return privacyPolicySchema.validate(privacyPolicy, { abortEarly: false });
};

const loanCalculatorSchema = Joi.object({
  loanAmount: Joi.string().required().messages({
    "any.required": "loan amount is required",
  }),
  interestRate: Joi.string().required().messages({
    "any.required": "Interest rate is required",
  }),
  loanTerm: Joi.string().required().messages({
    "any.required": "Loan term is required",
    "string.empty": "Loan term cannot be empty",
  }),
}).unknown(true);

const validateLoanCalculator = (loanCalculator) => {
  return loanCalculatorSchema.validate(loanCalculator, { abortEarly: false });
};

const TermsAndConditionsSchema = Joi.object({
  terms: Joi.string().trim().required().messages({
    "any.required": "Terms is required",
    "any.empty": "Terms cannot be empty",
  }),
}).unknown(true);

const validateTermsAndConditions = (termsAndConditions) => {
  return TermsAndConditionsSchema.validate(termsAndConditions, {
    abortEarly: false,
  });
};

const StatisticsSchema = Joi.object({
  milstone: Joi.number().required().messages({
    "any.required": "members  is required",
  }),
  total: Joi.number().required().messages({
    "any.required": "loan distributed is required",
  })
}).unknown(true);

const validateStatistics = (statistics) => {
  return StatisticsSchema.validate(statistics, { abortEarly: false });
};

export default {
  validateLogin,
  validateAdmin,
  validateBlogs,
  validateNews,
  validateProducts,
  validateServices,
  validateSubServices,
  validateCareers,
  validateProfessionals,
  validateVideos,
  validateGallery,
  validateAwards,
  validateOrganizations,
  validatePrivacyPolicy,
  validateLoanCalculator,
  validateTermsAndConditions,
  validateStatistics,
};
