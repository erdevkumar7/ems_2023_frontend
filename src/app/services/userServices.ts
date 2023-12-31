import { googleLogout } from "@react-oauth/google";
import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

export const BASE_URL = "http://localhost:6030";

export const HandleRegister = async (reqData: any) => {
  return await axios({
    method: "POST",
    url: `${BASE_URL}/registration`,
    data: reqData,
  }).then((request) => {
    if (request.data?.loggedin_by === '') {
      toast.success("Registration Successfully")
    }
    return request;
  }).catch((error) => {
    if (error.response.status === 400) {
      toast.error("Email already exists")
    } else if (error.response.status === 401) {
      console.log('LOGOUT USER')
        HandleLogout()
    } else {
      toast.error("User added failed")
    }
    return error;
  })
}


export const HandleLogin = async (reqData: any) => {
  return await axios({
    method: "POST",
    url: `${BASE_URL}/loginuser`,
    data: reqData,
  }).then((request) => {
    return request;
  }).catch((error) => {
    if (error.response.status === 400) {
      toast.error(error.response.data)
    } else if (error.response.status === 404) {
      toast.error(error.response.data)
    } else if (error.response.status === 401) {
      HandleLogout()
    } else {
      toast.error("User added failed")
    }
    return error;
  })
}

export const HandleProfile = async (userId: any) => {
  return await axios({
    method: "GET",
    url: `${BASE_URL}/getuser/${userId}`,
    // headers: LoginHeader(),
  })
    .then((request) => {
      return request;
    })
    .catch((error) => {
      if (error.response.status === 401) {
        HandleLogout();
      } else {
        toast.error("Something went wrong");
      }
      return error;
    });
};

export const HandleLoginByGoogle = async(reqData:any) =>{
  return await axios({
    method: "GET",
    url: `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${reqData.access_token}`,
    data: reqData,
    headers: {
      Authorization: `Bearer ${reqData.access_token}`,
      Accept: 'application/json'
  },
  }).then((request) => {
      return request;
    }).catch((error) => {
      if(error.response.status === 400){
        toast.error(error.response.data)
      }else if(error.response.status === 404){
        toast.error(error.response.data)
      }else{
        toast.error("Google login failed")
      }
      return error;
    })
}

export const HandleForgotPassword = async(reqData:any) =>{ 
  return await axios({
    method: "POST",
    url: `${BASE_URL}/forgotpassword`,
    data: reqData,
    // headers: authHeader(),
  }).then((request) => {
    if(request.status === 200){
      toast.success("Check your mail");
      console.log(typeof request.data,"2343243 data")
      localStorage.setItem('forgotPasswordToken',request.data)
    }
      return request;
    }).catch((error) => {
      console.log(error,"23232")
      if(error.response.status === 400){
        toast.error(error.response.data)
      }else if(error.response.status === 404){
        toast.error(error.response.data)
      }else if(error.response.status === 401){
        HandleLogout()
      }else{
        toast.error("Failed to send mail")
      }
      return error;
    })
}

export const HandleResetPassword = async(reqData:any) =>{
  return await axios({
    method: "POST",
    url: `${BASE_URL}/resetpassword`,
    data: reqData,
    // headers: authHeader(),
  }).then((request) => {
      toast.success("Password changed");
      return request;
    }).catch((error) => {
      if(error.response.status === 401){
        HandleLogout()
      }else{
        toast.error("Failed to reset password")
      }
      return error;
    })
}


export const HandleLogout = () => {
  googleLogout()
  localStorage.clear()
  window.location.replace("/");
  // GenerateToken()

};

export const getUserByEmail = async (search: any) => {
  return await axios({
      method: "POST",
      url: `${BASE_URL}/getuserbyemail/${search}`,
      // headers: LoginHeader(),
      // data: reqData,
  })
      .then((request) => {
          return request;
      })
      .catch((error) => {
          if (error.response.status === 401) {
              // HandleLogout();
          } else {
              toast.error("Something went wrong");
          }
          return error;
      });
};