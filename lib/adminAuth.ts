export const ADMIN_SESSION_KEY = 'sjolabs_admin_authenticated';
export const ADMIN_TOKEN_KEY = 'sjolabs_admin_token';

/**
 * Validates the admin passcode against environment variable or fallback defaults.
 */
export function validateAdminPasscode(passcode: string): boolean {
  if (!passcode) return false;
  const validPasscodes = [
    process.env.ADMIN_PASSCODE,
    process.env.NEXT_PUBLIC_ADMIN_PASSCODE,
    'sjolabs2026',
    'admin',
  ].filter(Boolean) as string[];

  return validPasscodes.includes(passcode.trim());
}

/**
 * Generates an auth token for client/server session verification.
 */
export function generateAdminAuthToken(passcode: string): string {
  if (typeof window !== 'undefined') {
    return btoa(`sjolabs_admin:${passcode}`);
  }
  return Buffer.from(`sjolabs_admin:${passcode}`).toString('base64');
}

/**
 * Verifies if an auth token or header string is authorized.
 */
export function verifyAdminToken(token: string | null): boolean {
  if (!token) return false;
  try {
    const raw = token.replace('Bearer ', '').trim();
    let decoded = '';
    if (typeof window !== 'undefined') {
      decoded = atob(raw);
    } else {
      decoded = Buffer.from(raw, 'base64').toString('utf-8');
    }
    const [, passcode] = decoded.split(':');
    return validateAdminPasscode(passcode);
  } catch (err) {
    return false;
  }
}
