"use client"

// import Link from "next/link";
import { getSession } from "@/utils/loginUser";
import { logoutUser } from "@/utils/loginUser";
import { useState, useEffect } from "react";

import Image from "next/image";
import { buttonRound1, buttonBasic } from "@/components/stylesheet";
import logo from "@/resources/SpeakUp.webp"
import account from "@/resources/Account.webp"

export default function Header() {
  const [username, setUsername] = useState('')
  const [avatar, setAvatar] = useState('')
  const path = location.pathname

  // Get user (server-to-client)
  useEffect(() => {
    async function getUser() {
      try {
        const user = await getSession()
        if (user) {
          setUsername(user.name)
          setAvatar(user.avatar)
        }
      } catch (error) {
        console.warn("Get username and avatar Error: " + error)
      }
    } getUser()
  })

  async function logout() {
    const out = await logoutUser()
    if (out) location.reload()
  }

  const [accMenuUp, toggleAccMenu] = useState(false)

  // Don't show topbar on login and signup pages.
  return (path != "/login" && path != "/signup") ?
    <div className="sticky top-0 z-10 w-full h-[4em] px-4 py-2 bg-gradient-to-b from-[#64acff] to-[#267fe6] flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <button onClick={() => location.assign("/")}>
          <Image
            src={logo}
            alt="SpeakUp"
            width={215}
          />
        </button>

        <div className="text-white text-lg">
          <button onClick={() => location.assign("/forum")} className="transition duration-100 hover:bg-[rgba(255,255,255,0.1)] rounded-md p-2"> Forum </button>
          <button onClick={() => location.assign("/users")} className="transition duration-100 hover:bg-[rgba(255,255,255,0.1)] rounded-md p-2"> Users </button>
        </div>
      </div>

      <div className="flex gap-2">
        {username ?
          <div className="relative">
            <button onClick={() => toggleAccMenu(!accMenuUp)}>
              <Image
              src={account}
              width={50}
              alt="Account"
              />
            </button>
            <div className="-translate-x-1/2 absolute top-full flex flex-col bg-white rounded-md drop-shadow-md p-3"
              style={{ display: accMenuUp ? 'block' : 'none' }}>
              <p className="text-xl font-semibold p-2">{username}</p>
              <section className="w-full">
                {/* <Link href="/account" className={buttonBasic}> Account </Link>
                <Link href="/account/settings" className={buttonBasic}> Settings </Link> */}
                <button onClick={logout} className={`${buttonBasic} rounded-sm`}> Logout </button>
              </section>
            </div>
          </div>
          : <>
            <button onClick={() => location.assign("/signup")} className={buttonRound1}> Sign Up </button>
            <button onClick={() => location.assign("/login")} className={buttonRound1}> Login </button>
          </>}
      </div>
    </div> : <></>;
}
