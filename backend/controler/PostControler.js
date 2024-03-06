const cloudinary = require('cloudinary');
const dotenv = require('dotenv');
dotenv.config();
const postModel = require('../models/Post');
const Like = require('../models/Like');
const mongoose = require("mongoose");


// setup cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const creatPost = async (req, res) => {

    // converting buffer into base64

    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64");

        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

        const photoObject = await cloudinary.v2.uploader.upload(dataURI);



        // create post
        const newPost = await postModel.create({ content: req.body.content, imageUrl: photoObject.url, authorId: req.userId });

        return res.status(201).json({
            status: 'success',
            message: "successfully created"
        })


    } catch (error) {
        console.log(error.message);
    }

}







const myPosts = async (req, res) => {
    try {

        // const posts = await postModel.find({authorId: req.userId}).populate({
        //     path: "authorId",
        //     //select: "name", // Only include 'name' field from User collection
        //     //match: { $exists: true }
        //   }).sort({createdAt: -1})

        const posts = await postModel.find({ authorId: req.userId }).populate(["authorId", "comments"]).sort({ createdAt: -1 })

        // const filteredPosts = posts.filter(p => p.authorId != null);

     
        const userId = req.userId;

        const filteredPosts = [];
         await Promise.all(posts.map( async (post) => {
            
            if(post.authorId != null) {

                const PostObjectId = new mongoose.Types.ObjectId(post._id).toString();
                const userObjectId = new mongoose.Types.ObjectId(post.authorId._id).toString();


                let findLike = await Like.findOne({ userId: userObjectId, postId: PostObjectId });
                let totalLikesByPostId = await Like.countDocuments({postId: PostObjectId});


                let isLiked = false;
                if(findLike) {
                    isLiked = true;
                }
                let newP = {
                    ...post.toObject(),
                    isLiked:  isLiked,
                    totalLikes: totalLikesByPostId
                }

                filteredPosts.push(newP);
                //return post;
            }
        }))

        return res.json({
            status: 'success',
            posts: filteredPosts
        })

    } catch (error) {
        console.log(error.message);
    }
}

const allPosts = async (req, res) => {
    try {

        // const posts = await postModel.find().populate({
        //     path: ["authorId", "comments"],
        //     //select: "name", // Only include 'name' field from User collection
        //     //match: { $exists: true }
        //   }).sort({createdAt: -1})

        const posts = await postModel.find({}).populate(["authorId", "comments"]).sort({ createdAt: -1 })

        //const filteredPosts = posts.filter(p => p.authorId != null);

        const userId = req.userId;

        const filteredPosts = [];
         await Promise.all(posts.map( async (post) => {
            
            if(post.authorId != null) {

                const PostObjectId = new mongoose.Types.ObjectId(post._id).toString();
                const userObjectId = new mongoose.Types.ObjectId(req.userId).toString();


                let findLike = await Like.findOne({ userId: userObjectId, postId: PostObjectId });
                let totalLikesByPostId = await Like.countDocuments({postId: PostObjectId});


                let isLiked = false;
                if(findLike) {
                    isLiked = true;
                }
                let newPost = {
                    ...post.toObject(),
                    isLiked:  isLiked,
                    totalLikes: totalLikesByPostId
                }

                filteredPosts.push(newPost);
                //return post;
            }
        }))

        return res.json({
            status: 'success',
            posts: filteredPosts
        })
    } catch (error) {
        console.log(error.message);
    }
}

const likes = async (req, res) => {

    try {
            postId = req.body.postId;
            userId = req.userId;

            const existingPost = await postModel.findById(postId);
            


            if (!existingPost) {
               
                return res.status(201).json({
                    status: 'success',
                    message:"post not found"
                   
                })
              }
        // create post
        const findLike = await Like.findOne({ userId: userId, postId: postId });
     
        console.log(findLike);
      

        if(!findLike) {
           
            const newLike = await Like.create({
                postId: postId,
                userId: userId,
                like: 1
            })

            let totalLikesByPostId = await Like.countDocuments({postId: postId});
            return res.status(201).json({
                status: 'success',
                isLiked: true,
                totalLikes: totalLikesByPostId
            })
    
        } else if(findLike) {
                await findLike.deleteOne();

                let totalLikesByPostId = await Like.countDocuments({postId: postId});
                return res.status(201).json({
                    status: 'success',
                    isLiked: false,
                    totalLikes: totalLikesByPostId
                })
        }

        

    } catch (error) {
        console.log(error.message);
    }

}




// const isLiked =  async (postId, userId) => {

//        // console.log(postId, userId)

//         const PostObjectId = new mongoose.Types.ObjectId(postId).toString();
//         const userObjectId = new mongoose.Types.ObjectId(userId).toString();


//         // create post
//         const findLike = await Like.findOne({ userId: userObjectId, postId: PostObjectId });
//         //console.log("flike", findLike);
//         if(findLike) {
//            return true;
//         }

//         return false;

// }



module.exports = { creatPost, allPosts, likes ,myPosts}