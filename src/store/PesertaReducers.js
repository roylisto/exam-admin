import { GetData, PostData } from "../services/Agent"
import { alertNotification } from "../modules/utils"

const peserta = {
    state : {
        data : [], // all data peserta
        status : "",
        errorMsg : "",
        dataPeserta : null // data find peserta by email
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
                        dispatch.peserta.fetchPesertaList(payload.jadwal_test);
                        alertNotification(
                            "success",
                            "",
                            "Data Berhasil Ditambahkan"
                        );
                    }
                    else {
                        dispatch.peserta.SET_ERROR_STATUS({errorMsg : "Data input tidak valid"});
                        alertNotification(
                            "Error",
                            "",
                            "Internal Server Error"
                        );
                    }
                })
        },
        async exportPeserta(payload) {
            await GetData(payload.route, payload.params)
                .then((result)=>{
                    if(result.download !== undefined) {
                        let string = result.download.search("file="),
                            filename = result.download.substring(string+5,string.length);

                        fetch(result.download, {
                            method: 'GET',
                            headers: {
                            'x-access-token' : localStorage.getItem("token")
                            },
                        })
                        .then((response) => response.blob())
                        .then(blob => {
                            let url = window.URL.createObjectURL(blob);
                            let a = document.createElement('a');
                            a.href = url;
                            a.download = filename;
                            a.click();
                        })
                    }
                })
        },
        async getPesertaByEmail(params) {
            await GetData('users?email=',params)
                .then((result)=>{
                    if(result.status === "OK" && Object.keys(result.data).length !== 0) {
                        dispatch.peserta.SET_PESERTALIST({dataPeserta : result.data});
                        return;
                    }
                    if(result.messages !== "") {
                        dispatch.peserta.SET_ERROR_STATUS({errorMsg : result.messages})
                        alertNotification(
                            "error",
                            "",
                            "Data Tidak Ditemukan"
                        );
                    }
                })
        },
    })
}

export default peserta