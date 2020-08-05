import { init } from "@rematch/core"
import admin from "./Admin"

const models = {
    admin,
}

const store = init ({
    models,
})

export default store

// export const { dispatch } = store