import { SiteSettingContext } from "./SiteSettingContext";
import { useContext } from "react";

export const useSiteSetting = () => {
    const context = useContext(SiteSettingContext);
    
    if (!context) {
        throw new Error("useSiteSetting must be used within a SiteSettingProvider");
    }
    
    return context;
}