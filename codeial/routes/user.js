const express=require('express');
const router=express.Router();

const usercontroller=require('../controllers/user_controller');
console.log('user loaded');
router.get('/profile',usercontroller.profile);
router.get('/sign-up',usercontroller.signUp);
router.get('/sign-in',usercontroller.signIn);
router.post('/create',usercontroller.create);

module.exports=router;