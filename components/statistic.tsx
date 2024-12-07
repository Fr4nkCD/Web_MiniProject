import prisma from "@/utils/db"

export default function Statistic() {
    return <div className="m-5">
        <br /><hr /><br />
        <div className="flex justify-around">
            <section className="flex flex-col justify-center items-center">
                <p className="text-4xl pb-4">{prisma.user.count()}</p>
                <p>Users</p>
            </section>

            <div className="bg-gray-300 h-[5em] w-[1px]"/>

            <section className="flex flex-col justify-center items-center">
                <p className="text-4xl pb-4">{prisma.post.count()}</p>
                <p>Posts</p>
            </section>

            <div className="bg-gray-300 h-[5em] w-[1px]"/>

            <section className="flex flex-col justify-center items-center">
                <p className="text-4xl pb-4">{prisma.reply.count()}</p>
                <p>Replies</p>
            </section>
        </div>
        <br /><hr /><br />
    </div>
}