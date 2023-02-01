import jsonwebtoken from 'jsonwebtoken';
import EnvVars from '../constants/EnvVars';


// **** Variables **** //

// Errors
const Errors = {
  Validation: 'JSON-web-token validation failed.',
} as const;

// Options
const Options = {
  expiresIn: EnvVars.Jwt.Exp,
};


// **** Funciones **** //

/**
 * Encripta la data y retonra JWT.
 */
function sign(data: string | object | Buffer): Promise<string> {
  return new Promise((res, rej) => {
    jsonwebtoken.sign(data, EnvVars.Jwt.Secret, Options, (err, token) => {
      return err ? rej(err) : res(token || '');
    });
  });
}

/**
 * Desencripta  JWT  y extrae la data del cliente.
 */
function decode<T>(jwt: string): Promise<string | undefined | T> {
  return new Promise((res, rej) => {
    jsonwebtoken.verify(jwt, EnvVars.Jwt.Secret, (err, decoded) => {
      return err ? rej(Errors.Validation) : res(decoded as T);
    });
  });
}


// **** Export default **** //

export default {
  sign,
  decode,
} as const;
