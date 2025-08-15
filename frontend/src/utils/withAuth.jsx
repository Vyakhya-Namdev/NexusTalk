import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WithAuth = (WrapedComponent) => {
    const AuthComponent = (props) => {
        const router = useNavigate();

        const isAuthenticated = () => {
            if(localStorage.getItem("token")){
                return true;
            }
            return false;
        }
        
        //if user is guest or is not authenticated it will not redirect to home page after ending the call
        useEffect(() => {
            if(!isAuthenticated){
                router("/auth");
            }
        },[]);

        //return user directly to home page with its all props if it is authenticated
        return <WrapedComponent {...props}/>
    }

    return AuthComponent;
}

export default WithAuth;