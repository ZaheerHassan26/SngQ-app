import apiClient from './apiClient';
import { getToastRef } from './toastRef';
import {
  dispatchFullname,
  dispatchGetQuestions,
  dispatchIsVip,
  dispatchMessages,
  dispatchProDetail,
  dispatchRememberMe,
  dispatchToken,
  dispatchUpdatedId,
  dispatchUserValue,
} from '../redux/actions';
import { Store } from '../redux/store';
import { Platform } from 'react-native';
import { API_BASE_URL, API_CUSTOMER_PREFIX } from '../config/api';

const CUSTOMER = API_CUSTOMER_PREFIX;
const FORM_DATA_TIMEOUT_MS = 30000;

/** Get Bearer token from Redux for direct API calls */
function getBearerToken() {
  const state = Store.getState();
  const token = state?.userReducer?.token;
  if (!token || typeof token !== 'string') return '';
  return token.trim().replace(/^Bearer\s+/i, '');
}

/**
 * FormData POST via fetch (no apiClient). Use for multipart requests.
 * Same approach as updateProfileWithFormData: AbortController timeout, only Authorization header, body = formData.
 */
async function fetchFormDataPost(path, formData) {
  const baseURL = (API_BASE_URL || '').replace(/\/+$/, '');
  const url = path.startsWith('/') ? `${baseURL}${path}` : `${baseURL}/${path}`;
  const token = getBearerToken();
  if (!token) {
    const err = new Error('Not authenticated');
    err.status = 401;
    err.data = {};
    throw err;
  }
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FORM_DATA_TIMEOUT_MS);
  const response = await fetch(url, {
    method: 'POST',
    signal: controller.signal,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  clearTimeout(timeoutId);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const err = new Error(data?.message || data?.error || `Request failed (${response.status})`);
    err.status = response.status;
    err.data = data;
    err.response = { status: response.status, data };
    throw err;
  }
  return data;
}

function normalizeAuthResponse(data) {
  const d = data?.data || data;
  return {
    token: d?.token ?? d?.access_token ?? d?.auth_token,
    user: d?.user ?? d?.customer ?? d?.data,
  };
}

function showAuthErrorToast(message = 'Please enter correct details.') {
  getToastRef()?.showError?.(message);
}

/**
 * Post-login redirect based on API flags (onboarding, post_approval, quiz, chat_intake).
 * Returns { screen, params } for navigation.replace(screen, params).
 * When all four are complete → MainStack (home); otherwise NextChatScreen until quiz + chat intake done.
 * @param {object} data - API response.data (may have data.data or flat fields)
 * @param {string} [displayName] - For social login, pre-fill name on RequestInviteTwo
 */
export function getPostLoginRedirect(data, displayName = '') {
  const payload = data?.data || data || {};
  const isOnboardingCompleted = payload.is_onboarding_completed === 1 || payload.is_onboarding_completed === true;
  const isPostApprovalCompleted = payload.is_post_approval_completed === 1 || payload.is_post_approval_completed === true;
  const isQuizCompleted = payload.is_quiz_completed === 1 || payload.is_quiz_completed === true;
  const isChatIntakeCompleted = payload.is_chat_intake_completed === 1 || payload.is_chat_intake_completed === true;

  if (!isOnboardingCompleted) {
    return { screen: 'RequestInviteTwo', params: displayName ? { name: displayName } : {} };
  }
  if (!isPostApprovalCompleted) {
    return { screen: 'TellUsScreen', params: {} };
  }
  if (isQuizCompleted && isChatIntakeCompleted) {
    return { screen: 'MainStack', params: {} };
  }
  return { screen: 'NextChatScreen', params: {} };
}

/**
 * Auth field errors: when backend returns message "Validation error" and data[field] arrays,
 * return { fieldName: firstMessage }. Otherwise return { form: message or default }.
 */
export function getFieldErrors(data, defaultMessage = 'Something went wrong.') {
  if (!data) return { form: defaultMessage };
  if (data.message === 'Validation error' && data.data && typeof data.data === 'object') {
    const out = {};
    Object.keys(data.data).forEach(key => {
      const val = data.data[key];
      if (Array.isArray(val) && val[0] != null) out[key] = String(val[0]);
    });
    if (Object.keys(out).length > 0) return out;
  }
  const msg = data.message ?? data.msg;
  const str = msg == null ? defaultMessage : (Array.isArray(msg) ? (msg[0] ? String(msg[0]) : defaultMessage) : String(msg));
  return { form: str };
}

