import routes from '../routes';
import User from '../models/User';

export const getJoin = (req, res) => {
  res.render('join', { pageTitle: 'Join' });
};

export const postJoin = async (req, res) => {
  const { body: { name, email, password, verifyPassword } } = req;
  if (password !== verifyPassword) {
    res.status(400); // Bad Request -> 브라우저에서 Bad Request를 인지하면 아이디, 비번을 저장할 것인지 묻지 않는다.
    res.render('join', { pageTitle: 'Join' });
  }
  else {
    try {
      const user = await User({ name, email }); // User.create를 사용하면 {}안에 있는 내용을 생성시킨 다음 데이터베이스에 저장하기 때문에, 그냥 User 사용했다.
      await User.register(user, password);
    } catch (err) {
      console.log(err);
    }
    res.redirect(routes.home);
  }
};

export const getLogin = (req, res) => res.render('login', { pageTitle: 'Log In' });
export const postLogin = (req, res) => res.redirect(routes.home);

export const logout = (req, res) => {
  // TODO: Process Log Out
  res.render('logout', { pageTitle: 'Log Out' });
};
export const userDetail = (req, res) => res.render('userDetail', { pageTitle: 'User Detail' });
export const editProfile = (req, res) => res.render('editProfile', { pageTitle: 'Edit Profile' });
export const changePassword = (req, res) => res.render('changePassword', { pageTitle: 'Change Password' });
