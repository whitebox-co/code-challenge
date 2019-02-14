const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
const request = require('request');
const jsonUrl = "https://next.json-generator.com/api/json/get/EkzBIUWNL";



app.use(express.static('public'))
app.get('/getMany',(req,res)=>{
    request.get(jsonUrl).pipe(res);
});

app.listen(port,()=>console.log('app listening on ' + port));
