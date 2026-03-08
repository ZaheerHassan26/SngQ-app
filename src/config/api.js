/**
 * API configuration.
 * Base URL for Saige API (https://saige.mytechmaestro.com/).
 */
import { STRIPE_PUBLISHABLE_KEY_ENV, STRIPE_SECRET_KEY_ENV, STRIPE_MERCHANT_IDENTIFIER_ENV, STRIPE_MERCHANT_COUNTRY_CODE_ENV } from '@env';

const HOST = 'https://saige.mytechmaestro.com';
export const API_BASE_URL = HOST.endsWith('/') ? HOST.slice(0, -1) : HOST;

export const API_CUSTOMER_PREFIX = 'api/v1/customer';

export const API_TIMEOUT = 15000; // 15 seconds

export const STRIPE_PUBLISHABLE_KEY = STRIPE_PUBLISHABLE_KEY_ENV;
export const STRIPE_SECRET_KEY = STRIPE_SECRET_KEY_ENV;
export const STRIPE_MERCHANT_IDENTIFIER = STRIPE_MERCHANT_IDENTIFIER_ENV;
export const STRIPE_MERCHANT_COUNTRY_CODE = STRIPE_MERCHANT_COUNTRY_CODE_ENV;
