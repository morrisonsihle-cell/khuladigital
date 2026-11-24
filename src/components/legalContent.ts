export interface TextSegment {
  text: string;
  bold?: boolean;
  link?: {
    href: string;
    external?: boolean;
  };
}

export interface LegalBullet {
  label?: string;
  segments: TextSegment[];
}

export interface LegalSection {
  heading: string;
  paragraphs?: TextSegment[][];
  bullets?: LegalBullet[];
}

export interface LegalDocumentData {
  headerTag: string;
  title: string;
  meta: string;
  sections: LegalSection[];
}

const CONTACT_BULLETS: LegalBullet[] = [
  { label: 'Business Name', segments: [{ text: 'Khula Digital Solutions' }] },
  {
    label: 'Email',
    segments: [
      {
        text: 'info@khuladigitalsolutions.co.za',
        link: { href: 'mailto:info@khuladigitalsolutions.co.za' },
      },
    ],
  },
  {
    label: 'Phone / WhatsApp',
    segments: [
      {
        text: '065 108 5200',
        link: { href: 'tel:+27651085200' },
      },
    ],
  },
  { label: 'Location', segments: [{ text: 'Durban, KwaZulu-Natal, South Africa' }] },
];

export const PRIVACY_POLICY: LegalDocumentData = {
  headerTag: '// PRIVACY_POLICY',
  title: 'Privacy Policy',
  meta: 'Effective Date: November 20, 2026 | Website: khuladigitalsolutions.co.za | Entity: Khula Digital Solutions (“we”, “us”, or “our”)',
  sections: [
    {
      heading: '1. Overview & POPIA Compliance',
      paragraphs: [
        [
          { text: 'Khula Digital Solutions respects your privacy and is committed to protecting personal information in compliance with South Africa’s ' },
          { text: 'Protection of Personal Information Act 4 of 2013 (POPIA)', bold: true },
          { text: '. This Privacy Policy explains how we collect, use, store, and safeguard personal information when you visit khuladigitalsolutions.co.za or engage our digital agency services.' },
        ],
      ],
    },
    {
      heading: '2. Information We Collect',
      paragraphs: [
        [{ text: 'We only collect personal information necessary to operate our website, respond to inquiries, and deliver client projects:' }],
      ],
      bullets: [
        {
          label: 'Information You Provide Directly',
          segments: [
            { text: 'Your name, email address, phone or WhatsApp number, business name, project requirements, budget preferences, and brand assets submitted through our project inquiry forms (Start Project), contact channels, or email correspondence.' },
          ],
        },
        {
          label: 'Client & Billing Details',
          segments: [
            { text: 'Company details, billing addresses, tax/VAT details (where applicable), and payment confirmation records required for invoicing and accounting. We do not store credit or debit card numbers on our servers.' },
          ],
        },
        {
          label: 'Technical & Usage Data',
          segments: [
            { text: 'Standard browser and device information, IP address, referring URLs, and pages visited, collected automatically to maintain website security and performance.' },
          ],
        },
      ],
    },
    {
      heading: '3. How We Use Your Information',
      paragraphs: [
        [{ text: 'We process personal information strictly for legitimate business purposes, including:' }],
      ],
      bullets: [
        { segments: [{ text: 'Evaluating project inquiries, preparing quotes, and delivering web development, branding, e-commerce, and digital growth services.' }] },
        { segments: [{ text: 'Communicating project updates, design approvals, invoices, and technical support.' }] },
        { segments: [{ text: 'Improving the functionality, speed, and user experience of khuladigitalsolutions.co.za.' }] },
        { segments: [{ text: 'Complying with South African legal, tax, and regulatory obligations.' }] },
      ],
    },
    {
      heading: '4. Lawful Basis for Processing',
      paragraphs: [
        [{ text: 'Under POPIA, we process your personal information based on:' }],
      ],
      bullets: [
        { label: 'Consent', segments: [{ text: 'When you voluntarily submit an inquiry, start a project brief, or contact us.' }] },
        { label: 'Contractual Necessity', segments: [{ text: 'When processing is required to prepare a proposal or fulfill an active client project.' }] },
        { label: 'Legal Obligation & Legitimate Interest', segments: [{ text: 'To maintain business records, secure our digital infrastructure, and protect our legal rights.' }] },
      ],
    },
    {
      heading: '5. Cookies & Third-Party Service Providers',
      bullets: [
        {
          label: 'Cookies',
          segments: [
            { text: 'Our website may use essential and analytics cookies to ensure proper site functionality and understand visitor traffic patterns. You can manage or disable cookies through your browser settings.' },
          ],
        },
        {
          label: 'Trusted Third Parties',
          segments: [
            { text: 'We do not sell, rent, or trade your personal information. We may share necessary data with trusted infrastructure providers (such as web hosting, domain registrars, cloud storage, email tools, and payment processors) strictly to deliver our services. Where third-party cloud providers process data outside South Africa, we ensure safeguards aligned with Section 72 of POPIA.' },
          ],
        },
      ],
    },
    {
      heading: '6. Data Security & Retention',
      paragraphs: [
        [
          { text: 'We implement reasonable technical and organizational security measures—including encrypted connections (HTTPS/SSL) and restricted access controls—to protect your information against unauthorized access, loss, or misuse. Personal information is retained only for as long as necessary to fulfill the purpose for which it was collected or as required by South African statutory retention laws.' },
        ],
      ],
    },
    {
      heading: '7. Your Rights Under POPIA',
      paragraphs: [[{ text: 'You have the right to:' }]],
      bullets: [
        { segments: [{ text: 'Request confirmation of whether we hold personal information about you and request access to it.' }] },
        { segments: [{ text: 'Request the correction, updating, or deletion of inaccurate or outdated personal information.' }] },
        { segments: [{ text: 'Object to the processing of your personal information or withdraw previously given consent.' }] },
        {
          segments: [
            { text: 'Lodge a complaint with the ' },
            { text: 'Information Regulator (South Africa)', bold: true },
            { text: ' at ' },
            { text: 'https://inforeg.org.za', link: { href: 'https://inforeg.org.za', external: true } },
            { text: ' if you believe your data rights have been infringed.' },
          ],
        },
      ],
    },
    {
      heading: '8. Contact Our Information Officer',
      paragraphs: [[{ text: 'For privacy inquiries or POPIA access requests, contact:' }]],
      bullets: CONTACT_BULLETS,
    },
  ],
};

