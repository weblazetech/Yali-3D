export interface PrivacySection {
  heading: string;
  paragraphs: string[];
  list?: string[];
}

export const privacy = {
  lead: 'This page describes what the Yali Dental Clinic website actually does with information. It is written to match the site as built, not a template.',
  sections: [
    {
      heading: 'What this website collects',
      paragraphs: [
        'The website does not have patient accounts, an enquiry form, a newsletter, payments, or appointment booking. It does not ask for symptoms, medical records, or personal details and it does not store them.',
        'Fonts and images are served from this website rather than from a font or media network.',
      ],
    },
    {
      heading: 'Analytics and performance measurement',
      paragraphs: [
        'The website uses Vercel Web Analytics to count page visits and show aggregate traffic information, and Vercel Speed Insights to measure page performance from real visits. Vercel describes Web Analytics as cookieless. Yali does not use either service for advertising or cross-site tracking.',
        "When the site is deployed on Vercel, the scripts are served by Vercel and the services process the technical request and performance information needed to produce those reports. Vercel's own privacy policy applies to that processing. The clinic does not use either service to identify patients or to collect symptoms, reports, or medical details.",
      ],
    },
    {
      heading: 'Contact links',
      paragraphs: [
        'Call and WhatsApp actions are shown only when the clinic has a verified number. At present none are published, so no contact link is rendered.',
        'When those actions are available, following one takes you outside this website. A call opens your phone app. A WhatsApp link opens WhatsApp with a short, general message that you can edit or discard before sending.',
        'WhatsApp is operated by a separate company and its own privacy policy applies to anything you send there. The website itself does not receive, record, or store the contents of a message. Please share medical details only through a channel you are comfortable using.',
      ],
    },
    {
      heading: 'Hosting',
      paragraphs: [
        "The site is delivered as static files. To serve a page, the hosting provider processes the technical request your browser makes, such as the page address and standard request information. The provider's own terms govern that processing.",
      ],
    },
    {
      heading: 'Children',
      paragraphs: [
        'The website does not ask anyone, including children, for personal or medical information. Analytics and performance measurement record page visits and timings, not patient details. It is written for adults arranging care for themselves or their family.',
      ],
    },
    {
      heading: 'Changes to this page',
      paragraphs: [
        'If the clinic adds a contact form or another service that changes how information is handled, this page will be updated before that change is used.',
      ],
    },
    {
      heading: 'Questions about privacy',
      paragraphs: [
        "A privacy contact will be published together with the clinic's verified contact details. Until then, the contact page explains which details are still being confirmed.",
      ],
    },
  ] as PrivacySection[],
  metaTitle: 'Privacy',
  metaDescription:
    'How the Yali Dental Clinic website handles information: no patient accounts or enquiry forms, Vercel Web Analytics and Speed Insights, and what happens when you follow a Call or WhatsApp link.',
};
