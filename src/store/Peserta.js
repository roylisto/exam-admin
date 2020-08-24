import { GetData, PostData } from "../services/Agent"

const peserta = {
    state : {
        data : [], // all data peserta
        status : "",
    },
    reducers : {
        SET_PESERTALIST(state, payload) { // list peserta
            return { ...state, ...payload };
        }
    },
    effects: dispatch => ({
        async fetchPesertaList() {
            await GetData('users')
                .then((result)=>{
                    if(result.status === "OK") {
                        dispatch.peserta.SET_PESERTALIST({data : result.data});
                    }
                })
        },
        async addPeserta(payload) {
            await PostData('users/peserta',payload)
                .then((result)=>{
                    if(result.status === "OK") {
                        window.location.reload();
                    }
                })
        },
    })
}

export default peserta