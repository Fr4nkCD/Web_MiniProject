"use server"

import { SignJWT, jwtVerify } from "jose"; 
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = process.env.SECRET;
const key = new TextEncoder().encode(secretKey);

const sessionName = "spkup session" // Session name to avoid mixing up with other projects
const TIMEOUT = 24*60*60 // 1 day
const TIMEOUT_remember = 30*TIMEOUT // 30 day

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${TIMEOUT} sec from now`)
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    // console.log(payload)
    return payload;
  } catch(error) {
    console.warn("Token Verification Error: " + error)
    return null
  }
}

export async function loginUser(userInput:any, remember: boolean) { 
  const {id, email, name, role} = userInput; 

  let timeout = remember ? TIMEOUT_remember : TIMEOUT // default 1 hour

  // Create the session
  const expires = new Date(Date.now() + timeout * 1000);
  const session = await encrypt({ id, email, name, role, expires });

  // Save the session in a cookie
  (await cookies()).set(sessionName, session, { expires, httpOnly: true });
  return { message: "Login Success" }
}

export async function logoutUser() {
  // Destroy the session 
  (await cookies()).set(sessionName, "", { expires: new Date(0) });
  (await cookies()).delete('session') 
  return { message: "Logout Success" }
}

export async function getSession() {
  const session = (await cookies()).get(sessionName)?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get(sessionName)?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  if (!parsed) return

  parsed.expires = new Date(Date.now() + TIMEOUT * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: sessionName,
    // secure: true,   // if https is used
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}