import { PostData, GetData } from "../services/Agent"

const admin = {
    state : {
        token : '',
        error : false,
        userAdminList : []
    },
    reducers : {
        updatetoken(state, payload) {
            return { ...state, ...payload };
        },
        updateError(state, payload) {
            return { ...state, ...payload };
        },
        SET_LIST_ADMIN(state, payload) {
            return { ...state, ...payload };
        }
    },
    effects: dispatch => ({
        async login(payload) {
            await PostData('login',payload)
                .then((result)=>{
                    if(result.token) {
                        dispatch.admin.updatetoken({token : result.token});
                        localStorage.setItem("token",result.token)
                    }
                    else {
                        dispatch.admin.updateError({error : true});
                    }
                })
        },
        async fetchListAdmin() {
            await GetData('admin',)
                .then((result)=>{
                    if(result.status === "OK") {
                        dispatch.admin.SET_LIST_ADMIN({userAdminList : result.data});
                    }
                })
        }
    })
}

export default admin