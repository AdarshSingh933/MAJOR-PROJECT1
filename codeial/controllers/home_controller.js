const Post=require('../models/post');
const Comment=require('../models/comment');
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
        return res.render('home',{
            title:"Codeial | Home",
            posts:posts,
        });
}
