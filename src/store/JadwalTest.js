import { PostData, GetData } from "../services/Agent"
import { result } from "lodash";

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
        async fetchJadwalTest(token) {
            await GetData('jadwal-test',token)
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
        }
    })
}

export default jadwalTest