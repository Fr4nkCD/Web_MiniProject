import { getSession } from "@/utils/loginUser";
import Link from "next/link";
import { buttonRound1 } from "@/components/stylesheet";
import { DeletePostButton, DeleteReplyButton } from "./deleteButton";
import LikeButton from "@/components/likeButton";
import Reply from "./reply";
import prisma from "@/utils/db";
import moment from "moment";
import editIcon from "@/resources/edit-icon.svg";
import Image from "next/image";

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
            likes: true,
        },
    })

    if (!post) return <p className="text-lg text-center min-h-screen flex justify-center items-center">The post does not exist.</p>

    const replies = await prisma.reply.findMany({
        where: {
            postId: postId,
        },
        include: {
            user: true,
            likes: true,
        },
    });

    const user = await getSession()
    const userHasLiked = await prisma.like.findFirst({
        where: { userId: user.id, postId: post.id },
    }) !== null;
    const userHasLikedReplies = await Promise.all(
        replies.map(async (reply) => ({
            ...reply,
            userHasLiked: await prisma.like.findFirst({
                where: { userId: user.id, replyId: reply.id },
            }) !== null,
        }))
    );


    return <div className="p-10">
        <div>
            <Link href="/forum" className="font-semibold p-3 w-[100px] text-indigo-800"> Forum </Link>
            <br />
            <hr />
            <br />
            <div className="flex justify-between">
                <h1 className="text-3xl font-semibold">{post?.subject}</h1>
                <div className="flex justify-end items-center h-5">
                    {(user && user.id == post?.userId) ? <Link href={{
                        pathname: '/forum/post/edit',
                        query: { id: postId, subject: post?.subject, imageURL: post?.imageURL || '', detail: post?.detail }
                    }}
                        className="p-3 flex items-center gap-2 mr-3 rounded-full transition duration-100 hover:bg-gray-100" title="Edit this post">
                        <Image src={editIcon} width={20} alt="Edit" />
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
                <div className="flex gap-1">
                    <span className="text-sm text-gray-500" title={post.createdAt.toDateString() + "  " + post.createdAt.toLocaleTimeString()}>{moment(post.createdAt).fromNow()}</span>
                    {(post.createdAt.getTime() != post.updatedAt.getTime()) ? <span className="text-sm text-gray-500" title={post.updatedAt.toDateString() + "  " + post.updatedAt.toLocaleTimeString()}>(edited)</span> : <></>}
                </div>
            </div>
            <section className="px-4 py-6">
                {post?.imageURL ? <div className="flex justify-center"> <img src={post.imageURL} /> </div> : <></>}
                <br />
                {post?.detail}
            </section>

            <div className="flex gap-3 justify-between items-center">
                <div style={{ visibility: user ? "visible" : "hidden" }}>
                    <Reply postId={postId} />
                </div>

                <LikeButton
                    initialCount={post.likes.length}
                    initialLiked={userHasLiked}
                    postId={postId}
                />
            </div>


            <br /><hr />
        </div>

        <div>
            {userHasLikedReplies.map((reply) => (
                <div key={reply.id}>
                    <div className="pt-4 flex justify-between items-center">
                        <div className="flex gap-2">
                            <span className="text-gray-600 font-semibold">{reply.user.name}</span>
                            <span className="text-gray-400">{reply.user.role}</span>
                        </div>
                        <div className="flex gap-1">
                            <span className="text-sm text-gray-500" title={reply.createdAt.toDateString() + "  " + reply.createdAt.toLocaleTimeString()}>{moment(reply.createdAt).fromNow()}</span>
                            {(reply.createdAt.getTime() != reply.updatedAt.getTime()) ? <span className="text-sm text-gray-500" title={reply.updatedAt.toDateString() + "  " + reply.updatedAt.toLocaleTimeString()}>(edited)</span> : <></>}
                        </div>
                    </div>
                    <section className="px-4 pt-4 pb-6">{reply.detail}</section>

                    <div className="flex justify-end items-center">
                        <LikeButton
                            initialCount={reply.likes.length}
                            initialLiked={userHasLiked}
                            replyId={reply.id}
                        />
                        {(user && user.id == reply.userId) ? <Link href={{
                            pathname: '/forum/post/editReply',
                            query: { id: reply.id, detail: reply.detail, postId: postId }
                        }}
                            className="p-3 flex items-center gap-2 mr-3 rounded-full transition duration-100 hover:bg-gray-100" title="Edit this reply">
                            <Image src={editIcon} width={20} alt="Edit" />
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