const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/user');


passport.use(new LocalStrategy({
    usernameField:'email'
   },
    async function(email,password,done){
    try {
        const user = await User.findOne({ email: email });
        if (!user || user.password !== password) {
          console.log('Invalid Username/Password');
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        console.log('Error in finding user --> passport');
        return done(err);
      }
    }
));
// serializing the user to decide which key is to be kept in the cookies
  passport.serializeUser(function(user,done){
    done(null,user.id);
  });

//deserializing the user form the key in the cookies
// passport.deserializeUser(function(id,done){
//       User.findById(function(err,user){
//         if(err){
//             console.log('Error in finding user --> passport');
//           return  done(err);
//         }
//         return done(null,user);
//       });
// });
passport.deserializeUser(async function (id, done) {
    try {
      const user = await User.findById(id);
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      console.log('Error in finding user --> passport');
      return done(err);
    }
  });


//check if the user is authenticated
passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
// if user is not signed in
   return res.redirect('/user/signIn');
}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }
    return next();
}


module.exports= passport;