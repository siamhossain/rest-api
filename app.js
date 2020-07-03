const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql');

 
const app = express();

app.use(bodyParser.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2693",
  database: "helping_hands"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
 
app.get('/users', (req, res) => {
  con.query("SELECT * FROM users", function (err, results, fields) {
    if (err) throw err;
    return res.json({ 
      message: 'All users',
      status: 'successful',
      data: results
    });
  });
});

app.post('/users', (req, res) => {
  let { name, password, email, phone } = req.body
  let sql = `INSERT INTO users (name, password, email, phone) VALUES ('${name}', '${password}', '${email}', '${phone}')`
  con.query(sql, function(err, result){
    if (err) throw err;
    let userId = result.insertId


    con.query(`SELECT * FROM users WHERE id = ${userId}`, function (err, results, fields) {
      if (err) throw err;
      return res.json({ 
        message: 'New user created',
        status: 'successful',
        data: results[0]
      });
    });
  })
});

app.get('/users/:id', (req, res) => {
  con.query(`SELECT * FROM users WHERE id = ${req.params.id}`, function (err, results, fields) {
    if (err) throw err;
    return res.json({ 
      message: 'Single user',
      status: 'successful',
      data: results[0]
    });
  });
});
 
app.put('/users/:id', (req, res) => {
  return res.send('Updated user with id ' + req.params.id);
});
 
app.delete('/users/:id', (req, res) => {
  return res.send('Deleted a user with id ' + req.params.id);
});




 
app.get('/books', (req, res) => {
  return res.send('Received all books');
});

app.post('/books', (req, res) => {
  return res.send('Created a new book');
});

app.get('/books/:id', (req, res) => {
  return res.send('Received a single book with id ' + req.params.id);
});
 
app.put('/books/:id', (req, res) => {
  return res.send('Updated book with id ' + req.params.id);
});
 
app.delete('/books/:id', (req, res) => {
  return res.send('Deleted a book with id ' + req.params.id);
});


 
app.listen(8080, () =>
  console.log(`Example app listening on port 8080!`),
);
