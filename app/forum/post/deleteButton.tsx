"use client"

import deletePost from "@/actions/deletePost"
import deleteReply from "@/actions/deleteReply"
import deleteIcon from "@/resources/delete-icon.svg";
import Image from "next/image";

const style = "p-3 flex items-center gap-2 mr-3 rounded-full transition duration-100 hover:bg-gray-100"

export function DeletePostButton({ id }: { id: number }) {
    return <button className={style} onClick={() => {deletePost(id)}}>
        <Image src={deleteIcon} width={20} title="Delete this post" alt="Edit" />
    </button>
}

export function DeleteReplyButton({ id }: { id: number }) {
    return <button className={style} onClick={() => {deleteReply(id)}}>
        <Image src={deleteIcon} width={20} title="Delete this reply" alt="Edit" />
    </button>
}