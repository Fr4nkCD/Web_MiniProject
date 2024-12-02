import Link from "next/link";

import Image from "next/image";

import logo from "@/resources/SpeakUp.webp"
import account from "@/resources/Account.webp"

export default function Home() {
const buttonStyle1 = "bg-gradient-to-b from-white to-gray-200 text-black font-semibold px-3 py-2 rounded-md hover:to-white hover:from-gray-200"

  return <>
    <div className="w-full h-full p-2 bg-gradient-to-b from-[#64acff] to-[#2073d2] flex justify-between items-center">
      <Link href="/">
        <Image
          src={logo}
          alt="SpeakUp"
          width={215}
        />
      </Link>
      <div className="flex gap-2">
        <Link href="/signup" className={buttonStyle1}>
          Sign Up
        </Link>
        <Link href="/login" className={buttonStyle1}>
          Log In
        </Link>
      </div>
    </div>
  </>;
}
