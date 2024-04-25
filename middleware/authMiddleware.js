import {
  UnauthenticatedError,
  UnauthorizedError,
  BadRequestError,
} from '../errors/customErrors.js';
import { verifyJWT } from '../utils/tokenUtils.js';

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  //console.log(req.cookies);
  if (!token) {
    // If token is missing, proceed without setting req.user
    return next();
  }

  try {
    const { userId, role } = verifyJWT(token);
    // You can define the user properly here based on the userId, for example:
    const testUser = userId === '64b2c07ccac2efc972ab0eca';
    // Set req.user with user information
    req.user = { userId, role, testUser };
    next();
  } catch (error) {
    // Handle token verification error
    throw new UnauthenticatedError('Authentication failed');
  }
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      // If user role is not defined, it means authentication failed
      throw new UnauthenticatedError('Authentication token is missing or invalid');
    }
    if (!roles.includes(req.user.role)) {
      // If user role is not authorized to access the route
      throw new UnauthorizedError('Unauthorized to access this route');
    }
    next();
  };
};

export const checkForTestUser = (req, res, next) => {
  if (req.user && req.user.testUser) {
    // If it's a test user, throw a BadRequestError
    throw new BadRequestError('Demo User. Read Only!');
  }
  next();
};
