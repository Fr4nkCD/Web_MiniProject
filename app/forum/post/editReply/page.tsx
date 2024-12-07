"use client"
import { useActionState } from "react"
import Link from "next/link"
import SubmitButton from "@/components/submitButton"
import updateReply from "@/actions/updateReply"
import React from "react"
import { buttonBasic2, textbox1 } from "@/components/stylesheet"

export default function Edit({ searchParams }:
  { searchParams: { [key: string]: string } }) {

  const { id, detail, postId } = React.use(searchParams);
  console.log("Id: %s\nDetail: %s\nPost Id: %s", id, detail, postId)

  const [data, action] = useActionState(updateReply, {})

  if (data.message) {
    location.replace("/forum/post?id=" + data.data)
  }

  return (
    <div className="m-10 flex flex-col">
      <h1 className="text-lg font-semibold text-center">Edit Reply</h1>
      <br/>
      <hr />
      <form action={action} className="mt-4">
        <div className="flex flex-col mb-4">
          <label htmlFor="detail" className="font-semibold text-sm mb-2">Message</label>
          <textarea className={`${textbox1} min-h-[128px]`} name="detail" id="detail" defaultValue={detail} required />
          {data.error?.detail && <div className="text-red-600">{data.error?.detail[0]}</div>}
        </div>
        <div><input type="hidden" name="id" id="id" value={id} /></div>
        <div><input type="hidden" name="postId" id="postId" value={postId} /></div>
        <div>
          {data.error?.message && <div className="text-red-600">{data.error?.message}</div>}
        </div>
        <div>
          {data.message ? <p>{data.message}</p> : <SubmitButton label="Update" />}
        </div>
      </form>
      <br /><hr /><br />
      <Link href={"/forum/post?id=" + postId} className={`${buttonBasic2} border rounded-md w-[64px] text-center`}>Back</Link>
    </div>
  )
} 