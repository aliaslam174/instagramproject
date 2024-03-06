
const express = require("express");
const router = express.Router()
const UserCtrl=require('../controler/UserControl');
const { postcomments } = require("../controler/commentControler");
const checkauth=require('../middleweare/CheckAuth')

router.post('/create',checkauth,postcomments)



module.exports=router