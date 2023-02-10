import mongoose from 'mongoose';
const {Schema} = mongoose;

// **** Types **** //

export interface IUser {
  _id: string;
  username: string;
  followingIds: string[],
  email: string;
  password: string;
  pwdHash: string;
}

export interface ISessionUser {
  _id: string;
  email: string;
  username: string;
}

// **** Mongoose **** //

const UserSchema = new Schema({
  _id: {type: String, index: true},
  username: {type: String, index: true},
  email: {type: String, index: true},
  followingIds: { type:[String] },
  password: String,
  pwdHash: String,
});

export const UserModel = mongoose.model('User', UserSchema);

// **** Validaciones **** //

const validEmail = (email : string) : boolean => {
  return !!String(email)
    .toLowerCase()
    .match(
      // eslint-disable-next-line max-len
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

const validUsername = (username : string) : boolean => {
  return !!String(username)
    .toLowerCase()
    .match(
      /^[a-zA-Z0-9]+$/,
    );
};

const validSignUp = (
  arg: { email?: string, username?: string, password?: string},
) : boolean => {
  if (!arg?.['email'] || !arg?.['username'] || !arg?.['password']) return false;
  if (!validEmail(arg?.['email'])) return false;
  if (!validUsername(arg?.['username'])) return false;
  return true;
};

const validUpdateMe = (
  arg: { email?: string, username?: string, password?: string},
) : boolean => {
  if (!arg?.['email'] && !arg?.['username'] && !arg?.['password']) return false;
  if (arg?.['email'] && !validEmail(arg?.['email'])) return false;
  if (arg?.['username'] && !validUsername(arg?.['username'])) return false;
  return true;
};

// **** Export default **** //

export default {
  validSignUp,
  validUpdateMe,
} as const;
