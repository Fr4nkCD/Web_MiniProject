"use server"

import prisma from "@/utils/db"
import { getSession } from "@/utils/loginUser";
import { z } from "zod";

const addSchema = z.object({
    id: z.string(),
    detail: z.string().min(10),
    postId: z.string(),
})

type fieldErrors = {
    id?: string[] | undefined;
    detail?: string[] | undefined;
    postId?: string[] | undefined;
    message?: string | undefined;
}

export default async function updateReply(prevState: unknown, formData: FormData):
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
    const { id, detail, postId } = data

    try {
        await prisma.reply.update({
            where: {
                id: +id
            },
            data: {
                detail,
            },
        });
        return { data: postId, message: "Reply successfully updated" }
    }
    catch (error) {
        console.log("error: " + error)
        return { error: { message: error + "" } }
    }
}