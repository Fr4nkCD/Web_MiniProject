"use client"
import { useActionState } from "react"
import login from "@/actions/login"
import SubmitButton from "@/components/submitButton"

import Image from "next/image"
import logo from "@/resources/SpeakUp.webp"
import { textbox1 } from "@/components/stylesheet"

export default function Register() {
    const [data, action] = useActionState(login, {})

    if (data.message) {
        location.replace('/forum')
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
                <h1 className="text-center text-lg font-semibold mb-4"> Login </h1>
                <hr />
                <form action={action} className="mt-4 flex flex-col items-center">
                    <div className="flex flex-col mb-2 w-full">
                        <label htmlFor="email">Email</label>
                        <input className={textbox1} type="email" name="email" id="email" required />
                        {data.error?.email && <div className="text-red-600">{data.error?.email[0]}</div>}
                    </div>
                    <div className="flex flex-col mb-6 w-full">
                        <label htmlFor="password">Password</label>
                        <input className={textbox1} type="password" name="password" id="password" required />
                        {data.error?.password && <div className="text-red-600">{data.error?.password[0]}</div>}
                    </div>
                    <div>
                        {data.error?.message && <div className="text-red-600">{data.error?.message}</div>}
                    </div>
                    {/* <div>
                        <input className="w-6 h-6 mr-2 mb-6" type="checkbox" name="remember" id="remember"/>
                        <label className="align-top" htmlFor="remember">Remember me for 30 days</label>
                    </div> */}
                    <div>
                        {data.message ? <p>{data.message}</p> : <SubmitButton label="Login" />}
                    </div>
                </form>
                <br />
                <div className="flex gap-1 justify-center text-sm">
                    Don't have an account?
                    <button onClick={() => location.replace("/signup")} className="text-blue-500 hover:underline">Sign up</button>
                </div>
            </div>
        </div>
    )
}