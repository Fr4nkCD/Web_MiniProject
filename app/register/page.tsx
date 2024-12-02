"use client"
import { useActionState } from "react"
import register from "@/actions/register"
import { redirect } from "next/navigation"
import Link from "next/link"
import SubmitButton from "./submitButton"

export default function Register() {
    const style = `border-2 border-black text-blue-800 px-2 py-1 rounded hover:bg-blue-100 focus-within:bg-blue-200`

    const [data, action] = useActionState(register, {})

    if (data.message) {
        redirect("/")
    }

    return (
        <div className="m-5">
            Register
            <hr />
            <form action={action} className="mt-4">
                <div className="flex flex-col mb-2">
                    <label htmlFor="email">Email</label>
                    <input className={style} type="email" name="email" id="email" required />
                    {data.error?.email && <div className="text-red-600">{data.error?.email[0]}</div>}
                </div>
                <div className="flex flex-col mb-2">
                    <label htmlFor="name">Name</label>
                    <input className={style} type="text" name="name" id="name" required />
                    {data.error?.name && <div className="text-red-600">{data.error?.name[0]}</div>}
                </div>
                <div className="flex flex-col mb-6">
                    <label htmlFor="password">Password</label>
                    <input className={style} type="password" name="password" id="password" required />
                    {data.error?.password && <div className="text-red-600">{data.error?.password[0]}</div>}
                </div>
                <div>
                    {data.error?.message && <div className="text-red-600">{data.error?.message}</div>}
                </div>
                <div>
                    {data.message ? <p>{data.message}</p> : <SubmitButton label="Register" />}
                </div>
            </form>
            <br /><hr />
            <Link href="/">Back</Link>
        </div>
    )
}