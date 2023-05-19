import * as dotenv from "dotenv";
dotenv.config({ path: './.env' });
import { GetQuery, ConfigureKey, test_func } from './src/index';
const math = require('mathjs');

dotenv.config();
let APIKEY = process.env.OPENAI_API_KEY;
if(APIKEY == undefined) throw new Error("APIKEY not found in .env file");

ConfigureKey(APIKEY);

let array = [
  { id: 1, nombre: 'Juan', edad: 100, ciudad: 'Madrid' , cumpleaños: '1996-10-17'},
  { id: 2, nombre: 'Ana', edad: 15, ciudad: 'Barcelona', cumpleaños: '1999-10-17'},
  { id: 3, nombre: 'Ana', edad: -1000, ciudad: 'Barcelona', cumpleaños: '1999-10-17'},
  { id: 4, nombre: 'Pedro', edad: 19, ciudad: 'Sevilla', cumpleaños: null},
  { id: 5, nombre: 'Pedro', edad: 19, ciudad: 'Sevilla', cumpleaños: '2022-10-17'},
  { id: 6, nombre: 'Pedro', edad: 19, ciudad: 'Sevilla', cumpleaños: '2023-10-17'},
  { id: 7, nombre: 'Pedro', edad: 19, ciudad: 'Sevilla', cumpleaños: '2023-10-17'},
];

let array2 = [
    { hijo_id: 1, padre: 'Juan', edad: 100, ciudad: 'Madrid' , cumpleaños: '1996-10-17'},
    { hijo_id: 2,padre: 'Ana', edad: 15, ciudad: 'Barcelona', cumpleaños: '1999-10-17'},
    { hijo_id: 3,padre: 'Ana', edad: -1000, ciudad: 'Barcelona', cumpleaños: '1999-10-17'},
    { hijo_id: 4,padre: 'Pedro', edad: 19, ciudad: 'Sevilla', cumpleaños: null},
    { hijo_id: 5,padre: 'Pedro', edad: 19, ciudad: 'Sevilla', cumpleaños: '2022-10-17'},
    { hijo_id: 6,padre: 'Pedro', edad: 19, ciudad: 'Sevilla', cumpleaños: '2023-10-17'},
    { hijo_id: 7,padre: 'Pedro', edad: 19, ciudad: 'Sevilla', cumpleaños: '2023-10-17'},
];

// let arrays = [array, array2];
// arrays.map(array => [...array[0], ...array[1]])
// const joinedArray = array.map((obj) => ({
//   ...obj,
//   ...array2.find((item) => item.hijo_id === obj.id),
// }));

// console.log(joinedArray);
// console.log("----");
// //GetQuery(array, "muestra los valores estadisticos varianza, media y moda de la edad de los usuarios utilizando la libreria math.js ")
// //GetQuery(array, "muestra todos los usuarios que sean mayores de edad y que vivan en Sevilla ordenados por edad de forma descendente")//GetQuery(array, "muestra los valores estadisticos varianza, media y moda de la edad de los usuarios utilizando la libreria math.js ")
// GetQuery(array, "muestra los valores que mas se repiten en la edad con la cantidad de veces q ue lo hacen del menor al mayor de los usuarios")
// //GetQuery(array, "muestra los objetos pero elimina los valores duplicados donde todas sus columnas esten duplicadas") 
// //GetQuery(array, "Elimina las filas cuyos valores sean null en cumpleaños") 
// //GetQuery(array, "Elimina las filas cuyos valores sean null en cumpleaños") 
// //GetQuery(array, "muestra los valores que mas se repiten en la ciudades con la cantidad de veces q ue lo hacen del menor al mayor de los usuarios") 
// .then(array => {
//   console.log("🚀 ~ file: sample.ts ~ array:", array)
// });    

console.log("----");
// test_func([array, array2], "Elimina las filas cuyos valores sean null en cumpleaños para todos los arreglos")
// test_func([array, array2], "elimina los valores nulos de cumpleaños para todos los arreglos")
// test_func([array, array2], "Cual es la edad promedio de los usuarios en el primer arreglo?")
// test_func([array, array2], "cual es la edad promedio de los usuarios del segudo arreglo?")
// test_func([array, array2], " cuantos datos hay en el segundo arreglo?")
// test_func([array, array2], " une ambos arreglos en una sola tabla") -- no funciona
test_func([array, array2], "Join the second array with the propiertie hijo_id with the first array with the propiertie id")
.then(array => {
  console.log("🚀 ~ file: sample.ts ~ array:", array)
});