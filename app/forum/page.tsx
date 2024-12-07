import { getSession } from "@/utils/loginUser";
import prisma from "@/utils/db";
import Link from "next/link"
import { buttonRound1 } from "@/components/stylesheet"
import moment from "moment";

export default async function Forum() {
    const posts = await prisma.post.findMany({
        include: {
            user: true,
        },
    });

    const user = await getSession()

    return <>
        <div style={{ visibility: user ? "visible" : "hidden" }} className="flex justify-end items-center p-4">
            <Link href="/forum/newPost" className={buttonRound1}> New Post </Link>
        </div>

        <div className="py-5 px-28 flex flex-col gap-2 w-full h-full drop">
            {posts.map((post) => (
                <div key={post.id}>
                    <Link href={{
                        pathname: '/forum/post',
                        query: { id: post.id }
                    }}
                        className="border-2 rounded-md w-full flex flex-col p-4 bg-white drop-shadow-md transition duration-100 hover:border-gray-500">
                        <h1 className="font-semibold text-lg">{post.subject}</h1>
                        <div className="flex gap-1 items-baseline">
                            <span className="pb-2 text-sm">{post.user.name}</span>
                            <span className="text-xs text-gray-400" title={post.createdAt.toDateString() + "  " + post.createdAt.toLocaleTimeString()}>{"· " + moment(post.createdAt).fromNow()}</span>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
        <br/>
    </>
}