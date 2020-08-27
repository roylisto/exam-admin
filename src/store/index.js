import { init } from "@rematch/core"
import admin from "./Admin"
import jadwalTest from "./JadwalTest"
import peserta from "./Peserta"

const models = {
    admin,
    jadwalTest,
    peserta
}

const store = init ({
    models,
})

export default store
