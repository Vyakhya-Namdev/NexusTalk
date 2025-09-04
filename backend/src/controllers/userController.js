import { User } from "../models/userModel.js";
import bcrypt, { hash } from "bcrypt";
import httpStatus from "http-status";    //to track the http-status for error or success
import crypto from "crypto";   //'crypto' is use for to make token
import { Meeting } from "../models/meetingModel.js";


//login control
const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Please enter all information!" });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "User not found!" });
        }

        //check the password enetered by user is correct or not
        let isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (isPasswordCorrect) {
            let token = crypto.randomBytes(20).toString("hex");
            user.token = token;
            await user.save();
            return res.status(httpStatus.OK).json({ token: token, message: "User logged-in successfully!" });
        } else {
            return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid username or password" });
        }
    } catch (e) {
        return res.json({ message: `Something went wrong ${e}` });
    }
}

//register control
const register = async (req, res) => {
    const { name, username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(httpStatus.FOUND).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name: name,
            username: username,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(httpStatus.CREATED).json({ message: "User Registered Successfully!" });
    } catch (e) {
        res.json({ message: `Something went wrong ${e}` });
    }
}

//history control by initialising meeting and users
const getUserHistory = async (req, res) => {
    const { token } = req.query;

    try {
        const user = await User.findOne({ token: token });
        const meetings = await Meeting.find({ user_id: user.username });
        res.json(meetings)
    } catch (err) {
        res.json({ message: `Something went wrong ${err}` });
    }
}

//add information to history
const addToHistory = async (req, res) => {
    const { token, meeting_code } = req.body;

    try {
        const user = await User.findOne({ token: token });

        const newMeeting = new Meeting({
            user_id: user.username,
            meetingCode: meeting_code,
        })

        await newMeeting.save();

        res.status(httpStatus.CREATED).json({ message: "Added code to history" })
    } catch (err) {
        res.json({ message: `Something went wrong ${err}` });
    }
}


export { login, register, getUserHistory, addToHistory };