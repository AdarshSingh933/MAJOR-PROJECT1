const Post=require('../models/post');
const Comment=require('../models/comment');


module.exports.post=function(req,res){
    Post.create({
        content:req.body.content,
        user:req.user._id
    });
        return res.redirect('back');
}
module.exports.destroy = async function(req, res) {
    try {
        const post = await Post.findById(req.params.id);

        if (post) {
            if (post.user == req.user.id) {
                await post.deleteOne({ _id: req.params.id });
                await Comment.deleteMany({ post: req.params.id });
            } else {
                return res.redirect('back');
            }
        } else {
            return res.redirect('back');
        }

        return res.redirect('back');
    } catch (err) {
        console.log('Error in deleting post:', err);
        return res.redirect('back');
    }
}
