import { auth } from "@/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/login")
  }

  // Fetch metrics & recent projects concurrently
  const [totalProjects, recentProjects] = await Promise.all([
    db.project.count({
      where: { userId: session.user.id },
    }),
    db.project.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
  ])

  return (
    <div className="p-6 space-y-8 max-w-4xl">
      {/* Header Badge */}
      <div className="flex items-center space-x-4 border-b pb-6">
        {session.user.image && (
          <img
            src={session.user.image}
            alt={session.user.name || "User Avatar"}
            className="w-16 h-16 rounded-full border"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {session.user.name}!</h1>
          <p className="text-sm text-gray-500">{session.user.email}</p>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 border rounded-xl shadow-sm bg-white space-y-2">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Total Projects
          </h2>
          <p className="text-4xl font-extrabold">{totalProjects}</p>
          <Link
            href="/dashboard/projects"
            className="text-sm text-blue-600 hover:underline inline-block pt-2"
          >
            Manage Projects &rarr;
          </Link>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Recent Projects</h2>
          <Link
            href="/dashboard/projects"
            className="text-sm text-blue-600 hover:underline"
          >
            View All
          </Link>
        </div>

        {recentProjects.length === 0 ? (
          <div className="p-6 border rounded-lg bg-gray-50 text-center">
            <p className="text-gray-500 mb-3">You haven't created any projects yet.</p>
            <Link
              href="/dashboard/projects"
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
            >
              Create Your First Project
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {recentProjects.map((project: any) => (
              <div
                key={project.id}
                className="p-4 border rounded-lg bg-white flex items-center justify-between shadow-sm"
              >
                <div>
                  <Link
                    href={`/dashboard/projects/${project.id}`}
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    {project.name}
                  </Link>
                  {project.description && (
                    <p className="text-sm text-gray-600">{project.description}</p>
                  )}
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(project.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}