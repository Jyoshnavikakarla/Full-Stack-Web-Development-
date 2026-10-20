const express = require('express');
const cors= require('cors');
const app=express();
app.use(cors());
const port= 3001
app.listen(port,(err) =>
    {
        if(err)
            {
                console.log('Error connecting');
                return;
            }
    console.log(`the server is running at port ${port}`)
}
)
app.get('/',(req,res)=>
{
    res.send("the server is running in get method");  
});
app.post('/',(req,res)=>
{
    res.send("the server is running in post method");  
});
app.put('/',(req,res)=>
{
    res.send("the server is running in put method");  
});

app.delete('/',(req,res)=>
{
    res.send("the server is running in delete method");  
});
