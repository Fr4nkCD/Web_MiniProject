"use server";

import prisma from "@/utils/db";
import { getSession } from "@/utils/loginUser";

export default async function Like(postId?: number, replyId?: number) {
    const user = await getSession();

    if (!user) {
        throw new Error("User must be logged in to like/unlike.");
    }

    try {
        // Check if the like already exists
        const existingLike = await prisma.like.findFirst({
            where: {
                userId: user.id,
                postId: postId || undefined,
                replyId: replyId || undefined,
            },
        });

        if (existingLike) {
            // If the like exists, remove it (unlike)
            await prisma.like.delete({
                where: {
                    id: existingLike.id,
                },
            });
            return { action: "unliked" };
        } else {
            // If the like does not exist, create it
            await prisma.like.create({
                data: {
                    userId: user.id,
                    postId: postId || undefined,
                    replyId: replyId || undefined,
                },
            });
            return { action: "liked" };
        }
    } catch (error) {
        console.warn("Error managing like:", error);
        throw error;
    }
}
