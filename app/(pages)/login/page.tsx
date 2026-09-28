"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { login } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { emit } from "process";
import { useState } from "react";


export default function loginPage()
{
    const router = useRouter();

    const {setAuth} = useAuth();

    const [gmail, setGmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState<string | null>(null);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.SubmitEvent) => 
    {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try 
        {
            const result = await login({gmail, password});
            setAuth(result);
            router.push("/user/threads");

        }
        catch 
        {
            setError("Invalid email or password");
        } finally 
        {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center p-4 bg-black">
            <Card className="w-full max-w-sm bg-black border-white border shadow-md shadow-white text-white ">
                <CardHeader>
                    <CardTitle className="text-2xl text-white">
                        Welcome back
                    </CardTitle>
                    <CardDescription className="text-white">
                        Log in to continue to your threads.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <FieldGroup>
                            <FieldLabel htmlFor="login-email" className="white-text">
                                Email
                            </FieldLabel>
                            <Input
                            id="login-email"
                            type="email"
                            placeholder="name@example.com"
                            value={gmail}
                            onChange={(e) => setGmail(e.target.value)}
                            required
                            >
                            </Input>
                        </FieldGroup>
                        <FieldGroup className="mt-2">
                            <FieldLabel htmlFor="login-password" className="white-text">
                                Password
                            </FieldLabel>
                            <Input
                            id="login-password"
                            type="password"
                            placeholder="name@example.com"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            >
                            </Input>
                        </FieldGroup>
                        { error &&( <p className="text-sm text-destructive" role="alert">
                        {error}
                        </p>
                        )}
                        <Field className="mt-1 mb-1 text-white">
                            <Link href={'/register'}>
                            Don't have an account?
                            </Link>
                        </Field>
                        <Button type="submit" className="w-full text-white bg-indigo-700 cursor-pointer hover:bg-amber-700" disabled={isSubmitting}>
                        {
                            isSubmitting ? "Signing in..." : "Log in"
                        }
                        </Button>
                    </form>
                </CardContent>

            </Card>
        </div>
    );

}