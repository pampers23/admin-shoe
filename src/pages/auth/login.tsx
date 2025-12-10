import { LoginForm } from "@/components/login-form"

export default function Login() {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      {/* Blurred background image */}
      <div 
        className="absolute inset-0 -z-10 bg-cover bg-center blur-sm"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=2071')",
        }}
      />
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 -z-10 bg-black/40" />
      
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}