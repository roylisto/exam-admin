import { 
    PostData, 
    GetData,
    DeleteData,
    UpdateData
} from "../services/Agent"

const admin = {
    state : {
        token : '',
        error : false,
        userAdminList : [],
        message : '',
        errorMsg : ''
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
                    else {
                        dispatch.admin.updateError({errorMsg : result.error});
                    }
                })
        },
        async addUserAdmin(payload) {
            await PostData('admin',payload)
                .then((result)=>{
                    if(result.status === "OK") {
                        dispatch.admin.SET_LIST_ADMIN({message : result.message});
                        window.location.reload();
                    }
                    else {
                        dispatch.admin.updateError({errorMsg : "Internal Server Error"});
                    }
                })
        },
        async editUserAdmin(data) {
            await UpdateData('admin',data)
                .then((result)=>{
                    if(result.status === "OK") {
                        window.location.reload();
                    }
                    else {
                        dispatch.admin.updateError({errorMsg :result.message});
                    }
                })
        },
        async hapusUserAdmin(id) {
            await DeleteData('admin',id)
                .then((result)=>{
                    if(result.status === "OK") {
                        window.location.reload();
                    }
                    else {
                        dispatch.admin.updateError({errorMsg :"Internal Server Error"});
                    }
                })
        }
    })
}

export default admin