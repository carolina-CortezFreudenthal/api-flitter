/* eslint-disable */
// /**Herramineta de linea de comandos*/
// // Inicializar la base datos con los datos mínimos
// const readline = require('readline');

// // Cargamos el modelo Tweet
// const Tweet = require('./models/Tweet');
// const User = require('./models/User');

// // Función main
// async function main() {
//   // Preguntamos al usuario si está seguro de borrar la BBDD
//   const question_continue = await questionYN(
//     'You are going to DELETE THE DATABASE, are you sure you want to delete it? Answer "yes" or "no" [n] ',
//   ); //[n] -> valor por defecto
//   if (!question_continue) {
//     process.exit();
//   }

//   // Conectamos a la base de datos
//   const connection = require('./lib/connectMongoose');

//   // Inicializamos la colección de tweet
//   await initTweets();
//   await initUsers();

//   // Desconectamos de la base de datos
//   connection.close();
// }

// // Recojo algún posible error
// main().catch((err) => console.log('Oops, an error ocurred', err));

// // Inicializamos el modelo de tweet, añadiendo algunos registros y borrando si había algunos anteriores
// async function initTweets() {
//   // Borramos todos los documentos de la colección de tweets
//   const resultTweets = await Tweet.deleteMany();
//   console.log(
//     `${resultTweets.deletedCount} tweets  deleted from the DataBase.`,
//   );

//   const insertedTweets = await Tweet.insertMany([
//     {
//       text: 'Lorem 1 Ipsum is simply dummy text of the printing and typesetting industry',
//       createdBy: 1,
//     },
//     // {
//     //     text: "Lorem 2 Ipsum is simply dummy text of the printing and typesetting industry",
//     //     createdBy: 2,
//     // },
//   ]);

//   console.log(`${insertedTweets.length} tweets added to de DataBase.`);
// }

// // Inicializamos el modelo de tweet, añadiendo algunos registros y borrando si había algunos anteriores
// async function initUsers() {
//   // Borramos todos los documentos de la colección de tweets
//   const resultUser = await User.deleteMany();
//   console.log(`${resultUser.deletedCount} users deleted from the DataBase.`);

//   // Creamos algunos tweets iniciales
//   const insertedUsers = await User.insertMany([
//     {
//       name: 'Jorge',
//       email: 'Jorgeagmail.com',
//       password: '1234',
//     },
//     // {
//     //     name: "Alberto",
//     //     email: "Albertoagmail.com",
//     //     password: "1235",
//     // },
//   ]);

//   console.log(`${insertedUsers.length} users tweets added to de DataBase.`);
// }

// // Minimizamos el riesgo de borrar la BBDD por error
// function questionYN(texto) {
//   return new Promise((resolve, reject) => {
//     const interface = readline.createInterface({
//       input: process.stdin,
//       output: process.stdout,
//     });
//     interface.question(texto, (answer) => {
//       interface.close();
//       if (answer.toLowerCase() === 'yes') {
//         resolve(true);
//         return;
//       }
//       resolve(false);
//     });
//   });
// }