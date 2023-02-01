/**
 * Middleware to verify user logged in and is an an admin.
 */

import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
 
import EnvVars from '@src/constants/EnvVars';
import JwtUtil from '@src/util/JwtUtil';
import { ISessionUser, UserModel } from '@src/models/User';
 
 
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
  
    if ((clientData as ISessionUser)?._id) {
      const user = await UserModel
        .findById((clientData as ISessionUser)._id).lean();
      res.locals.sessionUser = user;
    }
  }

  return next();

}
 
 
// **** Export Default **** //
 
export default adminMw;
 