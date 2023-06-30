const Comment=require('../models/comment');
const Post=require('../models/post');


module.exports.create =async function(req,res){
    const post= await Post.findById(req.body.post);
    if(post){
    const comment= await Comment.create({
        content:req.body.content,
        post:req.body.post,
        user:req.user._id
    });
    post.comments.push(comment);
    post.save();

    return res.redirect('back');
}
}
module.exports.destroy = async function(req, res) {
    try {
        const comment = await Comment.findById(req.params.id);

        if (comment) {
            if (comment.user == req.user.id) {
                let postId=comment.post;
                await comment.deleteOne({ _id: req.params.id });
                // await postId.comments.deleteOne(req.params.id);
               await Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});
            } else {
                return res.redirect('back');
            }
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error in deleting post:', err);
        return res.redirect('back');
    }
}