/** Show API error in toast; extracts message from error.response.data or uses default */
export function showApiErrorToast(error, defaultMessage = 'Something went wrong. Please try again.') {
  let message = defaultMessage;
  if (error?.response?.data) {
    const d = error.response.data;
    const msg = d.message ?? d.msg ?? d.error;
    if (msg != null) {
      if (typeof msg === 'string') {
        message = msg;
      } else if (Array.isArray(msg)) {
        message = msg[0] ? String(msg[0]) : defaultMessage;
      } else if (typeof msg === 'object') {
        const firstKey = Object.keys(msg)[0];
        const firstVal = firstKey ? msg[firstKey] : null;
        message = Array.isArray(firstVal) ? String(firstVal[0]) : (firstVal ? String(firstVal) : defaultMessage);
      }
    } else if (d.errors && typeof d.errors === 'object') {
      const first = Object.values(d.errors)[0];
      message = Array.isArray(first) ? String(first[0]) : String(first);
    }
  } else if (error?.message && !error?.message?.includes('status code')) {
    message = error.message;
  }
  getToastRef()?.showError?.(message);
}

export const loginApiFun = async (
  email,
  password,
  navigation,
  setLoader,
  dispatch,
  setFieldErrors,
) => {
  setLoader(true);
  try {
    // Use JSON body to avoid FormData-related ERR_NETWORK on Android; most backends accept JSON for login.
    const response = await apiClient.post(`${CUSTOMER}/login`, { email, password });
    console.log('response=======>', response.data);
    const data = response.data;
    const {token, user} = normalizeAuthResponse(data);
    if (token) {
      dispatch(dispatchUserValue(data?.data || data));
      dispatch(dispatchRememberMe(true));
      dispatch(dispatchToken(token));
      try {
        const profileData = await getProfileApi(dispatch);
        const redirect = getPostLoginRedirect(profileData);
        setLoader(false);
        navigation.replace(redirect.screen, redirect.params);
      } catch (e) {
        const redirect = getPostLoginRedirect(data);
        setLoader(false);
        navigation.replace(redirect.screen, redirect.params);
      }
    } else {
      setLoader(false);
      setFieldErrors?.(getFieldErrors(data, 'Invalid email or password.'));
    }
  } catch (error) {
    setLoader(false);
    console.error('Login error', error?.response?.status, error?.response?.data ?? error?.message);
    setFieldErrors?.(getFieldErrors(error?.response?.data, 'Invalid email or password.'));
  }
};

/** Google Sign In: name, email, social_token from Google SDK */
export const googleSignInApi = async (
  name,
  email,
  socialToken,
  navigation,
  setLoader,
  dispatch,
) => {
  setLoader(true);
  try {
    const response = await apiClient.post(`${CUSTOMER}/social/google`, {
      name,
      email,
      social_token: socialToken,
      verified_by: 'google',
    });
    const data = response.data;
    const {token, user} = normalizeAuthResponse(data);
    if (token) {
      dispatch(dispatchUserValue(data?.data || data));
      dispatch(dispatchRememberMe(true));
      dispatch(dispatchToken(token));
      const displayName = user?.name || name || '';
      try {
        const profileData = await getProfileApi(dispatch);
        const redirect = getPostLoginRedirect(profileData, displayName);
        setLoader(false);
        navigation.replace(redirect.screen, redirect.params);
      } catch (e) {
        const redirect = getPostLoginRedirect(data, displayName);
        setLoader(false);
        navigation.replace(redirect.screen, redirect.params);
      }
    } else {
      setLoader(false);
      showAuthErrorToast(data?.message || 'Google sign in failed.');
    }
  } catch (error) {
    setLoader(false);
    const msg = error.response?.data?.message || 'Google sign in failed.';
    showAuthErrorToast(Array.isArray(msg) ? msg[0] : msg);
  }
};

/** Apple Sign In: name, email, social_token from Apple SDK */
export const appleSignInApi = async (
  name,
  email,
  socialToken,
  navigation,
  setLoader,
  dispatch,
) => {
  setLoader(true);
  try {
    const response = await apiClient.post(`${CUSTOMER}/social/apple`, {
      name: name || 'Apple User',
      email,
      social_token: socialToken,
      verified_by: 'apple',
    });
    const data = response.data;
    const {token, user} = normalizeAuthResponse(data);
    if (token) {
      dispatch(dispatchUserValue(data?.data || data));
      dispatch(dispatchRememberMe(true));
      dispatch(dispatchToken(token));
      const displayName = (user?.name || name || '').trim();
      try {
        const profileData = await getProfileApi(dispatch);
        const redirect = getPostLoginRedirect(profileData, displayName);
        setLoader(false);
        navigation.replace(redirect.screen, redirect.params);
      } catch (e) {
        const redirect = getPostLoginRedirect(data, displayName);
        setLoader(false);
        navigation.replace(redirect.screen, redirect.params);
      }
    } else {
      setLoader(false);
      showAuthErrorToast(data?.message || 'Apple sign in failed.');
    }
  } catch (error) {
    setLoader(false);
    const msg = error.response?.data?.message || 'Apple sign in failed.';
    showAuthErrorToast(Array.isArray(msg) ? msg[0] : msg);
  }
};

