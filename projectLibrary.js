const { redirect } = require("express/lib/response")

function requiresLogin(req,res,next){
    if(req.session["User"]){
        return next()
    }else{
        res.redirect('/login')
    }
}

function requireTrainer(req,res,next){
    trainer = req.session["User"]
    if(trainer.role == "Trainer"){
        return next()
    }else{
        res.redirect('/notice')
    }
}

function requireStaff(req,res,next){
    trainer = req.session["User"]
    if(trainer.role == "Staff"){
        return next()
    }else{
        res.redirect('/notice')
    }
}
module.exports = {requiresLogin, requireTrainer, requireStaff}