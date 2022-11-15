
interface appConfig {
    baseUrl: string
}

export default {
    baseUrl: window["env"].REACT_APP_BASE_URL
} as appConfig