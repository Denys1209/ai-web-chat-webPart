"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { login } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
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
            router.push("/users/threads");
        } catch {
            setError("Invalid email or password");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Welcome back</CardTitle>
                    <CardDescription>Log in to continue to your threads.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="login-email">Email</FieldLabel>
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
                                <FieldLabel htmlFor="login-password">Password</FieldLabel>
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
                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? "Signing in..." : "Log in"}
                            </Button>
                        </FieldGroup>

                    </form>
                </CardContent>

            </Card>

        </div>
    );
}
