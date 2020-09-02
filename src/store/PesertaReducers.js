import { GetData, PostData } from "../services/Agent"

const peserta = {
    state : {
        data : [], // all data peserta
        status : "",
        errorMsg : ""
    },
    reducers : {
        SET_PESERTALIST(state, payload) { // list peserta
            return { ...state, ...payload };
        },
        SET_ERROR_STATUS(state, payload) { 
            return { ...state, ...payload };
        },
    },
    effects: dispatch => ({
        async fetchPesertaList(params) {
            await GetData('peserta/test/',params)
                .then((result)=>{
                    if(result.status === "OK") {
                        dispatch.peserta.SET_PESERTALIST({data : result.data.peserta});
                    }
                })
        },
        async addPeserta(payload) {
            await PostData('users/peserta',payload)
                .then((result)=>{
                    if(result.status === "OK") {
                        window.location.reload();
                    }
                    else if (result.status === "ERROR") {
                        dispatch.peserta.SET_ERROR_STATUS({errorMsg : result.messages})
                    }
                })
        },
    })
}

export default peserta