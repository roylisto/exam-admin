import { PostData } from "../services/Agent"

const admin = {
    state : {
        token : '',
        error : false
    },
    reducers : {
        updatetoken(state, payload) {
            return { ...state, ...payload };
        },
        updateError(state, payload) {
            return { ...state, ...payload };
        }
    },
    effects: dispatch => ({
        async login(payload, rootState) {
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
        }
    })
}

export default admin