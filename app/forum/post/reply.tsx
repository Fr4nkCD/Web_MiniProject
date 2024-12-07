"use client"
import { useActionState, useState } from "react"
import reply from "@/actions/reply"
import SubmitButton from "@/components/submitButton"
import { buttonBasic2, buttonRound1, textbox1 } from "@/components/stylesheet"
import Image from "next/image"
import replyIcon from "@/resources/reply-arrow-icon.svg"

export default function Reply({ postId }: { postId: number }) {

    const [data, action] = useActionState(reply, {})
    const [replyOpen, openReply] = useState(false)

    if (data.message) {
        location.reload()
    }
    return (
        <>
            <button className={buttonRound1} onClick={() => openReply(true)}>
                <Image
                    src={replyIcon}
                    width={24}
                    alt="Reply"
                />
            </button>

            <div className="bg-white fixed w-full left-0 bottom-0" style={{ display: replyOpen ? "block" : "none" }}>
                <div className="w-full h-2 bg-[#267fe6]"></div>
                <div className="px-10">
                    <h2 className="font-semibold text-lg mt-4">Reply</h2>
                    <form action={action} className="mt-4">
                        <div><input type="hidden" name="postId" id="postId" value={postId} /></div>
                        <div className="flex flex-col mb-4">
                            <textarea className={`${textbox1} min-h-[96px]`} name="detail" id="detail" required />
                            {data.error?.detail && <div className="text-red-600">{data.error?.detail[0]}</div>}
                        </div>
                        <div>
                            {data.error?.message && <div className="text-red-600">{data.error?.message}</div>}
                        </div>
                        <div>
                            {data.message ? <p>{data.message}</p> : <SubmitButton label="Reply" />}
                        </div>
                    </form>
                    <br />
                    <button className={`${buttonBasic2} border rounded-md w-[64px] text-center`} onClick={() => openReply(false)}> Cancel </button>
                </div>
                <br />
            </div>
        </>
    )
}