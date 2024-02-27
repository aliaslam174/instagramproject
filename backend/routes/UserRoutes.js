
const express = require("express");
const router = express.Router()
const UserCtrl=require('../controler/UserControl')

router.post('/signup',UserCtrl.signup)
router.post('/login',UserCtrl.login)


module.exports=router