var dotenv = require('dotenv');
dotenv.config({ path: './.env' });
var ArraysAi = require('./dist/index').ArraysAi;
var Configuration = require('openai').Configuration;
var BuilInLanguage = require('./dist/Constants').BuilInLanguage;

dotenv.config();
var APIKEY = process.env.OPENAI_API_KEY;
if (APIKEY == undefined) throw new Error("APIKEY not found in .env file");
var config = new Configuration({
  apiKey: APIKEY
});

var arraysai = new ArraysAi();
arraysai.Configure(config, BuilInLanguage.JAVASCRIPT);

var collection_1 = [
  { nombre: 'Juan', edad: 100, ciudad: 'Madrid', cumpleaños: '1996-10-17' },
  { nombre: 'Ana', edad: 15, ciudad: 'Barcelona', cumpleaños: '1999-10-17' },
  { nombre: 'Ana', edad: -1000, ciudad: 'Barcelona', cumpleaños: '1999-10-17' },
  { nombre: 'Pedro', edad: null, ciudad: 'Sevilla', cumpleaños: null },
  { nombre: 'Pedro', edad: 19, ciudad: 'Sevilla', cumpleaños: '2022-10-17' },
  { nombre: 'Pedro', edad: null, ciudad: 'Sevilla', cumpleaños: '2023-10-17' },
  { nombre: 'Pedro', edad: 19, ciudad: 'tepic', cumpleaños: '2023-10-17' }
];

var collection_2 = [
  { nombre: 'María', edad: 25, ciudad: 'Madrid', cumpleaños: '1990-01-15' },
  { nombre: 'Carlos', edad: null, ciudad: 'Barcelona', cumpleaños: '1985-09-22' },
  { nombre: 'Laura', edad: 40, ciudad: 'Sevilla', cumpleaños: '1978-06-10' },
  { nombre: 'Andrés', edad: 18, ciudad: 'Valencia', cumpleaños: '2003-12-05' },
  { nombre: 'Sofía', edad: 29, ciudad: 'Bilbao', cumpleaños: '1992-07-20' },
  { nombre: 'Luis', edad: 37, ciudad: 'Madrid', cumpleaños: '1984-03-18' },
  { nombre: 'Marta', edad: 22, ciudad: 'Ixtlan', cumpleaños: '1999-11-28' }
];

var arrays = [collection_1, collection_2];

arraysai.SetData([collection_1, collection_2]);

var coderesult;
arraysai.Ask("Cuantas veces se repite Ixtlan en las ciudades del primer arreglo??")
  .then(function (answer) {
    console.log(answer);
  });
