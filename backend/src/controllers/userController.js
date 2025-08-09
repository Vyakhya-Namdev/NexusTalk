import { User } from "../models/userModel.js";
import bcrypt, {hash} from "bcrypt";
import httpStatus from "http-status";    //to track the http-status for error or success
import crypto from "crypto";   //'crypto' is use for to make token

const login = async(req, res) => {
    const { username, password } = req.body;
    if(!username || !password){
        return res.status(400).json({ message: "Please enter all information!" });
    }

    try{
        const user = await User.findOne({username});
        if(!user){
            return res.status(httpStatus.NOT_FOUND).json({ message: "User not found!" });
        }
        
        //check the password enetered by user is correct or not
        let isPasswordCorrect = await bcrypt.compare(password, user.password);
        
        if(isPasswordCorrect){
            let token = crypto.randomBytes(20).toString("hex");
            user.token = token;
            await user.save();
            return res.status(httpStatus.OK).json({ token: token });
        }else{
            return res.status(httpStatus.UNAUTHORIZED).json({message: "Invalid username or password"});
        }
    }catch(e){
        return res.json({message: `Something went wrong ${e}`});
    }
}

const register = async(req, res) => {
    const { name, username, password } = req.body;
    try{
        const existingUser = await User.findOne({ username });
        if(existingUser){
            return res.status(httpStatus.FOUND).json({message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name: name,
            username: username,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(httpStatus.CREATED).json({message: "User Registered Successfully!"});
    }catch(e){
        res.json({message: `Something went wrong ${e}`});
    }
}


export {login, register};