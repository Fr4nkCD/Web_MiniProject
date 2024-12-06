import { getSession } from "@/utils/loginUser";
import prisma from "@/utils/db";
import Link from "next/link"
import { buttonRound1 } from "@/components/stylesheet"

export default async function Forum() {
    const posts = await prisma.post.findMany({
        include: {
            user: true,
        },
    });

    const user = await getSession()

    return <>
        <div style={{visibility: user ? "visible" : "hidden"}} className="flex justify-end items-center p-4">
            <Link href="/forum/newPost" className={buttonRound1}> New Post </Link>
        </div>

        <div className="py-5 px-28 flex flex-col gap-2 w-full h-full">
            {posts.map((post) => (
                <div key={post.id}>
                    <Link href={{
                        pathname: '/forum/post',
                        query: { pid: post.id, uid: post.userId, username: post.user.name, role: post.user.role, subject: post.subject, detail: post.detail }
                    }}
                        className="border-2 rounded-md w-full flex flex-col p-4">
                        <h1 className="font-semibold text-lg">{post.subject}</h1>
                        <p className="pb-2 text-sm">by {post.user.name}</p>
                        <p className="text-xs">{post.updatedAt.toDateString() + ", " + post.updatedAt.toLocaleTimeString()}</p>
                    </Link>
                </div>
            ))}
        </div>
    </>
}