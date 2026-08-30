"use client";

const COOKIE_NAME = "auth";
const MAX_AGE_SECONDS = 60*60*24*7;


export function setAuthCookie(value: string)
{
    const isSecureContext = typeof window !== "undefined" && window.location.protocol === "https:";

    document.cookie = [
        `${COOKIE_NAME}=${encodeURIComponent(value)}`,
        'Path=/',
        `Max-Age=${MAX_AGE_SECONDS}`,
        'SameSite=Lax',
        isSecureContext ? "secure" : ""
    ]
    .join("; ");
}



export function getAuthCookie(): string | null {
    if (typeof document == "undefined") return null;

    const match = document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${COOKIE_NAME}=`));
    
    if (!match) return null;

    return decodeURIComponent(match.split("=").slice(1).join("="));
}

export function clearAuthCookie() {
    document.cookie = '${COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax';
}