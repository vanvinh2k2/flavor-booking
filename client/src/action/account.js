import { CHANGE_ACCOUNT, GET_ACCOUNT, GET_ERROR } from "./types";
import axios from 'axios';

function configAuth(yourAuthToken){
    return {
        headers: {
            "Content-type": "application/json",
            'Authorization': `Bearer ${yourAuthToken?yourAuthToken:null}`,
        }
    };
}

function configAuth2(yourAuthToken){
    return {
        headers: {
            "Content-type": "multipart/form-data",
            'Authorization': `Bearer ${yourAuthToken?yourAuthToken:null}`,
        }
    };
}

export const change_account = async(full_name, phone, address, image, uid, accessToken) =>{
    const formData = new FormData();
    formData.append('image', image);
    formData.append('phone', phone);
    formData.append('full_name', full_name);
    formData.append('address', address);
    try{
        const res = await axios.put(`http://127.0.0.1:8080/api/edit-profile/${uid}`, formData, configAuth2(accessToken));
        if(res.data.success === true){
            return {
                type: CHANGE_ACCOUNT,
                payload: res.data.data
            }
        }else{
            return {
                type: GET_ERROR,
                payload: "ERROR!"
            }
        }
    }catch(e){
        return {
            type: GET_ERROR,
            payload: e
        }
    }
}

export const get_account = async(uid, accessToken) =>{
    try{
        const res = await axios.get(`http://127.0.0.1:8080/api/get-profile/${uid}`, configAuth(accessToken));
        if(res.data.success === true){
            return {
                type: GET_ACCOUNT,
                payload: res.data.data
            }
        }else{
            return {
                type: GET_ERROR,
                payload: "ERROR!"
            }
        }
    }catch(e){
        return {
            type: GET_ERROR,
            payload: e
        }
    }
}