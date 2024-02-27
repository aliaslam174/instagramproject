const cloudinary = require('cloudinary');
const dotenv = require('dotenv');
dotenv.config();
const postModel=require('../models/Post')

// setup cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const creatPost=async (req,res)=>{

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







const myPosts = async(req, res) => {
    try {
      
        const posts = await postModel.find({authorId: req.userId}).populate({
            path: "authorId",
            //select: "name", // Only include 'name' field from User collection
            //match: { $exists: true }
          }).sort({createdAt: -1})

        const filteredPosts = posts.filter(p => p.authorId != null);

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
        
        const posts = await postModel.find().populate({
            path: "authorId",
            //select: "name", // Only include 'name' field from User collection
            //match: { $exists: true }
          }).sort({createdAt: -1})

        const filteredPosts = posts.filter(p => p.authorId != null);

        return res.json({
            status: 'success',
            posts: filteredPosts
        })
    } catch (error) {
        console.log(error.message);
    }
}


module.exports={creatPost,myPosts,allPosts}