// import shortId from 'shortid';
// import { faker } from '@faker-js/faker'
import produce from '../util/produce';

const initalState = {
  mainPosts: [],
  imagePaths: [],
  singlePost: null,
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
  retweetLoading: false,
  retweetDone: false,
  retweetError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  hasMorePost: true,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  unLikePostLoading: false,
  unLikePostDone: false,
  unLikePostError: null,
}

// export const generateDummypost = (number) => Array(number).fill().map(() => ({
//   id: shortId.generate(),
//   content: faker.lorem.paragraph(),
//   Images: [{
//     src: faker.image.food(480, 360, true),
//   }],
//   User: {
//     id: shortId.generate(),
//     nickname: faker.name.fullName(),
//   },
//   Comments: [{
//     User: {
//       id: shortId.generate(),
//       nickname: faker.name.fullName(),
//     },
//     content: faker.lorem.sentence(),
//   }],
// }))

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const RETWEET_REQUEST = 'RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'RETWEET_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

export const RESET_IMAGES = 'RESET_IMAGES';

export const retweet = (data) => ({
  type: RETWEET_REQUEST,
  data,
})
export const removeImage = (data) => ({
  type: REMOVE_IMAGE,
  data,
})

export const resetImages = () => ({
  type: RESET_IMAGES,
})

export const uploadImagesRequest = (data) => ({
  type: UPLOAD_IMAGES_REQUEST,
  data,
})

export const addPostRequest = (data) => ({
  type: ADD_POST_REQUEST,
  data,
})

export const likePostRequest = (data) => ({
  type: LIKE_POST_REQUEST,
  data,
})

export const unLikePostRequest = (data) => ({
  type: UNLIKE_POST_REQUEST,
  data,
})

export const addCommentRequest = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
})

export const removePostRequest = (data) => ({
  type: REMOVE_POST_REQUEST,
  data,
})

export const loadPostsRequest = (data) => ({
  type: LOAD_POSTS_REQUEST,
  data,
})

export const loadUserPostsRequest = (data) => ({
  type: LOAD_USER_POSTS_REQUEST,
  data,
})

export const loadPostRequest = (data) => ({
  type: LOAD_POST_REQUEST,
  data,
})

export const loadHashtagPostRequest = (data) => ({
  type: LOAD_HASHTAG_POSTS_REQUEST,
  data,
})

const reducer = (state = initalState, action) => produce(state, (draft) => {
  switch (action.type) {
    case RETWEET_REQUEST:
      draft.retweetDone = false
      draft.retweetLoading = true
      draft.retweetError = null
      break
    case RETWEET_SUCCESS:
      draft.retweetDone = true
      draft.retweetLoading = false
      draft.mainPosts = action.data.concat(draft.mainPosts)
      draft.mainPosts.unshift(action.data)
      break
    case RETWEET_FAILURE:
      draft.retweetLoading = false
      draft.retweetError = action.error
      break
    case LOAD_POST_REQUEST:
      draft.loadPostDone = false
      draft.loadPostLoading = true
      draft.loadPostError = null
      break
    case LOAD_POST_SUCCESS:
      draft.loadPostDone = true
      draft.loadPostLoading = false
      draft.singlePost = action.data
      break
    case LOAD_POST_FAILURE:
      draft.loadPostLoading = false
      draft.loadPostError = action.error
      break
    case LOAD_POSTS_REQUEST:
    case LOAD_HASHTAG_POSTS_REQUEST:
    case LOAD_USER_POSTS_REQUEST:
      draft.loadPostsDone = false
      draft.loadPostsLoading = true
      draft.loadPostsError = null
      break
    case LOAD_POSTS_SUCCESS:
    case LOAD_HASHTAG_POSTS_SUCCESS:
    case LOAD_USER_POSTS_SUCCESS:
      draft.loadPostsDone = true
      draft.loadPostsLoading = false
      draft.mainPosts = draft.mainPosts.concat(action.data)
      draft.hasMorePost = action.data.length === 10
      break
    case LOAD_POSTS_FAILURE:
    case LOAD_HASHTAG_POSTS_FAILURE:
    case LOAD_USER_POSTS_FAILURE:
      draft.loadPostsLoading = false
      draft.loadPostsError = action.error
      break
    case UPLOAD_IMAGES_REQUEST:
      draft.uploadImagesDone = false
      draft.uploadImagesLoading = true
      draft.uploadImagesError = null
      break
    case UPLOAD_IMAGES_SUCCESS:
      draft.uploadImagesDone = true
      draft.uploadImagesLoading = false
      draft.imagePaths = action.data
      break
    case UPLOAD_IMAGES_FAILURE:
      draft.uploadImagesLoading = false
      draft.uploadImagesError = action.error
      break
    case REMOVE_IMAGE:
      draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data)
      break
    case RESET_IMAGES:
      draft.imagePaths = []
      break
    case ADD_POST_REQUEST:
      draft.addPostDone = false
      draft.addPostLoading = true
      draft.addPostError = null
      break
    case ADD_POST_SUCCESS:
      draft.addPostDone = true
      draft.addPostLoading = false
      draft.mainPosts.unshift(action.data)
      break
    case ADD_POST_FAILURE:
      draft.addPostLoading = false
      draft.addPostError = action.error
      break
    case LIKE_POST_REQUEST:
      draft.likePostDone = false
      draft.likePostLoading = true
      draft.likePostError = null
      break
    case LIKE_POST_SUCCESS: {
      draft.likePostDone = true
      draft.likePostLoading = false
      const post = draft.mainPosts.find((v) => v.id === action.data.PostId)
      post.Likers.push({ id: action.data.UserId })
      break
    }
    case LIKE_POST_FAILURE:
      draft.likePostLoading = false
      draft.likePostError = action.error
      break
    case UNLIKE_POST_REQUEST:
      draft.unLikePostDone = false
      draft.unLikePostLoading = true
      draft.unLikePostError = null
      break
    case UNLIKE_POST_SUCCESS: {
      draft.unLikePostDone = true
      draft.unLikePostLoading = false
      const post = draft.mainPosts.find((v) => v.id === action.data.PostId)
      post.Likers = post.Likers.filter((v) => v.id !== action.data.UserId)
      break
    }
    case UNLIKE_POST_FAILURE:
      draft.unLikePostLoading = false
      draft.unLikePostError = action.error
      break
    case REMOVE_POST_REQUEST:
      draft.removePostDone = false
      draft.removePostLoading = true
      draft.removePostError = null
      break
    case REMOVE_POST_SUCCESS:
      draft.removePostDone = true
      draft.removePostLoading = false
      draft.mainPosts = state.mainPosts.filter((v) => v.id !== action.data.PostId)
      break
    case REMOVE_POST_FAILURE:
      draft.removePostLoading = false;
      draft.removePostError = action.error;
      break
    case ADD_COMMENT_REQUEST:
      draft.addCommentDone = false
      draft.addCommentLoading = true
      draft.addCommentError = null
      break
    case ADD_COMMENT_SUCCESS: {
      const post = draft.mainPosts.find((v) => v.id === action.data.PostId)
      post.Comments.unshift(action.data)
      draft.addCommentDone = true
      draft.addCommentLoading = false
      break
    }
    case ADD_COMMENT_FAILURE:
      draft.addCommentLoading = false
      draft.addCommentError = action.error
      break
    default:
      break
  }
})

export default reducer
