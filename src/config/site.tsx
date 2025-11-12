import {
  FileBadge,
  Gauge,
  type LucideIcon,
  MessagesSquare,
} from "lucide-react";

export type SiteConfig = typeof siteConfig;
export type Navigation = {
  icon: LucideIcon;
  name: string;
  href: string;
};

export const siteConfig = {
  title: "VisActor Next Template",
  description: "Template for VisActor and Next.js",
};

export const navigations: Navigation[] = [
  {
    icon: Gauge,
    name: "Tableau de bord",
    href: "/",
  },
  {
    icon: MessagesSquare,
    name: "Ticket",
    href: "/ticket",
  },
  {
    icon: FileBadge,
    name: "Mon profil",
    href: "/profil",
  },
];
