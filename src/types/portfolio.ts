import type { LucideIcon } from 'lucide-react';

export type NavItem = {
  id: string;
  name: string;
};

export type ColorVariant = 'cyan' | 'blue' | 'purple' | 'green' | 'yellow';

export type Skill = {
  title: string;
  icon: LucideIcon;
  color: ColorVariant;
  items: string[];
};

export type ExperienceData = {
  role: string;
  company: string;
  period: string;
  items: string[];
  color: ColorVariant;
  isLast?: boolean;
};

export type ProjectData = {
  title: string;
  desc: string;
  tags: string[];
  icon: LucideIcon;
  color: ColorVariant;
  visual: React.ReactNode;
};

export type QualificationData = {
  icon: LucideIcon;
  title: string;
  items: Array<{
    label: string;
    sublabel?: string;
    badge?: string;
  }>;
  color: ColorVariant;
};
