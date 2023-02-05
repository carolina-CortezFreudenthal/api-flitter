import { Router } from 'express';
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
  AuthRoutes.login,
);

// Logout usuario
authRouter.get(
  Paths.Auth.Logout,
  AuthRoutes.logout,
);

// AuthRouter
apiRouter.use(Paths.Auth.Base, authRouter);


///////////////////////
// ** UserRouter ** //
///////////////////////

const userRouter = Router();

// Sign Up
userRouter.post(
  Paths.Users.SignUp,
  validate(['user', User.validSignUp as TValidatorFn]),
  UserRoutes.signUp,
);

// Obtener usuario
userRouter.get(
  Paths.Users.Get,
  UserRoutes.get,
);

// Obtener todos los usuarios 
userRouter.get(
  Paths.Users.GetAll,
  UserRoutes.getAll,
);

// Actualizar cuenta
userRouter.put(
  Paths.Users.UpdateMe,
  validate(['user', User.validUpdateMe as TValidatorFn]),
  UserRoutes.updateMe,
);

// Borrar cuenta
userRouter.delete(
  Paths.Users.DeleteMe,
  UserRoutes.deleteMe,
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
  TweetRoutes.getAll,
);

// Create
tweetRouter.post(
  Paths.Tweets.Create,
  validate(['tweet', Tweet.validTweet as TValidatorFn]),
  TweetRoutes.create,
);

// Delete
tweetRouter.delete(
  Paths.Tweets.Delete,
  TweetRoutes.deleteTweet,
);

// Kudo
tweetRouter.post(
  Paths.Tweets.Kudos,
  TweetRoutes.kudoToggle,
);

// Añade ruta para tweets
apiRouter.use(Paths.Tweets.Base, currentUserMw, tweetRouter);


// **** Export default **** //

export default apiRouter;
