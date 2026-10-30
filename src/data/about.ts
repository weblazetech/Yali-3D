export interface Principle {
  index: string;
  title: string;
  body: string;
}

export const carePrinciples: Principle[] = [
  {
    index: '01',
    title: 'Options you can understand',
    body: 'Every treatment page explains what the treatment does, what it cannot do, and what the alternatives are. You should be able to make a decision without decoding jargon.',
  },
  {
    index: '02',
    title: 'Planning before treatment',
    body: 'Care starts with an assessment. Suitability, sequencing, and cost are discussed before a plan is agreed, not after treatment has started.',
  },
  {
    index: '03',
    title: 'Claims we can support',
    body: 'Qualifications, experience, and clinical outcomes are described only when they can be verified. This site does not publish statistics it cannot attribute.',
  },
  {
    index: '04',
    title: 'Follow-up that is planned',
    body: 'After treatment you receive aftercare guidance and a clear review plan. If something does not feel right between visits, there is a route back to the clinic.',
  },
];

export const about = {
  purpose: [
    'Yali is a family dental clinic in Hyderabad. It is being built around four areas of care: root canal treatment, crowns, dental implants, and oral and maxillofacial care.',
    'The clinic is intended for families who want to understand what is happening, what the options are, and what each option asks of them. Clear explanations are part of the care, not an extra.',
  ],
  ambition:
    'Our ambition is treatment that meets international standards, available to every family who comes to us. We intend to earn that through specific practices: assessment before treatment, options explained in plain language, agreed plans, and follow-up. It is an aim, not an accreditation.',
  approach: [
    'Yali is designed around a single sequence. A consultation establishes what you have noticed and what matters to you. An assessment establishes what is happening. A discussion sets out the options and the trade-offs. A plan records what will be done, when, and at what cost. Follow-up checks how it went.',
    'Where a concern needs care that Yali cannot provide, the clinic will say so. That may mean a hospital setting, another specialty, or a referral. The pathway should be clear before you commit to anything.',
  ],
  opening: 'Yali is opening in Hyderabad. The neighbourhood, address, consultation hours, and contact details have not been confirmed yet and are not published on this site.',
  /** Copy shown in place of a career timeline while milestones are unverified. */
  timelinePlaceholder: null as string | null,
};
