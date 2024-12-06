import prisma from "@/utils/db"

export default function Statistic() {
    return <div className="m-5">
        <br/><hr/><br/>
        <div className="flex gap-5 justify-around">
            <section className="flex flex-col justify-center items-center">
                <p className="text-4xl pb-4">{prisma.post.count()}</p>
                <p>Topics</p>
            </section>



            <section className="flex flex-col justify-center items-center">
                <p className="text-4xl pb-4">{prisma.user.count()}</p>
                <p>Users</p>
            </section>
        </div>
        <br/><hr/><br/>
    </div>
}