/** Sign Up (Phone): register then verify OTP */
export const registerPhoneApi = async (
  countryFlag,
  countryCode,
  phone,
  setLoader,
  navigation,
  setFieldErrors,
) => {
  setLoader(true);
  try {
    console.log('countryFlag=======>', countryFlag);
    console.log('countryCode=======>', countryCode);
    console.log('phone=======>', phone);
    const response = await apiClient.post(`${CUSTOMER}/register`, {
      country_flag: "us",
      country_code: "+1",
      phone,
      verified_by: 'phone',
    });
    setLoader(false);
    const data = response.data;
    if (data?.data || data?.success !== false) {
      navigation.navigate('OtpVerificationScreen', {
        phone,
        countryCode: countryFlag,
        callingCode: countryCode,
      });
    } else {
      setFieldErrors?.(getFieldErrors(data, 'Registration failed.'));
    }
  } catch (error) {
    setLoader(false);
    console.log('error=======>', error.response);
    setFieldErrors?.(getFieldErrors(error?.response?.data, 'Registration failed.'));
  }
};

/** Verify OTP (Sign Up or Forgot) – returns token and user. Errors set via setFieldErrors below input. */
export const verifyOtpApi = async (
  countryCode,
  phone,
  otp,
  dispatch,
  navigation,
  setLoader,
  setFieldErrors,
) => {
  setLoader(true);
  setFieldErrors?.({});
  try {
    const response = await apiClient.post(`${CUSTOMER}/verify-otp`, {
      country_code: countryCode,
      phone,
      otp,
    });
    const data = response.data;
    console.log('data=======>', data);
    const {token, user} = normalizeAuthResponse(data);
    if (token) {
      dispatch(dispatchUserValue(data?.data || data));
      dispatch(dispatchRememberMe(true));
      dispatch(dispatchToken(token));
      getToastRef()?.showSuccess?.('Verification successful.');
      const TOAST_DURATION_MS = 1500;
      const doRedirect = (redirect) => {
        setLoader(false);
        setTimeout(() => {
          navigation.replace(redirect.screen, redirect.params);
        }, TOAST_DURATION_MS);
      };
      getProfileApi(dispatch)
        .then(profileData => {
          const redirect = getPostLoginRedirect(profileData);
          doRedirect(redirect);
        })
        .catch(() => {
          const redirect = getPostLoginRedirect(data);
          doRedirect(redirect);
        });
    } else {
      setLoader(false);
      setFieldErrors?.(getFieldErrors(data, 'Invalid OTP.'));
    }
  } catch (error) {
    setLoader(false);
    setFieldErrors?.(getFieldErrors(error?.response?.data, 'Invalid OTP. Please try again.'));
  }
};

/** Resend OTP. Errors set via setFieldErrors below input. */
export const resendOtpApi = async (
  countryCode,
  phone,
  setLoading,
  setFieldErrors,
  setSuccess,
) => {
  setLoading?.(true);
  setFieldErrors?.({});
  setSuccess?.('');
  try {
    await apiClient.post(`${CUSTOMER}/resend-otp`, {
      country_code: 'us',
      phone,
    });
    setLoading?.(false);
    setSuccess?.('OTP sent again.');
  } catch (error) {
    setLoading?.(false);
    console.log('error=======>', error.response);
    setFieldErrors?.(getFieldErrors(error?.response?.data, 'Failed to resend OTP. Please try again.'));
  }
};

