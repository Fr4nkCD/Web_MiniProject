"use client"

import deletePost from "@/actions/deletePost"
import deleteReply from "@/actions/deleteReply"
import { buttonRound1 } from "@/components/stylesheet"

export function DeletePostButton({ id }: { id: number }) {
    return <button className={buttonRound1} onClick={() => {deletePost(id)}}>
        Delete
    </button>
}

export function DeleteReplyButton({ id }: { id: number }) {
    return <button className={buttonRound1} onClick={() => {deleteReply(id)}}>
        Delete
    </button>
}