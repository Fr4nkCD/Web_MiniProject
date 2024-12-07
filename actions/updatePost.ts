"use server"

import prisma from "@/utils/db"
import { getSession } from "@/utils/loginUser";
import { z } from "zod";

const addSchema = z.object({
    id: z.string(),
    imageURL: z.string(),
    subject: z.string().min(3).max(100),
    detail: z.string().min(10),
})

type fieldErrors = {
    id?: string[] | undefined;
    imageURL?: string[] | undefined;
    subject?: string[] | undefined;
    detail?: string[] | undefined;
    message?: string | undefined;
}

export default async function updatePost(prevState: unknown, formData: FormData):
    Promise<{
        message?: string
        data?: string
        error?: fieldErrors
    }> {

    // console.log("Subject: " + formData.get("subject") +
    //     formData.get("detail1"))

    const user = await getSession()
    if (!user) return { error: { message: "session-expired, please re-login" } }

    const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
    if (result.success === false) {
        console.log("Error: ", result.error.formErrors.fieldErrors)
        return { error: result.error.formErrors.fieldErrors }
    }

    const data = result.data
    const { id, subject, imageURL, detail } = data

    try {
        await prisma.post.update({
            where: {
                id: +id
            },
            data: {
                subject,
                imageURL,
                detail,
            },
        });
        return { data: id, message: "Post successfully updated" }
    }
    catch (error) {
        console.log("error: " + error)
        return { error: { message: error + "" } }
    }
}