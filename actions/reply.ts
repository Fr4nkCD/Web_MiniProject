"use server"

import prisma from "@/utils/db"
import { getSession } from "@/utils/loginUser";
import { z } from "zod";

const addSchema = z.object({
    detail: z.string().min(10),
    postId: z.number(),
})

type fieldErrors = {
    detail?: string[] | undefined;
    postId?: string[] | undefined;
    message?: string | undefined;
}

export default async function reply(prevState: unknown, formData: FormData):
    Promise<{
        message?: string
        data?: string
        error?: fieldErrors
    }> {

    console.log("Subject: " + formData.get("subject") +
        formData.get("detail1"))

    const rawFormData = Object.fromEntries(formData.entries());

    // Convert postId to a number
    if (rawFormData.postId) {
        rawFormData.postId = Number(rawFormData.postId);
    }

    // Validate the form data
    const result = addSchema.safeParse(rawFormData);
    if (result.success === false) {
        console.log("Error: ", result.error.formErrors.fieldErrors)
        return { error: result.error.formErrors.fieldErrors }
    }

    const data = result.data
    const { detail, postId } = data
    const user = await getSession()
    const userId = user.id

    try {
        await prisma.reply.create({
            data: {
                detail,
                postId,
                userId,
            },
        })
    }
    catch (error) {
        console.log("error: " + error)
        return { error: { message: "Invalid email address" + error } }
    }
    return { message: "Added reply successful" }
}