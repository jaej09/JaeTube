import Comment from '../models/Comment';
import Video from '../models/Video';
import routes from '../routes';

export const home = async (req, res) => {
  // async, await 성공적으로 끝날 때 까지 기다려주는 것이 아니라 그냥 끝날 때 까지 기다리는 것
  // 에러가 발생하더라도 execution이 끝나면 다음 기능을 실행하기 때문에 try, catch를 사용하는 것이 적절함
  try {
    const videos = await Video.find({}).sort({ _id: -1 }); // -1 => sorting 하는 순서를 reverse 하겠다는 convention
    return res.render('home', { pageTitle: 'Home', videos });
  } catch (err) {
    console.error(err);
    return res.render('home', { pageTitle: 'Home', videos: [] });
  }
};

export const search = async (req, res) => {
  const { query: { term: searchingBy } } = req; // variable name "term"을 "searchingBy" 이름으로 변경
  var videos = [];

  try {
    videos = await Video.find({ title: { $regex: searchingBy, $options: 'i' } });
  } catch (err) {
    console.error(err);
  }

  return res.render('search', { pageTitle: 'Search', searchingBy, videos });
};

export const getUpload = (req, res) => res.render('upload', { pageTitle: 'Upload' });

export const postUpload = async (req, res) => {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  const { body: { title, description }, file: { location } } = req;
  // Create a Video
  const newVideo = await Video.create({
    // This goes to the DB
    // Mongoose로 만들었던 video model 참고해서, 저장할 값 넘겨주기
    fileUrl     : location,
    title,
    description,
    creator     : req.user.id
  });

  // console.log('user정보에 담겨있는 것', req.user);

  req.user.videos.push(newVideo.id);
  req.user.save(); // we push newVideo.id into vidoes and then save all the user data on DB

  // console.log(newVideo); // { Views: 0, Comments: [], _id: 5f66cab636efac41b6c3f93f, fileUrl: 'videos/4c354406b17be44d638cfc91e8a56ae3', title: 'Title', description: 'Description', createAt: 2020-09-20T03:21:26.851Z, __v: 0  }
  return res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const { params: { id } } = req; // Routes보면, vidoes/5f66cab636efac41b6c3f93f처럼 videos/ 다음에 나오는 값을 :id 로 설정했기 때문에 variable name이 id이다.

  try {
    // Find the Video with the given `id`, or `null` if not found
    const video = await Video.findById(id).populate('creator').populate('comments'); // objectId에만 .populate 사용 가능
    console.log(video);
    return res.render('videoDetail', { pageTitle: video.title, video });
  } catch (err) {
    console.error(err);
    return res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const { params: { id } } = req;

  try {
    // Find the Video with the given `id`, or `null` if not found
    const video = await Video.findById(id).exec();
    if (video.creator != req.user.id) {
      // populate하지 않았기 때문에, video.creator에는 user.id가 들어가있음
      throw Error(); // 에러발생하면 catch(err) 아래 코드 실행
    }
    else {
      return res.render('editVideo', { pageTitle: `Edit ${video.title}`, video });
    }
  } catch (err) {
    console.error(err);
    return res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const { params: { id }, body: { title, description } } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    return res.redirect(routes.videoDetail(id));
  } catch (err) {
    console.error(err);
    return res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const { params: { id } } = req;

  try {
    const video = await Video.findById(id).exec();
    if (video.creator != req.user.id) {
      // populate하지 않았기 때문에, video.creator에는 user.id가 들어가있음
      throw Error(); // 에러발생하면 catch(err) 아래 코드 실행
    }
    else {
      await Video.findOneAndRemove({ _id: id });
    }
  } catch (err) {
    console.error(err);
  }
  return res.redirect(routes.home);
};

// Register Video Views
export const postRegisterView = async (req, res) => {
  const { params: { id } } = req;
  try {
    const video = await Video.findById(id);
    video.views++;
    video.save();
    res.status(200); // 정상적으로 통과
  } catch (err) {
    res.status(400);
  } finally {
    res.end();
  }
};

// Add Comment
export const postAddComment = async (req, res) => {
  const { params: { id }, body: { comment }, user } = req;
  console.log('req.user', comment);

  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text    : comment,
      creator : user.id
    });
    video.comments.push(newComment._id);
    video.save();
  } catch (err) {
    res.status(400);
  } finally {
    res.end();
  }
};
