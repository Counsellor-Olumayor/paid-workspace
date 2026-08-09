import { createProject, deleteProject } from "@/app/actions/project-actions"
import { db } from "@/lib/db"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function ProjectsPage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/login")
  }

  const projects = await db.project.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Projects</h1>

      {/* Create Project Form */}
      <form action={createProject} className="space-y-4 border p-4 rounded-lg max-w-md">
        <h2 className="font-bold text-lg">Create New Project</h2>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Project Name"
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <textarea
            name="description"
            placeholder="Project Description (optional)"
            className="w-full p-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Project
        </button>
      </form>

      {/* Project List */}
      <div className="space-y-3">
        {projects.length === 0 ? (
          <p className="text-gray-500">No projects found.</p>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              className="p-4 border rounded-lg shadow-sm flex items-center justify-between bg-white"
            >
              <div>
                {/* Dynamic Route Link */}
                <Link
                  href={`/dashboard/projects/${project.id}`}
                  className="font-semibold text-blue-600 hover:underline text-lg"
                >
                  {project.name}
                </Link>
                {project.description && (
                  <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                )}
              </div>

              {/* Delete Form Action */}
              <form action={deleteProject}>
                <input type="hidden" name="projectId" value={project.id} />
                <button
                  type="submit"
                  className="bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </form>
            </div>
          ))
        )}
      </div>
    </div>
  )
}