import { getSession } from "@/utils/loginUser";
import Link from "next/link";
import { buttonRound1 } from "@/components/stylesheet";
import { DeletePostButton, DeleteReplyButton } from "./deleteButton";
import Reply from "./reply";
import prisma from "@/utils/db";
import moment from "moment";

export default async function PostDetail({ searchParams }: { searchParams: { [key: string]: string } }) {
    const { id } = searchParams;
    const postId = parseInt(id)
    console.log("Post Id: " + id)

    const post = await prisma.post.findUnique({
        where: {
            id: postId,
        },
        include: {
            user: true,
        },
    })

    if (!post) return <p className="text-lg text-center min-h-screen flex justify-center items-center">The post does not exist.</p>

    const replies = await prisma.reply.findMany({
        where: {
            postId: postId,
        },
        include: {
            user: true,
        },
    });

    const user = await getSession()

    return <div className="p-10">
        <div>
            <hr />
            <br />
            <div className="flex justify-between">
                <h1 className="text-3xl font-semibold">{post?.subject}</h1>
                <div className="flex justify-end gap-2 items-center h-5">
                    {(user && user.id == post?.userId) ? <Link href={{
                        pathname: '/forum/post/edit',
                        query: { id: postId, subject: post?.subject, detail: post?.detail }
                    }}
                        className={buttonRound1}>
                        Edit
                    </Link> : <></>}
                    {(user && (user.id == post?.userId || user.role == "Admin")) ?
                        <DeletePostButton id={postId} /> : <></>}
                </div>
            </div>

            <br />
            <hr />
            <div className="pt-4 flex justify-between items-center">
                <div className="flex gap-2">
                    <span className="text-gray-600 font-semibold">{post?.user.name}</span>
                    <span className="text-gray-400">{post?.user.role}</span>
                </div>
                <span className="text-sm text-gray-500" title={post.createdAt.toDateString() + "  " + post.createdAt.toLocaleTimeString()}>{moment(post.createdAt).fromNow()}</span>
            </div>
            <section className="px-4 py-6">{post?.detail}</section>


            <div style={{ visibility: user ? "visible" : "hidden" }}>
                <Reply postId={postId} />
            </div>

            <br /><hr />
        </div>

        <div>
            {replies.map((reply) => (
                <div key={reply.id}>
                    <div className="pt-4 flex justify-between items-center">
                        <div className="flex gap-2">
                            <span className="text-gray-600 font-semibold">{reply.user.name}</span>
                            <span className="text-gray-400">{reply.user.role}</span>
                        </div>
                        <span className="text-sm text-gray-500" title={reply.createdAt.toDateString() + "  " + reply.createdAt.toLocaleTimeString()}>{moment(reply.createdAt).fromNow()}</span>
                    </div>
                    <section className="px-4 pt-4 pb-6">{reply.detail}</section>

                    <div>
                        {(user && user.id == reply.userId) ? <Link href={{
                            pathname: '/forum/post/edit',
                            query: { id: postId, subject: post?.subject, detail: post?.detail }
                        }}
                            className={buttonRound1}>
                            Edit
                        </Link> : <></>}
                        {(user && (user.id == reply.userId || user.role == "Admin")) ?
                            <DeleteReplyButton id={reply.id} /> : <></>}
                    </div>

                    <br /><hr />
                </div>
            ))}
        </div>
    </div>
}