/** Forgot Password (Phone) – sends OTP to phone */
export const forgotPasswordPhoneApi = async (
  countryCode,
  phone,
  setLoader,
  navigation,
  setFieldErrors,
) => {
  setLoader(true);
  setFieldErrors?.({});
  try {
    const response = await apiClient.post(`${CUSTOMER}/forgot-password`, {
      country_code: countryCode,
      phone,
    });
    setLoader(false);
    if (response.data?.data || response.data?.success !== false) {
      getToastRef()?.showSuccess?.('OTP sent to your phone.');
      navigation.navigate('OtpVerificationScreen', {
        phone,
        callingCode: countryCode.replace(/^\+/, '') || '1',
        flow: 'forgot',
      });
    } else {
      setFieldErrors?.(getFieldErrors(response.data, 'Failed to send OTP.'));
    }
  } catch (error) {
    setLoader(false);
    setFieldErrors?.(getFieldErrors(error?.response?.data, 'Failed to send OTP.'));
  }
};

/** True if error is due to missing image file (temp file no longer exists). */
function isMissingFileError(error) {
  const msg = (error?.message || '') + (error?.toString?.() || '');
  const underlying = error?.response?.data?.message || error?.cause?.message || '';
  const combined = (msg + ' ' + underlying).toLowerCase();
  return (
    combined.includes('no such file') ||
    combined.includes("couldn't be opened") ||
    combined.includes('code=260') ||
    combined.includes('nscocoaerrordomain')
  );
}

/** Build onboarding FormData, optionally skipping image/face_image (e.g. when temp file is missing). */
function buildOnboardingFormData(payload, includeImages = true) {
  const formData = new FormData();
  const keys = [
    'name',
    'email',
    'password',
    'country_flag',
    'country_code',
    'phone',
    'date_of_birth',
    'gender',
    'country',
    'state',
    'city',
    'linkedin_or_instagram_handle',
    'how_did_you_hear_about_saige',
    'who_would_you_like_to_meet',
    'what_are_you_looking_for',
  ];
  const requiredStringKeys = ['email', 'country_flag', 'country_code', 'phone'];
  requiredStringKeys.forEach(k => {
    if (payload[k] !== undefined) {
      formData.append(k, payload[k] === null ? '' : String(payload[k]));
    }
  });
  keys.forEach(k => {
    if (requiredStringKeys.includes(k)) return;
    if (payload[k] != null && payload[k] !== '') {
      formData.append(k, payload[k]);
    }
  });
  if (includeImages && payload.image_uri) {
    formData.append('image', {
      uri: payload.image_uri,
      type: payload.image_type || 'image/jpeg',
      name: payload.image_name || 'image.jpg',
    });
  }
  if (includeImages && payload.face_image_uri) {
    formData.append('face_image', {
      uri: payload.face_image_uri,
      type: payload.face_image_type || 'image/jpeg',
      name: payload.face_image_name || 'face.jpg',
    });
  }
  return formData;
}

/** Onboarding: multipart form with profile + image + face_image. Fetch FormData POST (no apiClient). Retries without images if temp file is missing. */
export const onboardingApi = async (dispatch, payload, setLoader, onSuccess) => {
  setLoader?.(true);
  try {
    const formData = buildOnboardingFormData(payload, true);
    const data = await fetchFormDataPost(`${CUSTOMER}/profile/onboarding`, formData);
    console.log('response=======>', data);
    setLoader?.(false);
    const {token, user} = normalizeAuthResponse(data);
    if (token) dispatch(dispatchToken(token));
    if (user) dispatch(dispatchUserValue(user));
    onSuccess?.({ data });
  } catch (error) {
    if (isMissingFileError(error)) {
      try {
        const formDataWithoutImages = buildOnboardingFormData(payload, false);
        const retryData = await fetchFormDataPost(
          `${CUSTOMER}/profile/onboarding`,
          formDataWithoutImages,
        );
        console.log('response=======>', retryData);
        setLoader?.(false);
        const {token, user} = normalizeAuthResponse(retryData);
        if (token) dispatch(dispatchToken(token));
        if (user) dispatch(dispatchUserValue(user));
        onSuccess?.({ data: retryData });
        return;
      } catch (retryError) {
        console.log('error=======>', retryError?.response ?? retryError?.data);
        setLoader?.(false);
        throw retryError;
      }
    }
    console.log('error=======>', error?.response ?? error?.data);
    setLoader?.(false);
    throw error;
  }
};

