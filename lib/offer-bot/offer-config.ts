// Single source of truth for the Founding Offer landing page and AI chatbot.
// Bare values with no currency symbols or extra words.

export const SPOTS_LEFT = 5;
export const SPOTS_TOTAL = 5;
export const PRICE_NGN = '150,000';
export const PRICE_USD = '120';
export const DELIVERY_DAYS = '7-10';
export const WHATSAPP = '2347042322885';
export const PORTFOLIO_URL = 'https://sjolabs.site/work';

export const OFFER_CONFIG = {
  SPOTS_LEFT,
  SPOTS_TOTAL,
  PRICE_NGN,
  PRICE_USD,
  DELIVERY_DAYS,
  WHATSAPP,
  PORTFOLIO_URL,
} as const;

export default OFFER_CONFIG;
