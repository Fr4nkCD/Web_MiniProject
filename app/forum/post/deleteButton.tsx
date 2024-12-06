"use client"

import { buttonRound1 } from "@/components/stylesheet"

export default function DeleteButton({ id, deletePost }: { id: number, deletePost: Function }) {
    return <button className={buttonRound1} onClick={() => {deletePost(id), location.replace("/forum")}}>
        Delete
    </button>
}