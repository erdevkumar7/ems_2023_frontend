import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { LoginHeader } from "../common/authToken";
export const BASE_URL = "http://localhost:6030";

export const handleEmailData = async (userId: any) => {
    return await axios({
        method: "GET",
        url: `${BASE_URL}/getemailbyuserid/${userId}`,
        headers: LoginHeader(),
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
}


export const handleSendEmail = async (reqData: any) => {
    return await axios({
        method: "POST",
        url: `${BASE_URL}/sendemail`,
        headers: LoginHeader(),
        data: reqData,
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