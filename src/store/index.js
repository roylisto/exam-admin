import { init } from "@rematch/core"
import admin from "./Admin"
import jadwalTest from "./JadwalTest"

const models = {
    admin,
    jadwalTest
}

const store = init ({
    models,
})

export default store