/** Post-approval: FormData with lifestyle + interests + pictures. Fetch FormData POST (no apiClient). */
export const postApprovalApi = async (dispatch, payload, setLoader, onSuccess) => {
  setLoader?.(true);
  try {
    if (__DEV__) {
      console.log('[PostApproval][RequestSummary]', {
        do_you_smoke: payload?.do_you_smoke,
        do_you_consume_alcohol: payload?.do_you_consume_alcohol,
        political_views: payload?.political_views,
        family_plan: payload?.family_plan,
        latitude: payload?.latitude,
        longitude: payload?.longitude,
        preferred_distance_km: payload?.preferred_distance_km,
        interests: payload?.interests || [],
        customInterestLabels: payload?.customInterestLabels || [],
        pictureCount: (payload?.pictureUris || []).filter(Boolean).length,
      });
    }
    const formData = new FormData();
    const textKeys = [
      'do_you_smoke',
      'do_you_consume_alcohol',
      'political_views',
      'family_plan',
      'latitude',
      'longitude',
      'preferred_distance_km',
    ];
    textKeys.forEach(k => {
      if (payload[k] != null && payload[k] !== '') {
        formData.append(k, String(payload[k]));
      }
    });
    const interests = payload.interests || [];
    interests.forEach(val => {
      formData.append('interests[]', String(val));
    });
    const customInterestLabels = payload?.customInterestLabels || [];
    customInterestLabels.forEach(val => {
      const label = String(val || '').trim();
      if (!label) return;
      formData.append('custom_interests[]', label);
      formData.append('custom_interest_labels[]', label);
    });
    const pictureUris = payload.pictureUris || [];
    pictureUris.forEach((uri, i) => {
      if (uri) {
        formData.append('pictures[]', {
          uri,
          type: 'image/jpeg',
          name: `picture_${i}.jpg`,
        });
      }
    });
    const data = await fetchFormDataPost(`${CUSTOMER}/post-approval`, formData);
    if (__DEV__) {
      console.log('[PostApproval][Response]', data);
    }
    setLoader?.(false);
    const normalized = normalizeAuthResponse(data);
    if (normalized.token) dispatch(dispatchToken(normalized.token));
    if (normalized.user) dispatch(dispatchUserValue(normalized.user));
    onSuccess?.({ data });
  } catch (error) {
    if (__DEV__) {
      console.log('[PostApproval][Error]', error?.response?.data ?? error?.data ?? error);
    }
    setLoader?.(false);
    showApiErrorToast(error, 'Failed to submit. Please try again.');
    throw error;
  }
};

function normalizeInterestLabel(item) {
  if (typeof item === 'string') return item.trim();
  if (!item || typeof item !== 'object') return '';
  const value =
    item.name ??
    item.interest ??
    item.interest_name ??
    item.title ??
    item.label ??
    '';
  return String(value).trim();
}

function normalizeInterestListResponse(responseData) {
  const payload = responseData?.data ?? responseData ?? {};
  const list =
    payload?.interests ??
    payload?.interest_list ??
    payload?.custom_interests ??
    payload?.data ??
    payload;
  const arrayData = Array.isArray(list) ? list : [];
  return arrayData
    .map(normalizeInterestLabel)
    .filter(Boolean)
    .filter((value, index, arr) => arr.findIndex(x => x.toLowerCase() === value.toLowerCase()) === index);
}

/** Add single custom interest immediately (post-approval flow). */
export const addOwnInterestApi = async (interestLabel) => {
  const label = String(interestLabel || '').trim();
  if (!label) {
    return { data: [], message: 'Skipped empty interest.' };
  }

  const endpoints = [
    `${CUSTOMER}/add-interest`,
    `${CUSTOMER}/interest`,
    `${CUSTOMER}/interests`,
  ];

  let lastError = null;
  for (const endpoint of endpoints) {
    try {
      const response = await apiClient.post(endpoint, {
        interest: label,
        interest_name: label,
        name: label,
        title: label,
      });
      return response.data;
    } catch (error) {
      const status = error?.response?.status;
      if (status === 404 || status === 405) {
        lastError = error;
        continue;
      }
      throw error;
    }
  }
  throw lastError || new Error('Unable to add interest.');
};

/** Get user's custom interests list (for persistence after app restart). */
export const getOwnInterestsListApi = async () => {
  const endpoints = [
    `${CUSTOMER}/interests`,
    `${CUSTOMER}/interest-list`,
    `${CUSTOMER}/interest`,
  ];

  let lastError = null;
  for (const endpoint of endpoints) {
    try {
      const response = await apiClient.get(endpoint);
      return normalizeInterestListResponse(response.data);
    } catch (error) {
      const status = error?.response?.status;
      if (status === 404 || status === 405) {
        lastError = error;
        continue;
      }
      throw error;
    }
  }
  throw lastError || new Error('Unable to fetch interests list.');
};

/** Get membership packages (Bearer). GET api/v1/customer/packages */
export const getPackagesApi = async () => {
  const response = await apiClient.get(`${CUSTOMER}/packages`);
  return response;
};

