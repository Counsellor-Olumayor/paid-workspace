import { db } from "@/lib/db"
import { auth } from "@/auth"
import { updateProject } from "@/app/actions/project-actions"
import { redirect, notFound } from "next/navigation"
import Link from "next/link"

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/login")
  }

  const { id } = await params

  const project = await db.project.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
  })

  if (!project) {
    notFound()
  }

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <Link
        href="/dashboard/projects"
        className="text-sm text-blue-600 hover:underline inline-block"
      >
        &larr; Back to All Projects
      </Link>

      <div className="bg-white border p-6 rounded-xl shadow-sm space-y-6">
        <h1 className="text-2xl font-bold">Edit Project Details</h1>

        <form action={updateProject} className="space-y-4">
          <input type="hidden" name="projectId" value={project.id} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Name
            </label>
            <input
              type="text"
              name="name"
              defaultValue={project.name}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              defaultValue={project.description || ""}
              rows={4}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  )
}