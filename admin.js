const express = require('express')
const { insertObject, getAllUser, updateDocument, deleteObject, getDocumentById } = require('./databaseHandler')
const { requiresLogin } = require('./projectLibrary')
const router = express.Router()

router.get('/', requiresLogin, async (req,res)=>{
    const user = req.session["User"]
    const allUser = await getAllUser();
    res.render('adminIndex',{dataInfo: user, data:allUser})
})

router.get('/users', async (req, res) => {
    const user = req.session["User"]
    const users = await getAllUser();
    res.render('users', { dataInfo: user,data:users })
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
    insertObject("Users", objectToInsert)
    const allUser = await getAllUser();
    res.render('users',{data:allUser})

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