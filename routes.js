// Global Router
const HOME = '/';
const JOIN = '/join';
const LOGIN = '/login';
const LOGOUT = '/logout';
const SEARCH = '/search';

// User Router
const USERS = '/users';
const USER_DETAIL = '/:id';
const EDIT_PROFILE = '/edit-profile';
const CHANGE_PASSWORD = '/change-password';
const ME = '/me';

// Video Router
const VIDEOS = '/videos';
const UPLOAD = '/upload';
const VIDEO_DETAIL = '/:id';
const EDIT_VIDEO = '/:id/edit';
const DELETE_VIDEO = '/:id/delete';

// Github
const GITHUB = '/auth/github';
const GITHUB_CALLBACK = '/auth/github/callback';

// Facebook
const FACEBOOK = '/auth/facebook';
const FACEBOOK_CALLBACK = '/auth/facebook/callback';

// API
// 서버와 통신하기 위한 URL => API는 데이터베이스로 다른 서비스와 통신하기 위해 만들어진 것
// 유저가 접근할 수 있는 URL이 아님! 유저는 이 URL 자체를 찾을 수 없고 이 URL을 Render 할 수 없음
const API = '/api';
const REGISTER_VIEW = '/:id/view';

const routes = {
  home             : HOME,
  join             : JOIN,
  login            : LOGIN,
  logout           : LOGOUT,
  search           : SEARCH,
  users            : USERS,
  userDetail       : (id) => {
    if (id)
      return `/users/${id}`; // HTML 링크에 /users/:id 같이 표시되는 것을 해결하기 위해서 다음 function 추가함
    else return USER_DETAIL;
  },
  editProfile      : EDIT_PROFILE,
  changePassword   : CHANGE_PASSWORD,
  me               : ME,
  videos           : VIDEOS,
  upload           : UPLOAD,
  videoDetail      : (id) => {
    if (id) return `/videos/${id}`;
    else return VIDEO_DETAIL;
  },
  editVideo        : (id) => {
    if (id) return `/videos/${id}/edit`;
    else return EDIT_VIDEO;
  },
  deleteVideo      : (id) => {
    if (id) return `/videos/${id}/delete`;
    else return DELETE_VIDEO;
  },
  github           : GITHUB,
  githubCallback   : GITHUB_CALLBACK,
  facebook         : FACEBOOK,
  facebookCallback : FACEBOOK_CALLBACK,
  api              : API,
  registerView     : REGISTER_VIEW
};

export default routes;
