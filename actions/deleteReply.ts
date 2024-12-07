"use server"

import prisma from "@/utils/db";

export default async function deleteReply(id: number) {
    try {
        await prisma.reply.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        console.warn('Error deleting reply:', error);
    }
} 