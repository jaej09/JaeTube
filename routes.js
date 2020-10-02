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

// Video Router
const VIDEOS = '/videos';
const UPLOAD = '/upload';
const VIDEO_DETAIL = '/:id';
const EDIT_VIDEO = '/:id/edit';
const DELETE_VIDEO = '/:id/delete';

const routes = {
  home           : HOME,
  join           : JOIN,
  login          : LOGIN,
  logout         : LOGOUT,
  search         : SEARCH,
  users          : USERS,
  userDetail     : (id) => {
    if (id)
      return `/users/${id}`; // HTML 링크에 /users/:id 같이 표시되는 것을 해결하기 위해서 다음 function 추가함
    else return USER_DETAIL;
  },
  editProfile    : EDIT_PROFILE,
  changePassword : CHANGE_PASSWORD,
  videos         : VIDEOS,
  upload         : UPLOAD,
  videoDetail    : (id) => {
    if (id) return `/videos/${id}`;
    else return VIDEO_DETAIL;
  },
  editVideo      : (id) => {
    if (id) return `/videos/${id}/edit`;
    else return EDIT_VIDEO;
  },
  deleteVideo    : (id) => {
    if (id) return `/videos/${id}/delete`;
    else return DELETE_VIDEO;
  }
};

export default routes;
