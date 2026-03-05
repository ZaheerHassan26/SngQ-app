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
  'DistanceScreen',
];

/**
 * Progress bar starts from Gender screen: 1/6 on Gender, 2/6 on WhoWouldYouLikeToMeet, etc.
 */
export const PROGRESS_BAR_STEP_ORDER = [
  'GenderSelection',
  'WhoWouldYouLikeToMeet',
  'LookingForScreen',
  'PhotoUpload',
  'FacialScanScreen',
  'DistanceScreen',
];

const progressTotalSteps = PROGRESS_BAR_STEP_ORDER.length;

/**
 * @param {string} screenName - Screen name as registered in navigation (e.g. 'GenderSelection')
 * @returns {{ stepIndex: number, totalSteps: number }} 1-based stepIndex and totalSteps; progress bar starts at 1 on GenderSelection (e.g. { stepIndex: 1, totalSteps: 6 })
 */
export function getRequestInviteStep(screenName) {
  const index = PROGRESS_BAR_STEP_ORDER.indexOf(screenName);
  if (index === -1) {
    return { stepIndex: 0, totalSteps: progressTotalSteps };
  }
  return { stepIndex: index + 1, totalSteps: progressTotalSteps };
}
