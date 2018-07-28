const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send('api works!');
});

router.get('/post',(req,res)=>{
    res.send('api works 2!');
});

module.exports = router;