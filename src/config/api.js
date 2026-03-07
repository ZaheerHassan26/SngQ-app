/**
 * API configuration.
 * Base URL for Saige API (https://saige.mytechmaestro.com/).
 */

const HOST = 'https://saige.mytechmaestro.com';
export const API_BASE_URL = HOST.endsWith('/') ? HOST.slice(0, -1) : HOST;

export const API_CUSTOMER_PREFIX = 'api/v1/customer';

export const API_TIMEOUT = 15000; // 15 seconds

export const STRIPE_PUBLISHABLE_KEY = '';
export const STRIPE_MERCHANT_IDENTIFIER = 'merchant.com.chemistryxo';
export const STRIPE_MERCHANT_COUNTRY_CODE = 'US';
