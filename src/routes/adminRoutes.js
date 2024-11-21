import express from "express";
import * as auth from "../middlewares/authMiddleware.js";
import uploadImage from "../utils/uploadImages.js";
import authController from "../controllers/admins/authController.js";
import adminController from "../controllers/admins/adminController.js";
import service from "../controllers/admins/serviceController.js";
import subService from "../controllers/admins/subServiceController.js";
import product from "../controllers/admins/productController.js";
import news from "../controllers/admins/newsController.js";
import blog from "../controllers/admins/blogController.js";
import career from "../controllers/admins/careerController.js";
import testimonial from "../controllers/admins/testimonialController.js";
import professionals from "../controllers/admins/professionalController.js";
import organization from "../controllers/admins/organizationController.js";
import award from "../controllers/admins/awardController.js";
import FAQ from "../controllers/admins/FAQController.js";
import socialMedia from "../controllers/admins/socialMediaController.js";
import contactAddress from "../controllers/admins/contactAddressController.js";
import video from "../controllers/admins/videoController.js";
import gallery from "../controllers/admins/galleryController.js";
import loanCalculator from "../controllers/admins/loanCalculatorController.js";
import privacyPolicy from "../controllers/admins/privacyPolicyController.js";
import termsAndConditions from "../controllers/admins/termsAndConditionsController.js";
import statistics from "../controllers/admins/statisticsController.js";
import whyChoose from "../controllers/admins/whyChooseController.js";

/** ----------- Latest Added  --------------------------*/
import educationBranch from "../controllers/admins/educationBranchController.js";
import educationProgram from "../controllers/admins/educationProgramController.js";
import financialPerformance from "../controllers/admins/financialPerformanceController.js";
import ICTService from "../controllers/admins/ICTServiceController.js";
import investmentOpportunity from "../controllers/admins/investmentOpportunityController.js";
import investorFaqs from "../controllers/admins/investorFaqsController.js";
import microfinanceService from "../controllers/admins/microfinanceServiceController.js";
import printingPackaging from "../controllers/admins/printingPackagingController.js";
import sector from "../controllers/admins/sectorController.js";

const router = express.Router();

router
  .post("/register", authController.registerAdmin)
  .post("/login", authController.authenticateAdmin);

router.post("/forgot-password", adminController.forgotPassword);
router.patch("/reset-password/:resetToken", adminController.resetPassword);

router
  .get("/services", service.findAll.bind(service))
  .get("/products", product.getAll.bind(product))
  .get("/news", news.getLatest.bind(news))
  .get("/blogs", blog.getLatest.bind(blog))
  .get("/careers", career.getAllOpenedVacancy.bind(career))
  .get("/careers/all", career.getAll.bind(career))
  .get("/testimonials", testimonial.getAll.bind(testimonial))
  .get("/professionals", professionals.getAll.bind(professionals))
  .get("/organizations", organization.getAll.bind(organization))
  .get("/awards", award.getAll.bind(award))
  .get("/faqs", FAQ.getAll.bind(FAQ))
  .get("/social-medias", socialMedia.getAll.bind(socialMedia))
  .get("/contact-address", contactAddress.getAll.bind(contactAddress))
  .get("/videos", video.getAll.bind(video))
  .get("/galleries", gallery.getAll.bind(gallery))
  .get("/privacy-policy", privacyPolicy.getAll.bind(privacyPolicy))
  .get("/loan-calculator", loanCalculator.getAll.bind(loanCalculator))
  .get(
    "/terms-and-conditions",
    termsAndConditions.getAll.bind(termsAndConditions)
  )
  .get("/statistics", statistics.getAll.bind(statistics))
  .get("/why-choose", whyChoose.getAll.bind(whyChoose))

      /** ----------- Latest Added  --------------------------*/
      .get("/education-branches", educationBranch.getAll.bind(educationBranch))
      .get("/education-programs", educationProgram.getAll.bind(educationProgram))
      .get("/finance-performances", financialPerformance.getAll.bind(financialPerformance))
      .get("/ict-services", ICTService.getAll.bind(ICTService))
      .get("/investment-opportunities", investmentOpportunity.getAll.bind(investmentOpportunity))
      .get("/investor-faqs", investorFaqs.getAll.bind(investorFaqs))
      .get("/microfinance-services", microfinanceService.getAll.bind(microfinanceService))
      .get("/printing-packagings", printingPackaging.getAll.bind(printingPackaging))
      .get("/sectors", sector.getAll.bind(sector));

