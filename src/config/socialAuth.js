/**
 * Social auth configuration.
 *
 * Google Sign-In:
 * - Get your Web Client ID from Firebase Console (Project Settings > General > Your apps)
 *   or Google Cloud Console (APIs & Services > Credentials > OAuth 2.0 Client ID, type Web).
 * - For Android: add google-services.json to android/app/
 *   and apply the Google Services plugin in android/build.gradle and android/app/build.gradle.
 * - For iOS: add GoogleService-Info.plist and the reversed client ID as URL scheme in Info.plist.
 *
 * Apple Sign-In:
 * - iOS: Enable "Sign in with Apple" capability in Xcode (Signing & Capabilities).
 * - Android: Optional; use @invertase/react-native-apple-authentication's appleAuthAndroid if needed.
 */

export const GOOGLE_WEB_CLIENT_ID =
  process.env.GOOGLE_WEB_CLIENT_ID ||
  'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com';
