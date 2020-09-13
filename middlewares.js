import routes from './routes';

export const localsMiddleware = (req, res, next) => {
	res.locals.siteName = 'WeTube';
	res.locals.routes = routes;
	res.locals.user = { isAuthenticated: true, id: 1 };
	next(); // 미들웨어기 때문에, next()를 실행하지 않으면 다음 순서로 넘어가지 못한다.
};