function normalizePaymentIntentResponse(rawData) {
  const data = rawData?.data ?? rawData ?? {};
  return {
    clientSecret:
      data?.payment_intent_client_secret ??
      data?.paymentIntentClientSecret ??
      data?.client_secret ??
      data?.clientSecret ??
      '',
    paymentIntentId:
      data?.payment_intent_id ??
      data?.paymentIntentId ??
      data?.intent_id ??
      data?.id ??
      '',
    customerId: data?.customer_id ?? data?.customerId ?? '',
    ephemeralKey: data?.ephemeral_key ?? data?.ephemeralKey ?? '',
    amount: data?.amount ?? null,
    currency: data?.currency ?? 'usd',
    raw: data,
  };
}

/** Create package payment intent for wallet checkout (Google Pay / Apple Pay). */
export const createPackagePaymentIntentApi = async payload => {
  const endpoints = [
    `${CUSTOMER}/packages/payment-intent`,
    `${CUSTOMER}/payments/package-intent`,
    `${CUSTOMER}/payments/create-intent`,
  ];

  let lastError = null;
  for (const endpoint of endpoints) {
    try {
      const response = await apiClient.post(endpoint, payload);
      return normalizePaymentIntentResponse(response.data);
    } catch (error) {
      const status = error?.response?.status;
      if (status === 404 || status === 405) {
        lastError = error;
        continue;
      }
      throw error;
    }
  }
  throw lastError || new Error('Unable to create payment intent.');
};

/** Complete package payment after Stripe confirms wallet transaction. */
export const completePackagePaymentApi = async payload => {
  const endpoints = [
    `${CUSTOMER}/packages/complete-payment`,
    `${CUSTOMER}/payments/package-complete`,
    `${CUSTOMER}/payments/complete`,
  ];

  let lastError = null;
  for (const endpoint of endpoints) {
    try {
      const response = await apiClient.post(endpoint, payload);
      return response.data;
    } catch (error) {
      const status = error?.response?.status;
      if (status === 404 || status === 405) {
        lastError = error;
        continue;
      }
      throw error;
    }
  }
  throw lastError || new Error('Unable to complete payment.');
};

/** Sign out (Bearer). GET api/v1/customer/sign-out. Call before clearing local state. */
export const signOutApi = async () => {
  const response = await apiClient.get(`${CUSTOMER}/sign-out`);
  return response;
};

/** Get compatible profiles (Bearer). GET api/v1/customer/compatible-profiles. Call when user is fully onboarded (e.g. on cold start redirect to home). */
export const getCompatibleProfilesApi = async () => {
  const response = await apiClient.get(`${CUSTOMER}/compatible-profiles`);
  return response.data;
};

/** Get customer profile (Bearer). Updates both proDetail and userValue so screens (e.g. ChatScreen) see latest is_quiz_completed, is_chat_intake_completed, etc. */
export const getProfileApi = async dispatch => {
  try {
    const response = await apiClient.get(`${CUSTOMER}/profile`);
    const data = response.data?.data || response.data;
    dispatch(dispatchProDetail(Array.isArray(data) ? data : [data]));
    const profile = Array.isArray(data) ? data[0] : data;
    if (profile && typeof profile === 'object') {
      dispatch(dispatchUserValue(profile));
    }
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      showApiErrorToast(error, 'Your session has expired. Please log in again.');
    } else {
      showApiErrorToast(error, 'Something went wrong. Please try again later.');
    }
    throw error;
  }
};

/** Get quiz greeting message (Bearer). GET api/v1/customer/quiz/greeting. Returns { message } from response. */
export const getGreetingApi = async () => {
  const response = await apiClient.get(`${CUSTOMER}/quiz/greeting`);
  const data = response.data?.data ?? response.data ?? {};
  return data;
};

/** Get customer quiz questions (Bearer). GET api/v1/customer/quiz/questions. Returns questions array. */
export const getQuizQuestionsApi = async () => {
  const response = await apiClient.get(`${CUSTOMER}/quiz/questions`);
  const raw = response.data?.data ?? response.data ?? {};
  const questions = raw?.questions ?? (Array.isArray(raw) ? raw : []);
  return questions;
};

/** Submit customer quiz (Bearer). POST api/v1/customer/quiz/submit. responses: [{ question_id, response_value }]. Returns full response.data for branching (e.g. requires_tie_breaker, traits, this_or_that). */
export const submitQuizApi = async responses => {
  try {
    const response = await apiClient.post(`${CUSTOMER}/quiz/submit`, {
      responses,
    });
    return response.data;
  } catch (error) {
    showApiErrorToast(error, 'Failed to submit quiz. Please try again.');
    throw error;
  }
};

