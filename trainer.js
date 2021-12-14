const express = require('express')
const async = require('hbs/lib/async')
const { insertObject, getAllCourse, deleteCourse, getCourseById, updateCourse, userInfo } = require('./databaseHandler')
const { requiresLogin } = require('./projectLibrary')
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
    const mount = req.body.txtMount
    const ObjectToInsert = {
        courseId: id,
        courseName: name,
        mount: mount
    }
    insertObject('Courses', ObjectToInsert)
    const allcourse = await getAllCourse();
    res.render('course', { courseinfo: allcourse })
})

router.get('/course', async (req, res) => {
    const allcourse = await getAllCourse();
    const trainer = req.session["User"];
    res.render('course', { courseinfo: allcourse, dataInfo: trainer })
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
    const mounts = req.body.txtMount;
    await updateCourse(id, cid, name, mounts)
    res.redirect('/trainer/course')
})

router.get('/profileTrainer', requiresLogin, async (req, res) => {
    const idInput = req.query.id
    const user = await userInfo(idInput)
    console.log(idInput)
    console.log(user)
    res.render('profileTrainer', { dataInfo: user })
})

module.exports = router;