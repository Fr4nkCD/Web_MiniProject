import Link from "next/link";
import Image from "next/image";

import buttonStyle from "@/components/buttonStyle";
import logo from "@/resources/SpeakUp.webp"
import account from "@/resources/Account.webp"

export default function Home() {
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
        <Link href="/signup" className={buttonStyle}>
          Sign Up
        </Link>
        <Link href="/login" className={buttonStyle}>
          Log In
        </Link>
      </div>
    </div>
  </>;
}
