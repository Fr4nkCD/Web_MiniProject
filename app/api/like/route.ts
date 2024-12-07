import { NextResponse } from "next/server";
import prisma from "@/utils/db";
import { getSession } from "@/utils/loginUser";

export async function POST(req: Request) {
    try {
        const { postId, replyId } = await req.json(); // Parse JSON body
        const user = await getSession();

        if (!user) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        let action = "liked";

        // Check if the like already exists
        let existingLike;
        if (postId) {
            existingLike = await prisma.like.findFirst({
                where: { userId: user.id, postId },
            });
        } else if (replyId) {
            existingLike = await prisma.like.findFirst({
                where: { userId: user.id, replyId },
            });
        }

        if (existingLike) {
            // Remove the like if it exists
            await prisma.like.delete({ where: { id: existingLike.id } });
            action = "unliked";
        } else {
            // Add the like if it doesn't exist
            await prisma.like.create({
                data: { userId: user.id, postId, replyId },
            });
        }

        return NextResponse.json({ success: true, action });
    } catch (error) {
        console.error("Error in /api/like:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}
