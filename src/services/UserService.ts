import { IUser, UserModel } from '@src/models/User';
import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import PwdUtil from '@src/util/PwdUtil';
import { getRandomId } from '@src/util/misc';

// **** Variables **** //

export const USER_NOT_FOUND_ERR = 'usuario no encontrado';
export const INVALID_UPDATE = 'email o username ya fueron tomados';

// **** Functions **** //

/**
 * Get user
 */
async function get(id: string): Promise<IUser | null> {
  
  const user = await UserModel.findById(id).lean();
  if (!user) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  return user as IUser;
}

/**
 * Get all users.
 */
async function getAll(): Promise<IUser[]> {
  const users = await UserModel.find();
  return users as IUser[];
}

/**
 * Add one user.
 */
async function create(user: IUser): Promise<IUser> {
  const persistsEmail = await UserModel.findOne({ email: user.email }).lean();
  const persistsUsername = await UserModel
    .findOne({ username: user.username }).lean();

  if (persistsEmail || persistsUsername) {
    throw new RouteError(
      HttpStatusCodes.BAD_REQUEST,
      INVALID_UPDATE,
    );
  }

  // Store encrypted password
  user.pwdHash = await PwdUtil.getHash(user.password);
  user.password = '*******';

  // Add Automatically generated id
  user._id = getRandomId();
  return UserModel.create({ ...user }) as Promise<IUser>;
}

/**
 * Update one user.
 */

async function updateOne(user: Partial<IUser>): Promise<IUser> {
  let persistsUsername = false;
  let persistsEmail = false;
  if (user.username) 
    persistsUsername = !!(await UserModel
      .findOne({ username: user.username }).lean());
  if (user.email) 
    persistsEmail =  !!(await UserModel.findOne({ email: user.email }).lean());

  if (persistsEmail || persistsUsername) {
    throw new RouteError(
      HttpStatusCodes.BAD_REQUEST,
      INVALID_UPDATE,
    );
  }

  const persists = await UserModel
    .findById(user._id).lean();
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }

  // Store encrypted password if we need to change it
  if (user.password) {
    user.pwdHash = await PwdUtil.getHash(user.password);
    user.password = '*******';
  }

  // Return user
  await UserModel.findByIdAndUpdate(user._id, user).lean();
  return await UserModel.findById(user._id).lean();
}

/**
 * Delete a user by their id.
 */
async function _delete(id: string): Promise<void> {
  const persists = await UserModel.findById(id).lean();
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  // Delete user
  await UserModel.findByIdAndRemove(id).lean();
}

// **** Export default **** //

export default {
  get,
  getAll,
  create,
  updateOne,
  delete: _delete,
} as const;
