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
import verifyRole from "../middleware/verifyRoles";
import { Roles } from "../config/roleList";

const siteConfigRouter = Router();

// GET routes
siteConfigRouter.get("/", getFullSiteConfig);
siteConfigRouter.get("/general", getGeneralSettings);
siteConfigRouter.get("/contact", getContactInfo);
siteConfigRouter.get("/social-links", getSocialLinks);
siteConfigRouter.get("/seo", getSeoSettings);
siteConfigRouter.get("/theme", getThemeSettings);

//set site config (Admin route only)
siteConfigRouter.put("/general", validateSchmea(generalSettingsSchema), verifyJWT, verifyRole(Roles.Teacher),  setGeneralSettings);
siteConfigRouter.put("/contact", validateSchmea(contactInfoSchema), verifyJWT, verifyRole(Roles.Teacher), setContactInfo);
siteConfigRouter.put("/social-links", validateSchmea(socialLinksSchema), verifyJWT, verifyRole(Roles.Teacher), setSocialLinks);
siteConfigRouter.put("/seo", validateSchmea( seoSettingsSchema), verifyJWT, verifyRole(Roles.Teacher),  setSeoSettings);
siteConfigRouter.put("/theme", validateSchmea(themeSettingsSchema), verifyJWT,  verifyRole(Roles.Teacher), setThemeSettings);

export default siteConfigRouter;
