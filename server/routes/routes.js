const express = require('express');
const router = express.Router();


module.exports=function(app,db){
    router.get('/notes',(req,res)=>{
        res.send('hello');
    });

};