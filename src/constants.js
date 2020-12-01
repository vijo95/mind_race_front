const realHost = 'https://mind-race.herokuapp.com'
const localhost = "http://localhost:8000"

const apiURL = "/api"

export const endpoint = `${realHost}${apiURL}`

export const guestCreateProfile = `${endpoint}/guest-create-profile/`
export const searchContender = `${endpoint}/search-contender/`
export const createGame = `${endpoint}/create-game/`
export const home = `${endpoint}/home/`
export const gameInfo = `${endpoint}/game-info/`
export const generateQuestion = `${endpoint}/generate-question/`
export const pickQuestion = `${endpoint}/pick-question/`
export const submitPickOption = `${endpoint}/pick-option/`
