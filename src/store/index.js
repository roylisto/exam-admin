import { init } from "@rematch/core"
import admin from "./AdminReducers"
import jadwalTest from "./JadwalTestReducers"
import peserta from "./PesertaReducers"

const models = {
    admin,
    jadwalTest,
    peserta
}

const store = init ({
    models,
})

export default store

export const { dispatch } = store