import { parsePhoneNumberFromString } from 'libphonenumber-js';

/**
 * Validate phone number for the given country.
 * @param {string} phone - National number (digits only or with spaces)
 * @param {string} countryCode - ISO 3166-1 alpha-2 (e.g. 'US')
 * @param {string} callingCode - e.g. '1'
 * @returns {{ valid: boolean, message?: string }}
 */
export function validatePhoneForCountry(phone, countryCode, callingCode) {
  const trimmed = (phone || '').trim().replace(/\s/g, '');
  if (!trimmed) {
    return { valid: false, message: 'Phone number is required' };
  }
  const fullNumber = `+${callingCode}${trimmed}`;
  try {
    const parsed = parsePhoneNumberFromString(fullNumber, countryCode);
    if (!parsed) {
      return { valid: false, message: 'Invalid phone number for selected country' };
    }
    if (!parsed.isValid()) {
      return { valid: false, message: 'Invalid phone number for selected country' };
    }
    return { valid: true };
  } catch {
    return { valid: false, message: 'Invalid phone number for selected country' };
  }
}
