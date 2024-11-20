"use client";

import * as z from "zod";

import Link from "next/link";

import { useSearchParams } from "next/navigation";

import { useTransition } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Header } from "../ui/header";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas";
import { Social } from "./Social";
import { login } from "@/actions/login";
import { zodResolver } from "@hookform/resolvers/zod";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email is already in use!"
      : "";

  // const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  const {
    register,
    formState: { errors },
  } = form;

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            setError(data.success);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };
  return (
    <Card className="flex-col w-72">
      <Header title={"Login Form!"} label={"time to login!"} />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <div className="space-y-4">
            <>
              <div className="gap-y-2">
                <Label>Email</Label>
                <Input
                  placeholder="john.smith@example.com"
                  type="email"
                  disabled={isPending}
                  {...register("email")}
                />
              </div>
              <div className="gap-y-2">
                <Label>Password</Label>
                <Input
                  placeholder="******"
                  type="password"
                  disabled={isPending}
                  {...register("password")}
                />
              </div>
            </>
        </div>
        <Link href="/reset-password">Forgot password?</Link>
        <Button className="w-full" type="submit" disabled={isPending}>
          Submit
        </Button>
      </form>
      <div className="w-full">
        <Social />
      </div>
      <Link href="/register">
        <p className="text-sm">"Don't have an account?"</p>
      </Link>
    </Card>
  );
};
