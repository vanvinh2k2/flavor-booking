import { LOGIN_SUCCESS, GET_ERROR, LOGOUT, FRIEND_CHAT } from "../action/type";
const initialState = {
    email: localStorage.getItem('email'),
    username: localStorage.getItem('username'),
    id: localStorage.getItem('id'),
    // title: localStorage.getItem('title'),
    image: localStorage.getItem('avatar'),
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    friends: []
}

export default function (state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case LOGIN_SUCCESS:
            localStorage.setItem('email', payload.email);
            localStorage.setItem('username', payload.username);
            localStorage.setItem('id', payload.id);
            // localStorage.setItem('title', payload.title);
            localStorage.setItem('avatar', payload.avatar);
            localStorage.setItem('refresh', payload.token.refresh);
            localStorage.setItem('access', payload.token.access);
            if(payload.restaurant_id !=null) localStorage.setItem('rid', payload.restaurant_id);
            return {
                ...state,
                email: payload.email,
                username: payload.username,
                rid: payload.rid,
                title: payload.title,
                image: payload.image
            }
        case LOGOUT:
            localStorage.removeItem('username');
            localStorage.removeItem('email');
            localStorage.removeItem('id');
            // localStorage.removeItem('title');
            localStorage.removeItem('avatar');
            localStorage.removeItem('refresh');
            localStorage.removeItem('access');
            localStorage.removeItem('rid');
            return {
                ...state,
                token: null,
                email: null,
                avatar: null,
                username: null,
                id: null,
                // title: null,
                image: null,
            }
        case FRIEND_CHAT:
            return {
                ...state,
                friends: payload
            }
        case GET_ERROR:
        default: return state;
    }
}