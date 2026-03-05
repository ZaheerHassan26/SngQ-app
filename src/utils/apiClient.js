import axios from 'axios';
import { Platform } from 'react-native';
import { getToastRef } from './toastRef';
import { API_BASE_URL, API_TIMEOUT } from '../config/api';
import { Store } from '../redux/store';
import {
  dispatchRememberMe,
  dispatchToken,
  dispatchUserValue,
} from '../redux/actions';

// Android real devices often need longer timeout and explicit network security config
const timeout = Platform.OS === 'android' ? Math.max(API_TIMEOUT, 25000) : API_TIMEOUT;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout,
  headers: {
    'content-type': 'application/json', // lowercase for Android compatibility
  },
});

// Request interceptor: attach token from Redux state; allow FormData to set Content-Type
apiClient.interceptors.request.use(
  config => {
    const state = Store.getState();
    const token = state?.userReducer?.token;
    if (token && typeof token === 'string') {
      // Backend may return token with "Bearer " prefix; avoid "Bearer Bearer ..."
      const rawToken = token.trim().replace(/^Bearer\s+/i, '');
      if (rawToken) {
        config.headers.Authorization = `Bearer ${rawToken}`;
      }
    }
    if (config.data && typeof FormData !== 'undefined' && config.data instanceof FormData) {
      delete config.headers['Content-Type'];
      delete config.headers['content-type'];
    }
    return config;
  },
  error => Promise.reject(error),
);

// Response interceptor: on 401 only treat as "session expired" when user had a token (authenticated request)
apiClient.interceptors.response.use(
  response => response,
  error => {
    // Log network errors on Android for debugging (no response = request never reached server)
    if (!error.response && error.message) {
      const code = error.code || '';
      const msg = error.message || '';
      if (__DEV__ && (msg.includes('Network') || code === 'ERR_NETWORK' || code === 'ECONNABORTED')) {
        console.warn('[apiClient] Network error:', code, msg, error.config?.url);
      }
    }
    if (error.response?.status === 401) {
      const state = Store.getState();
      const hadToken = !!state?.userReducer?.token;
      if (hadToken) {
        Store.dispatch(dispatchToken(''));
        Store.dispatch(dispatchUserValue(null));
        Store.dispatch(dispatchRememberMe(false));
        getToastRef()?.showError?.('Your session has expired. Please log in again.');
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
