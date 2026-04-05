
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Award, BookOpen, Code, MapPin, Calendar } from 'lucide-react';
import { WorkItem, SkillCategory } from '../types';

// Fix framer-motion type errors by casting motion components to any
const MotionDiv = motion.div as any;

export const SectionTitle: React.FC<{ title: string; icon?: React.ReactNode }> = ({ title, icon }) => (
  /* Fix framer-motion type error with cast to any */
  <MotionDiv 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="flex items-center gap-3 mb-12"
  >
    {icon && <span className="text-primary-600">{icon}</span>}
    <h2 className="text-3xl font-display font-bold text-slate-900">{title}</h2>
    <div className="h-px bg-slate-200 flex-grow ml-6"></div>
  </MotionDiv>
);

export const ExperienceCard: React.FC<{ item: WorkItem; index: number }> = ({ item, index }) => (
  /* Fix framer-motion type error with cast to any */
  <MotionDiv 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="relative pl-8 pb-12 border-l-2 border-slate-200 last:pb-0 last:border-l-0"
  >
    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-primary-500"></div>
    
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">{item.role}</h3>
          <div className="text-primary-600 font-medium">{item.company}</div>
        </div>
        <div className="flex items-center text-sm text-slate-500 bg-slate-50 px-3 py-1 rounded-full mt-2 md:mt-0 w-fit">
          <Calendar size={14} className="mr-2" />
          {item.period}
        </div>
      </div>
      
      <p className="text-slate-600 mb-4 text-sm leading-relaxed">{item.description}</p>
      
      <ul className="space-y-2">
        {item.achievements.map((ach, i) => (
          <li key={i} className="flex items-start text-sm text-slate-700">
            <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-primary-400 rounded-full flex-shrink-0"></span>
            {ach}
          </li>
        ))}
      </ul>
    </div>
  </MotionDiv>
);

export const AwardItem: React.FC<{ text: string; index: number }> = ({ text, index }) => (
  /* Fix framer-motion type error with cast to any */
  <MotionDiv
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05 }}
    className="flex items-start p-4 bg-slate-50 rounded-lg border border-slate-100 mb-3"
  >
    <Award className="text-yellow-500 mr-4 flex-shrink-0 mt-1" size={20} />
    <span className="text-slate-700 font-medium">{text}</span>
  </MotionDiv>
);

export const PaperItem: React.FC<{ text: string; index: number }> = ({ text, index }) => (
  /* Fix framer-motion type error with cast to any */
  <MotionDiv
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05 }}
    className="flex items-start p-4 bg-white rounded-lg border border-slate-100 shadow-sm mb-3"
  >
    <BookOpen className="text-primary-500 mr-4 flex-shrink-0 mt-1" size={20} />
    <span className="text-slate-700 text-sm leading-relaxed">{text}</span>
  </MotionDiv>
);

export const SkillSection: React.FC<{ category: SkillCategory; index: number }> = ({ category, index }) => (
  /* Fix framer-motion type error with cast to any */
  <MotionDiv
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"
  >
    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
      <Code size={18} className="text-primary-500" />
      {category.name}
    </h3>
    <div className="flex flex-wrap gap-2">
      {category.items.map((skill, i) => (
        <span 
          key={i} 
          className="px-3 py-1.5 bg-slate-50 text-slate-600 text-xs font-medium rounded-md border border-slate-200 hover:border-primary-200 hover:bg-primary-50 transition-colors"
        >
          {skill}
        </span>
      ))}
    </div>
  </MotionDiv>
);

// Placeholders to satisfy imports if any
export const SurfaceCodeDiagram = () => null;
export const TransformerDecoderDiagram = () => null;
export const PerformanceMetricDiagram = () => null;
