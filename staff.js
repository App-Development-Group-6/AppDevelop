const express = require('express')
const { insertObject, getAllTrainer } = require('./databaseHandler')
const router = express.Router()

router.get('/', async (req,res)=>{
    const allTrainer = await getAllTrainer();
    res.render('staffIndex',{data:allTrainer})
})
router.get('/addTrainer',(req,res)=>{
    res.render('addTrainer')
})
router.post('/addTrainer',async (req,res)=>{
    const name = req.body.txtName
    const age = req.body.txtAge
    const objectToInsert = {
        trainerName: name,
        age: age,
    }
    insertObject("Trainers", objectToInsert)
    const allTrainer = await getAllTrainer();
    res.render('staffIndex',{data:allTrainer})

})
module.exports = router;