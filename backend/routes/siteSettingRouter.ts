import { Router } from "express";
import {
  getFullSiteConfig,
  getContactInfo,
  getGeneralSettings,
  getSeoSettings,
  getSocialLinks,
  getThemeSettings,
  setContactInfo,
  setGeneralSettings,
  setSeoSettings,
  setSocialLinks,
  setThemeSettings,
} from "../controller/siteSettingController";

import {
    generalSettingsSchema,
    seoSettingsSchema,
    socialLinksSchema,
    themeSettingsSchema,
    contactInfoSchema,
} from "../schemas/siteSetting.schema"
import { validateSchmea } from "../middleware/validateSchema";
import verifyJWT from "../middleware/verifyJWT";

const siteConfigRouter = Router();

// GET routes
siteConfigRouter.get("/", getFullSiteConfig);
siteConfigRouter.get("/general", getGeneralSettings);
siteConfigRouter.get("/contact", getContactInfo);
siteConfigRouter.get("/social-links", getSocialLinks);
siteConfigRouter.get("/seo", getSeoSettings);
siteConfigRouter.get("/theme", getThemeSettings);

//set site config
siteConfigRouter.put("/general", validateSchmea(generalSettingsSchema), verifyJWT,  setGeneralSettings);
siteConfigRouter.put("/contact", validateSchmea(contactInfoSchema), verifyJWT, setContactInfo);
siteConfigRouter.put("/social-links", validateSchmea(socialLinksSchema), verifyJWT, setSocialLinks);
siteConfigRouter.put("/seo", validateSchmea( seoSettingsSchema), verifyJWT,  setSeoSettings);
siteConfigRouter.put("/theme", validateSchmea(themeSettingsSchema), verifyJWT, setThemeSettings);

export default siteConfigRouter;
