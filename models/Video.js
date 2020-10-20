import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
  fileUrl     : {
    type     : String,
    required : 'File URL is required'
  },
  title       : {
    type     : String,
    required : 'Title is required'
  },
  description : String,
  views       : {
    type    : Number,
    default : 0
  },
  creator     : {
    type : mongoose.Schema.Types.ObjectId,
    ref  : 'User'
  },
  createAt    : {
    type    : Date,
    default : Date.now
  },
  comments    : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref  : 'Comment'
    }
  ]
});

/**
 * 참고로 몽구스는 model의 첫 번째 인자로 컬렉션 이름을 만듭니다. User이면 소문자화 후 복수형으로 바꿔서 users 컬렉션이 됩니다. 
 * Book 스키마였다면 books 컬렉션이 됩니다. 이런 강제 개명이 싫다면 세 번째 인자로 컬렉션 이름을 줄 수 있습니다. 
 * mongoose.model('User', userSchema, 'myfreename')
 * More Details: https://www.zerocho.com/category/MongoDB/post/59a1870210b942001853e250
 */

const model = mongoose.model('Video', VideoSchema);
export default model;
