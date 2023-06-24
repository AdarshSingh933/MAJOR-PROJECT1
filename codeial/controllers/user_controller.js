const User=require('../models/user');

module.exports.profile=function(req,res){
    return res.render('user_profile');
}
module.exports.signUp=function(req,res){
    return res.render('signUp');
}

module.exports.signIn=function(req,res){
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
        return res.redirect('back');
      }
    } catch (err) {
      console.log('Error in creating user', err);
      return res.redirect('back');
    }
  };

module.exports.createSession=function(req,res){
    return res.render('signIn');
}