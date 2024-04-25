import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  building: String,
  password: String,
  email: String,
  lastName: {
    type: String,
    default: 'lastName',
  },
  flatNo: {
    type: String,
    default: '000',
  },
  city: {
    type: String,
    default: 'Mumbai',
  },
  pincode: {
    type: Number,
    default: 400000,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  avatar: String,
  avatarPublicId: String,
});

UserSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model('User', UserSchema);
