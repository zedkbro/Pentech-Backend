import express from "express";
import * as auth from "../middlewares/authMiddleware.js";
import uploadImage from "../utils/uploadImages.js";
import uploadFile from "../utils/uploadFiles.js";
import home from "../controllers/users/homeController.js";
import contactUs from "../controllers/users/contactUsController.js";
import aboutUs from "../controllers/users/aboutUsController.js";
import coreValues from "../controllers/users/coreValuesController.js";
import partner from "../controllers/users/partnerController.js";
import application from "../controllers/users/applicationController.js";
import subscriber from "../controllers/users/subscriberController.js";

const router = express.Router();

router
  .post("/contact-us", contactUs.create.bind(contactUs))
  .post(
    "/applications/:careerId",
    uploadFile.fields([
      { name: "cv", maxCount: 1 },
      { name: "applicationLetter", maxCount: 1 },
    ]),
    application.create.bind(application)
  )
  .post("/subscribers", subscriber.create.bind(subscriber));

router
  .get("/home", home.getAll.bind(home))
  .get("/aboutus", aboutUs.getAll.bind(aboutUs))
  .get("/core-values", coreValues.getAll.bind(coreValues))
  .get("/partners", partner.getVerifiedPartnerships);

router.use(auth.authenticateUser); // authentication for all routes
router.use(auth.authorize(["admin", "staff"])); // authorization for all admin routes

router
  .route("/home")
  .post(uploadImage.single("heroImage"), home.create.bind(home));
router
  .route("/home/:id")
  .get(home.getById.bind(home))
  .patch(uploadImage.single("heroImage"), home.updateById.bind(home))
  .delete(home.moveToTrash.bind(home));
router.delete("/home/destroy/:id", home.deleteById.bind(home));
router.patch("/home/backup/:id", home.backupFromTrash.bind(home));

router
  .route("/aboutus")
  .post(uploadImage.single("image"), aboutUs.create.bind(aboutUs));
router
  .route("/aboutus/:id")
  .get(aboutUs.getById.bind(aboutUs))
  .patch(uploadImage.single("image"), aboutUs.updateById.bind(aboutUs))
  .delete(aboutUs.moveToTrash.bind(aboutUs));
router.delete("/aboutus/destroy/:id", aboutUs.deleteById.bind(aboutUs));
router.patch("/aboutus/backup/:id", aboutUs.backupFromTrash.bind(aboutUs));

router
  .route("/core-values")
  .post(uploadImage.single("image"), coreValues.create.bind(coreValues));
router
  .route("/core-values/:id")
  .get(coreValues.getById.bind(coreValues))
  .patch(uploadImage.single("image"), coreValues.updateById.bind(coreValues))
  .delete(coreValues.moveToTrash.bind(coreValues));
router.delete(
  "/core-values/destroy/:id",
  coreValues.deleteById.bind(coreValues)
);
router.patch(
  "/core-values/backup/:id",
  coreValues.backupFromTrash.bind(coreValues)
);

router.route("/contact-us").get(contactUs.getAll.bind(contactUs));
router
  .route("/contact-us/:id")
  .get(contactUs.getById.bind(contactUs))
  .patch(contactUs.updateById.bind(contactUs))
  .delete(contactUs.deleteById.bind(contactUs));
router.delete("/contact-us/destroy/:id", contactUs.deleteById.bind(contactUs));
router.patch(
  "/contact-us/backup/:id",
  contactUs.backupFromTrash.bind(contactUs)
);

router
  .post("/partners", uploadImage.single("logo"), partner.create.bind(partner))
  .get("/partners/all", partner.getAll.bind(partner))
  .patch("/partners/verify/:partnerId", partner.verifyPartnerships);
router
  .route("/partners/:id")
  .get(partner.getById.bind(partner))
  .patch(uploadImage.single("logo"), partner.updateById.bind(partner))
  .delete(partner.moveToTrash.bind(partner));
router.delete("/partners/destroy/:id", partner.deleteById.bind(partner));
router.patch("/partners/backup/:id", partner.backupFromTrash.bind(partner));

router.route("/applications").get(application.getAll.bind(application));
router
  .route("/applications/:id")
  .get(application.getById.bind(application))
  .patch(
    uploadFile.fields([
      { name: "cv", maxCount: 1 },
      { name: "applicationLetter", maxCount: 1 },
    ]),
    application.updateById.bind(application)
  )
  .delete(application.moveToTrash.bind(application));
router.delete(
  "/applications/destroy/:id",
  application.deleteById.bind(application)
);
router.patch(
  "/applications/backup/:id",
  application.backupFromTrash.bind(application)
);

router.get("/all-applicants/:careerId", application.getApplicants);

router
  .route("/subscribers")
  .get(subscriber.getAll.bind(subscriber))
  .delete(subscriber.deleteAll.bind(subscriber));
router
  .route("/subscribers/:id")
  .get(subscriber.getById.bind(subscriber))
  .patch(subscriber.updateById.bind(subscriber))
  .delete(subscriber.moveToTrash.bind(subscriber));
router.delete(
  "/subscribers/destroy/:id",
  subscriber.deleteById.bind(subscriber)
);
router.patch(
  "/subscribers/backup/:id",
  subscriber.backupFromTrash.bind(subscriber)
);

export default router;
