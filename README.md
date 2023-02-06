# FLITTER - PRÁCTICA FINAL

## Bootcamp _Mujeres en Tech_ by KeepCoding

## About

Este proyecto se creo utilizando: [express-generator-typescript](https://github.com/seanpmaxwell/express-generator-typescript).

## Puesta en marcha

Desplegar la app:

```sh
npm install
```

Lenvanta el servidor de mongo (necesario para que funcione en mac)

```sh
mogod --dbpath /path/to/db
```

Arrancar la app en modo producción

```sh
npm start
```

Arrancar la app en modo desarrollo

```sh
npm run dev
```

Aplicación configurada para arrancar en el **puerto 3000**

## Documentación de la API

Obtendremos los **resultados** con la siguiente estructura JSON:

```sh
    "users": [
        {
            "_id": "160549930037",
            "username": "hola",
            "email": "hola@flitter.com",
            "password": "*******",
            "pwdHash": "$2b$12$BCaSAh5yGAm8J3bdEhNA4ezfuZBtcfhwnXUXOfTEeKVEf0XCJgtQu",
            "__v": 0
        }
    ]
```

Esta API nos permite hacer **CRUD** con los flits/tweets y usuarios de la BBDD, a continuación se muestran algunos ejemplos de uso:

## USERS

### Create

Añadimos los datos a insertar en el body (x-www-form-urlencoded) de la petición POST

```sh
    POST localhost:3000/api/users/sign-up

    user[email]: adios@flitter.com,
    user[password]: 1234,
    user[username]: AdiosFlit
```

### Read

Obtener un listado de todos los usuarios disponibles en la BBDD

```sh
  GET localhost:3000/api/users
```

Obtener un add por id

```sh
  GET localhost:3000/api/users/160549930037
```

### Update

Añadimos los datos a modificar del usuario actual en el body (x-www-form-urlencoded)de la petición POST

```sh
  PUT localhost:3000/api/users/update-me

  'user[username]': 'adios'
```

### Delete

Borramos la cuenta del usuario logeado

```sh
  DELETE localhost:3000/api/users/delete-me
```

## FLITS

### Create

Añadimos los datos a insertar en el body (x-www-form-urlencoded) de la petición POST

```sh
    POST localhost:3000/api/tweets

    tweet[text]: "Lorem Ipsum...",
    tweet[imageUrl]: "urlIMG.com/img"
```

### Read

Obtener un listado de todos los usuarios disponibles en la BBDD

```sh
  GET localhost:3000/api/tweets
```

Ejemplos con búsquedas filtradas:

### Update

Añadimos los datos a modificar del usuario actual en el body (x-www-form-urlencoded) de la petición POST

```sh
  PUT localhost:3000/api/users/update-me

  user[username]: 'adios'
```

### Delete

Borramos un tweet usando su id

```sh
  DELETE localhost:3000/api/tweets/742579749943
```

## AUTHENTIFICATION

### Log In

Añadimos los datos del login en el body (x-www-form-urlencoded) de la petición POST, nos devuelve el token en una cookie

```sh
  POST localhost:3000/api/auth/login

  email: hola@flitter.com,
  password: 1234
```

### Log Out

```sh
  GET localhost:3000/api/auth/logout
```

## Autoras:

-   Ana Vírseda Sanz
-   Carolina Cortez Freudenthal
-   María Ángeles Córdoba García Consuegra
-   Paloma Montero Merello
-   Sofia Romero Kamermann