router
  .get("/count-products", product.countDocuments.bind(product))
  .get("/count-services", service.countDocuments.bind(service));

router
  .get("/service/:title", service.findServiceByTitle)
  .get("/product/:title", product.findProductByTitle)
  .get("/new/:title", news.findNewsByTitle)
  .get("/career/:title", career.findVacancyByTitle.bind(career));

router.use(auth.authenticateUser); // authentication for all routes
router.use(auth.authorize(["admin", "staff"])); // authorization for all admin routes

router
  .route("/profile")
  .get(adminController.getByTokenId.bind(adminController))
  .patch(adminController.updateByTokenId.bind(adminController))
  .delete(adminController.deleteByTokenId.bind(adminController));

router
  .patch(
    "/edit-profile",
    uploadImage.single("avatar"),
    adminController.editAdminProfilePhoto
  )
  .patch("/change-password", adminController.changeAdminPassword);

router.route("/profile/all").get(adminController.getAll.bind(adminController));
router
  .route("/profile/:id")
  .get(adminController.getById.bind(adminController))
  .patch(adminController.updateById.bind(adminController))
  .delete(adminController.moveToTrash.bind(adminController));
router.delete(
  "/profile/destroy/:id",
  adminController.deleteById.bind(adminController)
);
router.patch(
  "/profile/backup/:id",
  adminController.backupFromTrash.bind(adminController)
);

router.route("/services").post(service.create.bind(service));
router
  .route("/services/:id")
  .get(service.getById.bind(service))
  .patch(service.updateById.bind(service))
  .delete(service.moveToTrash.bind(service));
router.delete("/services/destroy/:id", service.deleteById.bind(service));
router.patch("/services/backup/:id", service.backupFromTrash.bind(service));

router
  .route("/sub-services/:id")
  .post(
    uploadImage.single("subServiceImage"),
    subService.create.bind(subService)
  )
  .get(subService.getById.bind(subService))
  .patch(
    uploadImage.single("subServiceImage"),
    subService.updateById.bind(subService)
  )
  .delete(subService.deleteById.bind(subService));
// router.delete("/sub-services/destroy/:id", subService.deleteById.bind(subService));
// router.patch("/sub-services/backup/:id", subService.backupFromTrash.bind(subService));

router
  .route("/products")
  .post(uploadImage.single("productImage"), product.create.bind(product));
router
  .route("/products/:id")
  .get(product.getById.bind(product))
  .patch(uploadImage.single("productImage"), product.updateById.bind(product))
  .delete(product.moveToTrash.bind(product));
router.delete("/products/destroy/:id", product.deleteById.bind(product));
router.patch("/products/backup/:id", product.backupFromTrash.bind(product));

router.route("/news").post(uploadImage.single("image"), news.create.bind(news));
router
  .route("/news/:id")
  .get(news.getById.bind(news))
  .patch(uploadImage.single("image"), news.updateById.bind(news))
  .delete(news.moveToTrash.bind(news));
router.delete("/news/destroy/:id", news.deleteById.bind(news));
router.patch("/news/backup/:id", news.backupFromTrash.bind(news));

router
  .route("/blogs")
  .post(uploadImage.single("image"), blog.create.bind(blog))
  .delete(blog.deleteAll.bind(blog));
router
  .route("/blogs/:id")
  .get(blog.getById.bind(blog))
  .patch(uploadImage.single("image"), blog.updateById.bind(blog))
  .delete(blog.moveToTrash.bind(blog));
