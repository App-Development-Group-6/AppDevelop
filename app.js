const express = require('express')
const session = require('express-session')
const { checkUserRole, userInfo, getAllUser, insertObject } = require('./databaseHandler')
const { requiresLogin } = require('./projectLibrary')

const app = express()

app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: '124447yd@@$%%#', cookie: { maxAge: 600000 }, saveUninitialized: false, resave: false }))
app.use(express.static('public'))

app.get('/', requiresLogin, async (req, res) => {
  const user = req.session["User"]
  const all = await getAllUser();
  res.render('index', { dataInfo: user, user: all })
})

app.get('/trainerIndex', requiresLogin, async (req, res) => {
  const user = req.session["User"]
  res.render('trainerIndex', { dataInfo: user })
})

app.get('/adminIndex', requiresLogin, async (req, res) => {
  const user = req.session["User"]
  const users = await getAllUser();
  res.render('adminIndex', { dataInfo: user,data:users })
})

app.get('/staffIndex', requiresLogin, async (req, res) => {
  const user = req.session["User"]
  res.render('staffIndex', { dataInfo: user })
})


app.post('/login', async (req, res) => {
  const name = req.body.txtName
  const pass = req.body.txtPass
  const role = await checkUserRole(name, pass)
  if (role == -1) {
    res.render('login')
  } else {
    req.session["User"] =
    {
      userName: name,
      password: pass,
      role: role,
    }
    console.log("Ban dang dang nhap voi quyen la: " + role)
    if (role == 'Admin') {
      res.redirect('/adminIndex',)
    } else if (role == 'Trainer') {
      res.redirect('/trainerIndex')
    }else if (role == 'Staff'){
      res.redirect('/staffIndex')
    }
  }
})

app.get('/profile', async (req, res) => {
  const uname = req.session["User"]
  const user = await userInfo(uname)
  res.render('profile', { dataInfo: user })
})


app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/logout', function (req, res, next) {
  if (req.session["User"]) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
})

const adminController = require('./admin')
app.use('/admin', adminController)

const staffController = require('./staff')
app.use('/staff', staffController)

const trainerController = require('./trainer')
const async = require('hbs/lib/async')
app.use('/trainer', trainerController)

const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log("Server is running! " + PORT)