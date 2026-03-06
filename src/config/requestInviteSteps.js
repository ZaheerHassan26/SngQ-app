/**
 * Full onboarding flow: 10 screens from RequestInviteOne to ThankYouScreen (for progress 1/10 ... 10/10).
 */
export const FULL_ONBOARDING_STEP_ORDER = [
  'RequestInviteOne',
  'RequestInviteTwo',
  'RequestInviteThree',
  'RequestInviteScreen',
  'RequestInvite',
  'GenderSelection',
  'WhoWouldYouLikeToMeet',
  'LookingForScreen',
  'PhotoUpload',
  'ThankYouScreen',
];

/**
 * Full request-invite flow screen order (for reference).
 */
export const REQUEST_INVITE_STEP_ORDER = [
  'RequestInviteTwo',
  'RequestInviteThree',
  'RequestInviteScreen',
  'RequestInvite',
  'GenderSelection',
  'WhoWouldYouLikeToMeet',
  'LookingForScreen',
  'PhotoUpload',
  'FacialScanScreen',
  'ThankYouScreen',
];

/**
 * Progress bar from "What gender describes you" to ThankYouScreen: 6 steps (1/6 ... 6/6).
 */
export const PROGRESS_BAR_STEP_ORDER = [
  'GenderSelection',
  'WhoWouldYouLikeToMeet',
  'LookingForScreen',
  'PhotoUpload',
  'FacialScanScreen',
  'ThankYouScreen',
];

const progressTotalSteps = PROGRESS_BAR_STEP_ORDER.length;
const fullOnboardingTotalSteps = FULL_ONBOARDING_STEP_ORDER.length;

/**
 * Progress bar from Gender screen to ThankYouScreen (6 steps: 1/6 ... 6/6).
 * @param {string} screenName - Screen name as registered in navigation (e.g. 'GenderSelection')
 * @returns {{ stepIndex: number, totalSteps: number }}
 */
export function getRequestInviteStep(screenName) {
  const index = PROGRESS_BAR_STEP_ORDER.indexOf(screenName);
  if (index === -1) {
    return { stepIndex: 0, totalSteps: progressTotalSteps };
  }
  return { stepIndex: index + 1, totalSteps: progressTotalSteps };
}

/**
 * Full onboarding progress from RequestInviteOne to ThankYouScreen (10 steps: 1/10 ... 10/10).
 * From Gender onward: 6/10, 7/10, ..., 10/10.
 * @param {string} screenName - Screen name as registered in navigation
 * @returns {{ stepIndex: number, totalSteps: number }}
 */
export function getFullOnboardingStep(screenName) {
  if (screenName === 'FacialScanScreen') {
    return { stepIndex: 9, totalSteps: 10 };
  }
  const index = FULL_ONBOARDING_STEP_ORDER.indexOf(screenName);
  if (index === -1) {
    return { stepIndex: 0, totalSteps: fullOnboardingTotalSteps };
  }
  return { stepIndex: index + 1, totalSteps: fullOnboardingTotalSteps };
}
