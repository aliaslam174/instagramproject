const userModel = require('../models/User')
const cloudinary = require('cloudinary');
const bcrypt = require('bcrypt')

const { generateToken } = require('../helpers/Utils')
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const signup = async (req, res) => {
    try {
        let { name, password, email } = req.body

        // Checking if the user already exists in the database
        const arleadyUser = await userModel.findOne({ email: email });
        if (arleadyUser) {
            return res.status(409).json({ status: "failed", message: "Email is already registered" })
        }

        //  Encrypting the password using Bcrypt
        const salt = await bcrypt.genSalt(10);
        hashed = await bcrypt.hash(password, salt);

        //  Creating a new user with encrypted password and saving it to the database
        const user = new userModel({ name, email, password: hashed });
        await user.save();
        //  Sending back a response with a status of Created (201) and the newly created
        res.status(201).json({ status: "success", name: user.name, email: user.email, token: generateToken(user) });

    } catch (error) {
        console.log(`Error in SignUp ${error}`);
        res.status(500).json({ status: 'Failed', message: error.message });
    }

}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email: email });

        if (!user) {
            return res.status(401).json({ status: 'failed', message: 'Invalid Email or Password' });
        }

        // Verify the password using bcrypt compare method
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ status: 'failed', message: "Invalid Email or Password" })
        }

        return res.status(200).json({
            status: 'success',
            token: generateToken(user),
            user: user
        })


    } catch (error) {
        console.log(`Error in SignUp ${error}`);
        res.status(500).json({ status: 'Failed', message: error.message });
    }
}

const profileupdaate = async (req, res) => {

    try {

        const b64 = Buffer.from(req.file.buffer).toString("base64");

        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

        const photoObject = await cloudinary.v2.uploader.upload(dataURI);

        const user = await userModel.findByIdAndUpdate(req.userId,{name: req.body.name,email: req.body.email, photo: photoObject.url}, { new: true });
        res.json({
            status: 'success',
            message: "update successfuly",
            user:user
        });
    } catch (error) {
        console.error(error);
        // res.status(500).json({ message: 'Server error' });
    }
}


const getuser = async (req, res) => {







    try {
        const user = await userModel.findById(req.userId)
        res.json({
            status: 'success',
            message: "update successfuly",
            user: user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}




module.exports = {
    signup,
    login,
    profileupdaate,
     getuser
}