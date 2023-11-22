"use client";

import AuthBtn from "@/app/components/formFields/AuthBtn";
import AuthField from "@/app/components/formFields/AuthField";
import { APIRoutes } from "@/app/data/APIRoutes";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";

const SignupForm = () => {
    const router = useRouter();
    const form = useForm();
    const { formState } = form;
    const { errors } = formState;

    const onSubmit = async (data) => {
        console.log("Form submitted:", data);

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (result.error) {
            alert(result.error);
            return;
        }

        const loginStatus = await signIn("credentials", {
            email: result.email,
            password: data.password,
            redirect: false
        });

        if (!loginStatus.error) {
            router.push(APIRoutes.dashboard.href);
        } else {
            console.log(res);
            alert(res.error);
        }
    };

    return (
        <>
            <h2 className="text-2xl mb-4">Signup</h2>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
                {/* Name */}
                <AuthField name="Name" form={form} />

                {/* Email */}
                <AuthField name="Email" form={form} />

                {/* Password */}
                <AuthField name="Password" form={form} />

                {/* login button */}
                <AuthBtn name="Signup" />
            </form>
            <Link href="/auth/login" className="block mt-3 text-end">
                Already have an account? &nbsp;
                <span className="underline text-blue-500">Login</span>
            </Link>
        </>
    );
};

export default SignupForm;
