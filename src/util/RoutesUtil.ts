import { IUser } from '@src/models/User';
import { IReq } from '@src/routes/types/types';

// **** Functions **** //

/**
 * Get Current User from request
 */
function getCurrentUser(req : IReq<any>) : IUser | null {
  return req.res?.locals.sessionUser as IUser | null;
}


// **** Export Default **** //

export default {
  getCurrentUser,
} as const;
