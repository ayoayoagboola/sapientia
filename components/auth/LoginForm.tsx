"use client";

import * as z from "zod";

import Link from "next/link";

import { useTransition } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Header } from "../ui/header";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas";
import { Social } from "./Social";
import { login } from "@/actions/login";
import { zodResolver } from "@hookform/resolvers/zod";

// TODO: refactor error + success functionality

export const LoginForm = () => {
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

  const { register } = form;

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(values).then((data) => {
        if (data?.error) {
          form.reset();
        }

        if (data?.success) {
          form.reset();
        }
      });
    });
  };
  return (
    <Card className="flex-col p-8 rounded-[24px]">
      <div className="mb-2">
        <Header title={"Welcome Back!"} label={"Cogito, ergo sum."} />
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center space-y-4 w-full"
      >
        <div className="w-full flex flex-col gap-y-1.5">
          <Input
            placeholder="Email"
            type="email"
            disabled={isPending}
            {...register("email")}
          />
          <Input
            placeholder="Password"
            type="password"
            disabled={isPending}
            {...register("password")}
          />
          <div className="flex w-full items-end justify-end">
            <Button variant="link" className="text-xs p-0">
              <Link href="/reset-password">Forgot your password?</Link>
            </Button>
          </div>
        </div>
        <Button className="w-full" type="submit" disabled={isPending}>
          Log in
        </Button>
      </form>
      <div className="flex w-full justify-between items-center gap-x-2">
        <div className="w-full h-[1px] bg-slate-300 rounded"></div>
        <p className="w-full text-xs text-nowrap text-slate-500">
          or continue with
        </p>
        <div className="w-full h-[1px] bg-slate-300 rounded"></div>
      </div>
      <div className="w-full">
        <Social />
      </div>
      <div className="flex gap-x-1 text-xs font-medium">
        <p>Don`&apos;`t have an account?</p>
        <Link
          href="/signup"
          className="text-slate-500 underline-offset-4 hover:underline"
        >
          Register now
        </Link>
      </div>
    </Card>
  );
};
