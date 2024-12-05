"use client"

import { logoutUser } from "@/utils/loginUser";
import buttonStyle from "./buttonStyle";

export default function Logout() {
  return (<button className={buttonStyle} onClick={async () => await logoutUser()}>Logout</button>)
}