router.delete("/blogs/destroy/:id", blog.deleteById.bind(blog));
router.patch("/blogs/backup/:id", blog.backupFromTrash.bind(blog));

router
  .route("/careers")
  .post(uploadImage.single("image"), career.create.bind(career))
  .delete(career.deleteAll.bind(career));
router
  .route("/careers/:id")
  .get(career.getById.bind(career))
  .patch(uploadImage.single("image"), career.updateById.bind(career))
  .delete(career.moveToTrash.bind(career));
router.delete("/careers/destroy/:id", career.deleteById.bind(career));
router.patch("/careers/backup/:id", career.backupFromTrash.bind(career));

router
  .route("/testimonials")
  .post(uploadImage.single("avatar"), testimonial.create.bind(testimonial));
router
  .route("/testimonials/:id")
  .get(testimonial.getById.bind(testimonial))
  .patch(uploadImage.single("avatar"), testimonial.updateById.bind(testimonial))
  .delete(testimonial.moveToTrash.bind(testimonial));
router.delete(
  "/testimonials/destroy/:id",
  testimonial.deleteById.bind(testimonial)
);
router.patch(
  "/testimonials/backup/:id",
  testimonial.backupFromTrash.bind(testimonial)
);

router
  .route("/professionals")
  .post(uploadImage.single("avatar"), professionals.create.bind(professionals))
  .delete(professionals.deleteAll.bind(professionals));
router
  .route("/professionals/:id")
  .get(professionals.getById.bind(professionals))
  .patch(
    uploadImage.single("avatar"),
    professionals.updateById.bind(professionals)
  )
  .delete(professionals.moveToTrash.bind(professionals));
router.delete(
  "/professionals/destroy/:id",
  professionals.deleteById.bind(professionals)
);
router.patch(
  "/professionals/backup/:id",
  professionals.backupFromTrash.bind(professionals)
);

router
  .route("/organizations")
  .post(uploadImage.single("image"), organization.create.bind(organization))
  .delete(organization.deleteAll.bind(organization));
router
  .route("/organizations/:id")
  .get(organization.getById.bind(organization))
  .patch(
    uploadImage.single("image"),
    organization.updateById.bind(organization)
  )
  .delete(organization.moveToTrash.bind(organization));
router.delete(
  "/organizations/destroy/:id",
  organization.deleteById.bind(organization)
);
router.patch(
  "/organizations/backup/:id",
  organization.backupFromTrash.bind(organization)
);

router
  .route("/awards")
  .post(uploadImage.single("image"), award.create.bind(award))
  .delete(award.deleteAll.bind(award));
router
  .route("/awards/:id")
  .get(award.getById.bind(award))
  .patch(uploadImage.single("image"), award.updateById.bind(award))
  .delete(award.moveToTrash.bind(award));
router.delete("/awards/destroy/:id", award.deleteById.bind(award));
router.patch("/awards/backup/:id", award.backupFromTrash.bind(award));

router
  .route("/faqs")
  .post(FAQ.create.bind(FAQ))
  .delete(FAQ.deleteAll.bind(FAQ));
router
  .route("/faqs/:id")
  .get(FAQ.getById.bind(FAQ))
  .patch(FAQ.updateById.bind(FAQ))
  .delete(FAQ.moveToTrash.bind(FAQ));
router.delete("/faqs/destroy/:id", FAQ.deleteById.bind(FAQ));
router.patch("/faqs/backup/:id", FAQ.backupFromTrash.bind(FAQ));

router
  .route("/social-medias")
  .post(socialMedia.create.bind(socialMedia))
  .delete(socialMedia.deleteAll.bind(socialMedia));
router
  .route("/social-medias/:id")
  .get(socialMedia.getById.bind(socialMedia))
  .patch(socialMedia.updateById.bind(socialMedia))
  .delete(socialMedia.moveToTrash.bind(socialMedia));
