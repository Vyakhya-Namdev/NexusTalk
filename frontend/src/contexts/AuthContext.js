import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HttpStatus from "http-status";

export const AuthContext = createContext({});

const client = axios.create({
    baseURL: "http://localhost:8000/api/v1/users"
})


export const AuthProvider = ({ children }) => {
    const authContext = useContext(AuthContext);
    const [userData, setUserData] = useState(authContext);
    const router = useNavigate();

    const handleRegister = async (name, username, password) => {
        try {
            let request = await client.post("/register", {
                name: name,
                username: username,
                password: password,
            });

            if (request.status === HttpStatus.CREATED) {
                return request.data.message;
            }
        } catch (err) {
            throw err;   //generate error if user already exists
        }
    }

    const handleLogin = async (username, password) => {
        try {
            let request = await client.post("/login", {
                username: username,
                password: password,
            })

            if (request.status === HttpStatus.OK) {
                localStorage.setItem("token", request.data.token);
                router("/home");
            }
        } catch (err) {
            throw err;
        }
    }

    const getHisrotyOfUser = async () => {
        try {
            let request = await client.get("/getallactivity",
                {
                    params: {
                        token: localStorage.getItem("token")
                    }
                }
            );
            return request.data;
        } catch (err) {
            throw err;
        }
    }

    const addToUserHistory = async(meetingCode) => {
        // const { token, meeting_code } = req.body;

        try{
            let request = await client.post("/addtoactivity", {
                token: localStorage.getItem("token"),
                meeting_code: meetingCode 
            });

            return request;
        }catch(err){
            throw err;
        }
    }
    const data = {
        userData, setUserData, handleRegister, handleLogin, getHisrotyOfUser, addToUserHistory
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}