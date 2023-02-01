import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import UserService from '@src/services/UserService';
import { IUser } from '@src/models/User';
import { IReq, IRes } from './types/express/misc';
import RoutesUtil from '@src/util/RoutesUtil';
import EnvVars from '@src/constants/EnvVars';


// **** Functions **** //

/**
 * Sign Up as standard user
 */
async function signUp(req: IReq<{user: IUser}>, res: IRes) {
  const { user } = req.body;
  const newUser = await UserService.addOne({ ...user });
  return res.status(HttpStatusCodes.CREATED).json({
    'message': 'the user has been created',
    'user': newUser,
  });
}

/**
 * Get User
 */
async function get(req: IReq<{user: IUser}>, res: IRes) {
  const id = +req.params.id;
  const user = await UserService.get(id);
  return res.status(HttpStatusCodes.CREATED).json({
    'user': user,
  });
}

/**
 *  Get All Users
 */
async function getAll(_: IReq, res: IRes) {
  const users = await UserService.getAll();
  return res.status(HttpStatusCodes.OK).json({ users });
}

/**
 * Update my account
 */
async function updateMe(req: IReq<{user: IUser}>, res: IRes) {
  const currentUser = RoutesUtil.getCurrentUser(req);
  if (!currentUser) return res.status(HttpStatusCodes.UNAUTHORIZED).end();

  const { user } = req.body;
  const newUser = await UserService.updateOne({ ...currentUser, ...user });
  return res.status(HttpStatusCodes.OK).json({
    'message': 'the user has been updated',
    'user': newUser,
  });
}

/**
 * Delete my account
 */
async function deleteMe(req: IReq, res: IRes) {
  const currentUser = RoutesUtil.getCurrentUser(req);
  if (!currentUser) return res.status(HttpStatusCodes.UNAUTHORIZED).end();

  const id = currentUser.id;
  await UserService.delete(id);

  // Clear cookies
  const { Key, Options } = EnvVars.CookieProps;
  res.clearCookie(Key, Options);

  return res.status(HttpStatusCodes.OK).json({
    'message': 'the account has been deleted',
  });
}

// **** Export default **** //

export default {
  get,
  getAll,
  signUp,
  updateMe,
  deleteMe,
} as const;
