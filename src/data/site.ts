import type { ClinicState, VerifiedContactChannel } from './types';

/**
 * Single source of truth for clinic operations and contact behavior.
 *
 * Launch state:
 * - 'prelaunch' is the honest default while operational details are undecided.
 * - Switch to 'open' only when the address, hours and appointment wording have
 *   been approved by the clinic.
 *
 * Contact channels:
 * - Leave a channel as null until the number is verified. The interface only
 *   renders tel: and WhatsApp actions from a non-null channel.
 * - Never add a placeholder number.
 */
export interface WeekdayHours {
  label: string;
  value: string;
}

export interface ClinicConfig {
  name: string;
  shortName: string;
  tagline: string;
  city: string;
  state: ClinicState;
  phone: VerifiedContactChannel | null;
  whatsapp: VerifiedContactChannel | null;
  addressLines: string[] | null;
  hours: WeekdayHours[] | null;
  mapsUrl: string | null;
  /** Short, generic message. It must not ask for symptoms or medical details. */
  whatsappMessage: string;
}

export const clinic: ClinicConfig = {
  name: 'Yali Dental Clinic',
  shortName: 'Yali',
  tagline: 'Guardians of Your Smile.',
  city: 'Hyderabad',
  state: 'prelaunch',
  phone: null,
  whatsapp: null,
  addressLines: null,
  hours: null,
  mapsUrl: null,
  whatsappMessage: 'Hello Yali Dental Clinic, I would like to ask about an appointment.',
};

export const isPrelaunch = clinic.state === 'prelaunch';
export const isOpen = clinic.state === 'open';

export const telHref = clinic.phone?.value ? `tel:${clinic.phone.value.replace(/\s+/g, '')}` : null;

function toWhatsAppNumber(value: string): string {
  return value.replace(/[^0-9]/g, '');
}

export const whatsappHref = clinic.whatsapp?.value
  ? `https://wa.me/${toWhatsAppNumber(clinic.whatsapp.value)}?text=${encodeURIComponent(clinic.whatsappMessage)}`
  : null;

export const hasContactChannel = Boolean(telHref || whatsappHref);

export const publicAddress = clinic.addressLines && clinic.addressLines.length > 0 ? clinic.addressLines : null;

export const publicHours = clinic.hours && clinic.hours.length > 0 ? clinic.hours : null;

/** Human-readable status derived from configuration, never from a guess. */
export const statusLabel = isOpen ? `Dental care in ${clinic.city}.` : `Opening in ${clinic.city}.`;

export const statusDetail = isPrelaunch
  ? 'Address, hours, and contact details are being confirmed.'
  : hasContactChannel
    ? 'Appointments are confirmed manually after an enquiry.'
    : 'Contact details are being updated.';

export interface NavItem {
  label: string;
  href: string;
}

export const primaryNav: NavItem[] = [
  { label: 'Treatments', href: '/treatments' },
  { label: 'About', href: '/about' },
  { label: 'Your visit', href: '/your-visit' },
  { label: 'Contact', href: '/contact' },
];
