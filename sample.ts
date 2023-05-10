import * as dotenv from "dotenv";
dotenv.config({ path: './.env' });
import { GetQuery, ConfigureKey } from './src/index';

dotenv.config();
let APIKEY = process.env.OPENAI_API_KEY;
if(APIKEY == undefined) throw new Error("APIKEY not found in .env file");

ConfigureKey(APIKEY);

let array = [
    { nombre: 'Juan', edad: 25, ciudad: 'Madrid' , cumpleaños: '1996-10-17'},
    { nombre: 'Ana', edad: 15, ciudad: 'Barcelona', cumpleaños: '1999-10-17'},
    { nombre: 'Pedro', edad: 18, ciudad: 'Sevilla', cumpleaños: '2000-10-17'},
    { nombre: 'Pedro', edad: 18, ciudad: 'Sevilla', cumpleaños: '2022-10-17'},
    { nombre: 'Pedro', edad: 18, ciudad: 'Sevilla', cumpleaños: '2023-10-17'},
];

console.log("----");
//GetQuery(array, "muestra los valores estadisticos varianza y covarianza de la edad de los usuarios utilizando la libreria math.js ")
GetQuery(array, "muestra el valor que mas se repita en la edad de los usuarios y cuantas veces aparece utilizando la libreria math.js")
.then(array => {
  console.log("🚀 ~ file: sample.ts ~ array:", array)
});