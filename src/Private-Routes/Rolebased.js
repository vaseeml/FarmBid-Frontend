import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ConditionalLink(path , role){
    const { user } = useAuth()
    switch(path){
        case '/cart':{
            if(role.includes(user?.role)){
                return <Navigate to={path}/>
            }
        }
        case '/create-product':{
            if(role.includes(user?.role)){
                return <Navigate to={path}/>
            }
        }
    }
}