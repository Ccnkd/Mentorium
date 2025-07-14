const express = require("express");
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require("../controllers/authController");
const {protect} = require("../middleware/authMiddleware");
//const upload = require("../middleware/uploadMiddleware");
const router = express.Router();


router.post("/register", registerUser); // Register User
router.post("/login", loginUser); // Register User
router.get("/profile",protect, getUserProfile); // Register User
router.put("/profile", updateUserProfile); // Register User
/*router.post("/upload-image", upload.single("image"), (req, res)=>{
    if(!req.file){
        return res.status(400).json({message:"no file uploaded"});
    }
    const profileImgUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename
    }`;
    res.status(200).json({profileImgUrl});
})*/
module.exports = router;