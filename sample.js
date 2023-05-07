"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
dotenv.config({ path: './.env' });
var index_1 = require("./dist/index");
dotenv.config();
(0, index_1.ConfigureKey)(process.env.OPENAI_API_KEY);
var array = [
    { nombre: 'Juan', edad: 25, ciudad: 'Madrid', cumpleaños: '1996-10-17' },
    { nombre: 'Ana', edad: 15, ciudad: 'Barcelona', cumpleaños: '1999-10-17' },
    { nombre: 'Pedro', edad: 18, ciudad: 'Sevilla', cumpleaños: '2000-10-17' },
    { nombre: 'Pedro', edad: 18, ciudad: 'Sevilla', cumpleaños: '2022-10-17' },
    { nombre: 'Pedro', edad: 18, ciudad: 'Sevilla', cumpleaños: '2023-10-17' },
];
console.log("----");
(0, index_1.GetQuery)(array, "aEncuentra a las personas mayores de 20 años ")
    .then(function (array) {
    console.log("🚀 ~ file: sample.ts ~ array:", array);
});
