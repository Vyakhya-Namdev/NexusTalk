import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HttpStatus from "http-status";

export const AuthContext = createContext({});

const client = axios.create({
    BASEURL: `${import.meta.env.BASE_URL}/api/v1/users`
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

    const getHistoryOfUser = async () => {
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

    const addToUserHistory = async (meetingCode) => {
        console.log(localStorage.getItem("token"))
        try {
            const response = await client.post(
                "/addtoactivity",
                { meeting_code: meetingCode,
                    token: localStorage.getItem('token')
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            return response.data; 
        } catch (err) {
            console.error("Error adding to activity:", err.response?.data  || err.message);
            return { success: false, error: err.response?.data || err.message };
        }
    };
    const data = {
        userData, setUserData, handleRegister, handleLogin, getHistoryOfUser, addToUserHistory
    }

    return (
        <AuthContext.Provider value={data}>
            {children} 
        </AuthContext.Provider>
    )
}