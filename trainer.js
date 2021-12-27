const { ObjectID } = require('bson')
const express = require('express')
const async = require('hbs/lib/async')
const {
    getPassFailTrainee,
    ObjectId,
    insertObject,
    getAllCourse,
    getGradeByUserId,
    deleteCourse,
    getCourseById,
    updateCourse,
    getUserByUserId,
    getTraineeandCourseId,
    updateGrade,
    getDB
} = require('./databaseHandler')
const router = express.Router()

router.use(express.static('public'))

router.get('/', async (req, res) => {
    const trainer = req.session["User"];
    res.render('trainerIndex', {
        dataInfo: trainer
    })
})

router.get('/addCourse', async (req, res) => {
    const trainer = req.session["User"];
    res.render('addCourse', {
        dataInfo: trainer
    })
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
    res.redirect('/trainer/course')
})

router.get('/course', async (req, res) => {
    const courses = await getAllCourse();
    const trainer = req.session["User"];
    res.render('course', {
        course: courses,
        dataInfo: trainer
    })
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
    res.render('editC', {
        course: findcourse,
        dataInfo: trainer
    })
})

router.post('/updateCourse', async (req, res) => {
    const id = req.body.id;
    const cid = req.body.txtId;
    const name = req.body.txtCourseName;
    const time = req.body.txtTime;
    const mounts = req.body.txtMount;
    await updateCourse(id, cid, name, time, mounts)
    const trainer = req.session["User"];
    res.redirect('/trainer/course',{dataInfo: trainer})
})

router.get('/traineecourse', async (req, res) => {
    const cid = req.query.courseId;
    const trainee = await getTraineeandCourseId(cid);
    const trainer = req.session["User"];
    res.render('traineecourse', {
        data: trainee,
        dataInfo: trainer,
        courses: cid
    })
})

router.get('/traineeDetail', async (req, res) => {
    const trainer = req.session["User"];
    const userid = req.query.userId;
    const courseid = req.query.courseId;
    const trainee = await getUserByUserId(userid)
    const trainees = await getGradeByUserId(userid, courseid);
    // console.log(trainee)
    res.render('traineeDetail', {
        data: trainee,
        dataInfo: trainer,
        datas: trainees
    })
})

router.get('/takeMark', async (req, res) => {
    const idInput = req.query.id;
    const db = await getDB();
    const trainee = await db.collection("TraineeCourse").findOne({ "_id": ObjectId(idInput) })
    console.log(trainee)
    const trainer = req.session["User"];
        res.render('takeMark', {
            data: trainee,
            dataInfo: trainer
        })
})

router.post('/updateMark', async (req, res) => {
    const traineeid = req.body.id

    const grade = req.body.txtGrade
    await updateGrade(traineeid, grade)
    res.redirect('/trainer/course')
})

router.post('/searchmark', async (req, res) => {
    const course = req.body.courseId;
    const grade = req.body.txtGrade;
    console.log(course)
    console.log(grade)
    const result = await getPassFailTrainee(course, grade);
    const trainer = req.session["User"];
    res.render('traineecourse', { data: result, dataInfo: trainer })
})

router.get('/about',(req,res)=>{
    const trainer = req.session["User"]
    res.render('about',{dataInfo:trainer})
})
module.exports = router;