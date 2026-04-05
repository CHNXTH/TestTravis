/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export type Language = 'en' | 'zh';

export interface Content {
  nav: {
    about: string;
    experience: string;
    awards: string;
    papers: string;
    skills: string;
    contact: string;
  };
  hero: {
    role: string;
    tagline: string;
    availability: string;
    contactBtn: string;
    downloadBtn: string;
  };
  about: {
    title: string;
    content: string;
    info: {
      age: string;
      location: string;
      email: string;
      phone: string;
    }
  };
  experience: {
    title: string;
    items: WorkItem[];
  };
  awards: {
    title: string;
    items: string[];
  };
  papers: {
    title: string;
    items: string[];
  };
  skills: {
    title: string;
    categories: SkillCategory[];
  }
}

export interface WorkItem {
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface SkillCategory {
  name: string;
  items: string[];
}
