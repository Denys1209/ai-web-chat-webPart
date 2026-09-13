"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { login } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const router = useRouter();

    const { setAuth } = useAuth();

    const [gmail, setGmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            const result = await login({ gmail, password });
            setAuth(result);
            router.push("/user/threads");
        } catch {
            setError("Invalid email or password");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center  p-4 bg-black">
            <Card className="w-full max-w-sm bg-black border-white border-1 shadow-md shadow-white">
                <CardHeader>
                    <CardTitle className="text-2xl text-white">Welcome back</CardTitle>
                    <CardDescription className="text-white">Log in to continue to your threads.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="login-email" className="text-white">Email</FieldLabel>
                                <Input
                                    id="login-email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={gmail}
                                    onChange={(e) => setGmail(e.target.value)}
                                    required
                                ></Input>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="login-password" className="text-white">Password</FieldLabel>
                                <Input
                                    id="login-password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Field>
                            {error && (
                                <p className="text-sm text-destructive" role="alert">
                                    {error}
                                </p>
                            )}
                            <Field className="mt-1 mb-1 text-white">
                                <Link href="/register" >
                                    Don't have an account?
                                </Link>
                            </Field>

                            <Button type="submit" className="w-full text-white bg-indigo-700 cursor-pointer hover:bg-amber-700" disabled={isSubmitting}>
                                {isSubmitting ? "Signing in..." : "Log in"}
                            </Button>
                        </FieldGroup>

                    </form>
                </CardContent>

            </Card>

        </div>
    );
}
