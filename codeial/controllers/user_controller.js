const User=require('../models/user');

module.exports.profile= async function(req,res){
  try{
    const user = await User.findOne({ email: req.user.email });
    
    return res.render('user_profile',{
      user:user
    });
 
  }catch(err){
    console.log('Error in creating user', err);
    return ;
  }
    
}
module.exports.signUp=function(req,res){
   if(req.isAuthenticated()){
      return res.redirect('/user/profile');
   }

    return res.render('signUp');
}

module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
     }

    return res.render('signIn');
}

module.exports.create = async function (req, res) {
    console.log(req.body);
    if (req.body.password !== req.body['confirmed-password']) {
      return res.redirect('back');
    }
  
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        await User.create(req.body);
        return res.redirect('/user/sign-in');
      } else {
        return res.redirect('/user/sign-in');
      }
    } catch (err) {
      console.log('Error in creating user', err);
      return res.redirect('back');
    }
  };

module.exports.createSession=async function(req,res){
    // find the user
    try{
       const user= await User.findOne({email:req.body.email});
            
             // handle user found
             if(user){
                // handle password which dont match
                if(user.password!=req.body['password']){
                    return res.redirect('back');
                }
                // handle session creation
                res.cookie('user_id',user.id);
                return res.redirect('/user/profile');
             }else{
              // handle user not found
                return res.redirect('back');
             }
       }catch(err){
        console.log('error in finding user in signing in');
        return;
    }
   
}

module.exports.destroySession=function(req,res){
    req.logout(function(err,logout){
      if(err){
        console.log(err);
      }
      return res.redirect('/');
    });
    
}
module.exports.post=function(req,res){
  return res.redirect('/');
}