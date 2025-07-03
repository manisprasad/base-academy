import type {
    SiteConfigType,
    SocialLinksType,
    SeoSettingsType,
    ThemeSettingsType,
    ContactInfoType,
    GeneralSettingsType
} from "@/schemas/siteSetting";


export type SiteSettingAction =
    | { type: "UPDATE_SITE_INFO", payload: SiteConfigType, }
    | { type: "UPDATE_SOCIAL_LINKS", payload: SocialLinksType }
    | { type: "UPDATE_SEO_SETTINGS", payload: SeoSettingsType }
    | { type: "UPDATE_THEME_SETTINGS", payload: ThemeSettingsType }
    | { type: "UPDATE_CONTACT_INFO", payload: ContactInfoType }
    | { type: "UPDATE_GENERAL_SETTINGS", payload: GeneralSettingsType }
    | { type: "RESET_SITE_INFO" };

export const siteSettingReducer = (
    state: SiteConfigType | null,
    action: SiteSettingAction
): SiteConfigType | null => {
    if (!state) {
        return state;
    }

    switch (action.type) {
        case "UPDATE_SITE_INFO":
            return {
                ...state,
                ...action.payload,
            };
        case "UPDATE_SOCIAL_LINKS":
            return {
                ...state,
                socialLinks: {
                    ...state.socialLinks,
                    ...action.payload,
                },
            };
        case "UPDATE_SEO_SETTINGS":
            return {
                ...state,
                seoSettings: {
                    ...state.seoSettings,
                    ...action.payload,
                },
            };
        case "UPDATE_THEME_SETTINGS":
            return {
                ...state,
                themeSettings: {
                    ...state.themeSettings,
                    ...action.payload,
                },
            };
        case "UPDATE_CONTACT_INFO":
            return {
                ...state,
                contactInfo: {
                    ...state.contactInfo,
                    ...action.payload,
                },
            };
        case "UPDATE_GENERAL_SETTINGS":
            return {
                ...state,
                generalSettings: {
                    ...state.generalSettings,
                    ...action.payload,
                },
            };
        case "RESET_SITE_INFO":
            return null;
    }
    return state;
}