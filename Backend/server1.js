const express= require('express');
const cors= require('cors');
const app =express();
app.use(cors());
const port=3000
const mysql = require('mysql');
app.get("/additem",(err)=>
{
    if(err)
    {
        console.log("error connecting the server");
        return;
    }
    console.log(`Successfully connected to server at port no  ${port}`)
}
)
const db = mysql.createConnection(
    {
        localhost : 3000,
        user : admin ,
        password : 123,

    }
)
