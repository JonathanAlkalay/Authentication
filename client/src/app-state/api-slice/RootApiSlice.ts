import appConfig from '../../app-config'
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: appConfig.baseUrl }),
    tagTypes: [],
    endpoints: () => ({ })
});