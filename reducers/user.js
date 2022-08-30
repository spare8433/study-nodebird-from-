import produce from 'immer';

export const initalState = {
  removeFollowerDone: false,
  removeFollowerLoading: false,
  removeFollowerError: null,
  loadFollowingsDone: false,
  loadFollowingsLoading: false,
  loadFollowingsError: null,
  loadFollowersDone: false,
  loadFollowersLoading: false,
  loadFollowersError: null,
  loadMyInfoDone: false,
  loadMyInfoLoading: false,
  loadMyInfoError: null,
  loadUserDone: false,
  loadUserLoading: false,
  loadUserError: null,
  followDone: false,
  followLoading: false,
  followError: null,
  unFollowDone: false,
  unFollowLoading: false,
  unFollowError: null,
  logInDone: false,
  logInLoading: false,
  logInError: null,
  logOutDone: false,
  logOutLoading: false,
  logOutError: null,
  signUpDone: false,
  signUpLoading: false,
  signUpError: null,
  changeNicknameDone: false,
  changeNicknameLoading: false,
  changeNicknameError: null,
  myData: null,
  userInfo: null,
  signUpData: {},
  loginData: {},
}

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST'
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS'
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE'

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST'
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS'
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE'

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST'
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS'
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE'

export const LOAD_FOLLOWERS_REQUEST = 'LOAD_FOLLOWERS_REQUEST'
export const LOAD_FOLLOWERS_SUCCESS = 'LOAD_FOLLOWERS_SUCCESS'
export const LOAD_FOLLOWERS_FAILURE = 'LOAD_FOLLOWERS_FAILURE'

export const LOAD_FOLLOWINGS_REQUEST = 'LOAD_FOLLOWINGS_REQUEST'
export const LOAD_FOLLOWINGS_SUCCESS = 'LOAD_FOLLOWINGS_SUCCESS'
export const LOAD_FOLLOWINGS_FAILURE = 'LOAD_FOLLOWINGS_FAILURE'

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE'

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST'
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS'
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE'

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST'
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS'
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE'

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST'
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS'
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE'

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST'
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS'
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE'

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME'
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME'

// const dummyUser = (data) => ({
//   ...data,
//   nickname: 'spare8433',
//   id: 1,
//   Posts: [{ id: 1 }],
//   Followings: [{ nickname: '여왕벌1' }, { nickname: '여왕벌2' }, { nickname: '여왕벌3' }],
//   Followers: [{ nickname: '일벌1' }, { nickname: '일벌2' }, { nickname: '일벌3' }],
// })

export const removeFollowerRequest = (data) => ({
  type: REMOVE_FOLLOWER_REQUEST,
  data,
})

export const loadFollowersRequest = () => ({
  type: LOAD_FOLLOWERS_REQUEST,
})

export const loadFollowingsRequest = () => ({
  type: LOAD_FOLLOWINGS_REQUEST,
})

export const loadMyInfoRequest = () => ({
  type: LOAD_MY_INFO_REQUEST,
})

export const loadUserRequest = (data) => ({
  type: LOAD_USER_REQUEST,
  data,
})

export const loginRequest = (data) => ({
  type: LOG_IN_REQUEST,
  data,
})

export const logOutRequest = () => ({
  type: LOG_OUT_REQUEST,
})

export const signUpRequest = (data) => ({
  type: SIGN_UP_REQUEST,
  data,
})

export const changeNicknameRequest = (data) => ({
  type: CHANGE_NICKNAME_REQUEST,
  data,
})

export const followRequest = (data) => ({
  type: FOLLOW_REQUEST,
  data,
})

export const unFollowRequest = (data) => ({
  type: UNFOLLOW_REQUEST,
  data,
})

