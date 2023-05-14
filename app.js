const express =require('express');
const bodyParser=require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(express.static("frontend"));

let persons = [
    { id: 1,
       name: 'mahdy',
       age: 44,
       gender: 'male',
       email: 'mm@example.com' },
       
  
  ]
  
  app.get('/persons', (req, res) => {
    res.json(persons)
  })
  
  app.post('/persons', (req, res) => {
    const person = req.body
    person.id = persons.length + 1
    persons.push(person)
    res.json(person)
  })
  
  
  app.get('/persons/:id', (req, res) => {

    const id = parseInt(req.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
      res.json(person)
    } else {
      res.status(404).send('Person not found')
    }

  })
  
  app.put('/persons/:id', (req, res) => {

    const id = parseInt(req.params.id)
    const personIndex = persons.findIndex(p => p.id === id)
    if (personIndex !== -1) {
      const person = req.body
      person.id = id
      persons[personIndex] = person
      res.json(person)
    } else {
      res.status(404).send('Person not found')
    }
  })
  
  app.delete('/persons/:id', (req, res) => {

    const id = parseInt(req.params.id)
    const personIndex = persons.findIndex(p => p.id === id)
    if (personIndex !== -1) {
      persons.splice(personIndex, 1)
      res.sendStatus(204)
    } else {
      res.status(404).send('Person not found')
    }
  })
  app.listen(5000, () => {

    console.log('Server running on port 5000')

  })