/** Submit This or That tie-breaker (Bearer). POST api/v1/customer/quiz/this-or-that. body: { selected_trait }. */
export const submitThisOrThatApi = async selectedTrait => {
  try {
    const response = await apiClient.post(`${CUSTOMER}/quiz/this-or-that`, {
      selected_trait: selectedTrait,
    });
    return response.data;
  } catch (error) {
    showApiErrorToast(error, 'Failed to submit. Please try again.');
    throw error;
  }
};

/** Get chat intake questions (Bearer). GET api/v1/customer/chat/questions. Returns array of { id, question_text, question_number }. */
export const getChatQuestionsApi = async () => {
  try {
    const response = await apiClient.get(`${CUSTOMER}/chat/questions`);
    const raw = response.data?.data ?? response.data ?? {};
    const list = raw?.questions ?? (Array.isArray(raw) ? raw : []);
    return (list || []).map((q, index) => ({
      id: q.id,
      question_text: q.question_text ?? q.text ?? '',
      question_number: q.question_number ?? index + 1,
    }));
  } catch (error) {
    showApiErrorToast(error, 'Failed to load questions. Please try again.');
    throw error;
  }
};

/** Submit chat intake response (Bearer). POST api/v1/customer/chat/response. */
export const submitChatResponseApi = async (questionId, responseText, questionNumber) => {
  try {
    const response = await apiClient.post(`${CUSTOMER}/chat/response`, {
      question_id: questionId,
      response_text: responseText,
      question_number: questionNumber ?? 1,
    });
    return response.data;
  } catch (error) {
    showApiErrorToast(error, 'Failed to submit. Please try again.');
    throw error;
  }
};

/** Complete chat intake (Bearer). POST api/v1/customer/chat/complete. */
export const completeChatIntakeApi = async () => {
  try {
    const response = await apiClient.post(`${CUSTOMER}/chat/complete`);
    return response.data;
  } catch (error) {
    showApiErrorToast(error, 'Failed to complete. Please try again.');
    throw error;
  }
};

export const signupApi = async (
  username,
  email,
  age,
  gender,
  setLoader,
  navigation,
  dispatch,
  password,
) => {
  setLoader(true);

  try {
    const response = await apiClient.post('/signup', {
      username,
      email,
      age,
      gender,
      password,
    });

    const data = response.data;

    if (data.success) {
      dispatch(dispatchUserValue(data?.data?.user));
      dispatch(dispatchRememberMe(true));
      dispatch(dispatchToken(data?.data?.token));

      navigation.replace('MainStack');
    }
  } catch (error) {
    if (error.response?.data) {
      const errorData = error.response.data;
      if (errorData.message?.username) {
        showAuthErrorToast(errorData.message.username[0]);
      } else {
        showApiErrorToast(error, 'Please complete all details.');
      }
    } else {
      showApiErrorToast(error, 'Please complete all details.');
    }
  } finally {
    setLoader(false);
  }
};

export const getQuestionsApi = async (dispatch, setQuestion, token) => {
  try {
    const response = await apiClient.get('/get-questions');
    dispatch(dispatchGetQuestions(response?.data?.data));
    setQuestion(response?.data?.data);
  } catch (error) {
    showApiErrorToast(error, 'Failed to load questions.');
  }
};

export const handleTextChange = async (
  txt,
  dispatch,
  token,
  userId,
  currentQuestionId,
  callback,
) => {
  console.log('currentText', txt);
  try {
    const response = await apiClient.post('/add-update-question', {
      question: txt,
      question_id: currentQuestionId,
      user_id: userId,
    });
    const updatedId = response?.data?.data?.id;
    dispatch(dispatchUpdatedId(updatedId));
    callback(updatedId); // Pass the updated ID back
    return updatedId;
  } catch (error) {
    showApiErrorToast(error, 'Failed to save.');
    return null;
  }
};

export const getMessageApi = async (userId, dispatch, token) => {
  try {
    const response = await apiClient.post('/get-messages', null);
    console.log('sucesss=======>');
    console.log(JSON.stringify(response?.data?.data, 2, 4));

    dispatch(dispatchMessages(response?.data?.data));
  } catch (error) {
    showApiErrorToast(error, 'Failed to load messages.');
    return null;
  }
};

