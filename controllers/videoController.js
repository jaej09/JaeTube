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
export const postUpload = async (req, res) => {
	// req.file is the `avatar` file
	// req.body will hold the text fields, if there were any
	const { body: { title, description }, file: { path } } = req;

	// Create a Video
	const newVideo = await Video.create({
		// This goes to the DB
		// Mongoose로 만들었던 video model 참고해서, 저장할 값 넘겨주기
		fileUrl     : path,
		title,
		description
	});

	// console.log(newVideo); // { Views: 0, Comments: [], _id: 5f66cab636efac41b6c3f93f, fileUrl: 'videos/4c354406b17be44d638cfc91e8a56ae3', title: 'Title', description: 'Description', createAt: 2020-09-20T03:21:26.851Z, __v: 0  }

	res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = (req, res) => res.render('videoDetail', { pageTitle: 'Video Detail' });
export const editVideo = (req, res) => res.render('editVideo', { pageTitle: 'Edit Video' });
export const deleteVideo = (req, res) => res.render('deleteVideo', { pageTitle: 'Delete Video' });
