/**
 * Setup express server.
 */

import cookieParser from 'cookie-parser';
//Agrega logs 
import morgan from 'morgan';
import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import logger from 'jet-logger';

import 'express-async-errors';

import BaseRouter from '@src/routes/api';
import Paths from '@src/routes/constants/Paths';

import EnvVars from '@src/constants/EnvVars';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import { NodeEnvs } from '@src/constants/misc';
import { RouteError } from '@src/other/classes';


// **** Variables **** //

const app = express();


// **** Setup **** //

//  middleware Basico
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(EnvVars.CookieProps.Secret));

// Logea las rutas que se llaman durante dev 
if (EnvVars.NodeEnv === NodeEnvs.Dev) {
  app.use(morgan('dev'));
}

// Añade  las rutas de la api (siempre despues de agregar middlewares)
app.use(Paths.Base, BaseRouter);

// Se encarga de gestionar los errores 
app.use((
  err: Error,
  _: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (EnvVars.NodeEnv !== NodeEnvs.Test) {
    logger.err(err, true);
  }
  let status = HttpStatusCodes.BAD_REQUEST;
  if (err instanceof RouteError) {
    status = err.status;
  }
  return res.status(status).json({ error: err.message });
});


// ** Front-End Content ** //

// Set views directory (html)
const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);

// Set static directory (js and css).
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));

// Solo dejo un avista para poner a la documentacion
app.get('/', (_: Request, res: Response) => {
  res.sendFile('index.html', { root: viewsDir });
});

// **** Export default **** //

export default app;
