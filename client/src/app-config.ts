interface appConfig {

    backendBaseUrl: string,
    authBaseUrl: string
}

export default {
    
    backendBaseUrl: window["env"].BACKEND_BASE_URL,
    authBaseUrl: window["env"].AUTH_BASE_URL

} as appConfig