import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function SettingsPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-sm text-gray-500">Manage your profile information and connected services.</p>
      </div>

      <div className="bg-white border rounded-xl p-6 shadow-sm space-y-6">
        {/* Profile Card */}
        <div className="flex items-center space-x-4 pb-6 border-b">
          {session.user.image ? (
            <img
              src={session.user.image}
              alt="Avatar"
              className="w-16 h-16 rounded-full border"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
              {session.user.name?.charAt(0) || "U"}
            </div>
          )}
          <div>
            <h2 className="text-lg font-semibold">{session.user.name}</h2>
            <p className="text-sm text-gray-500">{session.user.email}</p>
          </div>
        </div>

        {/* Account Metadata */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Authentication Details
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-gray-500 text-xs">Auth Provider</p>
              <p className="font-medium text-gray-800">GitHub OAuth</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-gray-500 text-xs">User ID</p>
              <p className="font-mono text-xs text-gray-800 truncate">{session.user.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}