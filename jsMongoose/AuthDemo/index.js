const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const session = require('express-session');

mongoose.connect('mongodb://127.0.0.1:27017/authDemo')
    .then(() => {
        console.log("MONG CONNECTION OPEN!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION!");
        console.log(err)
    })

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(session({ secret: 'notagoodsecret', resave: true, saveUninitialized: true }));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("This is home page")
})

const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect('/login')
    }
    next();
}

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', async (req, res) => {
    const { username, password} = req.body;
    const user = new User({ username, password })
    await user.save();
    req.session.user_id = user._id;
    res.redirect('/')
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await User.findAndValidate(username, password);
    if (foundUser) {
        req.session.user_id =foundUser._id;
        res.redirect('/secret')
    } else {
        res.redirect('/login')
    }
})

app.post('/logout', (req, res) => {
    // req.session.user_id = null;
    req.session.destroy();
    res.redirect('/login');
})

app.get('/secret', requireLogin, (req,res) => {
    res.render('secret')
})

app.listen(3000, () => {
    console.log("SERVING YOUR APP!")
})