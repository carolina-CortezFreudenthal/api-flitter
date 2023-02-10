import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import UserService from '@src/services/UserService';
import { IUser } from '@src/models/User';
import { IReq, IReqQuery, IRes } from './types/types';
import RoutesUtil from '@src/util/RoutesUtil';
import EnvVars from '@src/constants/EnvVars';
import { RouteError } from '@src/other/classes';


// **** Functions **** //

/**
 * Sign Up as standard user
 */
async function signUp(req: IReq<{user: IUser}>, res: IRes) {
  const { user } = req.body;
  const newUser = await UserService.create({ ...user });
  return res.status(HttpStatusCodes.CREATED).json({
    'message': 'el usuario fue creado',
    'user': newUser,
  });
}

/**
 * Get User
 */
async function get(req: IReq<{user: IUser}>, res: IRes) {
  const id = req.params.id;
  const user = await UserService.get(id);
  return res.status(HttpStatusCodes.CREATED).json({
    'user': user,
  });
}

/**
 *  Get All Users
 */
async function getAll(req: IReqQuery<{
  userIds?: string[], 
  username?: string,
}>, res: IRes) {
  const users = await UserService.getAll(
    req.query.userIds,
    req.query.username,
  );
  return res.status(HttpStatusCodes.OK).json({ users });
}

/**
 * Update my account
 */
async function updateMe(req: IReq<{user: Partial<IUser>}>, res: IRes) {
  const currentUser = RoutesUtil.getCurrentUser(req);
  if (!currentUser) throw new RouteError(
    HttpStatusCodes.BAD_REQUEST,
    'no hay un usuario logeado',
  );

  const { user } = req.body;
  const newUser = await UserService.updateOne({ 
    _id: currentUser._id, ...user, 
  });
  return res.status(HttpStatusCodes.OK).json({
    'message': 'el usuario fue creado',
    'user': newUser,
  });
}

/**
 * Delete my account
 */
async function deleteMe(req: IReq, res: IRes) {
  const currentUser = RoutesUtil.getCurrentUser(req);
  if (!currentUser)     throw new RouteError(
    HttpStatusCodes.BAD_REQUEST,
    'no hay un usuario logeado',
  );

  const id = currentUser._id;
  await UserService.delete(id);

  // Clear cookies
  const { Key, Options } = EnvVars.CookieProps;
  res.clearCookie(Key, Options);

  return res.status(HttpStatusCodes.OK).json({
    'message': 'la cuenta fue eliminada',
  });
}

/**
 * Get my account
 */
async function profile(req: IReq, res: IRes) {
  const currentUser = RoutesUtil.getCurrentUser(req);
  if (!currentUser) throw new RouteError(
    HttpStatusCodes.BAD_REQUEST,
    'no hay un usuario logeado',
  );

  const id = currentUser._id;
  const user = await UserService.get(id);

  return res.status(HttpStatusCodes.CREATED).json({
    'user': user,
  });
}

/**
 * Get my account
 */
async function followToggle(req: IReq, res: IRes) {
  const currentUser = RoutesUtil.getCurrentUser(req);
  if (!currentUser) throw new RouteError(
    HttpStatusCodes.BAD_REQUEST,
    'no hay un usuario logeado',
  );

  const id = req.params.id;
  const user = await UserService.followToggle(id, currentUser);

  return res.status(HttpStatusCodes.CREATED).json({
    'user': user,
  });
}

// **** Export default **** //

export default {
  get,
  getAll,
  signUp,
  updateMe,
  deleteMe,
  profile,
  followToggle,
} as const;
