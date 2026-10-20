const express = require('express');
const app = express();
const port = 3002
app.listen(port , ()=>
{
    console.log(`Server is running at {port}`)
})
app.get('/saybye', (req, res) => {
  res.send('Hello World!byee.byee...');
})