router.delete(
  "/social-medias/destroy/:id",
  socialMedia.deleteById.bind(socialMedia)
);
router.patch(
  "/social-medias/backup/:id",
  socialMedia.backupFromTrash.bind(socialMedia)
);

router
  .route("/contact-address")
  .post(contactAddress.create.bind(contactAddress))
  .delete(contactAddress.deleteAll.bind(contactAddress));
router
  .route("/contact-address/:id")
  .get(contactAddress.getById.bind(contactAddress))
  .patch(contactAddress.updateById.bind(contactAddress))
  .delete(contactAddress.moveToTrash.bind(contactAddress));
router.delete(
  "/contact-address/destroy/:id",
  contactAddress.deleteById.bind(contactAddress)
);
router.patch(
  "/contact-address/backup/:id",
  contactAddress.backupFromTrash.bind(contactAddress)
);

router
  .route("/videos")
  .post(uploadImage.single("video"), video.create.bind(video))
  .delete(video.deleteAll.bind(video));
router
  .route("/videos/:id")
  .get(video.getById.bind(video))
  .patch(uploadImage.single("video"), video.updateById.bind(video))
  .delete(video.moveToTrash.bind(video));
router.delete("/videos/destroy/:id", video.deleteById.bind(video));
router.patch("/videos/backup/:id", video.backupFromTrash.bind(video));

router
  .route("/galleries")
  .post(uploadImage.single("gallery"), gallery.create.bind(gallery))
  .delete(gallery.deleteAll.bind(gallery));
router
  .route("/galleries/:id")
  .get(gallery.getById.bind(gallery))
  .patch(uploadImage.single("gallery"), gallery.updateById.bind(gallery))
  .delete(gallery.moveToTrash.bind(gallery));
router.delete("/galleries/destroy/:id", gallery.deleteById.bind(gallery));
router.patch("/galleries/backup/:id", gallery.backupFromTrash.bind(gallery));

/* ----Added---- */
router.post("/privacy-policy", privacyPolicy.create.bind(privacyPolicy));
router
  .route("/privacy-policy/:id")
  .get(privacyPolicy.getById.bind(privacyPolicy))
  .patch(privacyPolicy.updateById.bind(privacyPolicy))
  .delete(privacyPolicy.moveToTrash.bind(privacyPolicy));
router.delete(
  "/privacy-policy/destroy/:id",
  privacyPolicy.deleteById.bind(privacyPolicy)
);
router.patch(
  "/privacy-policy/backup/:id",
  privacyPolicy.backupFromTrash.bind(privacyPolicy)
);

router.post("/loan-calculator", loanCalculator.create.bind(loanCalculator));
router
  .route("/loan-calculator/:id")
  .get(loanCalculator.getById.bind(loanCalculator))
  .patch(loanCalculator.updateById.bind(loanCalculator))
  .delete(loanCalculator.moveToTrash.bind(loanCalculator));
router.delete(
  "/loan-calculator/destroy/:id",
  loanCalculator.deleteById.bind(loanCalculator)
);
router.patch(
  "/loan-calculator/backup/:id",
  loanCalculator.backupFromTrash.bind(loanCalculator)
);

router.post("/statistics", statistics.create.bind(statistics));
router
  .route("/statistics/:id")
  .get(statistics.getById.bind(statistics))
  .patch(statistics.updateById.bind(statistics))
  .delete(statistics.moveToTrash.bind(statistics));
router.delete(
  "/statistics/destroy/:id",
  statistics.deleteById.bind(statistics)
);
router.patch(
  "/statistics/backup/:id",
  statistics.backupFromTrash.bind(statistics)
);

router.post(
  "/terms-and-conditions",
  termsAndConditions.create.bind(termsAndConditions)
);
router
  .route("/terms-and-conditions/:id")
  .get(termsAndConditions.getById.bind(termsAndConditions))
  .patch(termsAndConditions.updateById.bind(termsAndConditions))
  .delete(termsAndConditions.moveToTrash.bind(termsAndConditions));
