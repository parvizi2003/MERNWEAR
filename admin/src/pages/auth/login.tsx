import { useLogin } from "@/api/auth/use-login";
import { InputError } from "@/components/shared";
import { Button, Input, Label } from "@/components/ui";
import { AppLayoutSecondary } from "@/layouts";
import type { LoginFormValues } from "@/types";
import { useForm } from "react-hook-form";

export function Login() {
  const { handleLogin, isPending, error } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  return (
    <AppLayoutSecondary
      title="Login to your account"
      description="Enter your email and password below to log in"
    >
      <form
        className="flex flex-col gap-6 mb-8"
        onSubmit={handleSubmit(handleLogin)}
      >
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email", {
                required: "Please enter email.",
              })}
              name="email"
              id="email"
              type="email"
              autoComplete="email"
              placeholder="example@example.com"
            />
            <InputError message={errors.email?.message ?? error ?? undefined} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              {...register("password", {
                required: "Please enter password.",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters.",
                },
              })}
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Password"
            />
            <InputError message={errors.password?.message} />
          </div>
          <Button className="mt-4" isPending={isPending}>
            Log in
          </Button>
        </div>
      </form>
    </AppLayoutSecondary>
  );
}
