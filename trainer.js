const express = require('express')
const { getAllUser } = require('./databaseHandler')
const router = express.Router()

router.get('/', async (req,res)=>{
    const allUser = await getAllUser();
    res.render('trainerIndex',{data:allUser})
})

router.get('/takeMark',(req,res)=>{
    res.render('takeMark')
})

module.exports = router;