router.delete(
  "/terms-and-conditions/destroy/:id",
  termsAndConditions.deleteById.bind(termsAndConditions)
);
router.patch(
  "/terms-and-conditions/backup/:id",
  termsAndConditions.backupFromTrash.bind(termsAndConditions)
);

router.post("/why-choose", whyChoose.create.bind(whyChoose));
router
  .route("/why-choose/:id")
  .get(whyChoose.getById.bind(whyChoose))
  .patch(whyChoose.updateById.bind(whyChoose))
  .delete(whyChoose.moveToTrash.bind(whyChoose));
router.delete("/why-choose/destroy/:id", whyChoose.deleteById.bind(whyChoose));
router.patch(
  "/why-choose/backup/:id",
  whyChoose.backupFromTrash.bind(whyChoose)
);

/** ----------- Latest Added  --------------------------*/
router.post(
  "/education-branches",
  educationBranch.create.bind(educationBranch)
);
router
  .route("/education-branches/:id")
  .get(educationBranch.getById.bind(educationBranch))
  .patch(educationBranch.updateById.bind(educationBranch))
  .delete(educationBranch.moveToTrash.bind(educationBranch));
router.delete(
  "/education-branches/destroy/:id",
  educationBranch.deleteById.bind(educationBranch)
);
router.patch(
  "/education-branches/backup/:id",
  educationBranch.backupFromTrash.bind(educationBranch)
);

router.post(
  "/education-programs",
  educationProgram.create.bind(educationProgram)
);
router
  .route("/education-programs/:id")
  .get(educationProgram.getById.bind(educationProgram))
  .patch(educationProgram.updateById.bind(educationProgram))
  .delete(educationProgram.moveToTrash.bind(educationProgram));
router.delete(
  "/education-programs/destroy/:id",
  educationProgram.deleteById.bind(educationProgram)
);
router.patch(
  "/education-programs/backup/:id",
  educationProgram.backupFromTrash.bind(educationProgram)
);

router.post(
  "/financial-performances",
  financialPerformance.create.bind(financialPerformance)
);
router
  .route("/financial-performances/:id")
  .get(financialPerformance.getById.bind(financialPerformance))
  .patch(financialPerformance.updateById.bind(financialPerformance))
  .delete(financialPerformance.moveToTrash.bind(financialPerformance));
router.delete(
  "/financial-performances/destroy/:id",
  financialPerformance.deleteById.bind(financialPerformance)
);
router.patch(
  "/financial-performances/backup/:id",
  financialPerformance.backupFromTrash.bind(financialPerformance)
);

router.post("/ict-services", ICTService.create.bind(ICTService));
router
  .route("/ict-services/:id")
  .get(ICTService.getById.bind(ICTService))
  .patch(ICTService.updateById.bind(ICTService))
  .delete(ICTService.moveToTrash.bind(ICTService));
router.delete(
  "/ict-services/destroy/:id",
  ICTService.deleteById.bind(ICTService)
);
router.patch(
  "/ict-services/backup/:id",
  ICTService.backupFromTrash.bind(ICTService)
);

router.post(
  "/investment-opportunities",
  investmentOpportunity.create.bind(investmentOpportunity)
);
router
  .route("/investment-opportunities/:id")
  .get(investmentOpportunity.getById.bind(investmentOpportunity))
  .patch(investmentOpportunity.updateById.bind(investmentOpportunity))
  .delete(investmentOpportunity.moveToTrash.bind(investmentOpportunity));
router.delete(
  "/investment-opportunities/destroy/:id",
  investmentOpportunity.deleteById.bind(investmentOpportunity)
);
router.patch(
  "/investment-opportunities/backup/:id",
  investmentOpportunity.backupFromTrash.bind(investmentOpportunity)
);

