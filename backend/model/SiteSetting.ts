import { Document, model, Schema } from "mongoose";
import { SiteConfigType } from "../schemas/siteSetting.schema";

// Extend Mongoose Document with your Zod-inferred type
interface ISetting extends SiteConfigType, Document {}

const SiteSettingSchema = new Schema<ISetting>(
  {
    generalSettings: {
      siteName: { type: String },
      siteDescription: { type: String },
      siteKeywords: [{ type: String }],
      siteLogo: { type: String },
      siteFavicon: { type: String },
    },

    contactInfo: {
      contactEmail: { type: String },
      address: { type: String },
      contactPhone: [{ type: String }],
      contactFormEnabled: { type: Boolean },
      mapEmbedUrl: { type: String },
    },

    socialLinks: {
      facebook: { type: String },
      twitter: { type: String },
      instagram: { type: String },
      linkedin: { type: String },
      youtube: { type: String },
      telegram: { type: String },
      whatsapp: { type: String },
      discord: { type: String },
      github: { type: String },
    },

    seoSettings: {
      metaTitle: { type: String },
      metaDescription: { type: String },
      googleAnalyticsId: { type: String },
      robotsTxt: { type: String },
      sitemapUrl: { type: String },
      openGraphImage: { type: String },
    },

    themeSettings: {
      primaryColor: { type: String },
      secondaryColor: { type: String },
      darkMode: { type: Boolean },
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the model
const SiteSetting = model<ISetting>("SiteSetting", SiteSettingSchema);
export default SiteSetting;
