"use client"
import { useActionState } from "react"
import register from "@/actions/register"
import SubmitButton from "@/components/submitButton"

import Image from "next/image"
import logo from "@/resources/SpeakUp.webp"
import { textbox1 } from "@/components/stylesheet"

export default function Register() {
    const [data, action] = useActionState(register, {})

    if (data.message) {
        location.replace('/')
    }

    return (
        <div className="min-h-screen p-4 flex flex-col items-center bg-gradient-to-b from-[#64acff] to-[#2073d2] ">
            <Image
                src={logo}
                alt="SpeakUp"
                width={400}
                className="m-5"
            />
            <div className="w-1/2 h-full p-5 rounded-md bg-white">
                <h1 className="text-center text-lg font-semibold mb-4"> Create an account </h1>
                <hr />
                <form action={action} className="mt-4 flex flex-col items-center">
                    <div className="flex flex-col mb-2 w-full">
                        <label htmlFor="email">Email</label>
                        <input className={textbox1} type="email" name="email" id="email" required />
                        {data.error?.email && <div className="text-red-600">{data.error?.email[0]}</div>}
                    </div>
                    <div className="flex flex-col mb-2 w-full">
                        <label htmlFor="name">Name</label>
                        <input className={textbox1} type="text" name="name" id="name" required />
                        {data.error?.name && <div className="text-red-600">{data.error?.name[0]}</div>}
                    </div>
                    <div className="flex flex-col mb-6 w-full">
                        <label htmlFor="password">Password</label>
                        <input className={textbox1} type="password" name="password" id="password" required />
                        {data.error?.password && <div className="text-red-600">{data.error?.password[0]}</div>}
                    </div>
                    <div>
                        {data.error?.message && <div className="text-red-600">{data.error?.message}</div>}
                    </div>
                    <div>
                        {data.message ? <p>{data.message}</p> : <SubmitButton label="Sign Up" />}
                    </div>
                </form>
                <br />
                <div className="flex gap-1 justify-center text-sm">
                    Already have an account?
                    <button onClick={() => location.replace("/login")} className="text-blue-500 hover:underline">Login</button>
                </div>
            </div>
        </div>
    )
}