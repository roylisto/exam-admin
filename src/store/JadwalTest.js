import { PostData, GetData, UpdateData } from "../services/Agent"

const jadwalTest = {
    state : {
        data : [],
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
                    }
                })
        },
        async editJadwalTest(data) {
            await UpdateData('jadwal-test',data)
                .then((result)=>{
                    if(result.status === "OK") {
                        dispatch.jadwalTest.UPDATE_JADWAL_TEST({status : "edit-jadwal-test"});
                    }
                })
        }
    })
}

export default jadwalTest