import type { Faq, VisitStage } from './types';

export const homeFaqs: Faq[] = [
  {
    question: 'How can I contact Yali?',
    answer:
      "The contact page shows the clinic's verified call and WhatsApp options. Appointments are confirmed manually after an enquiry. If no channel is published yet, the page explains what is still being confirmed.",
  },
  {
    question: 'When will the clinic open?',
    answer:
      "The contact and about pages publish the clinic's current opening status. An opening date, address, and consultation hours are added once they are confirmed.",
  },
  {
    question: 'What happens at a first appointment?',
    answer:
      'A first appointment is for consultation and assessment. You describe what you have noticed, the dentist examines the area, and any tests or imaging that are needed are explained. The findings and options are then discussed with you.',
  },
  {
    question: 'Will I know the cost before treatment begins?',
    answer:
      'Costs are discussed after assessment, when the plan is clear. The clinic will explain the factors that affect cost and what a plan includes before you decide.',
  },
  {
    question: 'Does Yali collect patient information through this website?',
    answer:
      'No. The website has no enquiry form, no patient account, and no analytics. If you later choose to call or send a WhatsApp message, that conversation happens outside the website. See the privacy page for details.',
  },
  {
    question: 'Is care for children available?',
    answer:
      'Yali is planned as a family dental clinic. The treatment information published so far covers root canal treatment, crowns, implants, and oral and maxillofacial care. Please ask about care for children when contact details are published.',
  },
];

/** Homepage walkthrough: four stages. */
export const homeVisitStages: VisitStage[] = [
  {
    id: 'consultation',
    step: '01',
    title: 'Consultation',
    summary: 'A conversation about what you have noticed, and what matters to you.',
    paragraphs: [
      'The first appointment starts with your account of the problem: when it began, what makes it better or worse, and what you would like to change.',
      'Your medical history, medication, and any previous dental treatment are reviewed, because they affect what can be planned.',
    ],
    list: ['What you have noticed and for how long', 'Previous treatment and current medication', 'Your priorities for the visit'],
  },
  {
    id: 'assessment',
    step: '02',
    title: 'Assessment',
    summary: 'An examination of the tooth or area, with any tests explained first.',
    paragraphs: [
      'The dentist examines the area and checks how the teeth meet. Some problems need tests or imaging to be understood properly.',
      'You will be told what is being checked and why, and what the findings mean.',
    ],
    list: ['Examination of the tooth, gum, or jaw', 'Tests or imaging where they are needed', 'A clear explanation of the findings'],
  },
  {
    id: 'planning',
    step: '03',
    title: 'Planning',
    summary: 'Options, trade-offs, timing, and cost discussed before anything is decided.',
    paragraphs: [
      'Where more than one option is suitable, the differences are explained: what each involves, how long it may take, what it costs, and how it is cared for afterwards.',
      'You leave with a plan you understand, including what happens next and what to do if something changes.',
    ],
    list: ['The options that may be suitable', 'The factors that affect timing and cost', 'A plan with clear next steps'],
  },
  {
    id: 'follow-up',
    step: '04',
    title: 'Follow-up',
    summary: 'Aftercare guidance and a review plan, with a way to raise concerns.',
    paragraphs: [
      'After treatment, you are given advice for the days that follow and told when to return for review.',
      'If something does not feel right between appointments, contact the clinic so that it can be assessed rather than waiting for the next visit.',
    ],
    list: ['Written aftercare guidance', 'When review is needed', 'What to do if you are worried'],
  },
];

/** Your visit page: five stages, including discussion of options and planning. */
export const visitStages: VisitStage[] = [
  {
    id: 'consultation',
    step: '01',
    title: 'Consultation',
    summary: 'We start with your account of the problem and your medical history.',
    paragraphs: [
      'A consultation is a conversation. You describe what you have noticed, how long it has been present, and what you would like to be different.',
      'Your medical history, medication, allergies, and previous dental treatment are reviewed. If you have records, imaging, or letters from another clinician, bring them along.',
    ],
    list: [
      'What you have noticed, and when it started',
      'Medical history, medication, and allergies',
      'Previous dental treatment and records you already have',
      'What you want from the visit',
    ],
  },
  {
    id: 'assessment',
    step: '02',
    title: 'Assessment',
    summary: 'An examination, with tests explained before they are carried out.',
    paragraphs: [
      'The dentist examines the tooth, gum, or area that is causing concern. The bite, the neighbouring teeth, and the general condition of the mouth may also be checked.',
      'Some problems need tests or imaging to be understood. You will be told what is being checked, why it is needed, and what the findings show.',
    ],
    list: ['A clinical examination', 'Tests or imaging where they are needed', 'An explanation of what the findings mean'],
  },
  {
    id: 'options',
    step: '03',
    title: 'Discussion of options',
    summary: 'Suitable options are explained, including the option of no treatment.',
    paragraphs: [
      'Where more than one option is suitable, the differences are explained without pressure: what each involves, what it can and cannot do, and how it is cared for afterwards.',
      'It is reasonable to ask which materials are being considered and why, how instruments are cleaned and sterilised, and what the plan includes. Questions are part of the appointment.',
    ],
    list: ['The options that may be suitable', 'The limits and trade-offs of each option', 'The questions you want answered'],
  },
  {
    id: 'planning',
    step: '04',
    title: 'Planning',
    summary: 'A clear plan, with timing and cost discussed before you decide.',
    paragraphs: [
      'If treatment is agreed, the plan sets out the appointments, the sequence, and the factors that could change it. Costs are explained after assessment, when the plan is clear.',
      'You should know what is being done at each visit and what to expect afterwards.',
    ],
    list: ['The agreed sequence of appointments', 'What affects timing and cost', 'What to do if the plan needs to change'],
  },
  {
    id: 'follow-up',
    step: '05',
    title: 'Follow-up',
    summary: 'Aftercare, review, and a clear route back to the clinic if something changes.',
    paragraphs: [
      'After treatment, you are given advice for the days that follow and told when review is needed.',
      'If something does not feel right between appointments, contact the clinic so that it can be assessed rather than waiting.',
    ],
    list: ['Aftercare guidance', 'Review appointments', 'How to raise a concern between visits'],
  },
];

export const beforeVisit: string[] = [
  'Bring a list of your medication, including anything you take without a prescription.',
  'Bring any recent dental records, imaging, or letters from another clinician.',
  'Write down your main concerns and questions so the appointment covers them.',
  'Tell the clinic about allergies, heart conditions, bleeding disorders, or medication that affects dental treatment.',
  'If you feel unwell on the day, contact the clinic to check whether the appointment should be moved.',
];

/**
 * Questions patients can ask during an appointment. These invite information
 * rather than assert specific clinic practices, because hygiene and
 * material-selection practices have not yet been confirmed for publication.
 */
export const questionsToAsk: string[] = [
  'What is happening to this tooth, and how do you know?',
  'Which options are realistic for me, and what are the trade-offs?',
  'Which materials are being considered, and why?',
  'How are instruments cleaned and sterilised between patients?',
  'What will the treatment involve, and how many appointments should I plan for?',
  'What does the cost include, and what is not included?',
  'What aftercare will I need, and when should I come back?',
  'What should I do if something changes before the next appointment?',
];
