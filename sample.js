const { GetQuery, ConfigureKey } = require('../arrays-ai/index');
require('dotenv').config();
ConfigureKey(process.env.OPENAI_API_KEY);

let array = [
    { nombre: 'Juan', edad: 25, ciudad: 'Madrid' , cumpleaños: '1996-10-17'},
    { nombre: 'Ana', edad: 15, ciudad: 'Barcelona', cumpleaños: '1999-10-17'},
    { nombre: 'Pedro', edad: 18, ciudad: 'Sevilla', cumpleaños: '2000-10-17'},
    { nombre: 'Pedro', edad: 18, ciudad: 'Sevilla', cumpleaños: '2022-10-17'},
    { nombre: 'Pedro', edad: 18, ciudad: 'Sevilla', cumpleaños: '2023-10-17'},
  ];
  
  //array = array.filter(item => item.edad > 20 && item.nombre.startsWith('A'));

  console.log("----");
  GetQuery(array, "agrega una persona llmada alfredo junto con todas las demas personas ")
  .then(array => {
  console.log("🚀 ~ file: sample.js:17 ~ array:", array)
});