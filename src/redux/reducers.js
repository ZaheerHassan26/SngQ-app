import {
  BOTTOM_COLOR,
  FULL_NAME,
  GET_MESSAGES,
  GET_QUESTIONS,
  IS_VIP,
  LOGOUT,
  POST_APPROVAL_DATA,
  PRO_DETAIL,
  REMEMBER_ME,
  REQUEST_INVITE_DATA,
  RESET_ONBOARDING_AND_POST_APPROVAL,
  SHOW_DATA,
  SOCIAL_TYPE,
  TEXT_VALUE,
  TOKEN,
  UPDATED_ID,
  USER_VALUE,
  VIEW_SHORT,
} from './constants';

const requestInviteDataInitial = {
  name: '',
  dob: null,
  country: '',
  state: '',
  city: '',
  linkedin: '',
  howDidYouHear: '',
  gender: '',
  whoWouldYouLikeToMeet: '',
  whatLookingFor: null,
  distance: null,
  profileImageUri: null,
  faceImageUri: null,
  email: '',
  phone: '',
  country_code: '',
  country_flag: '',
};

const postApprovalDataInitial = {
  do_you_smoke: '',
  do_you_consume_alcohol: '',
  political_views: '',
  family_plan: '',
  latitude: '',
  longitude: '',
  preferred_distance_km: '',
  interests: [],
  customInterestLabels: [],
  pictureUris: [],
};

const inititalState = {
  getQuestions: [],
  textValue: '',
  userValue: [],
  updatedId: [],
  rememberme: false,
  messages: [],
  viewShort: null,
  showData: false,
  socialType: 'IG',
  isVip: false,
  token: '',
  bottomColor: 'HomeStack',
  fName: false,
  proDetail: [],
  requestInviteData: requestInviteDataInitial,
  postApprovalData: postApprovalDataInitial,
};

function userReducer(state = inititalState, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        getQuestions: action.payload,
      };
    case TEXT_VALUE:
      return {
        ...state,
        textValue: action.payload,
      };
    case USER_VALUE:
      return {
        ...state,
        userValue: action.payload,
      };
    case UPDATED_ID:
      return {
        ...state,
        updatedId: action.payload,
      };
    case REMEMBER_ME:
      return {
        ...state,
        rememberme: action.payload,
      };
    case GET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };
    case VIEW_SHORT:
      return {
        ...state,
        viewShort: action.payload,
      };
    case SHOW_DATA:
      return {
        ...state,
        showData: action.payload,
      };
    case SOCIAL_TYPE:
      return {
        ...state,
        socialType: action.payload,
      };
    case IS_VIP:
      return {
        ...state,
        isVip: action.payload,
      };
    case TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case BOTTOM_COLOR:
      return {
        ...state,
        bottomColor: action.payload,
      };
    case FULL_NAME:
      return {
        ...state,
        fName: action.payload,
      };
    case PRO_DETAIL:
      return {
        ...state,
        proDetail: action.payload,
      };
    case REQUEST_INVITE_DATA:
      return {
        ...state,
        requestInviteData: { ...state.requestInviteData, ...action.payload },
      };
    case POST_APPROVAL_DATA:
      return {
        ...state,
        postApprovalData: { ...state.postApprovalData, ...action.payload },
      };
    case RESET_ONBOARDING_AND_POST_APPROVAL:
      return {
        ...state,
        requestInviteData: requestInviteDataInitial,
        postApprovalData: postApprovalDataInitial,
      };
    case LOGOUT:
      return {
        ...inititalState,
        requestInviteData: { ...requestInviteDataInitial },
        postApprovalData: { ...postApprovalDataInitial },
      };
    default:
      return state;
  }
}

export default userReducer;
