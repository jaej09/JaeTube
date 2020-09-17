import routes from '../routes';
import Video from '../models/Video';

export const home = async (req, res) => {
	// async, await 성공적으로 끝날 때 까지 기다려주는 것이 아니라 그냥 끝날 때 까지 기다리는 것
	// 에러가 발생하더라도 execution이 끝나면 다음 기능을 실행하기 때문에 try, catch를 사용하는 것이 적절함
	try {
		const videos = await Video.find({});
		res.render('home', { pageTitle: 'Home', videos });
	} catch (err) {
		console.log(err);
		res.render('home', { pageTitle: 'Home', videos: [] });
	}
};

export const search = (req, res) => {
	const { query: { term: searchingBy } } = req; // variable name "term"을 "searchingBy" 이름으로 변경
	res.render('search', { pageTitle: 'Search', searchingBy, videos });
};

export const getUpload = (req, res) => res.render('upload', { pageTitle: 'Upload' });
export const postUpload = (req, res) => {
	const { body: { file, title, description } } = req;
	// TODO: Upload and Save Video
	res.redirect(routes.videoDetail(11111));
};

export const videoDetail = (req, res) => res.render('videoDetail', { pageTitle: 'Video Detail' });
export const editVideo = (req, res) => res.render('editVideo', { pageTitle: 'Edit Video' });
export const deleteVideo = (req, res) => res.render('deleteVideo', { pageTitle: 'Delete Video' });
