import passport from 'passport';
import routes from '../routes';
import User from '../models/User';

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

export const githubLoginCallback = (accessToken, refreshToken, profile, cb) => {
  // 깃헙에서 성공적으로 로그인 되었을 때 실행
  console.log(accessToken, refreshToken, profile, cb);
};

export const logout = (req, res) => {
  req.logout();
  return res.render('logout', { pageTitle: 'Log Out' });
};
export const userDetail = (req, res) => res.render('userDetail', { pageTitle: 'User Detail' });
export const editProfile = (req, res) => res.render('editProfile', { pageTitle: 'Edit Profile' });
export const changePassword = (req, res) => res.render('changePassword', { pageTitle: 'Change Password' });