export const deleteAccountApi = async (
  userId,
  dispatch,
  navigation,
  actionSheetRef,
  token,
) => {
  try {
    const response = await apiClient.post('/delete-user', {
      id: userId,
    });
    if (response?.data) {
      dispatch(dispatchRememberMe(false));
      navigation.replace('Splash');
      actionSheetRef.current?.setModalVisible(false);
    }
  } catch (error) {
    showApiErrorToast(error, 'Failed to delete account.');
    return null;
  }
};

export const purchaseApi = async (userId, token) => {
  try {
    const response = await apiClient.post('/update-vip-status', {
      user_id: userId,
      is_vip: 1,
    });
  } catch (error) {
    showApiErrorToast(error, 'Failed to update.');
  }
};

export const sendMessageApi = async (
  name,
  userId,
  questionId,
  userId1,
  lastText,
  navigation,
  token,
) => {
  try {
    const response = await apiClient.post('/send-message', {
      user_id: userId,
      question_id: questionId,
      message: name,
      social_type: lastText,
      device_type: 'iOS',
      guest_user_id: userId1,
    });
    navigation.navigate('SentScreen');
  } catch (error) {
    showApiErrorToast(error, 'Failed to send message.');
  }
};

export const getQuesApi = async (userId, setQuestShow, token) => {
  try {
    const response = await apiClient.post('/get-question-text', {
      question_id: userId,
    });
    setQuestShow(response?.data?.data?.question);
  } catch (error) {
    showApiErrorToast(error, 'Failed to load question.');
  }
};

export const isVipApi = async (userId, dispatch, token) => {
  try {
    const response = await apiClient.post('/get-user-detail', {
      user_id: userId,
    });
    dispatch(dispatchIsVip(response?.data?.success));
  } catch (error) {
    showApiErrorToast(error, 'Failed to load user details.');
  }
};

export const getQuiz = async (token, setQuizQuestion) => {
  try {
    const response = await apiClient.get('/quiz');

    // Assuming response structure matches the provided sample data
    setQuizQuestion(response?.data?.data || []);
  } catch (error) {
    if (error.response?.status === 401) {
      showApiErrorToast(error, 'Your session has expired. Please log in again.');
    } else {
      showApiErrorToast(error, 'Something went wrong. Please try again later.');
    }
  }
};

export const searchUser = async (query, token) => {
  try {
    const response = await apiClient.get('/users-search', {
      params: { query },
    });

    return response.data; // Return the data for further use
  } catch (error) {
    showApiErrorToast(error, 'Search failed.');
    throw error;
  }
};

export const addUserApi = async (userId, token) => {
  console.log('user=====', userId, token);

  try {
    const response = await apiClient.post('/add-contact', {
      contact_user_id: userId,
    });
  } catch (error) {
    showApiErrorToast(error, 'Failed to add contact.');
  }
};

export const getAllUserApi = async (token, setUsers) => {
  try {
    const response = await apiClient.get('/all-contact');

    // Assuming response structure matches the provided sample data
    setUsers(response?.data?.data || []);
  } catch (error) {
    if (error.response?.status === 401) {
      showApiErrorToast(error, 'Your session has expired. Please log in again.');
    } else {
      showApiErrorToast(error, 'Something went wrong. Please try again later.');
    }
  }
};

export const deleteUserApi = async (userId, token) => {
  console.log('user=====', userId, token);

  try {
    const response = await apiClient.post('/delete-contact', {
      contact_user_id: userId,
    });
  } catch (error) {
    showApiErrorToast(error, 'Failed to delete contact.');
  }
};

export const ansQuizApi = async (token, optionId, quizId, location) => {
  console.log(token, optionId, quizId);

  try {
    const response = await apiClient.post('/quiz-answer', {
      option_id: optionId,
      quiz_id: quizId,
      device_type: Platform.OS === 'android' ? 'Android' : 'iPhone',
      city: location,
    });
  } catch (error) {
    showApiErrorToast(error, 'Failed to submit answer.');
  }
};

export const addFullNamApi = async (token, userId, fullName) => {
  try {
    const response = await apiClient.post('/update-fullname', {
      id: userId,
      full_name: fullName,
    });
  } catch (error) {
    showApiErrorToast(error, 'Failed to update name.');
  }
};

export const updateProApi = async (token, dispatch) => {
  try {
    await getProfileApi(dispatch);
  } catch (error) {
    // getProfileApi already shows toast on error
  }
};

export const CancelVipApi = async (userId, token) => {
  try {
    const response = await apiClient.post('/update-vip-status', {
      user_id: userId,
      is_vip: 0,
    });
  } catch (error) {
    showApiErrorToast(error, 'Failed to cancel membership.');
  }
};
