import { 
    GET_ERROR, 
    REVIEW_RESTAURANT ,
    ORDER_HISTORY,
    GET_TABLE,
    GET_DISHES,
    ORDER_DETAIL,
    ADD_DISH,
    DELETE_DISH,
    UPDATE_DISH,
    MANAGE_ORDER,
    ADD_TABLE,
    DELETE_TABLE,
    GET_CATEGORY,
    UPDATE_TABLE,
    DETAIL_TABLE,
    DETAIL_DISH,
    GET_DISH_OF_RES,
    CHANGE_STATUS,
    UPDATE_ORDER_ITEM,
    DELETE_ORDER_ITEM,
    RES_DETAIL,
    CHANGE_RESTAURANT,
    STATISTICS,
    BASE_URL
} from "../action/type";
import axios from "axios";

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

function configAuthFile(yourAuthToken){
    return {
        headers: {
            "Content-type": "multipart/form-data",
            'Authorization': `Bearer ${yourAuthToken?yourAuthToken:null}`,
        }
    };
}

export const getReviews = async (rid, token)=>{
    try{
        const res = await axios.get(`http://${BASE_URL}/api/reviews-restaurant/${rid}`, configAuth(token))
        if(res.data.success === true){
            const result = {
                type: REVIEW_RESTAURANT,
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

export const statistics = async (rid, token)=>{
    try{
        const res = await axios.get(`http://${BASE_URL}/api/statistics/${rid}`, configAuth(token))
        if(res.data.success === true){
            const result = {
                type: STATISTICS,
                payload: res.data.data
            }
            return result
        }
        else{
            return {
                type: GET_ERROR,
                payload: "ERROR"
            }
        }
        
    } catch(e){
        return {
            type: GET_ERROR,
            payload: e
        }
    }
}

export const getHistoryOrder = async (rid, token)=>{
    
    try{
        const res = await axios.get(`http://${BASE_URL}/api/order-restaurant/${rid}`, configAuth(token))
        if(res.data.success === true){
            const result = {
                type: ORDER_HISTORY,
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

export const getDishes = async (rid, token)=>{
    try{
        const res = await axios.get(`http://${BASE_URL}/api/dishes-of-restaurant/${rid}`, configAuth(token));
        if(res.data.success === true){
            const result = {
                type: GET_DISHES,
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

export const getTables = async (rid, token)=>{
    const body = JSON.stringify({rid})
    
    try{
        const res = await axios.get(`http://${BASE_URL}/api/get-table/${rid}`, configAuth(token))
        if(res.data.success === true){
            const result = {
                type: GET_TABLE,
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

export const getHistoryDetail = async (oid, token)=>{
    try{
        const res = await axios.get(`http://${BASE_URL}/api/bill-order/${oid}`, configAuth(token))
        if(res.data.success === true){
            const result = {
                type: ORDER_DETAIL,
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

export const addDish = async (id, data, token)=>{
    const { 
        title, 
        image, 
        description, 
        price, 
        old_price, 
        product_status, 
        cid 
    } = data;
    let formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('old_price', old_price);
    formData.append('product_status', product_status);
    formData.append('cid', cid);

    try{
        const res = await axios.post(`http://127.0.0.1:8080/api/add-dish/${id}`, formData, configAuthFile(token))
        if(res.data.success === true){
            const result = {
                type: ADD_DISH,
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

export const updateDish = async(did, data, token) =>{
    const { 
        title, 
        image, 
        description, 
        price, 
        old_price, 
        product_status,
        cid 
    } = data;
    
    let formData = new FormData();
    if(image) formData.append('image', image);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('old_price', old_price);
    formData.append('product_status', product_status);
    formData.append('cid', cid);
    try{
        const res = await axios.put(`http://${BASE_URL}/api/update-dish/${did}`, formData, configAuthFile(token))
        return {
            type: UPDATE_DISH,
            payload: res.data.data
        }
    } catch(e){
        return {
            type: GET_ERROR,
            payload: e
        }
    }
}

export const addTable = async (rid, title, number_seat, token)=>{
    const body = JSON.stringify({title, number_seat});
    try{
        const res = await axios.post(`http://${BASE_URL}/api/add-table/${rid}`, body, configAuth(token))
        if(res.data.success === true){
            const result = {
                type: ADD_TABLE,
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

export const getCategory = async() =>{
    try{
        const res = await axios.get(`http://${BASE_URL}/api/category`, config)
        return {
            type: GET_CATEGORY,
            payload: res.data.data
        }
    } catch(e){
        return {
            type: GET_ERROR,
            payload: "ERROR!"
        }
    }
}

export const deleteDish = async(rid, did, token) =>{
    try{
        const res = await axios.delete(`http://${BASE_URL}/api/delete-dish/${rid}/${did}`, configAuth(token))
        return {
            type: DELETE_DISH,
            payload: res.data.data
        }
    } catch(e){
        return {
            type: GET_ERROR,
            payload: "ERROR!"
        }
    }
}

export const deleteTable = async(rid, tid, token) =>{
    try{
        const res = await axios.delete(`http://${BASE_URL}/api/delete-table/${rid}/${tid}`, configAuth(token))
        return {
            type: DELETE_TABLE,
            payload: res.data.data
        }
    } catch(e){
        return {
            type: GET_ERROR,
            payload: "ERROR!"
        }
    }
}

export const manageOrder = async(rid, day, month, year, token) =>{
    const date = `${year}-${month}-${day}`;
    try{
        const res = await axios.post(`http://${BASE_URL}/api/manage-order/${rid}`, null, {params: { date }, ...configAuth(token)})
        return {
            type: MANAGE_ORDER,
            payload: res.data.data
        }
    } catch(e){
        return {
            type: GET_ERROR,
            payload: "ERROR!"
        }
    }
}

export const updateTable = async(tid, title, number_seat, token) =>{
    const body = JSON.stringify({title, number_seat})
    try{
        const res = await axios.put(`http://${BASE_URL}/api/update-table/${tid}`, body, configAuth(token));
        console.log(res);
        return {
            type: UPDATE_TABLE,
            payload: res.data.data
        }
    } catch(e){
        return {
            type: GET_ERROR,
            payload: "ERROR!"
        }
    }
}

export const detailTable = async(tid, token) =>{
    try{
        const res = await axios.get(`http://${BASE_URL}/api/detail-table/${tid}`, configAuth(token))
        return {
            type: DETAIL_TABLE,
            payload: res.data.data
        }
    } catch(e){
        return {
            type: GET_ERROR,
            payload: "ERROR!"
        }
    }
}

export const detailDish= async(did, token)=>{
    try{
        const res = await axios.get(`http://${BASE_URL}/api/dish/${did}`, configAuth(token))
        if(res.data.success == true){
            return {
                type: DETAIL_DISH,
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

export const getDishesOfRestaurant= async(rid, token)=>{
    try{
        const res = await axios.get(`http://${BASE_URL}/api/dishes-of-restaurant/${rid}`, configAuth(token))
        if(res.data.success == true){
            return {
                type: GET_DISH_OF_RES,
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

export const updateOrderItem= async(oid, did, quantity, token)=>{
    try{
        const res = await axios.put(`http://${BASE_URL}/api/update-order-item/${oid}/${did}`, null ,
        {params: {quantity: quantity}, ...configAuth(token)} )
        if(res.data.success == true){
            return {
                type: UPDATE_ORDER_ITEM,
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

export const deleteOrderItem= async(oid, did, token)=>{
    try{
        const res = await axios.get(`http://${BASE_URL}/api/delete-order-item/${oid}/${did}`, configAuth(token))
        if(res.data.success == true){
            return {
                type: DELETE_ORDER_ITEM,
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

export const changeStatus= async(product_status, oid, token)=>{
    try{
        const res = await axios.put(`http://${BASE_URL}/api/update-status-order/${oid}`, null,
        { params: { status: product_status }, ...configAuth(token)})
        if(res.data.success == true){
            return {
                type: CHANGE_STATUS,
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

export const getRestaurantDetail= async(rid)=>{
    try{
        const res = await axios.get(`http://${BASE_URL}/api/restaurant/${rid}`, config)
        return {
            type: RES_DETAIL,
            payload: res.data.data
        }
    } catch(e){
        return {
            type: GET_ERROR,
            payload: "ERROR!"
        }
    }
}

export const change_account = async(form, img, rid, token)=>{
    const {title, description, phone, address, time_open, time_close} = form;
    const image = img;
    const formData = new FormData();
    console.log(form)
    formData.append("address", address);
    formData.append("description", description);
    formData.append("time_open", time_open);
    formData.append("time_close", time_close);
    formData.append('image', image);
    formData.append("title", title);
    formData.append("phone", phone);

    try{
        const res = await axios.post(`http://${BASE_URL}/api/change-restaurant/${rid}`, formData, configAuthFile(token))
        return {
            type: CHANGE_RESTAURANT,
            payload: res.data.data
        }
    } catch(e){
        return {
            type: GET_ERROR,
            payload: e
        }
    }
}