const express = require('express')
const { getAllUser, insertObject, getAllCourse, deleteCourse } = require('./databaseHandler')
const router = express.Router()

router.get('/', async (req,res)=>{
    const allUser = await getAllUser();
    res.render('trainerIndex',{data:allUser})
})

router.get('/takeMark',(req,res)=>{
    res.render('takeMark')
})

router.get('/addCourse',(req,res)=>{
    res.render('addCourse')
})

router.post('/addCourse', async (req,res)=>{
    const id = req.body.txtId
    const name = req.body.txtCourseName
    const mount = req.body.txtMount
    const ObjectToInsert = {
        courseId: id,
        courseName: name,
        mount: mount
    }
    insertObject('Courses',ObjectToInsert)
    const allcourse = await getAllCourse();
    res.render('course',{courseinfo:allcourse})
})

router.get('/course',async (req,res)=>{
    const allcourse = await getAllCourse();
    res.render('course',{courseinfo:allcourse})
})

router.get('/deleteCourse',async (req,res)=>{
    const idInput = req.query.id;
    await deleteCourse(idInput)
    res.redirect('/trainer/course')
})

module.exports = router;