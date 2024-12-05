"use client"

import { getSession } from "@/utils/loginUser";
import { useState, useEffect } from "react";

import Image from "next/image";

import Logout from "@/components/logout";
import buttonStyle from "@/components/buttonStyle";
import logo from "@/resources/SpeakUp.webp"
import account from "@/resources/Account.webp"

export default function TopbarMenu() {
  const [username, setUsername] = useState('')
  const path = location.pathname

  // Get user (server-to-client)
  useEffect(() => {
    async function setName() {
      try {
        const user = await getSession()
        if (user)
          setUsername(user.name)
      } catch(error) {
        console.warn("Get Username Error: " + error)
      }
    } setName()
  })

  // Don't show topbar on login and signup pages.
  return (path != "/login" && path != "/signup") ?
    <div className="w-full h-full p-2 bg-gradient-to-b from-[#64acff] to-[#2073d2] flex justify-between items-center">
      <button onClick={() => window.location.href = "/"}>
        <Image
          src={logo}
          alt="SpeakUp"
          width={215}
        />
      </button>
      <div className="flex gap-2">
        {username ?
          <div className="flex items-center gap-2 text-white">
            {username}
            <Logout />
          </div>
          : <>
            <button onClick={() => window.location.href = "/signup"} className={buttonStyle}> Sign Up </button>
            <button onClick={() => window.location.href = "/login"} className={buttonStyle}> Login </button>
          </>}
      </div>
    </div> : <></>;
}
