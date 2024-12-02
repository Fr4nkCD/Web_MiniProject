import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    await prisma.user.create({
        data: { name: 'Admin', email: 'admin@example.com', password: 'hashedpassword', role: 'admin' },
    });
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
