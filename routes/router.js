import homeController from "../controllers/homeController.js";
import securityController from "../controllers/securityController.js";
import articleController from "../controllers/articleController.js";
import serviceController from "../controllers/serviceController.js";
import recipeController from "../controllers/recipeController.js";
import eventController from "../controllers/eventController.js";
import contactController from "../controllers/contactController.js";
import categoryController from "../controllers/categoryController.js";
import aboutController from "../controllers/aboutController.js";
import adminController from "../controllers/adminController.js";
import socialController from "../controllers/socialController.js";

export const setupRoutes = (app) => {
  app.use("/home", homeController);
  app.use("/security", securityController);
  app.use("/articles", articleController);
  app.use("/services", serviceController);
  app.use("/recipes", recipeController);
  app.use("/events", eventController);
  app.use("/contact", contactController);
  app.use("/categories", categoryController);
  app.use("/about", aboutController);
  app.use("/admin", adminController);
  app.use("/socials", socialController);

  // ... les autres routes ...
};
