import {
  GET_MESSAGES,
  GET_QUESTIONS,
  LOGOUT,
  POST_APPROVAL_DATA,
  REMEMBER_ME,
  REQUEST_INVITE_DATA,
  RESET_ONBOARDING_AND_POST_APPROVAL,
  SHOW_DATA,
  SOCIAL_TYPE,
  TEXT_VALUE,
  UPDATED_ID,
  USER_VALUE,
  VIEW_SHORT,
  IS_VIP,
  TOKEN,
  BOTTOM_COLOR,
  FULL_NAME,
  PRO_DETAIL,
} from './constants';

export const dispatchRememberMe = rememberme => dispatch => {
  dispatch({
    type: REMEMBER_ME,
    payload: rememberme,
  });
};

export const dispatchToken = token => dispatch => {
  dispatch({
    type: TOKEN,
    payload: token,
  });
};

export const dispatchGetQuestions = getQuestions => dispatch => {
  dispatch({
    type: GET_QUESTIONS,
    payload: getQuestions,
  });
};

export const dispatchTextValue = textValue => dispatch => {
  dispatch({
    type: TEXT_VALUE,
    payload: textValue,
  });
};

export const dispatchUserValue = userValue => dispatch => {
  dispatch({
    type: USER_VALUE,
    payload: userValue,
  });
};

export const dispatchUpdatedId = updatedId => dispatch => {
  dispatch({
    type: UPDATED_ID,
    payload: updatedId,
  });
};

export const dispatchMessages = messages => ({
  type: GET_MESSAGES,
  payload: messages,
});

export const dispatchViewShort = viewShort => ({
  type: VIEW_SHORT,
  payload: viewShort,
});

export const dispatchShowData = showData => ({
  type: SHOW_DATA,
  payload: showData,
});

export const dispatchSocialType = socialType => ({
  type: SOCIAL_TYPE,
  payload: socialType,
});

export const dispatchIsVip = isVip => ({
  type: IS_VIP,
  payload: isVip,
});

export const dispatchBottom = bottomColor => ({
  type: BOTTOM_COLOR,
  payload: bottomColor,
});

export const dispatchFullname = fName => ({
  type: FULL_NAME,
  payload: fName,
});

export const dispatchProDetail = proDetail => ({
  type: PRO_DETAIL,
  payload: proDetail,
});

export const setRequestInviteData = payload => ({
  type: REQUEST_INVITE_DATA,
  payload,
});

export const setPostApprovalData = payload => ({
  type: POST_APPROVAL_DATA,
  payload,
});

/** Reset onboarding (requestInviteData) and post-approval state. Call after rehydration on cold start. */
export const resetOnboardingAndPostApproval = () => ({
  type: RESET_ONBOARDING_AND_POST_APPROVAL,
});

/** Clear all auth/user state. Use on sign out with persistor.purge() and navigation reset. */
export const logoutAction = () => ({
  type: LOGOUT,
});
