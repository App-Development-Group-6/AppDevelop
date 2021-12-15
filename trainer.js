const express = require('express')
const async = require('hbs/lib/async')
const { getDB, insertObject, getAllCourse, deleteCourse, getCourseById, updateCourse, getUserByUserId, getTraineeandCourseId } = require('./databaseHandler')
const router = express.Router()

router.use(express.static('public'))

router.get('/', async (req, res) => {
    const trainer = req.session["User"];
    res.render('trainerIndex', { dataInfo: trainer })
})

router.get('/takeMark', (req, res) => {
    res.render('takeMark')
})

router.get('/addCourse', async (req, res) => {
    const trainer = req.session["User"];
    res.render('addCourse', { dataInfo: trainer })
})

router.post('/addCourse', async (req, res) => {
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

router.get('/course', async (req, res) => {
    const courses = await getAllCourse();
    const trainer = req.session["User"];
    res.render('course', { course: courses, dataInfo: trainer })
})

router.get('/deleteCourse', async (req, res) => {
    const idInput = req.query.id;
    await deleteCourse(idInput)
    res.redirect('/trainer/course')
})

router.get('/editCourse', async (req, res) => {
    const idInput = req.query.id;
    const findcourse = await getCourseById(idInput)
    const trainer = req.session["User"];
    res.render('editC', { course: findcourse, dataInfo: trainer })
})

router.post('/updateCourse', async (req, res) => {
    const id = req.body.id;
    const cid = req.body.txtId;
    const name = req.body.txtCourseName;
    const time = req.body.txtTime;
    const mounts = req.body.txtMount;
    await updateCourse(id, cid, name,time, mounts)
    res.redirect('/trainer/course')
})

router.get('/traineecourse', async (req,res)=>{
    const idInput = req.query.id;
    const course = await getCourseById(idInput)
    const cid = req.query.courseId;
    console.log(cid)
    const trainee = await getTraineeandCourseId(cid);
    console.log(trainee)
    const trainer = req.session["User"];
    res.render('traineecourse',{data:trainee, dataInfo: trainer, course: course})
})

router.get('/traineeDetail',async (req,res)=>{
    const trainer = req.session["User"];
    const userid = req.query.userId;
    const trainee = await getUserByUserId(userid)
    res.render('traineeDetail', {data:trainee, dataInfo: trainer})
})

router.get('/takeMark', async(req,res)=>{
    const trainer = req.session["User"];
    const userId = req.query.userId;
    const user = await getUserByUserId(userId);
    res.render('takeMark', { dataInfo: trainer, data:user })
})

router.post('/takeMark', async (req,res)=>{

    const userId = req.body.txtUserId
    const grade = req.body.txtGrade
    const ObjectToInsert = {
        userId: userId,
        grade : grade
    }
    await insertObject("Grade", ObjectToInsert)
    const trainer = req.session["User"];
    res.render('takeMark',{ dataInfo: trainer })

})
module.exports = router;