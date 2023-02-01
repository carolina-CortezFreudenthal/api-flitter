import { Router } from 'express';
import jetValidator from 'jet-validator';

import currentUserMw from './middleware/currentUserMw';
import Paths from './constants/Paths';
import User from '@src/models/User';
import AuthRoutes from './AuthRoutes';
import UserRoutes from './UserRoutes';


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
  validate(['user', User.validSignUp]),
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
  validate(['user', User.validUpdateMe]),
  UserRoutes.updateMe,
);

// Borrar cuenta
userRouter.delete(
  Paths.Users.DeleteMe,
  UserRoutes.deleteMe,
);

// Añade ruta de usuario
apiRouter.use(Paths.Users.Base, currentUserMw, userRouter);


// **** Export default **** //

export default apiRouter;
