import { getSession } from "@/utils/loginUser";
import Link from "next/link";
import { buttonRound1 } from "@/components/stylesheet";

export default async function PostDetail({ searchParams }: { searchParams: { [key: string]: string } }) {
    const { pid, uid, username, role, subject, detail } = searchParams;

    const user = await getSession()

    return <div className="p-10">
        <div>
            <>
                <hr />
                <br />
                <h1 className="text-3xl font-semibold">{subject}</h1>
                <br />
                <hr />
                <p className="pt-2 flex gap-2">
                    by
                    <span className="text-gray-600 font-semibold">{username}</span>
                    <span className="text-gray-400">{role}</span>
                </p>
                {(user && user.id == uid) ? <Link href={{
                    pathname: '/forum/post/edit',
                    query: { id: pid, subject: subject, detail: detail }
                }}
                    className={buttonRound1}>
                    Edit
                </Link> : <></>}
            </>
            <section className="p-4">{detail}</section>
            <br />
            <hr />
        </div>
    </div>
}