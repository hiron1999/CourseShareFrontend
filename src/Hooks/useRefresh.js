import { useContext } from "react"
import AuthContext from "../Context/Auth/AuthProvider"
import axios from "./Connection/axios";
import LoginContext from "../Context/LoginProvider";

const useRefresh = ()=>{

    const{auth,setAuth} =useContext(AuthContext);
    const {setIsloggin,setShowModal } = useContext(LoginContext);

    const refresh = async () =>{
       try{
            const response = await axios.get("/v1/token",
            {
                withCredentials : true ,
                // params: {
                //     Refresh_Token : auth?.refershToken
                // }
            });
            setAuth (response?.data)
        }
        catch (e){
            console.log("error while refreshing:",e);
            if(e?.response.status === 401){
                setIsloggin(false);
                setShowModal(true);
            }
        }
        
    }
    return refresh;
}

export default useRefresh;