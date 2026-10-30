import type { TimelineMilestone } from './types';

/**
 * Doctor information.
 *
 * Only facts supplied and confirmed may appear here. The following items are
 * still open and must not be inferred or expanded:
 * - the exact postgraduate qualification and specialty ("PG" is not "MDS");
 * - current and former hospital or teaching affiliations;
 * - the conflict between "17 years of implantology" and "implantology from
 *   2016 to 2026";
 * - implant volume and retention statistics.
 *
 * `timeline` stays empty until dated, confirmed milestones are supplied. The
 * timeline component supports data and is simply not rendered while empty.
 */
export const doctor = {
  name: 'Dr. B. V. Ramakrishna Reddy',
  shortName: 'Dr. Reddy',
  role: 'Implant and surgical dentistry',
  locality: 'Hyderabad',
  intro:
    'Dr. B. V. Ramakrishna Reddy brings implant and surgical experience to Yali. He guides care for dental implants, oral and maxillofacial concerns, and the restoration of damaged teeth with root canal treatment and crowns.',
  background: [
    'Dr. Reddy practises implant and surgical dentistry. At Yali, his work covers dental implants, oral and maxillofacial care, root canal treatment, and crowns.',
    'Surgical experience matters most when a plan has to account for more than one tooth. It informs how a case is assessed, how options are weighed, and when care is better provided in a hospital or through another specialist.',
  ],
  focus: [
    'Dental implants, including single-tooth and multi-tooth replacement',
    'Oral and maxillofacial assessment and surgical care pathways',
    'Root canal treatment for infected or damaged teeth',
    'Crowns that restore damaged or weakened teeth',
  ],
  /** Verified, dated milestones. Empty until confirmed records are supplied. */
  timeline: [] as TimelineMilestone[],
  /** Qualifications are omitted while unverified, never expanded or guessed. */
  qualifications: [] as string[],
};
