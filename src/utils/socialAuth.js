import { Platform } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import appleAuth from '@invertase/react-native-apple-authentication';
import { GOOGLE_WEB_CLIENT_ID } from '../config/socialAuth';

/**
 * Configure Google Sign-In. Call once at app startup (e.g. in App.tsx).
 */
export function configureGoogleSignIn() {
    GoogleSignin.configure({
      webClientId: '751405544130-engeoji0jc5r63rspvgb8gd3jgfri6a0.apps.googleusercontent.com',
      offlineAccess: false,
      iosClientId: '751405544130-ejop5moc1mmj7v6soanu9lh64j7bl89t.apps.googleusercontent.com',
    });
}

/**
 * Sign in with Google. Returns { idToken, email, name } or throws.
 * Signs out any existing Google user first so the account picker modal is shown every time.
 */
export async function signInWithGoogle() {
  const hasPlayServices = await GoogleSignin.hasPlayServices({
    showPlayServicesUpdateDialog: true,
  }).catch(() => false);
  if (!hasPlayServices && Platform.OS === 'android') {
    throw new Error('Google Play Services are not available.');
  }

  // Sign out last Google user so the account selection modal is shown every time
  try {
    await GoogleSignin.signOut();
  } catch (_) {
    // Ignore if no user was signed in
  }

  const result = await GoogleSignin.signIn();
  if (result?.type !== 'success' || !result.data) {
    throw new Error(result?.type === 'canceled' ? 'Sign in canceled' : 'Google sign in failed');
  }

  const tokens = await GoogleSignin.getTokens();
  const idToken = tokens?.idToken;
  if (!idToken) {
    throw new Error('Could not get Google ID token. Check webClientId in config.');
  }

  const user = result.data?.user ?? result.data;
  const name = [user?.givenName, user?.familyName].filter(Boolean).join(' ') || user?.name || 'Google User';
  const email = user?.email || '';

  return { idToken, email, name };
}

/**
 * Sign in with Apple (iOS only). Returns { identityToken, email, name } or throws.
 * On Android or unsupported iOS, returns null and caller can skip.
 */
export async function signInWithApple() {
  if (Platform.OS !== 'ios') {
    return null;
  }
  if (!appleAuth.isSupported) {
    throw new Error('Sign in with Apple is not supported on this device.');
  }

  try {
    const requestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });
    console.log('requestResponse=======>', requestResponse);

    const { identityToken, email, fullName } = requestResponse;
    if (!identityToken) {
      throw new Error('Apple sign in did not return an identity token.');
    }

    const givenName = fullName?.givenName ?? '';
    const familyName = fullName?.familyName ?? '';
    const name = [givenName, familyName].filter(Boolean).join(' ') || 'Apple User';

    console.log('name=======>', name);
    return {
      identityToken,
      email: email || '',
      name,
    };
  } catch (error) {
    // Error 1001 = ASAuthorizationError.canceled (user closed/canceled the Apple sheet)
    const code = error?.code ?? error?.error?.code;
    const isCancel = code === 1001 || code === '1001' ||
      (error?.message && String(error.message).includes('1001')) ||
      (error?.message && /cancel/i.test(error.message));
    if (isCancel) {
      throw new Error('Sign in canceled');
    }
    throw error;
  }
}

/**
 * Check if Apple Sign-In is available (e.g. to show/hide the Apple button).
 */
export function isAppleSignInAvailable() {
  return Platform.OS === 'ios' && appleAuth?.isSupported === true;
}
