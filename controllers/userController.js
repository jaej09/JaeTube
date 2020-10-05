import passport from 'passport';

import User from '../models/User';
import routes from '../routes';

export const getJoin = (req, res) => {
  res.render('join', { pageTitle: 'Join' });
};

export const postJoin = async (req, res, next) => {
  const { body: { name, email, password, verifyPassword } } = req;
  if (password !== verifyPassword) {
    res.status(400); // Bad Request -> 브라우저에서 Bad Request를 인지하면 아이디, 비번을 저장할 것인지 묻지 않는다.
    return res.render('join', { pageTitle: 'Join' });
  }
  else {
    try {
      const user = await User({ name, email }); // User.create를 사용하면 {}안에 있는 내용을 생성시킨 다음 데이터베이스에 저장하기 때문에 그냥 User 사용했다.
      await User.register(user, password);
      return next();
    } catch (err) {
      console.log(err);
      return res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) => res.render('login', { pageTitle: 'Log In' });

export const postLogin = passport.authenticate('local', {
  failureRedirect : routes.login,
  successRedirect : routes.home
});

export const githubLogin = passport.authenticate('github');

export const githubLoginCallback = async (accessToken, refreshToken, profile, cb) => {
  console.log(accessToken, refreshToken, profile, cb);
  const { _json: { id, avatar_url, name, email } } = profile;

  try {
    const user = await User.findOne({ email });

    // 만약 local로 가입한 사람이 github으로 로그인을 시도한다면 (local 이메일과 github 이메일 동일하다는 전제), 로그인을 시켜준 다음 githubID를 추가시킬 것이다.
    if (user) {
      // 동일한 이메일 주소가 있을 경우
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    // 동일한 이메일 주소가 없을 경우
    const newUser = await User.create({
      email,
      name,
      githubId  : id,
      avatarUrl : avatar_url
    });
    return cb(null, newUser);
  } catch (err) {
    return cb(err);
  }
};

export const postGithubLogIn = (req, res) => res.redirect(routes.home);

export const facebookLogin = passport.authenticate('facebook');

export const facebookLoginCallback = (accessToken, refreshToken, profile, cb) => {
  console.log(accessToken, refreshToken, profile, cb);
};

export const postFacebookLogin = (req, res) => res.redirect(routes.home);

export const logout = (req, res) => {
  req.logout();
  return res.redirect(routes.home);
};

export const getMe = (req, res) => {
  // req.user은 현재 로그인 된 사용자
  return res.render('userDetail', { pageTitle: 'User Detail', user: req.user });
};

export const userDetail = async (req, res) => {
  const { params: { id } } = req;
  try {
    const user = await User.findById(id);
    res.render('userDetail', { pageTitle: 'User Detail', user });
  } catch (err) {
    return res.redirect(routes.home);
  }
};

export const editProfile = (req, res) => res.render('editProfile', { pageTitle: 'Edit Profile' });
export const changePassword = (req, res) => res.render('changePassword', { pageTitle: 'Change Password' });
