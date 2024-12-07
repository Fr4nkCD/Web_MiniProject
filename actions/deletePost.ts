"use server"

import prisma from "@/utils/db";

export default async function deletePost(id: number) {
    // Delete replies first before deleting the post
    try {
        await prisma.reply.deleteMany({
            where: {
                postId: id,
            },
        });

        await prisma.post.delete({
            where: {
                id,
            },
        });

        console.log('Post deleted');

    } catch (error) {
        console.warn('Error deleting post:', error);
    }
} 