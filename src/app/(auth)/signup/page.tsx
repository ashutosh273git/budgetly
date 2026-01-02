"use client";

import { authClient } from "@/libs/auth-client";
import { email } from "better-auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function SignupPage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    await authClient.signUp.email(
      {
        name: form.name,
        email: form.email,
        password: form.password,
      },
      {
        onSuccess: () => {
          router.push("/dashboard");
        },
        onError: (ctx) => {
          setError(ctx.error.message);
          setLoading(false);
        },
      }
    );
  };

  const handleGoogle = async() => {
    await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard"
    })
  }
  if (isPending) return <p>Loading...</p>;
  return <div>page</div>;
}