const reducer = (state = initalState, action) => produce(state, (draft) => {
  switch (action.type) {
    case FOLLOW_REQUEST:
      draft.followDone = false
      draft.followLoading = true
      draft.followError = null
      break
    case FOLLOW_SUCCESS:
      draft.followDone = true
      draft.followLoading = false
      draft.myData.Followings.push({ id: action.data.UserId })
      break
    case FOLLOW_FAILURE:
      draft.followLoading = false
      draft.followError = action.error
      break
    case REMOVE_FOLLOWER_REQUEST:
      draft.removeFollowerDone = false
      draft.removeFollowerLoading = true
      draft.removeFollowerError = null
      break
    case REMOVE_FOLLOWER_SUCCESS:
      draft.removeFollowerDone = true
      draft.removeFollowerLoading = false
      draft.myData.Followers = draft.myData.Followers.filter((v) => v.id !== action.data.UserId)
      break
    case REMOVE_FOLLOWER_FAILURE:
      draft.removeFollowerLoading = false
      draft.removeFollowerError = action.error
      break
    case UNFOLLOW_REQUEST:
      draft.unFollowDone = false
      draft.unFollowLoading = true
      draft.unFollowError = null
      break
    case UNFOLLOW_SUCCESS:
      draft.unFollowDone = true
      draft.unFollowLoading = false
      draft.myData.Followings = draft.myData.Followings.filter((v) => v.id !== action.data.UserId)
      break
    case UNFOLLOW_FAILURE:
      draft.unFollowLoading = false
      draft.unFollowError = action.error
      break
    case LOG_IN_REQUEST:
      draft.logInDone = false
      draft.logInLoading = true
      draft.logInError = null
      break
    case LOG_IN_SUCCESS:
      draft.logInDone = true
      draft.logInLoading = false
      draft.myData = action.data
      break
    case LOG_IN_FAILURE:
      draft.logInLoading = false
      draft.logInError = action.error
      break
    case LOG_OUT_REQUEST:
      draft.logOutDone = false
      draft.logOutLoading = true
      draft.logOutError = null
      break
    case LOG_OUT_SUCCESS:
      draft.logOutDone = true
      draft.logOutLoading = false
      draft.myData = null
      break
    case LOG_OUT_FAILURE:
      draft.logOutLoading = false
      draft.logOutError = null
      break
    case LOAD_MY_INFO_REQUEST:
      draft.loadMyInfoDone = false
      draft.loadMyInfoLoading = true
      draft.loadMyInfoError = null
      break
    case LOAD_MY_INFO_SUCCESS:
      draft.loadMyInfoDone = true
      draft.loadMyInfoLoading = false
      draft.myData = action.data
      break
    case LOAD_MY_INFO_FAILURE:
      draft.loadMyInfoLoading = false
      draft.loadMyInfoError = action.error
      break
    case LOAD_USER_REQUEST:
      draft.loadUserDone = false
      draft.loadUserLoading = true
      draft.loadUserError = null
      break
    case LOAD_USER_SUCCESS:
      draft.loadUserDone = true
      draft.loadUserLoading = false
      draft.userInfo = action.data
      break
    case LOAD_USER_FAILURE:
      draft.loadUserLoading = false
      draft.loadUserError = action.error
      break
    case LOAD_FOLLOWINGS_REQUEST:
      draft.loadFollowingsDone = false
      draft.loadFollowingsLoading = true
      draft.loadFollowingsError = null
      break
    case LOAD_FOLLOWINGS_SUCCESS:
      draft.loadFollowingsDone = true
      draft.loadFollowingsLoading = false
      draft.myData.Followings = action.data
      break
    case LOAD_FOLLOWINGS_FAILURE:
      draft.loadFollowingsLoading = false
      draft.loadFollowingsError = action.error
      break
    case LOAD_FOLLOWERS_REQUEST:
      draft.loadFollowersDone = false
      draft.loadFollowersLoading = true
      draft.loadFollowersError = null
      break
    case LOAD_FOLLOWERS_SUCCESS:
      draft.loadFollowersDone = true
      draft.loadFollowersLoading = false
      draft.myData.Followers = action.data
      break
    case LOAD_FOLLOWERS_FAILURE:
      draft.loadFollowersLoading = false
      draft.loadFollowersError = action.error
      break
    case CHANGE_NICKNAME_REQUEST:
      draft.changeNicknameDone = false
      draft.changeNicknameLoading = true
      draft.changeNicknameError = null
      break
    case CHANGE_NICKNAME_SUCCESS:
      draft.changeNicknameDone = true
      draft.changeNicknameLoading = false
      draft.myData.nickname = action.data.nickname
      break
    case CHANGE_NICKNAME_FAILURE:
      draft.changeNicknameLoading = false
      draft.changeNicknameError = action.error
      break
    case SIGN_UP_REQUEST:
      draft.signUpDone = false
      draft.signUpLoading = true
      draft.signUpError = null
      break
    case SIGN_UP_SUCCESS:
      draft.signUpLoading = false
      draft.signUpDone = true
      draft.signUpData = action.data
      break
    case SIGN_UP_FAILURE:
      draft.signUpLoading = false
      draft.signUpError = action.error
      break
    case ADD_POST_TO_ME:
      draft.myData.Posts.unshift({ id: action.id })
      break
    case REMOVE_POST_OF_ME:
      draft.myData.Posts = draft.myData.Posts.filter((v) => v.id !== action.data)
      break
    default:
      break
  }
})

export default reducer
