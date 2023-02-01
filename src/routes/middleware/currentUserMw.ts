/**
 * Middleware to verify user logged in and is an an admin.
 */

import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
 
import EnvVars from '@src/constants/EnvVars';
import JwtUtil from '@src/util/JwtUtil';
import { ISessionUser } from '@src/models/User';
import UserService from '@src/services/UserService';
 
 
// **** Variables **** //
 
// **** Functions **** //
 
/**
  * See note at beginning of file.
  */
async function adminMw(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Extract the token
  const { Key } = EnvVars.CookieProps,
    jwt = req.signedCookies[Key];
  if (jwt) {
    const clientData = await JwtUtil.decode<ISessionUser & JwtPayload>(jwt);
    if ((clientData as ISessionUser)?.id) {
      const user = await UserService.get((clientData as ISessionUser).id);
      res.locals.sessionUser = user;
    }
  }

  return next();

}
 
 
// **** Export Default **** //
 
export default adminMw;
 