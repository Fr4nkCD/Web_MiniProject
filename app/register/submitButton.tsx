"use client"
import { useFormStatus } from "react-dom"
import buttonStyle from "@/components/buttonStyle"

export default function SubmitButton({ label }: { label: string }) {
    const { pending } = useFormStatus()
    return <button className={buttonStyle} disabled={pending} type="submit">
        {pending ? "Submitting..." : label}
    </button>
}