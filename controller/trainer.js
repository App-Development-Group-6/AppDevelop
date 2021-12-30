const { ObjectID } = require('bson')
const express = require('express')
const async = require('hbs/lib/async')
const { requireTrainer, requiresLogin } = require('../projectLibrary')
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
} = require('../model/databaseHandler')
const router = express.Router()

router.use(express.static('public'))

router.get('/', requiresLogin, async (req, res) => {
    const trainer = req.session["User"];
    res.render('trainerIndex', {
        dataInfo: trainer
    })
})

router.get('/addCourse',requiresLogin, requireTrainer, async (req, res) => {
    const trainer = req.session["User"];
    res.render('addCourse', {
        dataInfo: trainer
    })
})

router.post('/addCourse',requiresLogin, requireTrainer, async (req, res) => {
    const id = req.body.txtId
    const name = req.body.txtCourseName
    const start = req.body.txtTimeStart
    const end = req.body.txtTimeEnd
    const mount = req.body.txtMount
    const ObjectToInsert = {
        courseId: id,
        courseName: name,
        start: start,
        end: end,
        mount: mount
    }
    insertObject('Courses', ObjectToInsert)
    res.redirect('/trainer/course')
})

router.get('/course',requiresLogin, async (req, res) => {
    const courses = await getAllCourse();
    const trainer = req.session["User"];
    res.render('course', {
        course: courses,
        dataInfo: trainer
    })
})

router.get('/deleteCourse',requiresLogin, requireTrainer, async (req, res) => {
    const idInput = req.query.id;
    await deleteCourse(idInput)
    res.redirect('/trainer/course')
})

router.get('/editCourse',requiresLogin, requireTrainer, async (req, res) => {
    const idInput = req.query.id;
    const findcourse = await getCourseById(idInput)
    const trainer = req.session["User"];
    res.render('editC', {
        course: findcourse,
        dataInfo: trainer
    })
})

router.post('/updateCourse',requiresLogin, requireTrainer, async (req, res) => {
    const id = req.body.id;
    const cid = req.body.txtId;
    const name = req.body.txtCourseName;
    const start = req.body.txtTimeStart;
    const end = req.body.txtTimeEnd;
    const mounts = req.body.txtMount;
    await updateCourse(id, cid, name, start, end, mounts)
    res.redirect('/trainer/course')
})

router.get('/traineecourse',requiresLogin, requireTrainer, async (req, res) => {
    const cid = req.query.courseId;
    const trainee = await getTraineeandCourseId(cid);
    const trainer = req.session["User"];
    res.render('traineecourse', {
        data: trainee,
        dataInfo: trainer,
        courses: cid
    })
})

router.get('/traineeDetail',requiresLogin, requireTrainer, async (req, res) => {
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

router.get('/takeMark',requiresLogin, requireTrainer, async (req, res) => {
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

router.post('/updateMark',requiresLogin, requireTrainer, async (req, res) => {
    const traineeid = req.body.id
    const grade = req.body.txtGrade
    const cid = req.body.courseId
    await updateGrade(traineeid, grade)
    
    const trainee = await getTraineeandCourseId(cid);
    const trainer = req.session["User"];
    res.render('traineecourse', {
        data: trainee,
        dataInfo: trainer,
        courses: cid
    })
})

router.post('/searchmark',requiresLogin, requireTrainer, async (req, res) => {
    const cid = req.body.courseId;
    const grade = req.body.txtGrade;
    console.log(cid)
    console.log(grade)
    const result = await getPassFailTrainee(cid, grade);
    const trainer = req.session["User"];
    res.render('traineecourse', {
        data: result,
        dataInfo: trainer,
        courses: cid
    })
})

router.get('/about',(req,res)=>{
    const trainer = req.session["User"]
    res.render('about',{dataInfo:trainer})
})
module.exports = router;