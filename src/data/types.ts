export type ClinicState = 'prelaunch' | 'open';

export type ConcernId = 'pain-damage' | 'missing-teeth' | 'surgical';

export type TreatmentVisual = 'tooth' | 'crown' | 'implant';

export interface Faq {
  question: string;
  answer: string;
}

export interface TextBlock {
  heading: string;
  paragraphs: string[];
  list?: string[];
}

export interface TreatmentSection {
  id: 'addresses' | 'assessment' | 'options' | 'timing-cost' | 'follow-up';
  label: string;
  heading: string;
  paragraphs?: string[];
  blocks?: TextBlock[];
  list?: string[];
}

export interface Treatment {
  slug: string;
  href: string;
  navLabel: string;
  cardTitle: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  summary: string;
  concerns: ConcernId[];
  sections: TreatmentSection[];
  faqs: Faq[];
  related: string[];
  visual?: TreatmentVisual;
}

export interface VerifiedContactChannel {
  /** The value used in the link, for example a full international number. */
  value: string;
  /** The human-readable version shown on the page. */
  display: string;
}

export interface TimelineMilestone {
  /** Short label shown on the control. */
  year: string;
  title: string;
  description: string;
  /** Only milestones confirmed against clinic records may be published. */
  verified: boolean;
}

export interface VisitStage {
  id: string;
  step: string;
  title: string;
  summary: string;
  paragraphs: string[];
  list?: string[];
}
