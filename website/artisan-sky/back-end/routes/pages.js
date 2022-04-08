//
//This pages.js is use to render to corresponding pages by request
//
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://artisansky:webuildappfromscratch@artisan.0mzss.mongodb.net/Artisan?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const user = require("../user_model")


router.get('/pwmod', checkAuthenticated, (req,res) => {
    res.render('passwordmod')  
  })

router.get("/test", (req, res) => {
    res.send("<h1>It's working 🤗</h1>")
})

router.get("/", (req, res) => {
    res.render('homepage.ejs')
})

router.get("/profile",  checkAuthenticated, async (req, res) => {
    const updateUser = await user.findOne({id: req.session.passport.user})
    // console.log(updateUser)
    if (updateUser.user_type == 'user'){
        var user_image = "/uploads/user_profile_images/" + updateUser.profile_image
        req.flash('info', user_image)
        res.render('index.ejs')
    }
    else if (updateUser.user_type == 'admin'){
        var user_image = "/uploads/user_profile_images/" + updateUser.profile_image
        req.flash('info', user_image)
        res.redirect("/adminprofile")
    }
})

// router.get("/profile",  checkAuthenticated, async (req, res) => {
//     const updateUser = await user.findOne({id: req.session.passport.user})
//     // console.log(updateUser)
//     var user_image = "/uploads/user_profile_images/" + updateUser.profile_image
//     req.flash('info', user_image)
//     res.render('index.ejs')
// })

router.get("/adminprofile", checkAuthenticated, async (req, res) => {
    res.render('adminIndex.ejs')
})

router.get("/login", checkNotAuthenticated, (req, res) => {
    req.flash('info', null)
    res.render('login')
})

// router.get("/adminlogin", checkAdminNotAuthenticated, (req, res) => {
//     req.flash('info', null)
//     res.render('adminlogin')
// })

router.get("/register", checkNotAuthenticated, (req, res) => {
    req.flash('info', null)
    res.render('register.ejs')
})

function checkAuthenticated(req, res, next){
    if (req.isAuthenticated()){
        return next()
    }
    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next){
    if (req.isAuthenticated()){
        return res.redirect('/profile')
    }
    next()
}

// function checkAdminNotAuthenticated(req, res, next){
//     if (req.isAuthenticated()){
//         return res.redirect('/adminprofile')
//     }
//     next()
// }

module.exports = router;