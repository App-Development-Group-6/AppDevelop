const express = require('express')
const { insertObject, getAllUser } = require('./databaseHandler')
const router = express.Router()

router.get('/', async (req,res)=>{
    const allUser = await getAllUser();
    res.render('adminIndex',{data:allUser})
})
router.get('/addUser',(req,res)=>{
    res.render('addUser')
})
router.post('/addUser',async (req,res)=>{
    const name = req.body.txtUname
    const fullname = req.body.txtFullname
    const pass = req.body.txtPassword
    const role = req.body.txtRole
    const age = req.body.txtAge
    const gender = req.body.txtGender
    const number = req.body.txtNumber
    const email = req.body.txtEmail
    const objectToInsert = {
        userName: name,
        fullName: fullname,
        password: pass,
        role: role,
        age: age,
        gender: gender,
        number: number,
        email: email
    }
    insertObject("Users", objectToInsert)
    const allUser = await getAllUser();
    res.render('adminIndex',{data:allUser})

})
module.exports = router;