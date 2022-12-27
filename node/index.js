const express = require('express')
const mysql = require('mysql')
const randomName = require('node-random-name')

const app = express()
const port = 3000

const name = randomName()

let people = '<ul>'

const connection = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'fullcycle'
})

connection.connect()
connection.query('CREATE TABLE IF NOT EXISTS people(id INT NOT NULL AUTO_INCREMENT,name VARCHAR(255), PRIMARY KEY(id))');
connection.query(`INSERT INTO people(name) VALUES('${name}')`)
connection.query('SELECT * FROM people',(error,results) => {
    if(error) throw error
    people = results.reduce((prev,curr)=>{
        return `${prev}<li>${curr.id}: ${curr.name}</li>`
    },people)
})
connection.end()
people += '</ul>'
app.get('/', (req, res) => {
    res.send(`<h1>Full Cycle Rocks!</h1>${people}`)
})

app.listen(port,() => {
    console.log(`Runing on port ${port}`)
})