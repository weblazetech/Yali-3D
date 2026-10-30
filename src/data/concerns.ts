import type { ConcernId, Treatment } from './types';
import { getTreatment } from './treatments';

export interface Concern {
  id: ConcernId;
  /** Label used on the selector control. */
  label: string;
  /** Heading used on the readable concern section. */
  title: string;
  summary: string;
  questions: string[];
  treatmentSlugs: string[];
}

export const concerns: Concern[] = [
  {
    id: 'pain-damage',
    label: 'Tooth pain or damage',
    title: 'Tooth pain or damage',
    summary:
      'Pain, sensitivity, a broken tooth, or a tooth that has changed colour can have several causes. The first step is an assessment, not a guess about which treatment you need.',
    questions: [
      'Why the tooth is painful or damaged',
      'Whether the tooth can be kept and restored',
      'What a root canal or a crown would involve',
    ],
    treatmentSlugs: ['root-canals-crowns'],
  },
  {
    id: 'missing-teeth',
    label: 'Missing teeth',
    title: 'Missing teeth',
    summary:
      'Missing teeth can affect how you eat, speak, and feel about your smile. The options include implants, bridges, and removable dentures, and each has different trade-offs.',
    questions: [
      'Whether an implant, bridge, or denture fits your situation',
      'What assessment and planning involve',
      'How an implant-supported restoration is put together',
    ],
    treatmentSlugs: ['dental-implants'],
  },
  {
    id: 'surgical',
    label: 'Surgical concerns',
    title: 'Surgical concerns',
    summary:
      'Some concerns of the mouth, jaws, and face need surgical assessment. Care may take place at Yali, in a hospital, or through a specialist referral, and the pathway is explained in advance.',
    questions: [
      'Whether the concern needs surgical assessment',
      'What can be treated at Yali and what needs hospital care',
      'How referrals and follow-up are arranged',
    ],
    treatmentSlugs: ['oral-maxillofacial-care'],
  },
];

export function concernTreatments(concern: Concern): Treatment[] {
  return concern.treatmentSlugs.map((slug) => getTreatment(slug));
}
