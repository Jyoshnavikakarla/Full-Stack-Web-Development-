const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');


const app = express();
app.use(cors());
app.use(express.json()); // ✅ Essential to parse JSON


const db = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: '123456',
    database: 'admin'
});


const port = 3000;


db.connect((err) => {
  if (err) {
    console.log("Error in connecting the database:", err.message);
    return;
  }
  console.log("Database connected successfully");
});


app.listen(port, (err) => {
  if (err) {
    console.log("Error occurred");
    return;
  }
  console.log(`Successfully connected to ${port}`);
});


app.get('/additems', (req, res) => {
  res.send("I will add data");
});


app.post('/additems', (req, res) => {
  const { inputValue } = req.body; // ✅ Now this will work


  if (!inputValue || inputValue.trim() === '') {
    return res.status(400).json({ message: "Task cannot be empty" });
  }


  const sql = "INSERT INTO todoItems (itemDescription) VALUES (?)";
  db.query(sql, [inputValue], (err, result) => { // ✅ result was missing in parameters
    if (err) {
      console.log("Error in saving the data", err.message);
      return res.status(500).json({ message: "Database insertion failed" });
    }


    console.log("Item inserted successfully");
    res.status(200).json({ message: "Item added successfully", id: result.insertId });
  });
});




















