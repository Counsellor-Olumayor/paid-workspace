"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function createProject(formData: FormData) {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const name = formData.get("name") as string
  const description = formData.get("description") as string

  if (!name) {
    throw new Error("Project name is required")
  }

  await db.project.create({
    data: {
      name,
      description,
      userId: session.user.id,
    },
  })

  revalidatePath("/dashboard/projects")
}

export async function deleteProject(formData: FormData) {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const projectId = formData.get("projectId") as string

  if (!projectId) {
    throw new Error("Project ID is required")
  }

  // Ensure the project belongs to the authenticated user before deleting
  await db.project.deleteMany({
    where: {
      id: projectId,
      userId: session.user.id,
    },
  })

  revalidatePath("/dashboard/projects")
}


export async function updateProject(formData: FormData) {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const projectId = formData.get("projectId") as string
  const name = formData.get("name") as string
  const description = formData.get("description") as string

  if (!projectId || !name) {
    throw new Error("Missing required fields")
  }

  await db.project.updateMany({
    where: {
      id: projectId,
      userId: session.user.id,
    },
    data: {
      name,
      description,
    },
  })

  revalidatePath(`/dashboard/projects/${projectId}`)
  revalidatePath("/dashboard/projects")
}