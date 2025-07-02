import SiteSetting from "../model/SiteSetting"; // adjust path accordingly

export const createDefaultSettingsIfNotExists = async () => {
  const existing = await SiteSetting.findOne({});
  if (!existing) {
    await SiteSetting.create({
      generalSettings: {
        siteName: "Base Academy",
        siteDescription: "A platform for learning and sharing knowledge",
        siteKeywords: ["Learning", "Institute", "CBSE", "Academy"],
        siteLogo: "",
        siteFavicon: "",
      },
      contactInfo: {
        contactEmail: "",
        address: "",
        contactPhone: [],
        contactFormEnabled: false,
        mapEmbedUrl: "",
      },
      socialLinks: {
        facebook: "",
        twitter: "",
        instagram: "",
        linkedin: "",
        youtube: "",
        telegram: "",
        whatsapp: "",
        discord: "",
        github: "",
      },
      seoSettings: {
        metaTitle: "",
        metaDescription: "",
        googleAnalyticsId: "",
        robotsTxt: "",
        sitemapUrl: "",
        openGraphImage: "",
      },
      themeSettings: {
        primaryColor: "#000000",
        secondaryColor: "#ffffff",
        darkMode: false,
      },
    });
    console.log("✅ Default site settings document created.");
  } else {
    console.log("ℹ️ Site settings document already exists.");
  }
};
