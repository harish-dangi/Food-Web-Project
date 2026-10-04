import usermodel from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import validator from 'validator'


//LOGIN FUNCTION
export const loginUser = async (req,res) => {
  try{
    const {email,password} = req.body;
    console.log(email,password)
    const user = await usermodel.findOne({email});
    if(!user){
      return res.json({success:false, message:"User not Exist"})
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign({userId:user._id,email},process.env.JWT_SECRET_KEY);
    res.cookie("token",token,{
      httpOnly:true
    });
    return res.status(200).json({
      success:true,
      message:"User Login successfully",
      user:{
        email
      },
      token
    })
  }catch(err){
    console.log("Error " + err);
    return res.json({success:false,})
  }
}


// REGISTOR FUNCTION
export const registorUser = async (req,res)=>{
  const {username,email,password} = req.body;

  try{
    const userAlreadyExist = await usermodel.findOne({email});
    if(userAlreadyExist){
      return res.json({
        success:false,
        message:"User Already Exists please login your email & password"
      })
    }
    //validation
    if(!validator.isEmail(email)){
      return res.json({
        success:false,
        message:"Invalid Email, Please Enter valid email"
      })
    }
    if(password.length < 8){
      return res.json({
        success:false,
        message:"Please Enter a Strong password length must be 8 degit"
      })
    }

    // If everything is fine
    const hash = await bcrypt.hash(password,10);
    //create new user
    const newUser = await usermodel.create({
      username:username,
      password:hash,
      email:email
    },
  )
    const token = jwt.sign({userId:newUser._id,email:newUser.email},process.env.JWT_SECRET_KEY);
    res.cookie("token",token,{
      httpOnly:true,
    });
    return res.status(200).json({
      success:true,
      message : "User Registor successfully",
      newUser,
      token
    })
  }catch(err){
    return res.json({
    success:false,
    message:"Invalid email and password"})
  }
}