/**
 * Normalizes a raw phone number for WhatsApp links (wa.me/<digits>).
 * Rules:
 * (a) Leading '00' is stripped (e.g. 0044 7911 123456 -> 447911123456).
 * (b) '2340...' drops the extra '0' (e.g. 2340803 123 4567 -> 2348031234567).
 * (c) A 10-digit number with no country code and no leading 0 is treated as invalid (returns null).
 * (d) Only 11-digit numbers starting with 0 are treated as Nigerian local numbers (replaces '0' with '234').
 * Reject numbers under 10 or over 15 digits, and any non-numeric strings.
 */
export function normalizePhoneNumber(raw: string | null | undefined): string | null {
  if (!raw || typeof raw !== 'string') return null;

  // 1. Strip spaces, dashes, brackets, and '+'
  let cleaned = raw.replace(/[\s\-\(\)\+]/g, '').trim();

  // Ensure digits only
  if (!/^\d+$/.test(cleaned)) return null;

  // (a) If starts with '00', strip the leading '00'
  if (cleaned.startsWith('00')) {
    cleaned = cleaned.slice(2);
  }

  // (b) If starts with '2340', drop the extra 0
  if (cleaned.startsWith('2340')) {
    cleaned = '234' + cleaned.slice(4);
  }

  // (d) Only 11-digit numbers starting with 0 are treated as Nigerian local numbers
  if (cleaned.startsWith('0')) {
    if (cleaned.length === 11) {
      cleaned = '234' + cleaned.slice(1);
    } else {
      // Leading 0 with length != 11 is rejected
      return null;
    }
  }

  // (c) A 10-digit number with no country code and no leading 0 is treated as invalid
  if (cleaned.length === 10) {
    return null;
  }

  // General international phone bounds (11 to 15 digits)
  if (cleaned.length < 11 || cleaned.length > 15) {
    return null;
  }

  return cleaned;
}

/**
 * Validates whether a lead has all required fields with sensible lengths.
 */
export function validateLeadFields(lead: {
  name?: string | null;
  business?: string | null;
  what_it_does?: string | null;
  whatsapp?: string | null;
}): {
  isValid: boolean;
  cleanName: string;
  cleanBusiness: string;
  cleanWhatItDoes: string;
  cleanWhatsapp: string;
  error?: string;
} {
  const cleanName = (lead.name || '').trim();
  const cleanBusiness = (lead.business || '').trim();
  const cleanWhatItDoes = (lead.what_it_does || '').trim();
  const rawWhatsapp = (lead.whatsapp || '').trim();

  if (!cleanName || cleanName.length > 100) {
    return {
      isValid: false,
      cleanName,
      cleanBusiness,
      cleanWhatItDoes,
      cleanWhatsapp: '',
      error: 'Name is required and must be under 100 characters.',
    };
  }

  if (!cleanBusiness || cleanBusiness.length > 100) {
    return {
      isValid: false,
      cleanName,
      cleanBusiness,
      cleanWhatItDoes,
      cleanWhatsapp: '',
      error: 'Business name is required and must be under 100 characters.',
    };
  }

  if (!cleanWhatItDoes || cleanWhatItDoes.length > 200) {
    return {
      isValid: false,
      cleanName,
      cleanBusiness,
      cleanWhatItDoes,
      cleanWhatsapp: '',
      error: 'Business description is required and must be under 200 characters.',
    };
  }

  const normalizedPhone = normalizePhoneNumber(rawWhatsapp);
  if (!normalizedPhone) {
    return {
      isValid: false,
      cleanName,
      cleanBusiness,
      cleanWhatItDoes,
      cleanWhatsapp: '',
      error: 'Invalid phone number. Include your country code if you are outside Nigeria (e.g. +44).',
    };
  }

  return {
    isValid: true,
    cleanName,
    cleanBusiness,
    cleanWhatItDoes,
    cleanWhatsapp: normalizedPhone,
  };
}
