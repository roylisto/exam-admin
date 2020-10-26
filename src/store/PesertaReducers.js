import {
    GetData,
    PostData,
    UpdateData,
    DeleteData
} from "../services/Agent";
import { alertNotification } from "../modules/utils";

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
                    else {
                        alertNotification(
                            "error",
                            "",
                            "Internal Server Error"
                        );
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
                            "error",
                            "Gagal Tambah Peserta",
                            "Data input harus unik."
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
                })
        },
        async editPeserta(payload) {
            await UpdateData('peserta',payload.data)
                .then((result)=>{
                    if(result.status === "OK") {
                        dispatch.peserta.fetchPesertaList(payload.id_jadwaltest);
                        alertNotification(
                            "success",
                            "",
                            "Perubahan data disimpan."
                        );
                    }
                    else {
                        dispatch.peserta.SET_ERROR_STATUS({errorMsg : "Data input tidak valid"});
                        alertNotification(
                            "error",
                            "Gagal Edit Peserta",
                            "Data input harus unik."
                        );
                    }
                })
        },
        async hapusPeserta(payload) {
            await DeleteData('peserta',payload.id_peserta)
                .then((result)=>{
                    if(result.status === "OK") {
                        dispatch.peserta.fetchPesertaList(payload.id_jadwaltest);
                        alertNotification(
                            "success",
                            "",
                            "Data berhasil di Hapus."
                        );
                    }
                    else {
                        alertNotification(
                            "error",
                            "",
                            "Jadwal test belum dimulai."
                        );
                    }
                })
        }
    })
}

export default peserta