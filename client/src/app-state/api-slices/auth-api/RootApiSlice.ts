import appConfig from '../../../app-config'
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


const authApiSlice = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: appConfig.authBaseUrl }),
    endpoints: builder => ({ })
});

export default authApiSlice