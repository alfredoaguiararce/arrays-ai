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


let collection_1 = [
  { name: 'Juan', age: 100, city: 'Madrid', birthday: '1996-10-17' },
  { name: 'Ana', age: 15, city: 'Barcelona', birthday: '1999-10-17' },
  { name: 'Ana', age: -1000, city: 'Barcelona', birthday: '1999-10-17' },
  { name: 'Pedro', age: null, city: 'Seville', birthday: null },
  { name: 'Pedro', age: 19, city: 'Seville', birthday: '2022-10-17' },
  { name: 'Pedro', age: null, city: 'Seville', birthday: '2023-10-17' },
  { name: 'Pedro', age: 19, city: 'Tepic', birthday: '2023-10-17' },
];

let collection_2 = [
  { name: 'Maria', age: 19, city: 'Madrid', birthday: '1990-01-15' },
  { name: 'Carlos', age: 19, city: 'Barcelona', birthday: '1985-09-22' },
  { name: 'Laura', age: 19, city: 'Seville', birthday: '1978-06-10' },
  { name: 'Andres', age: 19, city: 'Valencia', birthday: '2003-12-05' },
  { name: 'Sofia', age: 19, city: 'Bilbao', birthday: '1992-07-20' },
  { name: 'Luis', age: 19, city: 'Madrid', birthday: '1984-03-18' },
  { name: 'Marta', age: 19, city: 'Ixtlan', birthday: '1999-11-28' }
];


// Set the arrays to be used in the questions
let arrays = [collection_1, collection_2];
arraysai.SetData(arrays);
// Language used in the verbose answers
arraysai.SetLanguage(Languages.ENGLISH);

// Working functions ✔
// arraysai.Ask("Show the values that are most repeated in age with the number of times they occur from least to greatest among users", true)
// arraysai.Ask("Merge both tables and assign them a unique numerical identifier called 'Id' to each row based on its position in the final table")
// arraysai.Ask("How many Pedros are there in all the data?")
// arraysai.Ask("Who is the oldest person from both tables?")
// arraysai.Ask("Who is the oldest and youngest person from both tables?")
// arraysai.Ask("How many elements are there in each array individually?")
// arraysai.Ask("What is the average age in each array??")

// Data questions
// How many records are there in a table or dataframe? ✔
// arraysai.Ask("How many records does each table have separately?")
// arraysai.Ask("How many total records are there?")

// What is the maximum value of a numeric column in a dataset? ✔
// arraysai.Ask("What is the highest age in each table?")
// arraysai.Ask("What is the highest age among all the data??")

// What is the total sum of a numeric column in a dataset? ✔
// arraysai.Ask("What is the sum of ages for the first table?")
// arraysai.Ask("What is the sum of ages in each array separately?")

// How many records meet a certain condition in a table or dataframe? ✔
// arraysai.Ask("How many records have a null age?")
arraysai.Ask("How many records have a null age in the second array???")
.then(answer => 
  {
      console.log(answer);
    }
  );
// What is the percentage of records that meet a specific condition in a table or dataframe? ✔
// arraysai.Ask("What percentage of people are adults?", true)
// arraysai.Ask("What percentage of people are over 18 years old in each array separately??", true)

// What is the total grouped by a column in a table or dataframe? ✔
// arraysai.Ask("What is the sum of all ages?")
// arraysai.Ask("What is the sum of all ages in the first array?")

// arraysai.Ask("What is the mean, median, and mode of age for all the data?")

// arraysai.Ask("What are the names of people who are 19 years old sorted in alphabetical order???")
arraysai.Ask("Show only the people who were born after 1990")
.then(answer => 
  {
      console.log(answer);
    }
  );

// What is the minimum and maximum value of a column in a dataset? ✔
// arraysai.Ask("What is the minimum and maximum age value in all the data??")

arraysai.Ask(  "What is the minimum and maximum age values in the last array?", true)
.then(answer => 
  {
      console.log(answer);
    }
  );

