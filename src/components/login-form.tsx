// import { GalleryVerticalEnd } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Logo from "./logo"
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { loginWithAdminCode } from "@/actions/auth"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [adminCode, setAdminCode] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: ({ adminCode, password }: { adminCode: string; password: string }) =>
      loginWithAdminCode(adminCode, password),
    onSuccess: () => {
      toast.success("Logged in successfully");
      navigate("/dashboard");
    },
    onError: () => {
      toast.error("Invalid Admin Code or Password");
    }
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ adminCode, password });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleLogin}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
                <Logo className="h-40 w-auto md:h-28" />
            </a>
            <h1 className="text-xl font-bold text-white">Welcome to Shoe ArtisTry</h1>
          </div>
          <Field className="text-white ">
            <FieldLabel htmlFor="adminCode">User ID</FieldLabel>
            <Input
              id="adminCode"
              type="text"
              placeholder="Enter your User ID"
              className="placeholder:text-gray-300 text-white border-white bg-white/10 focus:bg-white/20"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
              autoComplete="username"
              disabled={loginMutation.isPending}
              required
            />
          </Field>

          <Field className="text-white ">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="placeholder:text-gray-300 text-white border-white bg-white/10 focus:bg-white/20"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loginMutation.isPending}
              autoComplete="current-password"
              required
            />
          </Field>
          <Field>
            <Button type="submit" className="w-full cursor-pointer" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                  Aunthenticating...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </Field>
        </FieldGroup>
      </form>
      <FieldDescription className="px-6 text-center text-white">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
