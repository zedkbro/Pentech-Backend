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
  milestone: Joi.string().required().messages({
    "any.required": "Milestone  is required",
  }),
  total: Joi.string().required().messages({
    "any.required": "Total is required",
  }),
  description: Joi.string().allow(null).messages({
    "string.empty": "Description cannot be empty",
  }),
}).unknown(true);

const validateStatistics = (statistics) => {
  return StatisticsSchema.validate(statistics, { abortEarly: false });
};


const sectorSchema = Joi.object({
  name: Joi.string().trim().required().messages({
      'any.required': 'Name is required',
      'string.empty': 'Name cannot be empty'
  }),
  description: Joi.string().trim().required().messages({
      'any.required': 'Description is required',
      'string.empty': 'Description cannot be empty'
  })
}).unknown(true);

const validateSector = (sector) => {
  return sectorSchema.validate(sector, { abortEarly: false });
};

const shareSchema = Joi.object({
  shareValue: Joi.string().trim().required().messages({
    'any.required': 'Share value is required',
    'string.empty': 'Share value cannot be empty'
  }),
  description: Joi.string().allow(null).optional(),
}).unknown(true);

const validateShare = (share) => {
  return shareSchema.validate(share, { abortEarly: false });
};

const shareHolderSchema = Joi.object({
  userId: Joi.string().uuid().required().messages({
      'any.required': 'User ID is required',
      'string.empty': 'User ID cannot be empty'
  }),
  shareId: Joi.string().uuid().required().messages({
      'any.required': 'Share ID is required',
      'string.empty': 'Share ID cannot be empty'
  }),
  entityType: Joi.string().trim().required().messages({
      'any.required': 'Entity type is required',
      'string.empty': 'Entity type cannot be empty'
  }),
  nationality: Joi.string().trim().required().messages({
      'any.required': 'Nationality is required',
      'string.empty': 'Nationality cannot be empty'
  }),
  city: Joi.string().trim().required().messages({
      'any.required': 'City is required',
      'string.empty': 'City cannot be empty'
  }),
  country: Joi.string().trim().required().messages({
      'any.required': 'Country is required',
      'string.empty': 'Country cannot be empty'
  }),
  totalShares: Joi.number().integer().min(1).required().messages({
      'any.required': 'Total shares are required',
      'number.base': 'Total shares must be a number',
      'number.integer': 'Total shares must be an integer',
      'number.min': 'Total shares must be at least 1'
  })
}).unknown(true);

const validateShareHolder = (shareHolder) => {
  return shareHolderSchema.validate(shareHolder, { abortEarly: false });
};

const codeOfConductSchema = Joi.object({
  title: Joi.string().trim().required().messages({
      'any.required': 'Title is required',
      'string.empty': 'Title cannot be empty'
  }),
  description: Joi.string().allow(null).optional(),
  file: Joi.string().allow(null).optional()
}).unknown(true);

const validateCodeOfConduct = (codeOfConduct) => {
  return codeOfConductSchema.validate(codeOfConduct, { abortEarly: false });
};

const educationBranchSchema = Joi.object({
  sectorId: Joi.string().uuid().required().messages({
      'any.required': 'Sector ID is required',
      'string.empty': 'Sector ID cannot be empty'
  }),
  name: Joi.string().trim().required().messages({
    'any.required': 'Name is required',
    'string.empty': 'Name cannot be empty'
}),
}).unknown(true);

const validateEducationBranch = (educationBranch) => {
  return educationBranchSchema.validate(educationBranch, { abortEarly: false });
};

const educationProgramSchema = Joi.object({
  branchId: Joi.string().uuid().required().messages({
      'any.required': 'Branch ID is required',
      'string.empty': 'Branch ID cannot be empty'
  }),
  programName: Joi.string().trim().required().messages({
      'any.required': 'Program name is required',
      'string.empty': 'Program name cannot be empty'
  }),
  admissionInfo: Joi.string().allow(null).optional(),
  academicCalendar: Joi.string().allow(null).optional(),
  news: Joi.string().allow(null).optional(),
}).unknown(true);

const validateEducationProgram = (educationProgram) => {
    return educationProgramSchema.validate(educationProgram, { abortEarly: false });
};

