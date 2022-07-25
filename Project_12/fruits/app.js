const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fruitsDB', {useNewUrlParser:true});

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    min: 1,
    max: 5
  },
  review: String
});

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  fruitId: fruitSchema
});

const Fruit = mongoose.model('Fruit', fruitSchema);

const Person = mongoose.model('Person', personSchema);

// const fruit = new Fruit({
//   name: 'Apple',
//   score: 4,
//   review: 'Pretty solid'
// });

const mango = new Fruit({
  name: 'Mango',
  score: 4,
  review: 'Great'
});

mango.save();

Person.updateOne({name: 'Amy'}, {fruitId: mango}, (err) => {

});

// const person = new Person({
//   name: 'Amy',
//   age: 12,
//   fruitId: pineapple
// })

// person.save();

// const kiwi = new Fruit({
//   name: 'Kiwi',
//   score: 5,
//   raview: 'Good for marinating'
// });

// const banana = new Fruit({
//   name: 'Banana',
//   score: 5,
//   review: 'Best fruit'
// })

// const person = new Person({
//   name: 'John Doe',
//   age: 52,
// });

// fruit.save();

// person.save();

// Fruit.insertMany([kiwi, banana], (err)=> {
//   if(err)
//     console.log(err);
// });


// Fruit.updateOne({_id: '62db00f474a6cc439c7d5a0f'}, { name: 'Peach' }, (err) => {
//   if(err) {
//     console.log(err);
//   }
// });


// Fruit.deleteOne({_id: '62db00f474a6cc439c7d5a0f'}, (err) => {
//   if(err) {
//     console.log(err);
//   }
// });

// Person.deleteMany({name: 'John Doe'}, (err) => {

// });




Fruit.find((err, fruits) => {
  

  if(err) {
    console.log(err);
  } else {
    // mongoose.connection.close();
    fruits.forEach((fruit) => {
      console.log(fruit);
    })
  }
});