const express=require('express');
const router=express.Router();

const usercontroller=require('../controllers/user_controller');
console.log('user loaded');
router.get('/profile',usercontroller.profile);

module.exports=router;