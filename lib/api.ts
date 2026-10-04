import type { AuthResponse, LoginPayload, RegisterPayload } from "./types/authTypes";
import { getAuthCookie } from "./cookies";
import { CreateThreadDto, GetThreadDto } from "./types/threadTypes";
import { AddMessageResponse, CreateMessageDto, GetMessageDto } from "./types/messageTypes";
import { read } from "fs";


const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000"

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


export async function streamMessageToThread(
    id: string,
    payload: CreateMessageDto,
    onToken: (token: string) => void,
    signal?: AbortSignal
):Promise<void> {
    const res = await fetch(`${API_BASE}/api/threads/${id}/messages/stream`, 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "text/event-stream",
                ...authHeaders(),
            },
            body: JSON.stringify(payload),
            signal
        });

        if (!res.ok || !res.body)
        {
            const message = await res.text();
            throw new Error(message || `Request failed with status ${res.status}`);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while(true)
        {
            const {value, done} = await reader.read();

            if (done) break;

            buffer += decoder.decode(value, {stream: true});

            const frames = buffer.split("\n\n");

            buffer = frames.pop() ?? "";

            for (const frame of frames)
            {
                for (const line of frame.split("\n"))
                {
                    if (!line.startsWith("data:")) continue;
                    
                    const json = line.slice(5).trim();

                    if (!json) continue;

                    try {
                        const {token } = JSON.parse(json) as {token: string};

                        onToken(token);
                    } catch {

                    }
                    
                }
            }

        }
}



export const register = (paylod: RegisterPayload) => postJson<AuthResponse, RegisterPayload>("/api/auth/register", paylod);

export const login = (payload: LoginPayload) => 
        postJson<AuthResponse, LoginPayload>("/api/auth/login", payload);

export const getThreads = () => getJson<GetThreadDto[]>(`/api/threads`);

export const createThread = (payload: CreateThreadDto) => postJson<{id:string}, CreateThreadDto>(`/api/threads`, payload);

export const getMessagesForThread = (id: string) => getJson<GetMessageDto[]>(`/api/threads/${id}`);

export const addMessageToThread = (id: string, payload: CreateMessageDto) => postJson<AddMessageResponse, CreateMessageDto>(`/api/threads/${id}/messages`, payload);

export const getImageUrl = (url:string) => `${API_BASE}/${url}`;




