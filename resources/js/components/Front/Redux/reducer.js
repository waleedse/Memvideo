
const current_state = {
    user:{data:{},is_login:false},
    videos:[],
    settings:[],
    auth_modal:'',
    payment_modal:false,
    banner_video:[]
}
const reducer = (state = current_state,action) =>{
    if(action.type == 'CHANGE_USER'){
        return {
            ...state,
            user:action.payload
        }
    }else if(action.type == 'CHANGE_VIDEOS'){
        return {
            ...state,
            videos:action.payload
        }
    }
    else if(action.type == 'CHANGE_SETTINGS'){
        return {
            ...state,
            settings:action.payload
        }
    }
    else if(action.type == 'CHANGE_AUTH_MODAL'){
        return {
            ...state,
            auth_modal:action.payload
        }
    }
    else if(action.type == 'CHANGE_PAYMENT_MODAL'){
        console.log(action);
        return {
            ...state,
            payment_modal:action.payload
        }
    }
    else if(action.type == 'CHANGE_BANNER_VIDEO'){
        console.log(action);
        return {
            ...state,
            banner_video:action.payload
        }
    }
    return state;
}

export default reducer;