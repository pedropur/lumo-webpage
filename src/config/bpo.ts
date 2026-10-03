/**
 * Lumo BPO waitlist page (/bpo): everything that is a placeholder or that
 * the owner is likely to change lives here.
 *
 * PLACEHOLDERS: replace the values marked "PLACEHOLDER" before launch.
 */

export const BPO_PLACEHOLDERS = {
  // PLACEHOLDER: fake WhatsApp number (display only, it is not linked anywhere).
  whatsappDisplay: '(00) 00000-0000',
  // PLACEHOLDER: provisional legal pages under /bpo. Point these to the final
  // pages (or replace the page contents) when the real texts exist.
  privacyUrl: '/bpo/privacidade',
  termsUrl: '/bpo/termos',
} as const;

export const BPO_CONTACT = {
  supportEmail: 'suporte@lumoai.com.br',
  companyName: 'ZARPO SERVIÇOS DE TECNOLOGIA LTDA.',
  cnpj: '45.460.498/0001-03',
} as const;

/**
 * Waitlist delivery (see WaitlistCta.astro): each signup is sent by email through
 * the same EmailJS service and template the main site contact forms use
 * (Layout.astro). The public key and ids are public by design.
 */
export const WAITLIST_ENDPOINT = {
  url: 'https://api.emailjs.com/api/v1.0/email/send',
  serviceId: 'service_9qfmy3p',
  publicKey: 'O44KDP55MF8sy-1eS',
  templateId: 'template_nlq9zse',
} as const;

export const VOLUME_OPTIONS = [
  { value: 'ate-100', label: 'Até 100' },
  { value: '100-300', label: '100 a 300' },
  { value: '300-600', label: '300 a 600' },
  { value: 'mais-de-600', label: 'Mais de 600' },
] as const;

export const LAUNCH_PRICE = {
  plan: 'Essencial',
  price: 'R$ 99,90',
  months: 3,
} as const;

export const PLANS = [
  {
    name: 'Essencial',
    price: 'R$ 197',
    volume: 'até 100',
    accounts: '1',
    reconciliation: 'Semanal',
    weeklySummary: false,
    overage: 'R$ 1,90',
  },
  {
    name: 'Crescimento',
    price: 'R$ 397',
    volume: 'até 300',
    accounts: '2',
    reconciliation: 'Diária (dias úteis)',
    weeklySummary: false,
    overage: 'R$ 1,50',
  },
  {
    name: 'Pro',
    price: 'R$ 697',
    volume: 'até 600',
    accounts: '3',
    reconciliation: 'Diária (dias úteis)',
    weeklySummary: true,
    overage: 'R$ 1,20',
  },
] as const;
