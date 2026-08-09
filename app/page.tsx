import { auth, signIn } from "@/auth"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"

export default async function Home() {
  const session = await auth()

  // Automatically redirect authenticated users to their workspace
  if (session?.user) {
    redirect("/dashboard")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-50">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
          Paid Workspace
        </h1>
        <p className="text-lg text-slate-600">
          Sign in to access your workspace dashboard.
        </p>
        <form
          action={async () => {
            "use server"
            await signIn("github")
          }}
        >
          <Button type="submit" size="lg">
            Sign In with GitHub
          </Button>
        </form>
      </div>
    </main>
  )
}