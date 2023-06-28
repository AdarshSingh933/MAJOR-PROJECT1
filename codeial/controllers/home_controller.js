const Post=require('../models/post');
module.exports.home=async function(req,res){
    // console.log(req.cookies);
    const posts=await Post.find({}).populate('user');
        return res.render('home',{
            title:"Codeial | Home",
            posts:posts
        });
}