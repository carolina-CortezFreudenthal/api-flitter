import { Router, Application } from 'express';
import jetValidator, { TValidatorFn } from 'jet-validator';

import currentUserMw from './middleware/currentUserMw';
import Paths from './constants/Paths';
import User from '@src/models/User';
import Tweet from '@src/models/Tweet';

import AuthRoutes from './AuthRoutes';
import UserRoutes from './UserRoutes';
import TweetRoutes from './TweetRoutes';



// **** Variables **** //

const apiRouter = Router(),
  validate = jetValidator();

/////////////////////
// **** Auth Router **** //
/////////////////////

const authRouter = Router();

// Login usuario
authRouter.post(
  Paths.Auth.Login,
  validate('email', 'password'),
  AuthRoutes.login as Application,
);

// Logout usuario
authRouter.get(
  Paths.Auth.Logout,
  AuthRoutes.logout as Application,
);

// AuthRouter
apiRouter.use(Paths.Auth.Base, authRouter);


///////////////////////
// ** UserRouter ** //
///////////////////////

const userRouter = Router();

// Obtener datos de mi cuenta
userRouter.get(
  Paths.Users.MyProfile,
  UserRoutes.profile as Application,
);

// Sign Up
userRouter.post(
  Paths.Users.SignUp,
  validate(['user', User.validSignUp as TValidatorFn]),
  UserRoutes.signUp as Application,
);

// Obtener usuario
userRouter.get(
  Paths.Users.Get,
  UserRoutes.get as Application,
);

// Obtener todos los usuarios 
userRouter.get(
  Paths.Users.GetAll,
  UserRoutes.getAll as Application,
);

// Actualizar cuenta
userRouter.put(
  Paths.Users.UpdateMe,
  validate(['user', User.validUpdateMe as TValidatorFn]),
  UserRoutes.updateMe as Application,
);

// Borrar cuenta
userRouter.delete(
  Paths.Users.DeleteMe,
  UserRoutes.deleteMe as Application,
);

// Toggle Following
userRouter.post(
  Paths.Users.Follow,
  UserRoutes.followToggle as Application,
);

// Añade ruta de usuario
apiRouter.use(Paths.Users.Base, currentUserMw, userRouter);


///////////////////////
// ** TweetsRouter ** //
///////////////////////

const tweetRouter = Router();

// GetAll
tweetRouter.get(
  Paths.Tweets.GetAll,
  TweetRoutes.getAll as Application,
);

// Create
tweetRouter.post(
  Paths.Tweets.Create,
  validate(['tweet', Tweet.validTweet as TValidatorFn]),
  TweetRoutes.create as Application,
);

// Delete
tweetRouter.delete(
  Paths.Tweets.Delete,
  TweetRoutes.deleteTweet as Application,
);

// Kudo
tweetRouter.post(
  Paths.Tweets.Kudos,
  TweetRoutes.kudoToggle as Application,
);

// Añade ruta para tweets
apiRouter.use(Paths.Tweets.Base, currentUserMw, tweetRouter);


// **** Export default **** //

export default apiRouter;
