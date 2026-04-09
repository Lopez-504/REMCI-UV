import { createRoot} from 'react-dom/client'
import { useState } from 'react';


const myelement = (
<table>
  <tr>
    <th> Name </th>
  </tr>
  <tr>
    <td>Alvy Singer </td>
  </tr>
  <tr>
    <td>Annie Hall</td>
  </tr>
</table>  

);

//Classes

class Car {
  constructor(name) {
  this.brand = name;
  }
  
  //method
  present() {
    return 'I have a ' + this.brand;
  }
}

const mycar = new Car("Lambo");

const carelement = (
mycar.present() 
)

// Class inheritance

class Model extends Car {
  constructor(name, mod) {
    super(name);		//refers to the parent class
    this.model = mod;
  }
  //method
  show() {
    return this.present() + ", it's a " + this.model
  }
}

const mycar2 = new Model('Ford', "Mustang");

const carelement2 = (
  mycar2.show()
)

/*
//Arrow functions
hello = () => {
  return "Goodbye cruel world!";
}

//Only for functions with only one statement
hello = (val) => "Hey " + val;

// And if u have only one parameter
hello = val => "Hey " + val;
*/

//Variables: var, let and const
// var has function scope
// let has block scope (e.g., only inside a loop)
// const has block scope and it defines a reference to a value 

// map() function
const numbers = [1,2,3,4];
const tripled = numbers.map(x => x * 3);

// usually used to render lists of elements
const fruitlist = ['apple', 'plum', 'banana', 'cherry'];

function MyList() {
  return (
    <ul>
      {fruitlist.map(fruit =>
        <li key={fruit}>{fruit}</li>
        )}
    </ul>    
  )
}

const fruitelement = (
  MyList()
)

// map() with arrays of objects
const users = [
  { id: 1, name: 'John', age: 30 },
  { id: 2, name: 'Jane', age: 25 },
  { id: 3, name: 'Bob', age: 35 }
];

function UserList() {
  return (
    <ul>
      {users.map(user => 
        <li key={user.id}>
          {user.name} is {user.age} years old
        </li>
      )}
    </ul>
  );
}

const userelem = (
  UserList()
)

// Parameters of map()
function App() {
  return (
    <ul>
      {fruitlist.map((fruit, index, array) => {
        return (
          <li key={fruit}>
            Name: {fruit}, Index: {index}, Array: {array}
          </li>
        );
      })}
    </ul>
  );
}

const fruitelem = (
  App()
)

// Destructuring 
const vehicles = ['mustang', 'f-150', 'expedition'];

const [car, truck, suv] = vehicles;

//Or if u only one certain elements, just leave the space

const [car2, , suv2] = vehicles;

//Better example
function dateInfo(dat) {
  const d = dat.getDate();
  const m = dat.getMonth() + 1;
  const y = dat.getFullYear();
  
  return [d, m, y];
}

const [date, month, year] = dateInfo(new Date());

// Also to get the values of an object
const person = {
  firstName: 'Alvy',
  lastName: 'Singer',
  age: 46
};

//let {firstName, lastName, age} = person;	//here order does not matter

let {lastname} = person;		//extract only one value		

//set default values in case of missing properties
let {firstName, lastName, age, country='Spain'} = person;

//destructure nested objects

const human = {
  name: 'Alvy',
  lastName: 'Singer',
  age: 46,
  car: {
    brand: 'Bugatti',
    model: 'Chiron',
  }
}

let {name, car: { brand, model }} = human;

//Using backticks
let message = `My name is ${name}, and I drive a ${brand} ${model}.`;

//Using destructuring on props
function Greeting({name, age, gender}) {
  return <h1>Hello, {name}! You are a {age} yo {gender}</h1>;
} 

//useState
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>  
  );
}

//Spread operator
const odds = [1,3,5];
const evens = [2,4,6];
const combined = [...odds, ...evens];

//in combination with destructuring
const nums = [1,2,3,4,5,6];

const [one, two, ...rest] = nums;

//now with objets
const car3 = {
  brand: 'Ford',
  model: 'Mustang',
  color: 'red'
}

const car_more = {
  type: 'car',
  year: 2021, 
  color: 'yellow'		
}

//Here the color property 'red' will be overwritten by 'yellow'
const yourcar = {...car3, ...car_more}		

//Exports and Imports
import { name2, age2 } from "./person.js";

import messageName from "./message.js";		//not rendering anything

//ternary operator (logic)
// condition ? <expression if true> : <expression if false>

//Template Strings: write strings that span multiple strings and embedded expressions
//(use backticks `)
const messagess = `hello, ${name}!
You are ${age} yo.`; 

//Multi-line string
const html = `
  <div>
    <h1>Title</h1>
    <p>Paragraph</p>
  </div>
`;

// inside the {} u can use any valid javascript expression
let price = 10;
let quantity = 5;

let total = `Total: ${price * quantity}`;

const items = ["apple", "banana", "orange"];
const list = `You have ${items.length} items:
${items.map(item => `- ${item}`).join('\n')}`;

const isAdmin = true;
const messagesss = `Status: ${isAdmin ? 'Admin' : 'User'}`;

//there's also tagged templates (quite interesting)
function highlight(strings, fname) {		//fname is what's inside the {}
  let x = fname.toUpperCase();			//strings is all the rest	
  return strings[0] + x + strings[1];
}

let namess = "John";
let text = highlight`Hello ${namess}, how are you?`;

/*
//with multiple expressions
function highlights(strings, fname1, fname2) {
  let x = fname1.toUpperCase();
  let y = fname2.toUpperCase();
  return strings[0] + x + strings[1] + y + strings[2];
}

let name1 = "John";
let name2 = "Jane";
const texts = highlights`Hello ${name1} and ${name2}, how are you?`;
*/


createRoot(document.getElementById('root')).render(
  //<h1> Hello React! </h1>
  //<p>Welcome!</p>
  //myelement
  //carelement
  //carelement2
  //fruitelement
  //userelem
  //fruitelem
  //suv2
  //lastName
  //country
  //message
  //<>
  //  <Greeting name='Annie' age={35} gender='gal'/>
  //  <Counter />
  //  <combined />
  //</>
  //combined
  //yourcar.color		//object are not printable, properties are
  //name2
  //messageName
  //messagess
  //html
  //total
  //list
  //messagesss
  //texts                //not working
  text
)

