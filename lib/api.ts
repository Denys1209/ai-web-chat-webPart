import type { AuthResponse, LoginPayload, RegisterPayload } from "./types/authTypes";
import { getAuthCookie } from "./cookies";
import { CreateThreadDto, GetThreadDto } from "./types/threadTypes";
import { AddMessageResponse, CreateMessageDto, GetMessageDto } from "./types/messageTypes";


const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http:localhost:5000"

function authHeaders(): HeadersInit {
    const stored = getAuthCookie();

    if (!stored) return {};

    try {
        const parsed: AuthResponse = JSON.parse(stored);
        return {Authorization: `Bearer ${parsed.token}`}

    } catch {
        return {};
    }

}

async function postJson<ResponseType, RequestType>(path:string, body: RequestType) : Promise<ResponseType> {

    const res = await fetch(`${API_BASE}${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...authHeaders()
        },
        body: JSON.stringify(body),
    });

    if (!res.ok)
    {
        const message = await res.text();
        throw new Error(message || `Request failed with status ${res.status}`);
    }

    return res.json();
}

async function getJson<ResponseType>(path:string) : Promise<ResponseType> {
    const res = await fetch(`${API_BASE}${path}`, {
        method: "GET",
    
        headers: {
            "Content-Type": "application/json",
            ...authHeaders()
        },
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

export const getThreads = () => getJson<GetThreadDto[]>(`/api/threads`);

export const createThread = (payload: CreateThreadDto) => postJson<{id:string}, CreateThreadDto>(`/api/threads`, payload);

export const getMessagesForThread = (id: string) => getJson<GetMessageDto[]>(`/api/threads/${id}`);

export const addMessageToThread = (id: string, payload: CreateMessageDto) => postJson<AddMessageResponse, CreateMessageDto>(`/api/threads/${id}/messages`, payload);




