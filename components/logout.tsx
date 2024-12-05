"use client"

import { logoutUser } from "@/utils/loginUser";
import buttonStyle from "./buttonStyle";

export default function Logout() {
  async function logout() {
    const out = await logoutUser()
    if (out) window.location.reload()
  }
  return (<button className={buttonStyle} onClick={logout}>Logout</button>)
}
