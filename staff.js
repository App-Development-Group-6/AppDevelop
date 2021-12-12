const express = require('express')
const { insertObject, getAllTrainer,getAllTrainee, getAllCourse } = require('./databaseHandler')
const router = express.Router()

router.get('/', async (req,res)=>{
    const allCourse = await getAllCourse();
    res.render('staffIndex',{data:allCourse})
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
    res.render('Trainers',{data:allTrainer})

})
router.get('/addTrainee',(req,res)=>{
    res.render('addTrainee')
})

router.post('/addTrainee',async (req,res)=>{
    const name = req.body.txtName
    const age = req.body.txtAge
    const objectToInsert = {
        traineeName: name,
        ages: age,
    }
    insertObject("Trainees", objectToInsert)
    const allTrainee = await getAllTrainee();
    res.render('Trainees',{data:allTrainee})

})


router.get('/addCourse',(req,res)=>{
    res.render('addCourse')
})
router.post('/addCourse',async (req,res)=>{
    const name = req.body.txtName
    const time = req.body.txtTime
    const objectToInsert = {
        courseName: name,
        time: time,
    }
    insertObject("Courses", objectToInsert)
    const allCourse = await getAllCourse();
    res.render('staffIndex',{data:allCourse})

})
router.post('/searchCourse',async(req,res)=>{
    const nameInput = req.body.txtName;
})
module.exports = router;