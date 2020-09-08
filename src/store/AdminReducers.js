import { 
    PostData, 
    GetData,
    DeleteData,
    UpdateData
} from "../services/Agent"
import { parseJwt } from "../modules/utils"

const admin = {
    state : {
        token : '',
        error : false,
        userAdminList : null,
        message : '',
        errorMsg : '',
        role : '',
        username : 'Admin'
    },
    reducers : {
        updatetoken(state, payload) {
            state.token = payload;
            return { ...state, ...payload };
        },
        updateRole(state, payload) {
            state.role = payload;
            return { ...state, ...payload };
        },
        updateUsername(state, payload) {
            state.username = payload;
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
                        let jwtParse  = parseJwt(result.token)

                        dispatch.admin.updatetoken(result.token);
                        dispatch.admin.updateRole(jwtParse.data.role);
                        dispatch.admin.updateUsername(jwtParse.data.name);
                        
                        localStorage.setItem("token",result.token);
                        localStorage.setItem("role",jwtParse.data.role);
                        localStorage.setItem("username",jwtParse.data.name);
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
                        dispatch.admin.updateError({errorMsg :"Internal Server Error"});
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