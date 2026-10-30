import type { Treatment } from './types';

/**
 * Treatment copy. Everything here is general patient information that still
 * requires Dr. Reddy's clinical review before public release. Availability of
 * specific diagnostics, materials and procedures at Yali is unconfirmed and is
 * deliberately not stated.
 */
export const treatments: Treatment[] = [
  {
    slug: 'root-canals-crowns',
    href: '/treatments/root-canals-crowns',
    navLabel: 'Root canals and crowns',
    cardTitle: 'Root canal treatment and crowns',
    title: 'Root canal treatment and crowns',
    metaTitle: 'Root canal treatment and crowns in Hyderabad',
    metaDescription:
      'How root canal treatment and crowns differ, what an assessment involves, the options that may be considered, and what follow-up looks like at Yali Dental Clinic.',
    lead: 'A root canal treats the inside of a tooth. A crown restores the outside. They are sometimes planned together and sometimes separately, depending on what the tooth needs.',
    summary:
      'Treatment for teeth that are infected, badly damaged, or weakened, including when a crown is needed to protect a repaired tooth.',
    concerns: ['pain-damage'],
    visual: 'crown',
    sections: [
      {
        id: 'addresses',
        label: 'What it addresses',
        heading: 'What root canal treatment and crowns address',
        paragraphs: [
          'Root canal treatment is for a tooth where the pulp, the soft tissue inside the tooth, has become infected or damaged. The aim is to remove the affected tissue, clean the inside of the tooth, and seal it so the tooth can be kept in place.',
          'A crown is a covering that restores the shape and strength of a tooth weakened by damage, a large filling, or root canal treatment. It is made to fit over the remaining tooth.',
        ],
        blocks: [
          {
            heading: 'Root canal treatment',
            paragraphs: [
              'The pulp can become inflamed or infected after deep decay, a fracture, or an injury. Symptoms vary: some people have pain, some have sensitivity, and some notice a change in the colour of the tooth.',
              'Treatment is carried out to remove the affected tissue rather than to leave it in place. The tooth is then sealed, and a restoration or crown is planned where it is needed.',
            ],
          },
          {
            heading: 'Crowns',
            paragraphs: [
              'A crown covers a tooth that does not have enough sound structure left to hold an ordinary filling. It can also protect a tooth after root canal treatment.',
              'Crowns are made to measure. The tooth is prepared, a record of its shape is taken, and the crown is made so that it fits the tooth and meets the opposing teeth correctly.',
            ],
          },
        ],
      },
      {
        id: 'assessment',
        label: 'Assessment',
        heading: 'What assessment involves',
        paragraphs: [
          'An assessment starts with what you have noticed: pain, sensitivity, swelling, a broken tooth, or a change in how a tooth feels when you bite.',
          'The tooth is examined and tested, and imaging may be used to see the shape of the roots and the bone around them. The findings are explained before treatment options are discussed.',
        ],
        list: [
          'Your symptoms and how long they have been present',
          'The condition of the tooth, the gum, and the surrounding bone',
          'How much sound tooth remains and whether the tooth can be restored',
          'Medical history or medication that affects planning',
        ],
      },
      {
        id: 'options',
        label: 'Options',
        heading: 'Options that may be considered',
        paragraphs: [
          'The options depend on the tooth. A tooth that cannot be repaired may need to be removed. Where a tooth can be kept, root canal treatment may be recommended before a restoration or crown is placed.',
          'The choice of restoration depends on how much tooth structure remains, the position of the tooth, and the bite.',
        ],
        blocks: [
          {
            heading: 'Keeping the tooth',
            paragraphs: [
              'Root canal treatment followed by a crown or another restoration. The type of restoration is chosen after the tooth has been assessed and prepared.',
            ],
          },
          {
            heading: 'Removing the tooth',
            paragraphs: [
              'Extraction may be the appropriate option when a tooth is badly broken or has lost too much support to be restored. Replacement options can be discussed at the same visit.',
            ],
          },
          {
            heading: 'Crown materials',
            paragraphs: [
              'Crowns are made in different materials, and each has trade-offs in appearance, strength, and the amount of tooth that needs to be prepared. The options discussed depend on the tooth and on what the dental laboratory can provide.',
            ],
          },
        ],
      },
      {
        id: 'timing-cost',
        label: 'Timing and cost',
        heading: 'What affects timing and cost',
        paragraphs: [
          'Root canal treatment can involve more than one visit. The number depends on the tooth, the infection, and how treatment progresses.',
          'A crown is usually made after the tooth has been prepared and a record of its shape has been taken. Laboratory work adds time between appointments.',
          'Costs are discussed after assessment, once the plan is clear. The clinic will explain what a plan includes before treatment begins.',
        ],
        list: [
          'The tooth involved and how much treatment it needs',
          'Whether a crown or another restoration is chosen, and the material',
          'Laboratory work and the number of appointments',
          'Any additional treatment identified during assessment',
        ],
      },
      {
        id: 'follow-up',
        label: 'Follow-up',
        heading: 'Follow-up',
        paragraphs: [
          'After root canal treatment, the tooth and the tissues around it are reviewed. After a crown is fitted, the fit, the bite, and the gum around the edge of the crown are checked.',
          'If something does not feel right after treatment, contact the clinic so that it can be assessed.',
        ],
        list: [
          'What to expect in the days after treatment',
          'How to care for the tooth at home',
          'When to return for review',
          'What to do if a crown feels high or loose',
        ],
      },
    ],
    faqs: [
      {
        question: 'Will I need a crown after a root canal?',
        answer:
          'Not always. A crown is often considered when a tooth has lost a lot of structure or needs extra protection. The decision depends on the tooth and is discussed during assessment.',
      },
      {
        question: 'How long does treatment take?',
        answer:
          'It varies. Some teeth are treated in one visit and others need more than one. The clinic will explain the likely sequence for your tooth after assessment.',
      },
      {
        question: 'Does root canal treatment hurt?',
        answer:
          'The tooth is treated with local anaesthesia. Some tenderness afterwards is possible, and your clinician will explain what to expect, how to care for the tooth, and when to get in touch if something does not settle.',
      },
      {
        question: 'Can a crowned tooth still decay?',
        answer:
          'Yes. A crown covers the tooth, but the tooth and the gum around the edge of the crown still need cleaning. Review visits check the crown and the surrounding gum.',
      },
      {
        question: 'What if the tooth cannot be saved?',
        answer:
          'If a tooth cannot be repaired, extraction and replacement options are discussed. Nothing is decided without your agreement.',
      },
    ],
    related: ['dental-implants'],
  },
  {
    slug: 'dental-implants',
    href: '/treatments/dental-implants',
    navLabel: 'Dental implants',
    cardTitle: 'Dental implants',
    title: 'Dental implants',
    metaTitle: 'Dental implants in Hyderabad',
    metaDescription:
      'Single tooth, multi-tooth and full-arch implant replacement explained, with assessment, options, timing, follow-up and an interactive implant illustration from Yali Dental Clinic.',
    lead: 'A dental implant replaces a missing tooth root. A crown, bridge, or full-arch restoration is then attached to it. Suitability depends on an assessment of your mouth and general health.',
    summary:
      'Replacement of missing teeth with implant-supported crowns, bridges, or full-arch restorations, planned after assessment.',
    concerns: ['missing-teeth'],
    visual: 'implant',
    sections: [
      {
        id: 'addresses',
        label: 'What it addresses',
        heading: 'What dental implants address',
        paragraphs: [
          'Dental implants are used to replace missing teeth. The implant is a small fixture placed in the jawbone, where it acts as an anchor for the replacement tooth.',
          'Implants can support a single crown, a bridge, or a restoration that replaces many teeth. Which of these applies depends on how many teeth are missing, the condition of the gums and bone, and the bite.',
        ],
        blocks: [
          {
            heading: 'One missing tooth',
            paragraphs: [
              'One implant can support one crown when the teeth either side are healthy and do not need to be prepared for a bridge.',
            ],
          },
          {
            heading: 'Several missing teeth',
            paragraphs: [
              'Implants can support a bridge. In some cases this avoids preparing healthy neighbouring teeth, which a conventional bridge requires.',
            ],
          },
          {
            heading: 'Full-arch care',
            paragraphs: [
              'Where many or all teeth are missing, implants can support a fixed or removable full-arch restoration. This is a larger plan, with more appointments and a longer assessment.',
            ],
          },
        ],
      },
      {
        id: 'assessment',
        label: 'Assessment',
        heading: 'What assessment involves',
        paragraphs: [
          'Assessment looks at the space, the gums, the bone, the bite, and your general health. Some medical conditions and medications affect healing and are discussed before any plan is made.',
          'Smoking and conditions such as diabetes can affect healing. The clinic will discuss what this means for you without judgement, and will explain if another option is more appropriate.',
        ],
        list: [
          'Medical history, medication, and anything that affects healing',
          'Gum health and the amount of bone available',
          'The bite and the condition of neighbouring teeth',
          'Imaging needed to plan the position of an implant',
        ],
      },
      {
        id: 'options',
        label: 'Options',
        heading: 'Options that may be considered',
        paragraphs: [
          'Missing teeth can be replaced in different ways. An implant is one option. A bridge or a removable denture may also be considered. Each has trade-offs in cost, appointments, and day-to-day care.',
          'Where there is not enough bone, additional treatment such as grafting may be discussed. If an implant is not appropriate, the reasons will be explained.',
        ],
        blocks: [
          {
            heading: 'Implant-supported restoration',
            paragraphs: [
              'A crown, bridge, or full-arch restoration supported by implants. The number of implants and the type of restoration are planned after assessment.',
            ],
          },
          {
            heading: 'Conventional bridge',
            paragraphs: [
              'A bridge uses the teeth either side of the gap for support, which usually means preparing those teeth. It can be a suitable option when those teeth already need crowns.',
            ],
          },
          {
            heading: 'Removable denture',
            paragraphs: [
              'A denture can replace missing teeth without surgery. It is removed for cleaning and may be considered where implant treatment is not suitable or not wanted.',
            ],
          },
        ],
      },
      {
        id: 'timing-cost',
        label: 'Timing and cost',
        heading: 'What affects timing and cost',
        paragraphs: [
          'Implant treatment is staged. Placement, healing, and the final restoration are separate steps. The time between them depends on the site and on how healing progresses.',
          'Cost depends on the number of implants, the type of restoration, the materials, laboratory work, and any additional procedures such as grafting. A written plan is discussed after assessment.',
        ],
        list: [
          'How many teeth are being replaced',
          'Bone condition and whether grafting is needed',
          'Healing between placement and the final restoration',
          'The restoration material and laboratory work',
        ],
      },
      {
        id: 'follow-up',
        label: 'Follow-up',
        heading: 'Follow-up',
        paragraphs: [
          'Implants need regular review and careful cleaning, in the same way as natural teeth. Reviews look at the gum around the implant, the bite, and the restoration.',
          'If an implant area becomes tender, swollen, or loose, contact the clinic so that it can be assessed.',
        ],
        list: [
          'How to clean around the implant and the restoration',
          'When review appointments are needed',
          'What to do if the area becomes tender or swollen',
          'How the restoration is checked over time',
        ],
      },
    ],
    faqs: [
      {
        question: 'Am I suitable for an implant?',
        answer:
          'Suitability is confirmed through assessment. Bone volume, gum health, medical history, and the bite all matter. Some people need additional treatment first, and for others a different option may be more appropriate.',
      },
      {
        question: 'Is implant treatment painful?',
        answer:
          'Placement is carried out with local anaesthesia. Discomfort afterwards varies from person to person. Your clinician will explain what to expect, how to care for the area, and when to get in touch.',
      },
      {
        question: 'How long do implants last?',
        answer:
          'Many implants last for years, but this depends on general health, hygiene, smoking, and regular review. No clinician can promise a specific lifespan for an individual implant.',
      },
      {
        question: 'Can I have an implant instead of a bridge?',
        answer:
          'Sometimes. A bridge can be appropriate when the neighbouring teeth need crowns. An implant can be appropriate when they do not. The trade-offs are discussed during assessment.',
      },
      {
        question: 'What is the connector shown in the illustration?',
        answer:
          'The connector, also called an abutment, joins the implant to the crown. Its position and shape are planned so that the crown sits correctly against the gum.',
      },
    ],
    related: ['root-canals-crowns', 'oral-maxillofacial-care'],
  },
  {
    slug: 'oral-maxillofacial-care',
    href: '/treatments/oral-maxillofacial-care',
    navLabel: 'Oral and maxillofacial care',
    cardTitle: 'Oral and maxillofacial care',
    title: 'Oral and maxillofacial care',
    metaTitle: 'Oral and maxillofacial care in Hyderabad',
    metaDescription:
      'How surgical concerns of the mouth, jaws and face are assessed at Yali Dental Clinic, and how clinic care, hospital care and specialist referral are kept distinct.',
    lead: 'Care for surgical conditions of the mouth, jaws, and face, with a clear distinction between what can be treated at Yali and what needs hospital care or a specialist referral.',
    summary:
      'Assessment of surgical concerns of the mouth, jaws, and face, with a clear explanation of whether care happens in the clinic, in hospital, or through referral.',
    concerns: ['surgical'],
    sections: [
      {
        id: 'addresses',
        label: 'What it addresses',
        heading: 'What oral and maxillofacial care addresses',
        paragraphs: [
          'Oral and maxillofacial care covers conditions affecting the mouth, jaws, and face that may need surgical assessment or treatment.',
          'Some of this care is straightforward and can be planned in a clinic. Other procedures need a hospital setting, a surgical team, or another specialty. We explain which situation applies to you before anything is arranged.',
        ],
        list: [
          'Concerns that may need surgical assessment rather than routine dental treatment',
          'Conditions where the jaw, mouth, or face needs to be examined more closely',
          'Situations where care is shared with a hospital team or another specialist',
        ],
      },
      {
        id: 'assessment',
        label: 'Assessment',
        heading: 'What assessment involves',
        paragraphs: [
          'Assessment begins with the history of the problem and a clinical examination. Imaging, reports from other clinicians, and your medical history may be needed before a plan can be discussed.',
          "Dr. Reddy's surgical background informs this assessment. Where a procedure is outside what Yali can provide, the clinic will say so and explain the referral pathway.",
        ],
        list: [
          'What you have noticed and how long it has been present',
          'Examination of the mouth, jaw, and face',
          'Imaging or records needed to understand the problem',
          'Medical conditions, medication, or other specialists involved in your care',
        ],
      },
      {
        id: 'options',
        label: 'Options',
        heading: 'Options that may be considered',
        paragraphs: [
          'Options may include observation, non-surgical treatment, a procedure at the clinic, or referral for hospital-based care.',
          'The setting matters. Some procedures are suitable for a clinic; others need hospital facilities and a team that includes anaesthesia or other specialties. The assessment will explain which applies to you.',
        ],
        blocks: [
          {
            heading: 'Care at Yali',
            paragraphs: [
              'Where a concern is suitable for clinic-based care, the procedure, aftercare, and review are planned with you, and the reasons for the plan are explained.',
            ],
          },
          {
            heading: 'Hospital care and referral',
            paragraphs: [
              'Where hospital care is more appropriate, the clinic will explain why and, where possible, help with the referral. Care at another hospital is provided by that hospital team.',
            ],
          },
        ],
      },
      {
        id: 'timing-cost',
        label: 'Timing and cost',
        heading: 'What affects timing and cost',
        paragraphs: [
          'Timing depends on the condition, the need for imaging or reports, hospital scheduling where relevant, and recovery.',
          'Cost depends on where the care takes place and what is involved. These details are discussed before you commit to a plan.',
        ],
        list: [
          'The nature of the concern and how urgently it needs review',
          'Whether care is provided at Yali or in a hospital',
          'Imaging, reports, and coordination with other clinicians',
          'Recovery and follow-up arrangements',
        ],
      },
      {
        id: 'follow-up',
        label: 'Follow-up',
        heading: 'Follow-up',
        paragraphs: [
          'Review is planned around the procedure. For hospital-based care, follow-up may be shared between the hospital team and Yali, and this is explained in advance.',
          'You should leave with clear written instructions about aftercare, warning signs, and who to contact if something changes.',
        ],
        list: [
          'What to expect during recovery',
          'How to care for the treated area',
          'When review is needed, and with whom',
          'What to do if you are worried between appointments',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is oral surgery always carried out in hospital?',
        answer:
          'No. Some procedures are suitable for a clinic setting. Others need hospital facilities or a surgical team. The assessment will explain which applies to you.',
      },
      {
        question: 'Do I need a referral?',
        answer:
          'You can contact the clinic directly for an assessment. If your care needs another specialty or hospital treatment, the referral will be explained and arranged where possible.',
      },
      {
        question: 'What does maxillofacial mean?',
        answer:
          'It refers to the mouth, jaws, and face. Oral and maxillofacial care covers surgical conditions in these areas.',
      },
      {
        question: 'Will Dr. Reddy carry out my surgery?',
        answer:
          "Dr. Reddy's surgical experience informs the assessment and plan. Whether he carries out a procedure at Yali or in a hospital setting depends on the care needed, and is discussed with you directly.",
      },
      {
        question: 'What should I bring to the appointment?',
        answer:
          'Bring any relevant dental records and imaging, a list of your medication, and letters from other clinicians if you have them. These help make the assessment more useful.',
      },
    ],
    related: ['dental-implants', 'root-canals-crowns'],
  },
];

export const treatmentBySlug = new Map(treatments.map((treatment) => [treatment.slug, treatment]));

export function getTreatment(slug: string): Treatment {
  const treatment = treatmentBySlug.get(slug);
  if (!treatment) {
    throw new Error(`Unknown treatment slug: ${slug}`);
  }
  return treatment;
}
