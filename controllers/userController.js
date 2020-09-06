import routes from '../routes';

export const getJoin = (req, res) => {
	res.render('join', { pageTitle: 'Join' });
};

export const postJoin = (req, res) => {
	const { body: { name, email, password, verifyPassword } } = req;
	if (password !== verifyPassword) {
		res.status(400); // Bad Request -> 브라우저에서 Bad Request를 인지하면 아이디, 비번을 저장할 것인지 묻지 않는다.
		res.render('join', { pageTitle: 'Join' });
	}
	else {
		// TODO: Register User
		// TODO: Log user in
		res.redirect(routes.home);
	}
};

export const login = (req, res) => res.render('login', { pageTitle: 'Log In' });
export const logout = (req, res) => res.render('logout', { pageTitle: 'Log Out' });
export const userDetail = (req, res) => res.render('userDetail', { pageTitle: 'User Detail' });
export const editProfile = (req, res) => res.render('editProfile', { pageTitle: 'Edit Profile' });
export const changePassword = (req, res) => res.render('changePassword', { pageTitle: 'Change Password' });
