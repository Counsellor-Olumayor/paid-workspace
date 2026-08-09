import { auth, signOut } from "@/auth"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r p-6 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="font-bold text-xl text-gray-800">Paid Workspace</div>
          <nav className="space-y-1">
            <Link
              href="/dashboard"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-black font-medium"
            >
              Overview
            </Link>
            <Link
              href="/dashboard/projects"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-black font-medium"
            >
              Projects
            </Link>
            <Link
              href="/dashboard/settings"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-black font-medium"
            >
              Settings
            </Link>
          </nav>
        </div>

        {/* User Account & Sign Out */}
        <div className="border-t pt-4 space-y-3">
          <div className="flex items-center space-x-3">
            {session.user.image && (
              <img
                src={session.user.image}
                alt="User Avatar"
                className="w-8 h-8 rounded-full border"
              />
            )}
            <div className="truncate">
              <p className="text-sm font-semibold text-gray-800 truncate">
                {session.user.name}
              </p>
              <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
            </div>
          </div>
          <form
            action={async () => {
              "use server"
              await signOut({ redirectTo: "/login" })
            }}
          >
            <button
              type="submit"
              className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md font-medium"
            >
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Page Content */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}