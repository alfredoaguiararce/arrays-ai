import * as dotenv from "dotenv";
dotenv.config({ path: './.env' });
import { ArraysAi } from './src/index';
import { Configuration } from "openai";
import { BuilInLanguage } from "./src/Constants";
// const math = require('mathjs');

dotenv.config();
let APIKEY = process.env.OPENAI_API_KEY;
if(APIKEY == undefined) throw new Error("APIKEY not found in .env file");
let config : Configuration = new Configuration({
  apiKey: APIKEY
})

const arraysai : ArraysAi<any> = new ArraysAi();
arraysai.Configure(config, BuilInLanguage.JAVASCRIPT);


let collection_1 = [
    { nombre: 'Juan', edad: 100, ciudad: 'Madrid' , cumpleaños: '1996-10-17'},
    { nombre: 'Ana', edad: 15, ciudad: 'Barcelona', cumpleaños: '1999-10-17'},
    { nombre: 'Ana', edad: -1000, ciudad: 'Barcelona', cumpleaños: '1999-10-17'},
    { nombre: 'Pedro', edad: null, ciudad: 'Sevilla', cumpleaños: null},
    { nombre: 'Pedro', edad: 19, ciudad: 'Sevilla', cumpleaños: '2022-10-17'},
    { nombre: 'Pedro', edad: null, ciudad: 'Sevilla', cumpleaños: '2023-10-17'},
    { nombre: 'Pedro', edad: 19, ciudad: 'tepic', cumpleaños: '2023-10-17'},
];

let collection_2 = [
  { nombre: 'María', edad: 25, ciudad: 'Madrid', cumpleaños: '1990-01-15' },
  { nombre: 'Carlos', edad: null, ciudad: 'Barcelona', cumpleaños: '1985-09-22' },
  { nombre: 'Laura', edad: 40, ciudad: 'Sevilla', cumpleaños: '1978-06-10' },
  { nombre: 'Andrés', edad: 18, ciudad: 'Valencia', cumpleaños: '2003-12-05' },
  { nombre: 'Sofía', edad: 29, ciudad: 'Bilbao', cumpleaños: '1992-07-20' },
  { nombre: 'Luis', edad: 37, ciudad: 'Madrid', cumpleaños: '1984-03-18' },
  { nombre: 'Marta', edad: 22, ciudad: 'Ixtlan', cumpleaños: '1999-11-28' }
];

let collections = [collection_1, collection_2];


arraysai.SetData([collection_1, collection_2]);
arraysai.SetArraysName("collections");
// console.log(arraysai.GetData());
// console.log(arraysai.GetColumns());

let coderesult: string;
// arraysai.Ask("muestra los valores que mas se repiten en la edad con la cantidad de veces q ue lo hacen del menor al mayor de los usuarios")
// arraysai.Ask("Une ambas tablas y asignales un identificador numerico unico a cada fila basada en su posicion enla tabla final")
// arraysai.Ask("Cuantos elementos tiene cada collecion de datos?")
// arraysai.Ask("Cuantos pedros hay entre todos los datos?")
// arraysai.Ask("Cual es la persona con mas años de ambas tablas?")
// arraysai.Ask("Cuales son la persona con mas años y la que menos años tiene de ambas tablas?")
// arraysai.Ask("Que propiedades tienen en comun la primera y la segunda tabla?") -- no funciona

// ¿Cuál es el promedio de edad de los empleados en un conjunto de datos?
// arraysai.Ask("Cual es la edad promedio en cada arreglo???")

// ¿Cuántos registros hay en una tabla o dataframe? ✔
// arraysai.Ask("Cuantos registros tiene cada tabla?")
// arraysai.Ask("Cuantos registros hay en total?")

// ¿Cuál es el máximo valor de una columna numérica en un conjunto de datos?✔
// arraysai.Ask("Cual es la edad mayor en cada tabla?")
arraysai.Ask("Cual es la edad mayor en todos los datos??")

// ¿Cuál es la suma total de una columna numérica en un conjunto de datos?✔
// arraysai.Ask("Cual es la suma de las edades para la primer tabla?")
// arraysai.Ask("Cual es la suma de edades en cada arreglo por separado?")

// ¿Cuántos registros cumplen cierta condición en una tabla o dataframe?✔
//arraysai.Ask("Cauntos registros tienen una edad nulla?")
//  arraysai.Ask("Cauntos registros tienen una edad nulla en el segundo arreglo???")


// ¿Cuál es la distribución de frecuencia de una columna categórica en un conjunto de datos?


// ¿Cuál es el porcentaje de registros que cumplen una condición específica en una tabla o dataframe?✔
//  arraysai.Ask("que porcentaje de personas son mayores de edad?")
// arraysai.Ask("que porcentaje de personas son mayores de edad en cada arreglo por separado??")

// ¿Cuáles son los valores únicos en una columna categórica en un conjunto de datos? ❌
// arraysai.Ask("Que ciudades no se repiten mas de una vez en cada arreglo?")

// ¿Cuál es el total agrupado por una columna en una tabla o dataframe?✔
// arraysai.Ask("Cual es la suma de todas las edades?")
// arraysai.Ask("Cual es la suma de todas las edades en el primer arreglo?")

// ¿Cuál es el valor mínimo y máximo de una columna en un conjunto de datos?✔
// arraysai.Ask("Cual es el valor minimo y maximo de edades en todos los datos??")
// arraysai.Ask("Cual es el valor minimo y maximo de edades en el ultimo arreglo??")

// arraysai.Ask("Cual es la media la mediana y la moda de edad de todos los datos?")


// arraysai.Ask("Haz una grafica de barras de las edades del primer arreglo usando chart.js") -- Review 
// arraysai.Ask("Cuantas veces se repite Ixtlan en las ciudades del ultimo arreglo??")
// arraysai.Ask("Cual es el animal mas grande del mundoi?")
.then(answer => 
  {
      // let collections = arraysai.GetData();
      // console.log(answer);
      // coderesult = answer;
      // eval(answer)
      // eval("(function() { "+ coderesult +" })()");
    }
  );

