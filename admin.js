const express = require('express')
const { insertObject, getAllUser, updateDocument, deleteObject, getDocumentById, getAllStaff, getAllTrainer, getAllTrainee, userInfo } = require('./databaseHandler')
const { requiresLogin } = require('./projectLibrary')
const router = express.Router()

router.get('/', requiresLogin, (req,res)=>{
    const user = req.session["User"]
    res.render('adminIndex',{dataInfo: user})
})

router.get('/users', async (req, res) => {
    const user = req.session["User"]
    const users = await getAllUser();
    res.render('users', { dataInfo: user,data:users })
})

router.get('/staff', async (req, res) => {
    const user = req.session["User"]
    const users = await getAllStaff();
    res.render('staff', { dataInfo: user,data:users })
})

router.get('/trainer', async (req, res) => {
    const user = req.session["User"]
    const users = await getAllTrainer();
    res.render('trainer', { dataInfo: user,data:users })
})

router.get('/trainee', async (req, res) => {
    const user = req.session["User"]
    const users = await getAllTrainee();
    res.render('trainee', { dataInfo: user,data:users })
})

router.get('/adminProfile', async (req, res) => {
    const uname = req.session["User"]
    const user = await userInfo(uname)
    res.render('adminProfile', { dataInfo: user })
  })

router.get('/addUser',(req,res)=>{
    res.render('addUser')
})

router.get('/deleteUser/:id', async (req, res) => {
    const idValue = req.params.id
    await deleteObject(idValue, "Users")
    res.redirect('/admin/users')
})

router.post('/addUser',async (req,res)=>{
    const name = req.body.txtname
    const fullname = req.body.txtFullname
    const uid = req.body.txtId
    const pass = req.body.txtPass
    const role = req.body.txtRole
    const age = req.body.txtAge
    const gender = req.body.txtGender
    const number = req.body.txtNumber
    const email = req.body.txtEmail
    const objectToInsert = {
        userName: name,
        fullName: fullname,
        userId: uid,
        password: pass,
        role: role,
        age: age,
        gender: gender,
        number: number,
        email: email,
    }
    await insertObject("Users", objectToInsert)
    res.redirect('/admin/users')

})

router.post('/update', async (req, res) => {
    const id = req.body.txtOId
    const name = req.body.txtUname
    const fullname = req.body.txtFullname
    const uid = req.body.txtId
    const pass = req.body.txtPassword
    const role = req.body.txtRole
    const age = req.body.txtAge
    const gender = req.body.txtGender
    const number = req.body.txtNumber
    const email = req.body.txtEmail
    let updateValues = { $set: {
        userName: name,
        fullName: fullname,
        userId: uid,
        password: pass,
        role: role,
        age: age,
        gender: gender,
        number: number,
        email: email
    } };

    await updateDocument(id, updateValues, "Users")
    res.redirect('/admin/users')
})

router.get('/editUser/:id', async (req, res) => {
    const idValue = req.params.id
    const userToEdit = await getDocumentById(idValue, "Users")
    res.render("editUser", { user: userToEdit })
})

module.exports = router;