import * as dotenv from "dotenv";
dotenv.config({ path: './.env' });
import { ArraysAi, Languages, Configuration } from '../dist/index';

// Get the OPEN AI API KEY from the .env file
dotenv.config();
let APIKEY = process.env.OPENAI_API_KEY;
if(APIKEY == undefined) throw new Error("APIKEY not found in .env file");

// Configure with the OPEN AI API KEY
let config : Configuration = new Configuration({
  apiKey: APIKEY
});

const arraysai : ArraysAi<any> = new ArraysAi();
arraysai.Configure(config);


// Users array
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Alice' },
  { id: 3, name: 'Bob' }
];

// Purchases array
const purchases = [
  { userId: 1, product: 'Phone' },
  { userId: 2, product: 'Laptop' },
  { userId: 1, product: 'Headphones' }
];

// Set the arrays to be used in the questions
let arrays = [users, purchases];
arraysai.SetData(arrays);
// Language used in the verbose answers
arraysai.SetLanguage(Languages.ENGLISH);

// Ask 
// arraysai.Ask("What is the customer's name and what are the customer's purchases with the ID '1' based on both arrays?")
// .then(answer => 
//     {
//       console.log(answer);
//     });

// //Ask
// arraysai.Ask("How many users are there in the 'users' array?")
// .then(answer => {
//   console.log(answer);
// });

//Ask
// arraysai.Ask("Which user purchased the 'Laptop'?", true)
// .then(answer => {
//   console.log(answer);
// });

arraysai.Ask("What's is user with id 2?", true)
.then(answer => {
  console.log(answer);
});