"use client"
import { useActionState } from "react"
import Link from "next/link"
import SubmitButton from "@/components/submitButton"
import updatePost from "@/actions/updatePost"
import React from "react"
import { buttonBasic2, textbox1 } from "@/components/stylesheet"

export default function Edit({ searchParams }:
  { searchParams: { [key: string]: string } }) {

  const { id, subject, imageURL, detail } = React.use(searchParams);
  console.log("Id: %s\nSubject: %s\nImageURL: %s\nDetail: %s", id, subject, imageURL, detail)

  const [data, action] = useActionState(updatePost, {})

  if (data.message) {
    location.replace("/forum/post?id=" + data.data)
  }

  return (
    <div className="m-10 flex flex-col">
      <h1 className="text-lg font-semibold text-center">Edit Post</h1>
      <br/>
      <hr />
      <form action={action} className="mt-4">
        <div className="flex flex-col mb-2">
          <label htmlFor="subject" className="font-semibold text-sm mb-2">Title</label>
          <input className={textbox1} type="subject" name="subject" id="subject" defaultValue={subject} required />
          {data.error?.subject && <div className="text-red-600">{data.error?.subject[0]}</div>}
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="subject" className="font-semibold text-sm mb-2">Thumbnail URL (Optional)</label>
          <input className={textbox1} type="url" name="imageURL" id="imageURL" defaultValue={imageURL} />
          {data.error?.imageURL && <div className="text-red-600">{data.error?.imageURL[0]}</div>}
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="detail" className="font-semibold text-sm mb-2">Detail</label>
          <textarea className={`${textbox1} min-h-[128px]`} name="detail" id="detail" defaultValue={detail} required />
          {data.error?.detail && <div className="text-red-600">{data.error?.detail[0]}</div>}
        </div>
        <div><input type="hidden" name="id" id="id" value={id} /></div>
        <div>
          {data.error?.message && <div className="text-red-600">{data.error?.message}</div>}
        </div>
        <div>
          {data.message ? <p>{data.message}</p> : <SubmitButton label="Update" />}
        </div>
      </form>
      <br /><hr /><br />
      <Link href={"/forum/post?id=" + id} className={`${buttonBasic2} border rounded-md w-[64px] text-center`}>Back</Link>
    </div>
  )
} 