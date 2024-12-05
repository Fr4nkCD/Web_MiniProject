"use server"

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = process.env.SECRET;
const key = new TextEncoder().encode(secretKey);

const TIMEOUT = 600 // 600 second / 10 minutes

export async function encrypt(payload: any, timeout: string) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(timeout)
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.warn("Token verification error:", error);
    return null
  }
}

export async function loginUser(userInput: any, remember: boolean) {
  const { id, email, name } = userInput;

  let timeout = remember ? 24 * 60 * 0 : TIMEOUT;

  // Create the session
  const expires = new Date(Date.now() + timeout * 1000);
  const session = await encrypt({ id, email, name, expires }, '${timeout} sec from now');

  // Save the session in a cookie
  (await cookies()).set("session", session, { expires, httpOnly: true });
  return { message: "Login Success" }
}

export async function logoutUser() {
  // Destroy the session 
  (await cookies()).set("session", "", { expires: new Date(0) });
  (await cookies()).delete('session')
  return { message: "Logout Success" }
}

export async function getSession() {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  if (!parsed) return;

  const timeout = new Date(parsed.exp * 1000) - Date.now();
  parsed.expires = new Date(Date.now() - timeout);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    // secure: true,   // if https is used
    value: await encrypt(parsed, '${timeout / 1000} sec from now'),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}