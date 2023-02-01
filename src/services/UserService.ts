import UserRepo from '@src/repos/UserRepo';
import { IUser } from '@src/models/User';
import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';

// **** Variables **** //

export const USER_NOT_FOUND_ERR = 'User not found';
export const INVALID_UPDATE = 'Email or username are already taken';


// **** Functions **** //

/**
 * Get user
 */
async function get(id: number): Promise<IUser | null> {
  const persists = await UserRepo.persists(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  // Delete user
  return UserRepo.getOneById(id);
}

/**
 * Get all users.
 */
function getAll(): Promise<IUser[]> {
  return UserRepo.getAll();
}

/**
 * Add one user.
 */
async function addOne(user: IUser): Promise<IUser> {
  const persistsUsername = await UserRepo.persistsUsername(user.username);
  const persistsEmail = await UserRepo.persistsUsername(user.username);

  if (persistsEmail || persistsUsername) {
    throw new RouteError(
      HttpStatusCodes.BAD_REQUEST,
      INVALID_UPDATE,
    );
  }

  return UserRepo.add(user);
}

/**
 * Update one user.
 */

async function updateOne(user: IUser): Promise<IUser | null> {
  let persistsUsername = false;
  let persistsEmail = false;
  if (user.username) 
    persistsUsername = await UserRepo.persistsUsername(user.username);
  if (user.email) 
    persistsEmail = await UserRepo.persistsEmail(user.email);

  if (persistsEmail || persistsUsername) {
    throw new RouteError(
      HttpStatusCodes.BAD_REQUEST,
      INVALID_UPDATE,
    );
  }

  const persists = await UserRepo.persists(user.id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  // Return user
  return UserRepo.update(user);
}

/**
 * Delete a user by their id.
 */
async function _delete(id: number): Promise<void> {
  const persists = await UserRepo.persists(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  // Delete user
  return UserRepo.delete(id);
}


// **** Export default **** //

export default {
  get,
  getAll,
  addOne,
  updateOne,
  delete: _delete,
} as const;
