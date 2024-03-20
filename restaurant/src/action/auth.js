import { LOGIN_SUCCESS, GET_ERROR, LOGOUT, FRIEND_CHAT, CONTACT_US, BASE_URL, REGISTER_SUCCESS } from "./type";
import axios from 'axios';


const config = {
    headers: {
        "Content-type": "application/json",
    }
}

function configAuth(yourAuthToken){
    return {
        headers: {
            "Content-type": "application/json",
            'Authorization': `Bearer ${yourAuthToken?yourAuthToken:null}`,
        }
    };
}

export const login = async (email, password)=>{
    const body = JSON.stringify({email, password})
    
    try{
        const res = await axios.post(`http://${BASE_URL}/auth/api/login`, body, config)
        if(res.data.success === true){
            const result = {
                type: LOGIN_SUCCESS,
                payload: res.data.data
            }
            return result
        }
        else{
            return {
                type: GET_ERROR,
                payload: res.data.message
            }
        }
        
    } catch(e){
        return {
            type: GET_ERROR,
            payload: e
        }
    }
}

export const register = async (title, email, address, phone, uid)=>{
    const body = JSON.stringify({title, email, address, phone})
    
    try{
        const res = await axios.post(`http://${BASE_URL}/api/register-restaurant/${uid}`, body, config)
        if(res.data.success === true){
            const result = {
                type: REGISTER_SUCCESS,
                payload: res.data.message
            }
            return result
        }
        else{
            alert(res.data.message)
            return {
                type: GET_ERROR,
                payload: res.data.message
            }
        }
        
    } catch(e){
        alert("Error!")
        return {
            type: GET_ERROR,
            payload: e
        }
    }
}

export const logout = async() =>{
    return {
        type: LOGOUT,
        payload: null
    }
}

export const friend_chat = async(uid, token) =>{
    try{
        const res = await axios.get(`http://${BASE_URL}/api/friend-chat/${uid}`, configAuth(token))
        if(res.data.success === true){
            const result = {
                type: FRIEND_CHAT,
                payload: res.data.data
            }
            return result
        }
        else{
            return {
                type: GET_ERROR,
                payload: res.data.message
            }
        }
        
    } catch(e){
        return {
            type: GET_ERROR,
            payload: e
        }
    }
}

export const contact_us = async(subject, message, full_name, email, token) =>{
    const body = JSON.stringify({subject, message, full_name, email});
    try{
        const res = await axios.post(`http://${BASE_URL}/api/contact-us`, body, configAuth(token))
        if(res.data.success === true){
            const result = {
                type: CONTACT_US,
                payload: res.data.message
            }
            return result
        }
        else{
            return {
                type: GET_ERROR,
                payload: res.data.message
            }
        }
        
    } catch(e){
        return {
            type: GET_ERROR,
            payload: e
        }
    }
}