const financialPerformanceSchema = Joi.object({
  reportYear: Joi.date().allow(null).optional().messages({
      'date.base': 'Report year must be a valid date'
  }),
  reportType: Joi.string().valid('Annual', 'Quarterly').required().messages({
      'any.required': 'Report type is required',
      'string.empty': 'Report type cannot be empty',
      'any.only': 'Report type must be either "Annual" or "Quarterly"'
  }),
  description: Joi.string().trim().required().messages({
      'any.required': 'Description is required',
      'string.empty': 'Description cannot be empty'
  }),
  document: Joi.string().allow(null).optional(),
}).unknown(true);

const validateFinancialPerformance = (financialPerformance) => {
  return financialPerformanceSchema.validate(financialPerformance, { abortEarly: false });
};


const ictServiceSchema = Joi.object({
    sectorId: Joi.string().uuid().required().messages({
        'any.required': 'Sector ID is required',
        'string.empty': 'Sector ID cannot be empty'
    }),
    serviceDescription: Joi.string().trim().required().messages({
        'any.required': 'Service description is required',
        'string.empty': 'Service description cannot be empty'
    }),
    technologyDevelopment: Joi.string().trim().required().messages({
        'any.required': 'Technology development is required',
        'string.empty': 'Technology development cannot be empty'
    }),
    softwareSolutions: Joi.string().trim().required().messages({
        'any.required': 'Software solutions are required',
        'string.empty': 'Software solutions cannot be empty'
    }),
    partnerships: Joi.string().trim().required().messages({
        'any.required': 'Partnerships are required',
        'string.empty': 'Partnerships cannot be empty'
    })
}).unknown(true);

const validateICTService = (ictService) => {
    return ictServiceSchema.validate(ictService, { abortEarly: false });
};

const investmentOpportunitySchema = Joi.object({
  opportunityTitle: Joi.string().allow(null).optional(),
  description: Joi.string().trim().required().messages({
      'any.required': 'Description is required',
      'string.empty': 'Description cannot be empty'
  }),
  sharesAvailable: Joi.number().integer().min(1).required().messages({
      'any.required': 'Shares available are required',
      'number.base': 'Shares available must be a number',
      'number.integer': 'Shares available must be an integer',
      'number.min': 'Shares available must be at least 1'
  }),
  offeringDate: Joi.date().allow(null).optional().messages({
      'date.base': 'Offering date must be a valid date'
  })
}).unknown(true);

const validateInvestmentOpportunity = (investmentOpportunity) => {
  return investmentOpportunitySchema.validate(investmentOpportunity, { abortEarly: false });
};

const investorFaqsSchema = Joi.object({
  question: Joi.string().trim().required().messages({
      'any.required': 'Question is required',
      'string.empty': 'Question cannot be empty'
  }),
  answer: Joi.string().trim().required().messages({
      'any.required': 'Answer is required',
      'string.empty': 'Answer cannot be empty'
  })
}).unknown(true);

const validateInvestorFaqs = (investorFaqs) => {
  return investorFaqsSchema.validate(investorFaqs, { abortEarly: false });
};

const microfinanceServiceSchema = Joi.object({
  sectorId: Joi.string().uuid().required().messages({
      'any.required': 'Sector ID is required',
      'string.empty': 'Sector ID cannot be empty'
  }),
  loanProducts: Joi.string().trim().required().messages({
      'any.required': 'Loan products are required',
      'string.empty': 'Loan products cannot be empty'
  }),
  eligiblityCriteria: Joi.string().trim().required().messages({
      'any.required': 'Eligibility criteria are required',
      'string.empty': 'Eligibility criteria cannot be empty'
  }),
  applicationProcedures: Joi.string().trim().required().messages({
      'any.required': 'Application procedures are required',
      'string.empty': 'Application procedures cannot be empty'
  })
}).unknown(true);

const validateMicrofinanceService = (microfinanceService) => {
  return microfinanceServiceSchema.validate(microfinanceService, { abortEarly: false });
};

const voteSchema = Joi.object({
  shareHolderId: Joi.string().uuid().required().messages({
      'any.required': 'Shareholder ID is required',
      'string.empty': 'Shareholder ID cannot be empty'
  }),
  candidateId: Joi.string().uuid().required().messages({
      'any.required': 'Candidate ID is required',
      'string.empty': 'Candidate ID cannot be empty'
  })
}).unknown(true);

const validateVote = (vote) => {
  return voteSchema.validate(vote, { abortEarly: false });
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
  validateStatistics, validateSector, validateShare, validateShareHolder,
  validateCodeOfConduct, validateEducationBranch, validateEducationProgram,
  validateFinancialPerformance, validateICTService, validateInvestmentOpportunity,
  validateInvestorFaqs, validateMicrofinanceService, validateVote
};
