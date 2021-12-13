const express = require('express')
const async = require('hbs/lib/async')
const { insertObject, getAllCourse, deleteCourse, getCourseById, updateCourse, userInfo } = require('./databaseHandler')
const router = express.Router()


router.get('/', async (req,res)=>{
    const trainer = await userInfo();
    console.log("Test trainer")
    console.log(trainer)
    res.render('trainerIndex',{userInfo:trainer})
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

router.get('/editCourse', async(req,res)=>{
    const idInput = req.query.id;
    const findcourse = await getCourseById(idInput)
    res.render('editC',{course:findcourse})
})

router.post('/updateCourse', async (req,res)=>{
    const id = req.body.id;
    const cid = req.body.txtId;
    const name = req.body.txtCourseName;
    const mounts = req.body.txtMount;
    await updateCourse(id, cid, name, mounts)
    res.redirect('/trainer/course')
})


module.exports = router;