import { StatusCodes } from 'http-status-codes';
import User from '../models/userModels.js';
import Job from '../models/readModels.js';


export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });
    }
    const userWithoutPassword = user.toJSON();
    return res.status(StatusCodes.OK).json({ user: userWithoutPassword });
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
  }
};


export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ users, jobs });
};

export const updateUser = async (req, res) => {
    const obj = {...req.body};
    delete obj.password;
    console.log(obj);
    const updatedUser = await User.findByIdAndUpdate(req.body.userId, obj);
  res.status(StatusCodes.OK).json({ msg: 'update user' });
};