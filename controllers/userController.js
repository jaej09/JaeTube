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
      // 비밀번호가 없으면 .create 사용해서 계정 생성해도 괜찮음
      // 비밀번호 포함되어 있으면 .register -> 비밀번호 암호화를 위해 필요함
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
    const user = await User.findById(id).populate('videos');
    console.log(user);
    return res.render('userDetail', { pageTitle: 'User Detail', user });
  } catch (err) {
    return res.redirect(routes.home);
  }
};

export const getEditProfile = (req, res) => res.render('editProfile', { pageTitle: 'Edit Profile' });

export const postEditProfile = async (req, res) => {
  // file.path에 아바타의 주소가 들어있음
  // 아바타 이미지를 선택하지 않은 경우 여기서 file: {path} 해서 추출하면 null 값을 받아오게 됨 => try, catch문 안에서 불러오고 있음
  const { body: { name, email }, file } = req;
  console.log(file);
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl : file ? file.path : req.user.avatarUrl // There is always a user inside of a req object as long as I am authenticated
    });
    return res.redirect(routes.me);
  } catch (err) {
    console.error(err);
    res.redirect(routes.editProfile);
  }
};

export const getChangePassword = (req, res) => res.render('changePassword', { pageTitle: 'Change Password' });

export const postChangePassword = async (req, res) => {
  const { body: { currentPassword, newPassword, verifyNewPassword } } = req;

  try {
    if (newPassword !== verifyNewPassword) {
      res.status(400); // status code 400 주지 않으면 브라우저에서 패스워드가 성공적으로 변경되었다 생각하고 저장하라는 알림을 보냄.
      return res.redirect(`/users${routes.changePassword}`);
    }
    /**
     * Passport-Local Mongoose
     * changePassword(oldPassword, newPassword, [cb])
     * Changes a user's password hash and salt, resets the user's number of failed password attempts and saves the user object (everything only if oldPassword is correct). 
     * If no callback cb is provided a Promise is returned. 
     * If oldPassword does not match the user's old password, an IncorrectPasswordError is passed to cb or the Promise is rejected.
     */
    await req.user.changePassword(currentPassword, newPassword); // req.user에 유저 정보가 있기 때문에 User.find({}) 사용할 필요 없음
    res.redirect(routes.me);
  } catch (err) {
    console.error(err);
    return res.redirect(`/users${routes.changePassword}`);
  }
};
