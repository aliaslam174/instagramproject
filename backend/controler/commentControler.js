
const commentmodal=require('../models/Comment')
const postModel=require('../models/Post')


const postcomments=async (req,res)=>{
console.log(req.body)

    try {
     

    
    
      // create post
      const comment = await commentmodal.create(req.body);
      
      // update post comment id
      await postModel.findOneAndUpdate(
        { _id: req.body.postId },
        { $push: { comments: comment._id } }
      );
    
      return res.status(201).json({
          status: 'success',
          message: "comment successfully created"
      })
    
    
    } catch (error) {
        console.log(error.message);
    }
    
    }

    module.exports={
        postcomments
    }