
import { useContext, useEffect } from "react"
import AuthContext from "../../Context/Auth/AuthProvider"
import { axiosPrivate } from "./axios";
import useRefresh from "../useRefresh";

const useAxiosPrivate = () =>{

    const {auth}=useContext(AuthContext);
    const refresh = useRefresh();
    
    console.log("Using private Axios...........");

    useEffect(()=>{
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config =>{
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                console.log("private config :",config);
                return config;
            },
            (error)=> Promise.reject(error)
        );
        
        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh(); //need to add 
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }

    },[auth]);

    // console.log(axiosPrivate.request);
  
    return axiosPrivate ;
}
export default useAxiosPrivate; 
