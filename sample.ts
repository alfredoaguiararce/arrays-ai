import * as dotenv from "dotenv";
dotenv.config({ path: './.env' });
import { GetQuery, ConfigureKey } from './dist/index';

dotenv.config();
ConfigureKey(process.env.OPENAI_API_KEY);

let array = [
    { nombre: 'Juan', edad: 25, ciudad: 'Madrid' , cumpleaños: '1996-10-17'},
    { nombre: 'Ana', edad: 15, ciudad: 'Barcelona', cumpleaños: '1999-10-17'},
    { nombre: 'Pedro', edad: 18, ciudad: 'Sevilla', cumpleaños: '2000-10-17'},
    { nombre: 'Pedro', edad: 18, ciudad: 'Sevilla', cumpleaños: '2022-10-17'},
    { nombre: 'Pedro', edad: 18, ciudad: 'Sevilla', cumpleaños: '2023-10-17'},
];

console.log("----");
GetQuery(array, "aEncuentra a las personas mayores de 20 años ")
.then(array => {
  console.log("🚀 ~ file: sample.ts ~ array:", array)
});