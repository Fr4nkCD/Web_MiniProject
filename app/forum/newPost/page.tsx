"use client"
import { useActionState } from "react"
import post from "@/actions/post"
import { redirect } from "next/navigation"
import Link from "next/link"
import SubmitButton from "@/components/submitButton"

const style = 'border-2 border-black text-blue-800 px-2 py-1 rounded hover:bg-blue-100 focus-within:bg-blue-200'

export default function New() {

    const [data, action] = useActionState(post, {})

    if (data.message) {
        redirect("/forum")
    }
    return (
        <>
            New
            <hr />
            <form action={action} className="mt-4">
                <div className="flex flex-col mb-2">
                    <label htmlFor="subject">Subject</label>
                    <input className={style} type="subject" name="subject" id="subject" required />
                    {data.error?.subject && <div className="text-red-600">{data.error?.subject[0]}</div>}
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="detail">Detail</label>
                    <textarea className={style} name="detail" id="detail" required />
                    {data.error?.detail && <div className="text-red-600">{data.error?.detail[0]}</div>}
                </div>
                <div>
                    {data.error?.message && <div className="text-red-600">{data.error?.message}</div>}
                </div>
                <div>
                    {data.message ? <p>{data.message}</p> : <SubmitButton label="Post" />}
                </div>
            </form>
            <br /><hr />
            <Link href="/forum">Back</Link>
        </>
    )
} 