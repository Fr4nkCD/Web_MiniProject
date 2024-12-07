import reply from "@/actions/reply";
import prisma from "@/utils/db"

export default async function User() {
    let users;
    try {
        users = await prisma.user.findMany({
            include: {
                posts: true,
                reply: true,
            }
        })

    } catch (error) {
        console.log(error)
    }

    return (
        <div className="m-10">
            <h1 className="font-bold text-indigo-800 text-2xl">SpeakUp Users</h1>
            <br />
            <table className="w-full text-md text-left rtl:text-right">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Posts</th>
                        <th>Replies</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.posts.length}</td>
                                <td>{user.reply.length}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <br /><hr /><br />
        </div>
    )
}
