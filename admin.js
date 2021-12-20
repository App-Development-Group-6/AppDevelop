const express = require('express')
const { insertObject, getAllUser, updateDocument } = require('./databaseHandler')
const router = express.Router()

router.get('/', async (req,res)=>{
    const allUser = await getAllUser();
    res.render('adminIndex',{data:allUser})
})

router.get('/addUser',(req,res)=>{
    res.render('addUser')
})

router.get('/deleteUser/:id', async (req, res) => {
    const idValue = req.params.id
    await deleteObject(idValue, "Users")
    res.redirect('/')
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
    res.render('adminIndex',{data:allUser})

})

router.post('/update', async (req, res) => {
    const id = req.body.txtId
    const name = req.body.txtUname
    const fullname = req.body.txtFullname
    const pass = req.body.txtPassword
    const role = req.body.txtRole
    const age = req.body.txtAge
    const gender = req.body.txtGender
    const number = req.body.txtNumber
    const email = req.body.txtEmail
    let updateValues = { $set: {
        userName: name,
        fullName: fullname,
        password: pass,
        role: role,
        age: age,
        gender: gender,
        number: number,
        email: email
    } };

    await updateDocument(id, updateValues, "Users")
    res.redirect('/')
})

router.get('/editUser/:id', async (req, res) => {
    const idValue = req.params.id
    const userToEdit = await getDocumentById(idValue, "Users")
    res.render("editUser", { user: userToEdit })
})

module.exports = router;