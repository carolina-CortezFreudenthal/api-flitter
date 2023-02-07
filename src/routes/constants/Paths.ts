/**
 * Express router paths go here.
 */

import { Immutable } from '@src/other/types';


const Paths = {
  Base: '/api',
  Auth: {
    Base: '/auth',
    Login: '/login',
    Logout: '/logout',
  },
  Users: {
    Base: '/users',
    Get: '/:id',
    GetAll: '/',
    UpdateMe: '/update-me',
    SignUp: '/sign-up',
    DeleteMe: '/delete-me',
    MyProfile: '/profile',
  },
  Tweets: {
    Base: '/tweets',
    GetAll: '/',
    Create: '/',
    Delete: '/:id',
    Kudos: '/kudo-toggle/:id',
  },
};


// **** Export **** //

export type TPaths = Immutable<typeof Paths>;
export default Paths as TPaths;
