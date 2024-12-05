"use client"
import { useActionState } from "react"
import { redirect } from "next/navigation"
import Link from "next/link"
import SubmitButton from "@/components/submitButton"
import updatePost from "@/actions/updatePost"
import React from "react"

export default function Edit({ searchParams }:
  { searchParams: { [key: string]: string } }) {

  const { id, subject, detail } = React.use(searchParams);
  console.log("Id: ", id, subject, detail)

  const [data, action] = useActionState(updatePost, {})

  if (data.message) {
    redirect("/forum")
  }

  const style = `border-2 border-black text-blue-800 px-2 py-1 rounded hover:bg-blue-100 focus-within:bg-blue-200`

  return (
    <>
      Edit
      <hr />
      <form action={action} className="mt-4">
        <div className="flex flex-col mb-2">
          <label htmlFor="subject">Subject</label>
          <input className={style} type="subject" name="subject" id="subject" defaultValue={subject} required />
          {data.error?.subject && <div className="text-red-600">{data.error?.subject[0]}</div>}
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="detail">Detail</label>
          <textarea className={style} name="detail" id="detail" defaultValue={detail} required />
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
      <br /><hr />
      <Link href="/forum">Back</Link>
    </>
  )
} 