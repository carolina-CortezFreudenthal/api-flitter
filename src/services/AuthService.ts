import JwtUtil from '@src/util/JwtUtil';
import PwdUtil from '@src/util/PwdUtil';
import { tick } from '@src/util/misc';

import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { RouteError } from '@src/other/classes';
import { ISessionUser, IUser, UserModel } from '@src/models/User';


// **** Variables **** //

// Errors
export const Errors = {
  Unauth: 'Unauthorized',
  emailNotFound: (email: string) => 
    `El usuario con el "${email}" no fue encontrado`,
} as const;


// **** Functions **** //

/**
 * Login a user.
 */
async function getJwt(
  email: string, password: string,
): Promise<{ jwt: string, userId: string }> {
  // Fetch user
  const user = await UserModel.findOne({ email }) as IUser;

  if (!user) {
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED,
      Errors.emailNotFound(email),
    );
  }
  // Check password
  const hash = (user.pwdHash ?? ''),
    pwdPassed = await PwdUtil.compare(password, hash);
  if (!pwdPassed) {
    // If password failed, wait 500ms this will increase security
    await tick(500);
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED, 
      Errors.Unauth,
    );
  }
  const jwt = await JwtUtil.sign({
    _id: user._id,
    email: user.email,
    username: user.username,
  });

  // Setup Admin Cookie
  return {
    jwt,
    userId: user._id,
  };
}


// **** Export default **** //

export default {
  getJwt,
} as const;
