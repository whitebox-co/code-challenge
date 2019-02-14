const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
const request = require('request');
const jsonUrl = "https://next.json-generator.com/api/json/get/EkzBIUWNL";



app.use(express.static('public'))

// get many endpoint
app.get('/getMany',(req,res)=>{
    try{
	request.get(jsonUrl).pipe(res);
    }
    catch(err){
	res.json({"Error":err});
    }
});

// get single endpoint
app.get('/getSingle/:id',(req,res)=>{
    let id = req.params.id;
    let params = {
	url:jsonUrl,
	json:true
    }
    request(params,(err,response,body)=>{
	if(err || response.statusCode !== 200){
	    res.json({"Error":err});
	}
	else{
	    res.send(body[id]);
	}
    });
});

app.listen(port,()=>console.log('app listening on ' + port));
