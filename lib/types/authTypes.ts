export interface AuthResponse 
{
    displayedName: string,
    gmail: string,
    token: string,
    id: string,
}

export interface RegisterPayload 
{
    displayedName: string;
    gmail: string;
    password: string;
}

export interface LoginPayload
{
    gmail: string;
    password: string;
}

