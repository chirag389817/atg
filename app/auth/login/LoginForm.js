"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import AuthField from "@/app/components/formFields/AuthField";
import AuthBtn from "@/app/components/formFields/AuthBtn";
import Link from "next/link";
import { APIRoutes } from "@/app/data/APIRoutes";

const LoginForm = () => {
    const router = useRouter();
    const form = useForm();

    const onSubmit = async (data) => {
        const res = await signIn("credentials", {
            ...data,
            redirect: false
        });
        console.log(res);

        if (!res.error) {
            router.push(APIRoutes.dashboard.href);
        } else {
            console.log(res);
            alert(res.error);
        }
    };

    return (
        <>
            <h2 className="text-2xl mb-4">Login</h2>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
                {/* Email */}
                <AuthField name="Email" form={form} />

                {/* Password */}
                <AuthField name="Password" form={form} />

                {/* login button */}
                <AuthBtn name="Login" />
            </form>
            <Link href="/auth/signup" className="block mt-3 text-end">
                Don't have an account? &nbsp;
                <span className="underline text-blue-500">Signup</span>
            </Link>
        </>
    );
};

export default LoginForm;
