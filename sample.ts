import * as dotenv from "dotenv";
dotenv.config({ path: './.env' });
import { GetQuery, ConfigureKey } from './src/index';
const math = require('mathjs');

dotenv.config();
let APIKEY = process.env.OPENAI_API_KEY;
if(APIKEY == undefined) throw new Error("APIKEY not found in .env file");

ConfigureKey(APIKEY);

let array = [
    { nombre: 'Juan', edad: 100, ciudad: 'Madrid' , cumpleaños: '1996-10-17'},
    { nombre: 'Ana', edad: 15, ciudad: 'Barcelona', cumpleaños: '1999-10-17'},
    { nombre: 'Ana', edad: -1000, ciudad: 'Barcelona', cumpleaños: '1999-10-17'},
    { nombre: 'Pedro', edad: 19, ciudad: 'Sevilla', cumpleaños: null},
    { nombre: 'Pedro', edad: 19, ciudad: 'Sevilla', cumpleaños: '2022-10-17'},
    { nombre: 'Pedro', edad: 19, ciudad: 'Sevilla', cumpleaños: '2023-10-17'},
    { nombre: 'Pedro', edad: 19, ciudad: 'Sevilla', cumpleaños: '2023-10-17'},
];
    
console.log("----");
//GetQuery(array, "muestra los valores estadisticos varianza, media y moda de la edad de los usuarios utilizando la libreria math.js ")
//GetQuery(array, "muestra todos los usuarios que sean mayores de edad y que vivan en Sevilla ordenados por edad de forma descendente")//GetQuery(array, "muestra los valores estadisticos varianza, media y moda de la edad de los usuarios utilizando la libreria math.js ")
//GetQuery(array, "muestra los valores que mas se repiten en la edad con la cantidad de veces q ue lo hacen del menor al mayor de los usuarios") funciona muy bien
//GetQuery(array, "muestra los objetos pero elimina los valores duplicados donde todas sus columnas esten duplicadas") 
//GetQuery(array, "Elimina las filas cuyos valores sean null en cumpleaños") 
//GetQuery(array, "Elimina las filas cuyos valores sean null en cumpleaños") 
GetQuery(array, "muestra los valores que mas se repiten en la ciudades con la cantidad de veces q ue lo hacen del menor al mayor de los usuarios") 
.then(array => {
  console.log("🚀 ~ file: sample.ts ~ array:", array)
});