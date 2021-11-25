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
    const name = req.body.txtName
    const role = req.body.txtRole
    const pass = req.body.txtPassword
    const objectToInsert = {
        userName: name,
        role: role,
        password: pass
    }
    insertObject("Users", objectToInsert)
    const allUser = await getAllUser();
    res.render('adminIndex',{data:allUser})

})
module.exports = router;