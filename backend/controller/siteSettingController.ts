import { Response, Request } from "express";
import { ApiResponse, ApiResponseType } from "../utils/response";
import SiteSetting from "../model/SiteSetting";
import {
  ContactInfoType,
  GeneralSettingsType,
  SocialLinksType,
  SeoSettingsType,
  ThemeSettingsType,
  SiteConfigType,
} from "../schemas/siteSetting.schema";

// GET: All site config
export const getFullSiteConfig = async (
  req: Request,
  res: Response<ApiResponseType<SiteConfigType>>
) => {
  try {
    const config = await SiteSetting.findOne({}).lean<SiteConfigType>();
    if (!config) {
      ApiResponse.notFound(res, "Site configuration not found");
      return;
    }
    ApiResponse.success(res, "Site configuration retrieved successfully", config);
    return;
  } catch (error) {
    console.error("Error fetching site config:", error);
    ApiResponse.internal(res, "Failed to fetch site config");
    return
  }
};

// GET: Social Links
export const getSocialLinks = async (
  req: Request,
  res: Response<ApiResponseType<SocialLinksType>>
) => {
  try {
    const result = await SiteSetting.findOne({}, "socialLinks").lean();
    const socialLinks = result?.socialLinks as SocialLinksType | undefined;

    if (!socialLinks) {
      ApiResponse.notFound(res, "Social links not found");
      return;
    }

    ApiResponse.success(res, "Social links retrieved successfully", socialLinks);
    return;
  }
  catch (error) {
    console.error("Error fetching social links:", error);
    ApiResponse.internal(res, "Failed to fetch social links");
    return
  }
};

// GET: General Settings
export const getGeneralSettings = async (
  req: Request,
  res: Response<ApiResponseType<GeneralSettingsType>>
) => {
  try {
    const result = await SiteSetting.findOne({}, "generalSettings").lean();
    const generalSettings = result?.generalSettings as GeneralSettingsType | undefined;

    if (!generalSettings) {
      ApiResponse.notFound(res, "General settings not found");
      return;
    }

    ApiResponse.success(res, "General settings retrieved successfully", generalSettings);
    return;
  }
  catch (error) {
    console.error("Error fetching general settings:", error);
    ApiResponse.internal(res, "Failed to fetch general settings");
    return
  }
};

// GET: Contact Info
export const getContactInfo = async (
  req: Request,
  res: Response<ApiResponseType<ContactInfoType>>
) => {
  try {
    const result = await SiteSetting.findOne({}, "contactInfo").lean();
    const contactInfo = result?.contactInfo as ContactInfoType | undefined;

    if (!contactInfo) {
      ApiResponse.notFound(res, "Contact information not found");
      return;
    }

    ApiResponse.success(res, "Contact information retrieved successfully", contactInfo);
    return;
  } catch (error) {
    console.error("Error fetching contact information:", error);
     ApiResponse.internal(res, "Failed to fetch contact information");
     return;
  }
};

export const getSeoSettings = async (
  req: Request,
  res: Response<ApiResponseType<SeoSettingsType>>
) => {
  try {
    const result = await SiteSetting.findOne({}, "seoSettings").lean();
    const seoSettings = result?.seoSettings as SeoSettingsType | undefined;

    if (!seoSettings) {
      ApiResponse.notFound(res, "SEO settings not found");
      return;
    }

    ApiResponse.success(res, "SEO settings retrieved successfully", seoSettings);
    return;
  } catch (error) {
    console.error("Error fetching SEO settings:", error);
     ApiResponse.internal(res, "Failed to fetch SEO settings");
     return;
  }
};

export const getThemeSettings = async (
  req: Request,
  res: Response<ApiResponseType<ThemeSettingsType>>
) => {
  try {
    const result = await SiteSetting.findOne({}, "themeSettings").lean();
    const themeSettings = result?.themeSettings as ThemeSettingsType | undefined;

    if (!themeSettings) {
      ApiResponse.notFound(res, "Theme settings not found");
      return;
    }

    ApiResponse.success(res, "Theme settings retrieved successfully", themeSettings);
    return;
  } catch (error) {
    console.error("Error fetching theme settings:", error);
     ApiResponse.internal(res, "Failed to fetch theme settings");
     return
  }
};




