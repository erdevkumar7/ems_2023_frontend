import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

export const BASE_URL = "http://localhost:6030";

export const HandleRegister = async(reqData:any) =>{
    return await axios({
      method: "POST",
      url: `${BASE_URL}/registration`,
      data: reqData,
    //   headers: authHeader(),
    }).then((request) => {
      if(request.data?.loggedin_by === ''){
        toast.success("Registration Successfully")
      }
        return request;
      }).catch((error) => {
        if(error.response.status === 400){
          toast.error("Email already exists")
        }else if(error.response.status === 401){
            console.log('LOGOUT USER')
        //   HandleLogout()
        }else{
          toast.error("User added failed")
        }
        return error;
      })
  }