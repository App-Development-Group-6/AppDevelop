const express = require('express')
const async = require('hbs/lib/async')
const { insertObject, getAllTrainer, getAllTrainee, getAllCourse, getDB, getTraineeandCourseId, getTrainerandCourseId, removeTrainerfromCourse } = require('./databaseHandler')
const router = express.Router()
router.use(express.static('public'))

router.get('/', async (req, res) => {
    const allCourse = await getAllCourse();
    res.render('staffIndex', { data: allCourse })
})
router.get('/addTrainer', (req, res) => {
    res.render('addTrainer')
})
router.post('/addTrainer', async (req, res) => {
    const name = req.body.txtName
    const age = req.body.txtAge
    const objectToInsert = {
        trainerName: name,
        age: age,
    }
    insertObject("Trainers", objectToInsert)
    const allTrainer = await getAllTrainer();
    res.render('Trainers', { data: allTrainer })

})
router.get('/addTrainee', (req, res) => {
    res.render('addTrainee')
})

router.post('/addTrainee', async (req, res) => {
    const name = req.body.txtName
    const age = req.body.txtAge
    const objectToInsert = {
        traineeName: name,
        ages: age,
    }
    insertObject("Trainees", objectToInsert)
    const allTrainee = await getAllTrainee();
    res.render('Trainees', { data: allTrainee })

})
router.get('/addCourse', (req, res) => {
    res.render('addCourse')
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
    res.render('staffcourse', { course: courses })
})
router.get('/staffcourse', async (req, res) => {
    const courses = await getAllCourse();
    const staff = req.session["User"];
    res.render('staffcourse', {
        course: courses,
        dataInfo: staff
    })
})
router.post('/searchCourse', async (req, res) => {
    const searchInput = req.body.txtSearch;
    const dbo = await getDB()
    const allCourse = await dbo.collection("courses").find({ name: searchInput }).toArray();

    res.render('index', { data: allCourse })
})
router.post('/viewTrainer', async (req, res) => {

})
router.post('/editTrainer', async (req, res) => {

})
router.post('/updateTrainer', async (req, res) => {
})
router.get('/deleteTrainer', async (req, res) => {
    const trainerID = req.query.trainerID;
    await deleteTrainer(id);
    res.redirect("/");
})

router.get('/assignTraineeCourse', async (req, res) => {
    const user = req.session["User"]
    res.render('assignTraineeCourse', { dataInfo: user })
})

router.post('/assignTraineeCourse', async (req, res) => {
    const traineeid = req.body.txtTraineeId
    const grade = req.body.txtGrade
    const role = req.body.txtRole
    const courseid = req.body.txtCourseId
    const trainee_course = {
        userId: traineeid,
        grade: grade,
        role:role,
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

router.get('/assignTrainerCourse', async (req, res) => {
    const user = req.session["User"]
    res.render('assignTrainerCourse', { dataInfo: user })
})

router.post('/assignTrainerCourse', async (req, res) => {
    const trainerid = req.body.txtTraineeId
    const role = req.body.txtRole
    const courseid = req.body.txtCourseId
    const trainee_course = {
        userId: trainerid,
        role:role,
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
router.get("/removeTrainerfromCourse", async (req,res)=>{
    const idi = req.query.id;
    console.log(idi)
    await removeTrainerfromCourse(idi);
    res.redirect('/staff/staffcourse')
})
router.get('/staffTraineeCourse', async (req, res) => {
    const cid = req.query.courseId;
    const trainee = await getTraineeandCourseId(cid);
    const trainer = req.session["User"];
    res.render('staffTraineeCourse', {
        data: trainee,
        dataInfo: trainer,
        courses: cid
    })
})

router.get('/staffTrainerCourse', async (req, res) => {
    const cid = req.query.courseId;
    const info = await getTrainerandCourseId(cid);
    const trainer = req.session["User"];
    res.render('staffTrainerCourse', {
        data: info,
        dataInfo: trainer,
        courses: cid
    })
})

module.exports = router;