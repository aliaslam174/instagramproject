
const express = require("express");
const router = express.Router()
const UserCtrl=require('../controler/UserControl')
const multer=require('multer')
const checkauth=require('../middleweare/CheckAuth')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post('/signup',UserCtrl.signup)
router.post('/login',UserCtrl.login)
router.put('/profile',[checkauth,upload.single('photo')],UserCtrl.profileupdaate)
router.get('/getuser',checkauth,UserCtrl.getuser)


module.exports=router