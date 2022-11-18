
export interface AuthenticatedUser {
    id: string;
    email: string;
}

export interface LoginInfoDTO {
    email: string;
    password: string;
}

export interface JwtTokens {
    accessToken: string;
    refreshToken: string;
}