router.post("/investor-faqs", investorFaqs.create.bind(investorFaqs));
router
  .route("/investor-faqs/:id")
  .get(investorFaqs.getById.bind(investorFaqs))
  .patch(investorFaqs.updateById.bind(investorFaqs))
  .delete(investorFaqs.moveToTrash.bind(investorFaqs));
router.delete(
  "/investor-faqs/destroy/:id",
  investorFaqs.deleteById.bind(investorFaqs)
);
router.patch(
  "/investor-faqs/backup/:id",
  investorFaqs.backupFromTrash.bind(investorFaqs)
);

router.post(
  "/microfinance-services",
  microfinanceService.create.bind(microfinanceService)
);
router
  .route("/microfinance-services/:id")
  .get(microfinanceService.getById.bind(microfinanceService))
  .patch(microfinanceService.updateById.bind(microfinanceService))
  .delete(microfinanceService.moveToTrash.bind(microfinanceService));
router.delete(
  "/microfinance-services/destroy/:id",
  microfinanceService.deleteById.bind(microfinanceService)
);
router.patch(
  "/microfinance-services/backup/:id",
  microfinanceService.backupFromTrash.bind(microfinanceService)
);

router.post(
  "/printing-packagings",
  printingPackaging.create.bind(printingPackaging)
);
router
  .route("/printing-packagings/:id")
  .get(printingPackaging.getById.bind(printingPackaging))
  .patch(printingPackaging.updateById.bind(printingPackaging))
  .delete(printingPackaging.moveToTrash.bind(printingPackaging));
router.delete(
  "/printing-packagings/destroy/:id",
  printingPackaging.deleteById.bind(printingPackaging)
);
router.patch(
  "/printing-packagings/backup/:id",
  printingPackaging.backupFromTrash.bind(printingPackaging)
);

router.post("/sectors", sector.create.bind(sector));
router
  .route("/sectors/:id")
  .get(sector.getById.bind(sector))
  .patch(sector.updateById.bind(sector))
  .delete(sector.moveToTrash.bind(sector));
router.delete("/sectors/destroy/:id", sector.deleteById.bind(sector));
router.patch("/sectors/backup/:id", sector.backupFromTrash.bind(sector));

router.post("/shares", share.create.bind(share));
router.route("/shares/:id")
      .get(share.getById.bind(share))
      .patch(share.updateById.bind(share))
      .delete(share.moveToTrash.bind(share));
router.delete("/shares/destroy/:id", share.deleteById.bind(share));
router.patch("/shares/backup/:id", share.backupFromTrash.bind(share));

router.post("/share-holders", shareHolder.create.bind(shareHolder));
router.route("/share-holders/:id")
      .get(shareHolder.getById.bind(shareHolder))
      .patch(shareHolder.updateById.bind(shareHolder))
      .delete(shareHolder.moveToTrash.bind(shareHolder));
router.delete("/share-holders/destroy/:id", shareHolder.deleteById.bind(shareHolder));
router.patch("/share-holders/backup/:id", shareHolder.backupFromTrash.bind(shareHolder));

router.post("/votes", vote.create.bind(vote));
router.route("/votes/:id")
      .get(vote.getById.bind(vote))
      .patch(vote.updateById.bind(vote))
      .delete(vote.moveToTrash.bind(vote));
router.delete("/votes/destroy/:id", vote.deleteById.bind(vote));
router.patch("/votes/backup/:id", vote.backupFromTrash.bind(vote));

router.post("/vote-results", voteResult.create.bind(voteResult));
router.route("/vote-results/:id")
      .get(voteResult.getById.bind(voteResult))
      .patch(voteResult.updateById.bind(voteResult))
      .delete(voteResult.moveToTrash.bind(voteResult));
router.delete("/vote-results/destroy/:id", voteResult.deleteById.bind(voteResult));
router.patch("/vote-results/backup/:id", voteResult.backupFromTrash.bind(voteResult));

