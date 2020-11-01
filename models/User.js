import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const UserSchema = new mongoose.Schema({
  name       : String,
  email      : String,
  avatarUrl  : String,
  facebookId : Number,
  githubId   : Number,
  comments   : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref  : 'Comment'
    }
  ],
  videos     : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref  : 'Video'
    }
  ]
});

// Passport-Local Mongoose is a Mongoose plugin that simplifies building username and password login with Passport.
// plugin을 지정한 User 모델은 이제 passport-local-mongoose에서 제공해주는 메서드를 사용할 수 있게 된다
// 제공하는 메서드는 대략 setPassword, changePassword, authenticate, resetAttempts, createStrategy, serializeUser, deserializeUser, register, findByUsername 가 있다
UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

const model = mongoose.model('User', UserSchema);

export default model;
