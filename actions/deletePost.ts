"use server"

import prisma from "@/utils/db";

export default async function deletePost(id: number) {
    try {
        const deletedPost = await prisma.post.delete({
            where: {
                id,
            },
        });
        console.log('Post deleted:', deletedPost);
    } catch (error) {
        console.error('Error deleting post:', error);
    }
} 