router.post("/code-of-conducts", codeOfConduct.create.bind(codeOfConduct));
router.route("/code-of-conducts/:id")
      .get(codeOfConduct.getById.bind(codeOfConduct))
      .patch(codeOfConduct.updateById.bind(codeOfConduct))
      .delete(codeOfConduct.moveToTrash.bind(codeOfConduct));
router.delete("/code-of-conducts/destroy/:id", codeOfConduct.deleteById.bind(codeOfConduct));
router.patch("/code-of-conducts/backup/:id", codeOfConduct.backupFromTrash.bind(codeOfConduct));

router.post("/vote-rights", voteRight.create.bind(voteRight));
router.route("/vote-rights/:id")
      .get(voteRight.getById.bind(voteRight))
      .patch(voteRight.updateById.bind(voteRight))
      .delete(voteRight.moveToTrash.bind(voteRight));
router.delete("/vote-rights/destroy/:id", voteRight.deleteById.bind(voteRight));
router.patch("/vote-rights/backup/:id", voteRight.backupFromTrash.bind(voteRight));

router.post("/shares", share.create.bind(share));
router
  .route("/shares/:id")
  .get(share.getById.bind(share))
  .patch(share.updateById.bind(share))
  .delete(share.moveToTrash.bind(share));
router.delete("/shares/destroy/:id", share.deleteById.bind(share));
router.patch("/shares/backup/:id", share.backupFromTrash.bind(share));

router.post("/share-holders", shareHolder.create.bind(shareHolder));
router
  .route("/share-holders/:id")
  .get(shareHolder.getById.bind(shareHolder))
  .patch(shareHolder.updateById.bind(shareHolder))
  .delete(shareHolder.moveToTrash.bind(shareHolder));
router.delete(
  "/share-holders/destroy/:id",
  shareHolder.deleteById.bind(shareHolder)
);
router.patch(
  "/share-holders/backup/:id",
  shareHolder.backupFromTrash.bind(shareHolder)
);

router.post("/votes", vote.create.bind(vote));
router
  .route("/votes/:id")
  .get(vote.getById.bind(vote))
  .patch(vote.updateById.bind(vote))
  .delete(vote.moveToTrash.bind(vote));
router.delete("/votes/destroy/:id", vote.deleteById.bind(vote));
router.patch("/votes/backup/:id", vote.backupFromTrash.bind(vote));

router.post("/vote-results", voteResult.create.bind(voteResult));
router
  .route("/vote-results/:id")
  .get(voteResult.getById.bind(voteResult))
  .patch(voteResult.updateById.bind(voteResult))
  .delete(voteResult.moveToTrash.bind(voteResult));
router.delete(
  "/vote-results/destroy/:id",
  voteResult.deleteById.bind(voteResult)
);
router.patch(
  "/vote-results/backup/:id",
  voteResult.backupFromTrash.bind(voteResult)
);

router.post("/code-of-conducts", codeOfConduct.create.bind(codeOfConduct));
router
  .route("/code-of-conducts/:id")
  .get(codeOfConduct.getById.bind(codeOfConduct))
  .patch(codeOfConduct.updateById.bind(codeOfConduct))
  .delete(codeOfConduct.moveToTrash.bind(codeOfConduct));
router.delete(
  "/code-of-conducts/destroy/:id",
  codeOfConduct.deleteById.bind(codeOfConduct)
);
router.patch(
  "/code-of-conducts/backup/:id",
  codeOfConduct.backupFromTrash.bind(codeOfConduct)
);

router.post("/vote-rights", voteRight.create.bind(voteRight));
router
  .route("/vote-rights/:id")
  .get(voteRight.getById.bind(voteRight))
  .patch(voteRight.updateById.bind(voteRight))
  .delete(voteRight.moveToTrash.bind(voteRight));
router.delete("/vote-rights/destroy/:id", voteRight.deleteById.bind(voteRight));
router.patch(
  "/vote-rights/backup/:id",
  voteRight.backupFromTrash.bind(voteRight)
);

export default router;
