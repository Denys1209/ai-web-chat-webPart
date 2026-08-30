"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { register } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {

    const router = useRouter();

    const {setAuth} = useAuth();

    const [displayedName, setDisplayedName] = useState("");
    const [gmail, setGmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            const result = await register({displayedName, gmail, password});
            setAuth(result);
            router.push("/users/threads");
        } catch(err) {
            setError(err instanceof Error ? err.message : "Registration failed");
            router.push("/users/threads");

        } 
        finally{
            setIsSubmitting(false);
        }
    }


    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Create an account</CardTitle>
                    <CardDescription>
                        Enter your details below to get started.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="register-name"> Displayed Name </FieldLabel>
                                <Input 
                                id="register-name"
                                value={displayedName}
                                onChange={(e) => setDisplayedName(e.target.value)}
                                required
                                />
                            </Field>
                        </FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="register-email">Email</FieldLabel>
                            <Input
                                id="register-email"
                                type="email"
                                value={gmail}
                                onChange={(e) => setGmail(e.target.value)}
                                required
                            />
                            <FieldDescription>
                                We will send updates to this address.
                            </FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="register-password">Password</FieldLabel>
                            <Input id="register-password" type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={3}
                            />
                        </Field>
                        {
                            error && (
                                <p className="text-sm text-destructive" role="alert">
                                    {error}
                                </p>
                            )
                        }


                        <Field orientation="horizontal" className="mt-3">
                            <Button type="reset" variant="outline"
                             className="flex-1"
                             onClick={() => setError(null)}
                             >
                                Reset
                            </Button>
                            <Button type="submit" className="flex-1"
                            disabled={isSubmitting}
                            >
                                {isSubmitting ? "Creating account..." : "Submit"}
                            </Button>

                        </Field>
                    </form>
                </CardContent>

            </Card>

        </div>
    )
}