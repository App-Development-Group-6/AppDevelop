const express = require('express')
const { insertObject, getAllTrainer,getAllTrainee, getAllCourse, getDB } = require('./databaseHandler')
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
    const id = req.body.txtId
    const name = req.body.txtCourseName
    const time = req.body.txtTime;
    const mount = req.body.txtMount
    const ObjectToInsert = {
        courseId: id,
        courseName: name,
        time: time,
        mount: mount
    }
    insertObject('Courses', ObjectToInsert)
    const courses = await getAllCourse();
    res.render('course', { course: courses })
})
router.post('/searchCourse',async(req,res)=>{
    const searchInput = req.body.txtSearch;
    const dbo = await getDB()
    const allCourse = await dbo.collection("courses").find({ name: searchInput }).toArray();

    res.render('index', { data: allCourse })
})
router.post('/viewTrainer', async(req,res)=>{

})
router.post('/editTrainer', async(req,res)=>{
    
})
router.post('/updateTrainer', async (req, res) => {
})
router.get('/deleteTrainer', async(req,res)=>{
    const trainerID = req.query.trainerID;
    await deleteTrainer(id);
    res.redirect("/");
})
module.exports = router;