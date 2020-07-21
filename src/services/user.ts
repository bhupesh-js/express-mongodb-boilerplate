import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { ACCOUNT_JWT_KEY, ACCOUNT_JWT_EXPIRY, BCRYPT_SALTROUNDS } from '../helpers/config';

// eslint-disable-next-line max-len
/**
 * Create a new user in the database
 *
 * @param {string} email
 * @param {string} password
 * @param {string} [name]
 * @param {string} [imageUri]
 * @param {string} [status]
 * @returns Details of newly added user
 */
const registerUser = async (email:string, password:string, name?:string, imageUri?:string, status?:string) => {
  const existUser = await User.findOne({ email });
  if (!existUser) {
    const hashPassword = await bcrypt.hash(password, parseInt(BCRYPT_SALTROUNDS, 10));
    const user = new User({
      email, password: hashPassword, name, imageUri, status
    });
    const generatedUser = await user.save();
    return generatedUser;
  }
  throw new Error('USR_ACC_ERRORS.USR_ACC_NEW_EMAIL_EXISTS');
};

/**
 * Login the user if the credentials are correct
 *
 * @param {string} email
 * @param {string} password
 * @returns JWT Token if the login is successful
 */
const loginUser = async (email:string, password:string) => {
  const user = await User.findOne({ email });
  if (user) {
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({
        userId: user._id.toString()
      }, ACCOUNT_JWT_KEY, { expiresIn: ACCOUNT_JWT_EXPIRY });
      return token;
    }
    throw new Error('USR_ACC_ERRORS.USR_USR_ACC_LOGIN_INVALID_CRE');
  }
  throw new Error('USR_ACC_ERRORS.USR_USR_ACC_LOGIN_INVALID_CRE');
};

// eslint-disable-next-line max-len
/**
 * Update user details according the information passed
 *
 * @param {string} userId
 * @param {string} [email]
 * @param {string} [password]
 * @param {string} [name]
 * @param {string} [imageUri]
 * @param {string} [status]
 * @returns user data who's information is recently updated
 */
const updateUser = async (userId: string, email?:string, password?:string, name?:string, imageUri?:string, status?:string) => {
  const user = await User.findById(userId);
  if (user) {
    if (password) {
      user.password = await bcrypt.hash(password, parseInt(BCRYPT_SALTROUNDS, 10));
    }
    if (email) user.email = email;
    if (name) user.name = name;
    if (imageUri) user.imageUri = imageUri;
    if (status) user.status = status;
    const generatedUser = await user.save();
    return generatedUser;
  }
  throw new Error('AUTH_ERRORS.UNAUTHORIZED');
};

export { loginUser, registerUser, updateUser };
