const { ObjectID } = require('bson')
const express = require('express')
const async = require('hbs/lib/async')
const { insertObject, ObjectId, searchCourse, deleteCourse, updateCourse, getAllTrainer, getAllTrainee, getAllCourse, getDB, getCourseById, getTraineeandCourseId, getTrainerandCourseId, removeTrainerfromCourse } = require('./databaseHandler')
const router = express.Router()
const { requireStaff } = require('./projectLibrary')
router.use(express.static('public'))

router.get('/', async (req, res) => {
    const allCourse = await getAllCourse();
    res.render('staffIndex', { data: allCourse })
})
router.get('/addCourseS', (req, res) => {
    res.render('addCourseS')
})
router.post('/addCourseS', async (req, res) => {
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
    res.redirect('/staff/staffcourse')
})
router.get('/staffcourse', async (req, res) => {
    const courses = await getAllCourse();
    const staff = req.session["User"];
    res.render('staffcourse', {
        course: courses,
        dataInfo: staff
    })
})
router.get('/deleteCourse', async (req, res) => {
    const idInput = req.query.id;
    await deleteCourse(idInput)
    res.redirect('/staff/staffcourse')
})

router.get('/editCourse', async (req, res) => {
    const idInput = req.query.id;
    const findcourse = await getCourseById(idInput)
    const staff = req.session["User"];
    res.render('editstaffcourse', {
        course: findcourse,
        dataInfo: staff
    })
})

router.post('/updateCourse', async (req, res) => {
    const id = req.body.id;
    const cid = req.body.txtId;
    const name = req.body.txtCourseName;
    const start = req.body.txtTimeStart;
    const end = req.body.txtTimeEnd;
    const mounts = req.body.txtMount;
    await updateCourse(id, cid, name, start, end, mounts)
    const staff = req.session["User"];
    res.redirect('/staff/staffcourse')
})
router.get('/staffProfile', async (req, res) => {
    const staff = req.session["User"]
    res.render('staffProfile', { dataInfo: staff })
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
router.post('/searchCourse', async (req, res) => {
    const searchInput = req.body.txtSearch;
    const Course = await searchCourse(searchInput);
    res.render('staffCourse', { data: Course })
})
router.get('/assignTraineeCourse',requireStaff, async (req, res) => {
    const cid = req.query.courseId
    const user = req.session["User"]
    res.render('assignTraineeCourse', { dataInfo: user, datas: cid })
})

router.post('/assignTraineeCourse',requireStaff, async (req, res) => {
    const traineeid = req.body.txtTraineeId
    const grade = req.body.txtGrade
    const role = req.body.txtRole
    const courseid = req.body.courseId
    const dbo = await getDB();
    const name = await dbo.collection("Users").findOne({ "userId": traineeid });
    const trainee_course = {
        userId: traineeid,
        grade: grade,
        name: name.fullName,
        gender: name.gender,
        role: role,
        courseId: courseid
    }
    await insertObject("TraineeCourse", trainee_course)

    const trainee = await getTraineeandCourseId(courseid);
    const trainer = req.session["User"];
    res.render('staffTraineeCourse', {
        data: trainee,
        dataInfo: trainer,
        courses: courseid
    })
})
router.post('/assignTrainerCourse',requireStaff, async (req, res) => {
    const trainerid = req.body.txtTrainerId
    const role = req.body.txtRole
    const courseid = req.body.courseId
    console.log(courseid)
    const dbo = await getDB();
    const name = await dbo.collection("Users").findOne({ "userId": trainerid });
    const trainee_course = {
        userId: trainerid,
        role: role,
        name: name.fullName,
        gender: name.gender,
        courseId: courseid
    }
    await insertObject("TrainerCourse", trainee_course)

    const trainee = await getTrainerandCourseId(courseid);
    const trainer = req.session["User"];
    res.render('staffTrainerCourse', {
        data: trainee,
        dataInfo: trainer,
        courses: courseid
    })
})

router.get('/assignTrainerCourse',requireStaff, async (req, res) => {
    const course = req.query.courseId

    const user = req.session["User"]
    res.render('assignTrainerCourse', { dataInfo: user, datas: course })
})


router.get('/staffTraineeCourse',requireStaff, async (req, res) => {
    const cid = req.query.courseId;
    const trainee = await getTraineeandCourseId(cid);
    const trainer = req.session["User"];
    res.render('staffTraineeCourse', {
        data: trainee,
        dataInfo: trainer,
        courses: cid
    })
})

router.get('/staffTrainerCourse',requireStaff, async (req, res) => {
    const cid = req.query.courseId;
    const info = await getTrainerandCourseId(cid);
    const trainer = req.session["User"];
    res.render('staffTrainerCourse', {
        data: info,
        dataInfo: trainer,
        courses: cid
    })
})

router.get("/removeTrainerfromCourse",requireStaff, async (req, res) => {
    const idi = req.query.id;
    await removeTrainerfromCourse(idi);
    const cid = req.query.courseId
    const info = await getTrainerandCourseId(cid);
    const user = req.session["User"]
    // ---------------------------------
    res.render('staffTrainerCourse', {
        data: info,
        dataInfo: user,
        courses: cid
    })
})

module.exports = router;