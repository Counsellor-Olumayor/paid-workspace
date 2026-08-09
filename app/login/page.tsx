// app/login/page.tsx
import { signIn } from "@/auth"

export default function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <form
        action={async () => {
          "use server"
          await signIn("github", { redirectTo: "/dashboard" })
        }}
      >
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded-md font-medium"
        >
          Sign in with GitHub
        </button>
      </form>
    </div>
  )
}