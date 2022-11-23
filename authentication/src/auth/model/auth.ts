import { Role } from "commonDataModel";

export interface ExtractedRefreshToken {
    userId: string;
    refreshToken: string;
}

export interface DecryptedAccessToken {
    email: string;
    roles: Role[];
    sub: string;
    iat: number;
    exp: number;
}
