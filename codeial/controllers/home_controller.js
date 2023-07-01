const Post=require('../models/post');
const Comment=require('../models/comment');
const User=require('../models/user');
module.exports.home=async function(req,res){
    // console.log(req.cookies);
    const posts=await Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    });
    const users=await User.find({});
        return res.render('home',{
            title:"Codeial | Home",
            posts:posts,
            all_users:users
        });
}
