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
  USER:
    {
      "_id": "854788135948",
        "username": "OhMyFlit",
        "email": "ohmyflit@flitter.com",
        "followingIds": [],
        "password": "*******",
        "pwdHash": "$2b$12$Nsr.Tqu0RyIH7CWhf1ifbuBBwzDANn8TYUTa/nrczOdAr4CUXIbym",
        "__v": 0
    }

  Tweets/Flits
    {
      "_id": "732336368726",
      "userId": "854788135948",
      "text": "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó un",
      "imageUrl": "https://cdn.pixabay.com/photo/2023/01/25/18/14/landscape-7744216_960_720.jpg",
      "createdAt": "2023-02-12T14:34:00.070Z",
      "kudosCount": 0,
      "kudosUserIds": [],
      "__v": 0,
      "user": {
        "_id": "854788135948",
        "username": "OhMyFlit",
        "email": "ohmyflit@flitter.com",
        "followingIds": [],
        "password": "*******",
        "pwdHash": "$2b$12$Nsr.Tqu0RyIH7CWhf1ifbuBBwzDANn8TYUTa/nrczOdAr4CUXIbym",
        "__v": 0
      }
    }

```

Esta API nos permite hacer **CRUD** con los flits/tweets y usuarios de la BBDD, a continuación se muestran algunos ejemplos de uso:

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

## USERS

### Create

Añadimos los datos a insertar en el body (x-www-form-urlencoded) de la petición POST

```sh
    POST localhost:3000/api/users/sign-up

    user[email]: ohmyflit@flitter.com,
    user[password]: 1234,
    user[username]: OhMyFlit
```

### Read

Obtener un listado de todos los usuarios disponibles en la BBDD

```sh
  GET localhost:3000/api/users
```

Obtener un add por id

```sh
  GET localhost:3000/api/users/854788135948
```

### Update

Añadimos los datos a modificar del usuario actual en el body (x-www-form-urlencoded)de la petición POST

```sh
  PUT localhost:3000/api/users/update-me

  'user[username]': 'flitter'
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
    tweet[imageUrl]: "https://www.imgs.com/img"
```

### Read

Obtener un listado de todos los tweets/flits disponibles en la BBDD

```sh
  GET localhost:3000/api/tweets
```

Ejemplos con búsquedas filtradas:

-   **Texto**
    Posibilidad de buscar por palabras enteras o caracteres

    ```sh
    GET http://localhost:3000/api/tweets?text=a
    ```

-   **Id de usuario**

    ```sh
    GET http://localhost:3000/api/tweets?userIds=854788135948
    ```

-   **Paginación con _skip_ y _limit_**

    ```sh
    GET http://localhost:3000/api/tweets?skip=0&limit=5
    ```

-   **Ordenación**
    Fecha de creación ascendente

    ```sh
    GET http://localhost:3000/api/tweets?sort=asc
    ```

    Fecha de creación descendente

    ```sh
    GET http://localhost:3000/api/tweets?sort=desc
    ```

Ejemplo de varios filtros en una misma petición

```sh
GET http://localhost:3000/api/tweets?userIds=854788135948&skip=0&limit=5&sort=createdAt
```

### Delete

Borramos un tweet/flit usando su id. Sólo para los autores del tweet/flit

```sh
  DELETE localhost:3000/api/tweets/742579749943
```

## Autoras:

-   Ana Vírseda Sanz
-   Carolina Cortez Freudenthal
-   María Ángeles Córdoba García Consuegra
-   Paloma Montero Merello
-   Sofia Romero Kamermann
