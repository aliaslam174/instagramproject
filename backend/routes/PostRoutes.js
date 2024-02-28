const express = require("express");
const router = express.Router()
const postCtrl=require('../controler/PostControler')
const multer=require('multer')
const checkauth=require('../middleweare/CheckAuth')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post('/create',[checkauth,upload.single('image')],postCtrl.creatPost)
router.get('/my',checkauth,postCtrl.myPosts)
router.get('/all',checkauth,postCtrl.allPosts)


module.exports=router