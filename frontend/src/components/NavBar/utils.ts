import { Bolt } from "lucide-react";

import { CircleHelp } from "lucide-react";
import { TriangleAlert } from "lucide-react";

import { MessageCircle } from "lucide-react";

import { Database } from "lucide-react";
import { PanelsTopLeft } from "lucide-react";
import { PanelTop } from "lucide-react";


import type { LucideIcon } from "lucide-react"

export interface SubMenuItem {
  name: string;
  desc?: string;
  icon?: LucideIcon;
  link?: string;
}

export interface MenuItem {
  name: string;
  subMenuHeading?: string[];
  subMenu?: SubMenuItem[];
  gridCols?: number;
  link?: string; // for non-dropdown items
}


export const Menus: MenuItem[] = [
  {
    name: "Courses",
    subMenuHeading: ["School Classes", "Professional Exams"],
    subMenu: [
      {
        name: "Class 1–5",
        desc: "Foundational subjects for young learners",
        icon: PanelsTopLeft,
        link: "/courses/class-1-5",
      },
      {
        name: "Class 6–8",
        desc: "Middle school syllabus & activities",
        icon: Bolt,
        link: "/courses/class-6-8",
      },
      {
        name: "Class 9–10",
        desc: "Core subjects with board prep",
        icon: PanelTop,
        link: "/courses/class-9-10",
      },
      {
        name: "Class 11–12",
        desc: "Advanced streams: Science, Commerce, Arts",
        icon: Database,
        link: "/courses/class-11-12",
      },
      {
        name: "CA Foundation",
        desc: "Prep for Chartered Accountant entrance",
        icon: Database,
        link: "/courses/ca-foundation",
      },
      {
        name: "CA Intermediate",
        desc: "In-depth accounting, tax, law & audit",
        icon: Database,
        link: "/courses/ca-intermediate",
      },
      {
        name: "CMA Foundation",
        desc: "Cost accounting fundamentals",
        icon: Database,
        link: "/courses/cma-foundation",
      },
      {
        name: "CMA Intermediate",
        desc: "Advanced cost & management accounting",
        icon: Database,
        link: "/courses/cma-intermediate",
      },
    ],
    gridCols: 2,
  },

  {
    name: "Videos",
    subMenu: [
      {
        name: "Help",
        desc: "Center",
        icon: CircleHelp,
        link: "/videos/help",
      },
      {
        name: "Community",
        desc: "Project help",
        icon: MessageCircle,
        link: "/videos/community",
      },
      {
        name: "Emergency",
        desc: "Urgent issues",
        icon: TriangleAlert,
        link: "/videos/emergency",
      },
    ],
    gridCols: 1,
  },

  {
    name: "Useful Links",
    link: "/useful-links",
  },
  {
    name: "Notes",
    link: "/notes",
  },
  {
    name: "Contact",
    link: "/contact",
  },
  {
    name: "About",
    link: "/about",
  },
];