// SET: Social Links
export const setSocialLinks = async (
  req: Request<{}, {}, SocialLinksType>,
  res: Response<ApiResponseType<SocialLinksType>>
) => {
  try {
    const socialLinks = req.body;

    const updatedSetting = await SiteSetting.findOneAndUpdate(
      {},
      { socialLinks },
      { new: true, upsert: true, runValidators: true }
    ).lean();

    if (!updatedSetting?.socialLinks) {
      ApiResponse.notFound(res, "Social links not found");
      return;
    }

    ApiResponse.success(res, "Social links updated successfully", updatedSetting.socialLinks);
    return;
  } catch (error) {
    console.error("Error updating social links:", error);
     ApiResponse.internal(res, "Failed to update social links");
     return;
  }
};

// SET: General Settings
export const setGeneralSettings = async (
  req: Request<{}, {}, GeneralSettingsType>,
  res: Response<ApiResponseType<GeneralSettingsType>>
) => {
  try {
    const generalSettings = req.body;

    const updatedSetting = await SiteSetting.findOneAndUpdate(
      {},
      { generalSettings },
      { new: true, upsert: true, runValidators: true }
    ).lean();

    if (!updatedSetting?.generalSettings) {
      ApiResponse.notFound(res, "General settings not found");
      return;
    }

    ApiResponse.success(res, "General settings updated successfully", updatedSetting.generalSettings);
    return;
  } catch (error) {
    console.error("Error updating general settings:", error);
     ApiResponse.internal(res, "Failed to update general settings");
     return;
  }
};

// SET: Contact Info
export const setContactInfo = async (
  req: Request<{}, {}, ContactInfoType>,
  res: Response<ApiResponseType<ContactInfoType>>
) => {
  try {
    const contactInfo = req.body;

    const updatedSetting = await SiteSetting.findOneAndUpdate(
      {},
      { contactInfo },
      { new: true, upsert: true, runValidators: true }
    ).lean();

    if (!updatedSetting?.contactInfo) {
      ApiResponse.notFound(res, "Contact information not found");
      return;
    }

    ApiResponse.success(res, "Contact information updated successfully", updatedSetting.contactInfo);
    return;
  } catch (error) {
    console.error("Error updating contact information:", error);
     ApiResponse.internal(res, "Failed to update contact information");
     return;
  }
};


export const setSeoSettings = async (
  req: Request<{}, {}, SeoSettingsType>,
  res: Response<ApiResponseType<SeoSettingsType>>
) => {
  try {
    const seoSettings = req.body;

    const updatedSetting = await SiteSetting.findOneAndUpdate(
      {},
      { seoSettings },
      { new: true, upsert: true, runValidators: true }
    ).lean();

    if (!updatedSetting?.seoSettings) {
      ApiResponse.notFound(res, "SEO settings not found");
      return;
    }

    ApiResponse.success(res, "SEO settings updated successfully", updatedSetting.seoSettings);
    return;
  } catch (error) {
    console.error("Error updating SEO settings:", error);
     ApiResponse.internal(res, "Failed to update SEO settings");
     return;
  }
};

export const setThemeSettings = async (
  req: Request<{}, {}, ThemeSettingsType>,
  res: Response<ApiResponseType<ThemeSettingsType>>
) => {
  try {
    const themeSettings = req.body;

    const updatedSetting = await SiteSetting.findOneAndUpdate(
      {},
      { themeSettings },
      { new: true, upsert: true, runValidators: true }
    ).lean();

    if (!updatedSetting?.themeSettings) {
      ApiResponse.notFound(res, "Theme settings not found");
      return;
    }

    ApiResponse.success(res, "Theme settings updated successfully", updatedSetting.themeSettings);
    return;
  } catch (error) {
    console.error("Error updating theme settings:", error);
     ApiResponse.internal(res, "Failed to update theme settings");
     return
  }
};