export const TERMS_OF_SERVICE: LegalDocumentData = {
  headerTag: '// TERMS_OF_SERVICE',
  title: 'Terms of Service',
  meta: 'Effective Date: November 20, 2026 | Website: khuladigitalsolutions.co.za',
  sections: [
    {
      heading: '1. Acceptance of Terms',
      paragraphs: [
        [
          { text: 'By accessing khuladigitalsolutions.co.za, selecting a service package, or engaging Khula Digital Solutions for project work, you agree to be bound by these Terms of Service. If you enter into a separate written proposal, quote, or Statement of Work (SOW) with us, those project-specific terms will prevail in the event of any conflict.' },
        ],
      ],
    },
    {
      heading: '2. Scope of Services',
      paragraphs: [
        [
          { text: 'Khula Digital Solutions provides digital agency services including custom website design and development, e-commerce store builds, visual branding and logo systems, digital strategy, and search/generative engine optimization. Specific deliverables, timelines, and package inclusions are defined in your approved quote or project brief.' },
        ],
      ],
    },
    {
      heading: '3. Quotes, Deposits & Payments',
      bullets: [
        {
          label: 'Currency',
          segments: [
            { text: 'All pricing is quoted and billed in ' },
            { text: 'South African Rand (ZAR)', bold: true },
            { text: ' unless expressly agreed otherwise in writing.' },
          ],
        },
        {
          label: 'Deposit & Milestones',
          segments: [
            { text: 'Unless otherwise specified in your proposal, a ' },
            { text: '50% non-refundable deposit', bold: true },
            { text: ' is required to schedule and initiate work. The remaining balance is payable upon project completion and prior to final live deployment, source file release, or account handover.' },
          ],
        },
        {
          label: 'Overdue Accounts',
          segments: [
            { text: 'Invoices are payable within the timeframe stated on the invoice. Late payments may result in paused development, delayed launch dates, or temporary suspension of agency-managed staging/hosting environments until settled.' },
          ],
        },
      ],
    },
    {
      heading: '4. Client Responsibilities & Content Supply',
      bullets: [
        {
          segments: [
            { text: 'You agree to provide accurate business details, text copy, product catalogues, high-resolution media, and timely feedback within agreed project schedules. Delays in supplying content or approvals will extend estimated delivery timelines accordingly.' },
          ],
        },
        {
          segments: [
            { text: 'You warrant that all brand assets, images, copy, and materials supplied to Khula Digital Solutions are owned by you or properly licensed, and do not infringe third-party intellectual property rights.' },
          ],
        },
      ],
    },
    {
      heading: '5. Revisions & Scope Changes',
      paragraphs: [
        [
          { text: 'Each package or proposal includes the stated number of revision rounds. Substantial design pivots, additional pages/features, or requests outside the agreed scope will be quoted separately as a scope variation before execution.' },
        ],
      ],
    },
    {
      heading: '6. Intellectual Property Rights',
      bullets: [
        {
          label: 'Client Ownership',
          segments: [
            { text: 'Upon receipt of full payment, intellectual property rights in final approved bespoke deliverables (custom website front-end/builds, final vector logos, and custom graphic assets) transfer to you.' },
          ],
        },
        {
          label: 'Third-Party & Agency Materials',
          segments: [
            { text: 'Ownership excludes third-party software, themes, plugins, commercial fonts, stock media, and pre-existing agency code libraries or frameworks, which remain subject to their respective licenses.' },
          ],
        },
        {
          label: 'Portfolio Rights',
          segments: [
            { text: 'Khula Digital Solutions reserves the right to display completed websites, branding assets, and project outcomes in our portfolio, case studies, and promotional channels unless restricted by a signed Non-Disclosure Agreement (NDA).' },
          ],
        },
      ],
    },
    {
      heading: '7. Third-Party Platforms, Domains & Hosting',
      paragraphs: [
        [
          { text: 'Client websites and e-commerce stores often integrate third-party platforms, registrars, hosting providers, or payment gateways. Ongoing third-party subscription fees, domain renewals, and post-launch maintenance retainers are your responsibility unless explicitly included in an active care package. We are not liable for downtime, policy changes, or service disruptions caused by third-party providers.' },
        ],
      ],
    },
    {
      heading: '8. Warranties & Limitation of Liability',
      bullets: [
        {
          segments: [
            { text: 'khuladigitalsolutions.co.za and our deliverables are provided on an “as-is” and “as-available” basis to the fullest extent permitted by South African law. While we build to modern web and performance standards, we do not guarantee specific commercial revenue, search engine rankings, or uninterrupted third-party server uptime.' },
          ],
        },
        {
          segments: [
            { text: 'To the maximum extent permitted by law, Khula Digital Solutions’ aggregate liability for any claim arising out of our services shall not exceed the total fees actually paid by you for the specific project giving rise to the claim.' },
          ],
        },
      ],
    },
    {
      heading: '9. Cancellation & Termination',
      paragraphs: [
        [
          { text: 'Either party may terminate a project in writing if the other party commits a material breach and fails to remedy it within ' },
          { text: '7 business days', bold: true },
          { text: ' of written notice. If you cancel a project prior to completion, the initial deposit remains non-refundable, and you will be invoiced for all work completed up to the date of written cancellation.' },
        ],
      ],
    },
    {
      heading: '10. Governing Law & Jurisdiction',
      paragraphs: [
        [
          { text: 'These Terms are governed by the laws of the ' },
          { text: 'Republic of South Africa', bold: true },
          { text: ', including the Electronic Communications and Transactions Act 25 of 2002 (ECT Act). Any disputes arising from these Terms or our services shall fall under the jurisdiction of the courts of KwaZulu-Natal, South Africa.' },
        ],
      ],
    },
    {
      heading: '11. Contact Information',
      paragraphs: [[{ text: 'For questions regarding these Terms of Service, reach out to:' }]],
      bullets: CONTACT_BULLETS,
    },
  ],
};
