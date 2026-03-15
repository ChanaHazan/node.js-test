const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt')

exports.register= async (req,res)=>{
    try {
        const {userName,pass,role}=req.body 
        if (!userName || !pass || !role)
            return res.status(400).send("הזנת שדות שגויה");
        const hashedPassword = await bcrypt.hash(pass, 10);
        const newUser = new User({
            username: userName,
            password: hashedPassword,
            role: role
        });
        const savedUser = await newUser.save();
        
        res.status(201).json({
            message: "המשתמש נוסף בהצלחה!",
            user: savedUser
        });
    } catch (error) {
        res.status(400).json({ message: "שגיאה בהוספת המשתמש", error: error.message });
    }

}

exports.login =  async (req, res) => {

    const { userName, pass } = req.body
    if (!userName || !pass)
        return res.status(400).json({ err: "fields req" });

    const user  = await User.findOne({ username: userName })
    if (!user || !(await bcrypt.compare(pass, user.password)))
    {
        return res.status(401).json({ err: "user not found" })
    }
    const token = jwt.sign(
        { id: user ._id, role: user .role}, 
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.status(200).json({
        message: "login success",
        token: token
    })

}