const express=require('express');
const router=express.Router();
const passport = require('passport');

const usercontroller=require('../controllers/user_controller');

console.log('user loaded');
router.get('/profile/:id',passport.checkAuthentication,usercontroller.profile);
router.post('/update/:id',passport.checkAuthentication,usercontroller.update);
router.get('/sign-up',usercontroller.signUp);
router.get('/sign-in',usercontroller.signIn);

router.post('/create',usercontroller.create);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/user/signIn'}
),usercontroller.createSession);

router.get('/sign-out',usercontroller.destroySession);



module.exports=router;