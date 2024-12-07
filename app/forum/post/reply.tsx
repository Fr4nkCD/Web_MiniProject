"use client"
import { useActionState, useState } from "react"
import reply from "@/actions/reply"
import SubmitButton from "@/components/submitButton"
import { buttonRound1 } from "@/components/stylesheet"

const style = 'border-2 border-black text-blue-800 px-2 py-1 rounded hover:bg-blue-100 focus-within:bg-blue-200'

export default function Reply({ postId }: { postId: number }) {

    const [data, action] = useActionState(reply, {})
    const [replyOpen, openReply] = useState(false)

    if (data.message) {
        location.reload()
    }
    return (
        <>
            <button className={buttonRound1} onClick={() => openReply(true)}> Reply </button>

            <div className="bg-white fixed w-full left-0 bottom-0" style={{ display: replyOpen ? "block" : "none" }}>
                <div className="w-full h-2 bg-[#267fe6]"></div>
                <form action={action} className="mt-4">
                    <div><input type="hidden" name="postId" id="postId" value={postId} /></div>
                    <div className="flex flex-col mb-4">
                        <textarea className={style} name="detail" id="detail" required />
                        {data.error?.detail && <div className="text-red-600">{data.error?.detail[0]}</div>}
                    </div>
                    <div>
                        {data.error?.message && <div className="text-red-600">{data.error?.message}</div>}
                    </div>
                    <div>
                        {data.message ? <p>{data.message}</p> : <SubmitButton label="Reply" />}
                    </div>
                </form>
                <button className={buttonRound1} onClick={() => openReply(false)}> Cancel </button>
            </div>
        </>
    )
}