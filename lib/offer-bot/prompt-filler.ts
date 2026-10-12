import { OFFER_BOT_PROMPT } from './system-prompt';
import {
  SPOTS_LEFT,
  SPOTS_TOTAL,
  PRICE_NGN,
  PRICE_USD,
  DELIVERY_DAYS,
  PORTFOLIO_URL,
} from './offer-config';

/**
 * Replaces all {{PLACEHOLDER}} tags in the system prompt with values from offer-config.
 * Throws an Error if any {{...}} placeholders remain unresolved.
 */
export function fillOfferPrompt(customTemplate?: string): string {
  const template = customTemplate !== undefined ? customTemplate : OFFER_BOT_PROMPT;

  const replacements: Record<string, string> = {
    '{{PRICE_NGN}}': PRICE_NGN,
    '{{PRICE_USD}}': PRICE_USD,
    '{{SPOTS_LEFT}}': String(SPOTS_LEFT),
    '{{SPOTS_TOTAL}}': String(SPOTS_TOTAL),
    '{{DELIVERY_DAYS}}': DELIVERY_DAYS,
    '{{PORTFOLIO_URL}}': PORTFOLIO_URL,
  };

  let filled = template;

  for (const [placeholder, value] of Object.entries(replacements)) {
    // Replace all occurrences using global regex
    const escapedPlaceholder = placeholder.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    filled = filled.replace(new RegExp(escapedPlaceholder, 'g'), value);
  }

  // Check if any {{...}} placeholder pattern remains
  const remaining = filled.match(/\{\{([^}]+)\}\}/g);
  if (remaining && remaining.length > 0) {
    const uniqueRemaining = Array.from(new Set(remaining));
    throw new Error(
      `Unresolved placeholders remaining in offer prompt after filling: ${uniqueRemaining.join(', ')}`
    );
  }

  return filled;
}
