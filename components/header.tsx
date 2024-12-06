"use client"

import Link from "next/link";
import { getSession } from "@/utils/loginUser";
import { logoutUser } from "@/utils/loginUser";
import { useState, useEffect } from "react";

import Image from "next/image";
import { buttonRound1, buttonBasic } from "@/components/stylesheet";
import logo from "@/resources/SpeakUp.webp"
import account from "@/resources/Account.webp"

export default function Header() {
  const [username, setUsername] = useState('')
  const path = location.pathname

  // Get user (server-to-client)
  useEffect(() => {
    async function setName() {
      try {
        const user = await getSession()
        if (user)
          setUsername(user.name)
      } catch (error) {
        console.warn("Get Username Error: " + error)
      }
    } setName()
  })

  async function logout() {
    const out = await logoutUser()
    if (out) location.reload()
  }

  const [accMenuUp, toggleAccMenu] = useState(false)

  // Don't show topbar on login and signup pages.
  return (path != "/login" && path != "/signup") ?
    <div className="sticky top-0 z-10 w-full h-[4em] px-4 py-2 bg-gradient-to-b from-[#64acff] to-[#267fe6] flex justify-between items-center">
      <button onClick={() => location.href = "/"}>
        <Image
          src={logo}
          alt="SpeakUp"
          width={215}
        />
      </button>
      <div className="flex gap-2">
        {username ?
          <div className="relative">
            <button onClick={() => toggleAccMenu(!accMenuUp)}>
              <Image
                src={account}
                alt="SpeakUp"
                width={50}
              />
            </button>
            <div className="-translate-x-1/2 absolute top-full flex flex-col bg-white rounded-md drop-shadow-md p-3"
              style={{ display: accMenuUp ? 'block' : 'none' }}>
              <p className="text-xl font-semibold p-2">{username}</p>
              <section className="w-full">
                <Link href="/account" className={buttonBasic}> Account </Link>
                <Link href="/account/settings" className={buttonBasic}> Settings </Link>
                <button onClick={logout} className={buttonBasic}> Logout </button>
              </section>
            </div>
          </div>
          : <>
            <button onClick={() => location.href = "/signup"} className={buttonRound1}> Sign Up </button>
            <button onClick={() => location.href = "/login"} className={buttonRound1}> Login </button>
          </>}
      </div>
    </div> : <></>;
}
