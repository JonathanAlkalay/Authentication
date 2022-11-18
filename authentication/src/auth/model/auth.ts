
export interface ExtractedRefreshToken {
    userId: string;
    refreshToken: string;
}

export interface DecryptedAccessToken {
    email: string;
    sub: string;
    iat: number;
    exp: number;
}
