import { getAuthCookie } from "./cookies";
import { AuthResponse, LoginPayLoad, RegisterPayload } from "./types/authTypes";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http:localhost:5000";

function authHeaders(): HeadersInit
{
    const stored = getAuthCookie();
    if (!stored) return {};

    try {
        const parsed: AuthResponse = JSON.parse(stored);
        return {Authorization: `Bearer ${parsed.token}`};
    }catch {
        return {}
    }
}


async function postJson<ResponseType, RequestType>(path: string, body: RequestType) : Promise<ResponseType> {
    const res = await fetch(`${API_BASE}${path}`, {
        method: "POST",
        headers: {
            "content-Type": "application/json",
            ...authHeaders()
        },
        body: JSON.stringify(body),
    })

    if (!res.ok)
    {
        const message = await res.text();
        throw new Error(message || `Request failed with status ${res.status}`);
    }

    return res.json();
}

async function getJson<ResponseType>(path:string): Promise<ResponseType> {
    const res = await fetch(`${API_BASE}${path}`, {
        method: "GET",
        headers: {
            "content-Type": "application/json",
            ...authHeaders()
        },
    })

    if (!res.ok)
    {
        const message = await res.text();
        throw new Error(message || `Request failed with status ${res.status}`);
    }

    return res.json();
}

export const register = (payload: RegisterPayload) => postJson<AuthResponse, RegisterPayload>("/api/auth/register", payload);
export const login = (payload: LoginPayLoad) => postJson<AuthResponse, LoginPayLoad>("/api/auth/login", payload);