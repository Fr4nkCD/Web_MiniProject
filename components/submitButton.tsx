"use client"
import { useFormStatus } from "react-dom"
import {buttonRound1} from "@/components/stylesheet"

export default function SubmitButton({ label }: { label: string }) {
    const { pending } = useFormStatus()
    return <button className={`${buttonRound1} w-[96px]`} disabled={pending} type="submit">
        {pending ? "Loading..." : label}
    </button>
}