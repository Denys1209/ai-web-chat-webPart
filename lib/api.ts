import type { AuthResponse, LoginPayload, RegisterPayload } from "./authTypes";


const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http:localhost:5000"

async function postJson<ResponseType, RequestType>(path:string, body: RequestType) : Promise<ResponseType> {

    const res = await fetch(`${API_BASE}${path}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body),
    });

    if (!res.ok)
    {
        const message = await res.text();
        throw new Error(message || `Request failed with status ${res.status}`);
    }

    return res.json();
}


export const register = (paylod: RegisterPayload) => postJson<AuthResponse, RegisterPayload>("/api/auth/register", paylod);

export const login = (payload: LoginPayload) => 
        postJson<AuthResponse, LoginPayload>("/api/auth/login", payload);


