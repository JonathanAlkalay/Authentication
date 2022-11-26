
export interface AuthenticatedUser {
    id: string;
    email: string;
    roles: Role[];
}

export interface LoginInfoDTO {
    email: string;
    password: string;
}

export interface CreateUserDTO {
    email: string;
    password: string;
}

export interface AlterRolesDto {
    roles: Role[];
}

export interface JwtTokens {
    accessToken: string;
    refreshToken: string;
}

export type Role = 'ADMIN' | 'USER'