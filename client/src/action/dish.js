import { 
    GET_ERROR, 
    GET_DISHES, 
    GET_DISH_DETAIL, 
    GET_DISHES_HOT,
    GET_DISH_OF_RES,
    GET_DISH_AI,
    GET_DISH_SUGGETS,
    FILTER_DISH
} from "./types";
import axios from "axios";

const config = {
    headers: {
        "Content-type": "application/json",
    }
}

const config2 = {
    headers: {
        "Content-type": "multipart/form-data",
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


export const getDishes= async(page)=>{
    try{
        const res = await axios.get(`http://127.0.0.1:8000/api/dish/?page=${page}`, config)
        return {
            type: GET_DISHES,
            payload: res.data
        }

    }catch(e){
        return {
            type: GET_ERROR,
            payload: e
        }   
    }
}

export const getDish= async(did, token)=>{
    try{
        const res = await axios.get(`http://127.0.0.1:8080/api/dish/${did}`, configAuth(token))
        return {
            type: GET_DISH_DETAIL,
            payload: res.data.data
        }

    }catch(e){
        return {
            type: GET_ERROR,
            payload: e
        }   
    }
}

export const getDishesHot= async()=>{
    try{
        const res = await axios.get(`http://127.0.0.1:8000/api/dish-featured/`, config)
        if(res.data.success == true){
            return {
                type: GET_DISHES_HOT,
                payload: res.data.data
            }
        }

    }catch(e){
        return {
            type: GET_ERROR,
            payload: e
        }   
    }
}

export const getDishesOfRestaurant= async(rid)=>{
    try{
        const res = await axios.get(`http://127.0.0.1:8080/api/dishes-of-restaurant/${rid}`, config)
        return {
            type: GET_DISH_OF_RES,
            payload: res.data.data
        }
    }catch(e){
        return {
            type: GET_ERROR,
            payload: e
        }   
    }
}

export const getDishesfromImage= async(image)=>{
    try{
        let formData = new FormData();
        formData.append('image', image);
        const res = await axios.post(`http://127.0.0.1:8000/api/search-ai/`, formData, config2)
        if(res.data.success == true){
            return {
                type: GET_DISH_AI,
                payload: res.data.data
            }
        }
    }catch(e){
        return {
            type: GET_ERROR,
            payload: e
        }   
    }
}

export const getDishesSuggest= async(rid, uid)=>{
    try{
        const res = await axios.get(`http://127.0.0.1:8000/api/suggest-food/${uid}/${rid}/`, config)
        if(res.data.success == true){
            return {
                type: GET_DISH_SUGGETS,
                payload: res.data.data
            }
        }
    }catch(e){
        return {
            type: GET_ERROR,
            payload: e
        }   
    }
}

export const filterDish= async(max_price, min_price, restaurants, categorys)=>{
    const body = JSON.stringify({max_price, min_price, restaurants, categorys})
    try{
        const res = await axios.post(`http://127.0.0.1:8080/api/filter-product`, body, config)
        return {
            type: FILTER_DISH,
            payload: res.data.data
        }
    }catch(e){
        return {
            type: GET_ERROR,
            payload: e
        }   
    }
}