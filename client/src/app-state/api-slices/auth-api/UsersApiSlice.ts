import { JwtTokens, LoginInfoDTO } from "commonDataModel";
import  AuthApiSlice from "./RootApiSlice";


const UsersApiSlice = AuthApiSlice.injectEndpoints({
    endpoints: builder => ({

      login: builder.query<JwtTokens, LoginInfoDTO>({
        query: (loginInfo: LoginInfoDTO) => {
          return {
            url: 'users/login',
            method: 'POST',
            body: loginInfo
          }
        },
        async onQueryStarted( _ , { queryFulfilled }) {
          
          const { data } = await queryFulfilled;

          window.localStorage.setItem('accessToken', data.accessToken);
          window.localStorage.setItem('refreshToken', data.refreshToken);
          window.localStorage.setItem('isLoggedIn', 'true');
        }
      }),
    }),
  })
  
export const {
  useLazyLoginQuery
} = UsersApiSlice