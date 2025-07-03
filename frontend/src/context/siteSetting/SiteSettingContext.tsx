import { axiosInstance } from "@/api/axios";
import type { SiteConfigType } from "@/schemas/siteSetting";
import type React from "react";
import { createContext, useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";


interface SiteSettingContextType {
  siteInfo: SiteConfigType | null;
  setSiteInfo: React.Dispatch<React.SetStateAction<SiteConfigType | null>>;
}


export const SiteSettingContext = createContext<SiteSettingContextType | undefined>(undefined);

export const SiteSettingProvider = ({ children }: { children: React.ReactNode }) => {
  const [siteInfo, setSiteInfo] = useState<SiteConfigType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSiteConfig = async () => {
      try {
        const res = await axiosInstance.get<{ data: SiteConfigType }>("/api/site-config");
        setSiteInfo(res.data.data);
      } catch (error) {
        console.error("Failed to fetch site config:", error);
        setSiteInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSiteConfig();
  }, []); 

  return (
    <SiteSettingContext.Provider value={{ siteInfo, setSiteInfo }}>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <FaSpinner className="animate-spin text-2xl" />
        </div>
      ) : (
        children
      )}
    </SiteSettingContext.Provider>
  );
};
