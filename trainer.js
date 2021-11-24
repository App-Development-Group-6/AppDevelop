const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.render('trainerIndex')
})

router.get('/takeMark',(req,res)=>{
    res.render('takeMark')
})

module.exports = router;