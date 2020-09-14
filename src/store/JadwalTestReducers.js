import { PostData, GetData, UpdateData, DeleteData } from "../services/Agent"

const jadwalTest = {
    state : {
        data : null,
        status : ""
    },
    reducers : {
        SET_JADWAL_TEST(state, payload) {
            return { ...state, ...payload };
        },
        UPDATE_JADWAL_TEST(state, payload) {
            return { ...state, ...payload };
        },
    },
    effects: dispatch => ({
        async fetchJadwalTest() {
            await GetData('jadwal-test')
                .then((result)=>{
                    if(result.status === "OK") {
                        dispatch.jadwalTest.SET_JADWAL_TEST({data : result.data});
                    }
                })
        },
        async addJadwalTest(payload) {
            await PostData('jadwal-test',payload)
                .then((result)=>{
                    if(result.status === "OK") {
                        dispatch.jadwalTest.UPDATE_JADWAL_TEST({status : "add-jadwal-test"});
                        dispatch.jadwalTest.fetchJadwalTest()
                    }
                })
        },
        async editJadwalTest(data) {
            await UpdateData('jadwal-test',data)
                .then((result)=>{
                    if(result.status === "OK") {
                        dispatch.jadwalTest.UPDATE_JADWAL_TEST({status : "edit-jadwal-test"});
                        dispatch.jadwalTest.fetchJadwalTest()
                    }
                })
        },
        async hapusJadwalTest(id) {
            await DeleteData('jadwal-test',id)
                .then((result)=>{
                    if(result.status === "OK") {
                        dispatch.jadwalTest.UPDATE_JADWAL_TEST({status : "hapus-jadwal-test"});
                        dispatch.jadwalTest.fetchJadwalTest()
                    }
                })
        }
    })
}

export default jadwalTest